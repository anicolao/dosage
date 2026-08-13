import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const evidenceDirectory = path.join(root, 'docs/regulatory/evidence/SUB-002');
const planPath = path.join(evidenceDirectory, 'capture-plan.json');
const screenshotDirectory = path.join(evidenceDirectory, 'screenshots');
const manifestPath = path.join(evidenceDirectory, 'MANIFEST.json');
const readmePath = path.join(evidenceDirectory, 'README.md');
const recordPath = path.join(root, 'docs/regulatory/records/data/submission/SUB-002.yaml');
const completedDocumentPath = path.join(
  root,
  'docs/regulatory/completed/submission/02_WORKFLOW_AND_SCREENSHOTS.md'
);
const mode = process.argv[2] ?? 'check';

function hash(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function relative(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function pngDimensions(buffer) {
  if (buffer.toString('ascii', 1, 4) !== 'PNG') throw new Error('Evidence image is not a PNG');
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function visit(directory) {
  const files = [];
  for (const name of readdirSync(directory).sort()) {
    const file = path.join(directory, name);
    if (statSync(file).isDirectory()) files.push(...visit(file));
    else files.push(file);
  }
  return files;
}

const planBytes = readFileSync(planPath);
const plan = JSON.parse(planBytes);
const expectedNames = plan.captures.map((capture) => `${capture.id}.png`);
const actualNames = readdirSync(screenshotDirectory).filter((name) => name.endsWith('.png')).sort();
if (JSON.stringify(actualNames) !== JSON.stringify([...expectedNames].sort())) {
  throw new Error(`Screenshot set differs from capture plan: ${actualNames.join(', ')}`);
}

const screenshots = plan.captures.map((capture) => {
  const file = path.join(screenshotDirectory, `${capture.id}.png`);
  const bytes = readFileSync(file);
  return {
    ...capture,
    file: relative(file),
    sha256: hash(bytes),
    bytes: bytes.length,
    ...pngDimensions(bytes)
  };
});

const artifactFiles = visit(path.join(root, 'dist')).map((file) => {
  const bytes = readFileSync(file);
  return { file: relative(file), sha256: hash(bytes), bytes: bytes.length };
});
const artifactManifestSha256 = hash(Buffer.from(JSON.stringify(artifactFiles)));
const manifest = {
  schema_version: 1,
  record_id: plan.record_id,
  source_baseline: plan.source_baseline,
  package_version: plan.package_version,
  capture_date: plan.capture_date,
  fixed_clock: plan.fixed_clock,
  operator: plan.operator,
  environment: {
    browser: plan.browser,
    locale: plan.locale,
    timezone: plan.timezone,
    viewport: plan.viewport
  },
  capture_plan: relative(planPath),
  capture_plan_sha256: hash(planBytes),
  build_command: 'npm run build:submission',
  test_command: 'playwright test --config playwright.submission.config.ts',
  artifact_file_manifest_sha256: artifactManifestSha256,
  artifact_files: artifactFiles,
  screenshots
};
const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
const archiveDigest = hash(Buffer.from(screenshots.map(({ file, sha256 }) => `${file}\0${sha256}\n`).join('')));

let gallery = `The following uncropped captures are generated and verified by \`npm run regulatory:screenshots:check\`. `;
gallery += `The machine-readable manifest records the exact source baseline, build command, browser environment, viewport, `;
gallery += `per-file SHA-256 and built-artifact file-manifest digest. The exact prototype has no About screen; version and `;
gallery += `prototype status are captured in the persistent header/banner instead. Playwright cannot capture browser `;
gallery += `installation chrome, so installability is verified from manifest metadata and service-worker control while `;
gallery += `capture 12 demonstrates a new offline page after app-shell installation.\n\n`;
screenshots.forEach((screenshot, index) => {
  gallery += `### Capture ${index + 1} — ${screenshot.title}\n\n`;
  gallery += `![${screenshot.title}](../../evidence/SUB-002/screenshots/${path.basename(screenshot.file)})\n\n`;
  gallery += `${screenshot.caption}\n\n`;
  gallery += `Workflow steps: ${screenshot.workflow_steps.join(', ')}. `;
  gallery += `PNG ${screenshot.width}×${screenshot.height}; SHA-256 \`${screenshot.sha256}\`.\n\n`;
});
gallery += `Captions, workflow mapping, dimensions and individual hashes are also recorded in `;
gallery += `[the controlled evidence index](../../evidence/SUB-002/README.md).`;

const recordText = readFileSync(recordPath, 'utf8');
const recordDocument = YAML.parseDocument(recordText, { schema: 'core' });
const record = recordDocument.toJS();
const fieldIndex = (id) => {
  const index = record.required_fields.findIndex((field) => field.id === id);
  if (index < 0) throw new Error(`SUB-002 is missing required field ${id}`);
  return index;
};
const captureSectionIndex = record.sections.findIndex((section) => section.title === 'Required captures');
if (captureSectionIndex < 0) throw new Error('SUB-002 is missing the Required captures section');

const generatedRecordValues = [
  {
    path: ['required_fields', fieldIndex('WFL-F01'), 'value'],
    value: `${plan.operator}; ${plan.browser}; captured ${plan.capture_date}; fixed clock ${plan.fixed_clock}; ` +
      `${plan.locale}; ${plan.timezone}; ${plan.viewport}`
  },
  {
    path: ['required_fields', fieldIndex('WFL-F02'), 'value'],
    value: archiveDigest
  },
  {
    path: ['required_fields', fieldIndex('WFL-F03'), 'value'],
    value: plan.worked_example
  },
  {
    path: ['sections', captureSectionIndex, 'body'],
    value: gallery
  }
];

let readme = `# SUB-002 controlled screenshot evidence\n\n`;
readme += `This archive was captured automatically from Dosage \`${plan.package_version}\` at source baseline `;
readme += `\`${plan.source_baseline}\`. It is evidence of prototype behavior, not clinical validation or authorization.\n\n`;
readme += `| Control | Value |\n| --- | --- |\n`;
readme += `| Capture date | ${plan.capture_date} |\n`;
readme += `| Operator | ${plan.operator} |\n`;
readme += `| Environment | ${plan.browser}; ${plan.locale}; ${plan.timezone}; ${plan.viewport} |\n`;
readme += `| Worked example | ${plan.worked_example} |\n`;
readme += `| Screenshot archive SHA-256 | \`${archiveDigest}\` |\n`;
readme += `| Built artifact file-manifest SHA-256 | \`${artifactManifestSha256}\` |\n`;
readme += `| Machine-readable manifest | [MANIFEST.json](./MANIFEST.json) |\n\n`;
for (const screenshot of screenshots) {
  readme += `## ${screenshot.title}\n\n`;
  readme += `![${screenshot.title}](./screenshots/${path.basename(screenshot.file)})\n\n`;
  readme += `${screenshot.caption}\n\n`;
  readme += `Workflow steps: ${screenshot.workflow_steps.join(', ')}. `;
  readme += `PNG ${screenshot.width}×${screenshot.height}; SHA-256 \`${screenshot.sha256}\`.\n\n`;
}
readme = `${readme.trimEnd()}\n`;

if (mode === 'build') {
  writeFileSync(manifestPath, manifestText);
  writeFileSync(readmePath, readme);
  for (const generated of generatedRecordValues) recordDocument.setIn(generated.path, generated.value);
  writeFileSync(recordPath, recordDocument.toString({ lineWidth: 0 }));
  process.stdout.write(
    `Generated ${screenshots.length} controlled screenshots and inline SUB-002 gallery; ` +
    `archive SHA-256 ${archiveDigest}.\n`
  );
} else if (mode === 'check') {
  if (readFileSync(manifestPath, 'utf8') !== manifestText) throw new Error('SUB-002 MANIFEST.json is stale');
  if (readFileSync(readmePath, 'utf8') !== readme) throw new Error('SUB-002 README.md is stale');
  for (const generated of generatedRecordValues) {
    if (recordDocument.getIn(generated.path) !== generated.value) {
      throw new Error('SUB-002 structured source is stale; run npm run regulatory:screenshots');
    }
  }
  const completedDocument = readFileSync(completedDocumentPath, 'utf8');
  for (const screenshot of screenshots) {
    const embeddedImage = `![${screenshot.title}](../../evidence/SUB-002/screenshots/${path.basename(screenshot.file)})`;
    if (!completedDocument.includes(embeddedImage) || !completedDocument.includes(`SHA-256 \`${screenshot.sha256}\``)) {
      throw new Error(`Generated SUB-002 document does not embed controlled capture ${screenshot.id}`);
    }
  }
  process.stdout.write(
    `Verified ${screenshots.length} controlled screenshots and inline SUB-002 gallery; ` +
    `archive SHA-256 ${archiveDigest}.\n`
  );
} else {
  throw new Error(`Unknown mode ${mode}; use build or check`);
}
