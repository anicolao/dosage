import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const baseline = '6b53fde87ff9b193b3c24f7bd93549746b4d6471';
const mode = process.argv[2] ?? 'check';
const jsonPath = path.join(root, 'docs/regulatory/evidence/AUTOMATED-FACTS.json');
const markdownPath = path.join(root, 'docs/regulatory/evidence/AUTOMATED-FACTS.md');
const screenshotManifestPath = path.join(root, 'docs/regulatory/evidence/SUB-002/MANIFEST.json');
const archivePath = path.join(root, 'docs/regulatory/evidence/INQ-000/dosage-0.1.0-6b53fde.zip');
const controlledApplicationPaths = ['index.html', 'src', 'static', 'vite.config.js'];

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function filesBelow(directory) {
  const files = [];
  for (const name of readdirSync(directory).sort()) {
    const item = path.join(directory, name);
    if (statSync(item).isDirectory()) files.push(...filesBelow(item));
    else files.push(item);
  }
  return files;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function deterministicZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const dosTime = (10 << 11);
  const dosDate = ((2026 - 1980) << 9) | (8 << 5) | 13;
  for (const file of files) {
    const name = Buffer.from(file.name);
    const data = file.data;
    const checksum = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(checksum, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, name, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(checksum, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.length + name.length + data.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

const changedApplicationPaths = git('diff', '--name-only', baseline, '--', ...controlledApplicationPaths)
  .split('\n').filter(Boolean);
if (changedApplicationPaths.length) {
  throw new Error(`Application differs from inquiry baseline: ${changedApplicationPaths.join(', ')}`);
}

const baselinePackage = JSON.parse(git('show', `${baseline}:package.json`));
const currentPackage = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
if (baselinePackage.name !== currentPackage.name || baselinePackage.version !== currentPackage.version) {
  throw new Error('Current package identity differs from inquiry baseline');
}
for (const [name, version] of Object.entries(baselinePackage.dependencies ?? {})) {
  if (currentPackage.dependencies?.[name] !== version) {
    throw new Error(`Runtime dependency ${name} differs from inquiry baseline`);
  }
}

const appSource = readFileSync(path.join(root, 'src/App.svelte'), 'utf8');
const manifestSource = readFileSync(path.join(root, 'static/manifest.webmanifest'), 'utf8');
const indexSource = readFileSync(path.join(root, 'index.html'), 'utf8');
const expectedClaims = [
  'Prototype only — not for patient care.',
  'Verify every value with the order, vial label, pharmacy guidance, and local policy.',
  'Enter the label and ordered values. This app does not recommend a dose.',
  'Do not enter patient information',
  'Verify overfill and preparation method.',
  'Use local policy for measurable volume and rounding.',
  'I checked the order, vial unit, ordered-dose unit, and final prepared volume.',
  'Stored on this device only',
  'Do not use history as a medication order.'
];
for (const claim of expectedClaims) {
  if (!appSource.includes(claim)) throw new Error(`Expected UI claim is absent: ${claim}`);
}
if (!indexSource.includes('noindex, nofollow, noarchive')) throw new Error('Prototype noindex control is absent');

const prohibitedRuntimePatterns = [
  ['fetch', /\bfetch\s*\(/],
  ['XMLHttpRequest', /\bXMLHttpRequest\b/],
  ['sendBeacon', /\bsendBeacon\b/],
  ['WebSocket', /\bWebSocket\b/],
  ['EventSource', /\bEventSource\b/]
];
const runtimeNetworkMatches = prohibitedRuntimePatterns
  .filter(([, expression]) => expression.test(appSource))
  .map(([name]) => name);
if (runtimeNetworkMatches.length) throw new Error(`Unexpected runtime network API: ${runtimeNetworkMatches.join(', ')}`);

for (const text of ["'dosage.favourites.v2'", "'dosage.history.v2'", 'const volumes = [10, 50, 100, 250, 500, 1000]']) {
  if (!appSource.includes(text)) throw new Error(`Expected source boundary is absent: ${text}`);
}
const unitOptions = [...appSource.matchAll(/<option value="(mg|mcg)">/g)].map((match) => match[1]);
if (JSON.stringify(unitOptions) !== JSON.stringify(['mg', 'mcg', 'mcg', 'mg'])) {
  throw new Error(`Unexpected unit options: ${unitOptions.join(', ')}`);
}

const amount = 10;
const vialVolume = 1;
const finalVolume = 50;
const orderedDose = 2000;
const vialConcentration = amount / vialVolume;
const preparedConcentration = amount / finalVolume;
const preparedConcentrationInOrderedUnit = preparedConcentration * 1000;
const administrationVolume = orderedDose / preparedConcentrationInOrderedUnit;
if (administrationVolume !== 10) throw new Error('Worked-example calculation changed');

const screenshotManifestBytes = readFileSync(screenshotManifestPath);
const screenshotManifest = JSON.parse(screenshotManifestBytes);
const screenshotArchiveDigest = sha256(Buffer.from(screenshotManifest.screenshots
  .map(({ file, sha256: digest }) => `${file}\0${digest}\n`).join('')));
const archiveBytes = deterministicZip(filesBelow(path.join(root, 'dist')).map((file) => ({
  name: path.relative(path.join(root, 'dist'), file).split(path.sep).join('/'),
  data: readFileSync(file)
})));
const archiveSha256 = sha256(archiveBytes);

const e2eTests = filesBelow(path.join(root, 'tests/e2e'))
  .filter((file) => file.endsWith('.spec.ts'))
  .map((file) => path.relative(root, file).split(path.sep).join('/'));
const formalFiles = filesBelow(path.join(root, 'formal/lean'))
  .filter((file) => file.endsWith('.lean'))
  .map((file) => path.relative(root, file).split(path.sep).join('/'));

const facts = {
  schema_version: 1,
  generated_for_record_date: '2026-08-13',
  product: {
    name: currentPackage.name,
    display_name: 'Dosage',
    package_version: currentPackage.version,
    source_baseline: baseline,
    visible_identity: `v${currentPackage.version} · ${baseline.slice(0, 7)}`
  },
  baseline_control: {
    controlled_paths: controlledApplicationPaths,
    changed_paths: changedApplicationPaths,
    result: 'Current application source is byte-identical to the inquiry baseline for every controlled path',
    baseline_tree: git('rev-parse', `${baseline}^{tree}`)
  },
  artifact: {
    build_command: 'npm run build:submission',
    archive: path.relative(root, archivePath).split(path.sep).join('/'),
    archive_sha256: archiveSha256,
    archive_bytes: archiveBytes.length,
    file_manifest_sha256: screenshotManifest.artifact_file_manifest_sha256,
    screenshot_manifest: path.relative(root, screenshotManifestPath).split(path.sep).join('/'),
    screenshot_manifest_sha256: sha256(screenshotManifestBytes),
    screenshot_archive_sha256: screenshotArchiveDigest,
    screenshot_count: screenshotManifest.screenshots.length
  },
  function_boundary: {
    units: ['mg', 'mcg'],
    final_prepared_volumes_ml: [10, 50, 100, 250, 500, 1000],
    local_storage_keys: ['dosage.favourites.v2', 'dosage.history.v2'],
    runtime_application_network_apis: runtimeNetworkMatches,
    user_visible_claims: expectedClaims,
    noindex: true,
    manifest: JSON.parse(manifestSource)
  },
  worked_example: {
    inputs: { medication_display_name: 'Example medication', vial_amount: amount, vial_unit: 'mg', vial_volume_ml: vialVolume, final_prepared_volume_ml: finalVolume, ordered_dose: orderedDose, ordered_unit: 'mcg' },
    expected: { vial_concentration_mg_per_ml: vialConcentration, prepared_concentration_mg_per_ml: preparedConcentration, prepared_concentration_mcg_per_ml: preparedConcentrationInOrderedUnit, administration_volume_ml: administrationVolume }
  },
  automated_evidence: {
    e2e_specs: e2eTests,
    formal_lean_files: formalFiles,
    submission_capture_spec: 'tests/submission/02-workflow-and-screenshots.spec.ts'
  },
  limitations: [
    'This evidence establishes source and observed behavior, not clinical appropriateness or regulatory classification.',
    'The Lean model is a separate exact-rational reference and is not differential proof of the JavaScript prototype.',
    'A zero-length runtime API list is a source fact corroborated by E2E observation; the generated service worker still fetches same-origin cache misses.',
    'Identity, professional competence, clinical/regulatory judgment, evidence acceptance and signatures require attributable humans.'
  ]
};
const json = `${JSON.stringify(facts, null, 2)}\n`;
const jsonDigest = sha256(Buffer.from(json));
let markdown = `# Automated exact-prototype facts\n\n`;
markdown += `This evidence was derived from repository source and controlled tests. It is not a clinical or regulatory approval.\n\n`;
markdown += `| Fact | Value |\n| --- | --- |\n`;
markdown += `| Product | ${facts.product.display_name} ${facts.product.visible_identity} |\n`;
markdown += `| Full source baseline | \`${baseline}\` |\n`;
markdown += `| Application-path comparison | ${facts.baseline_control.result} |\n`;
markdown += `| Built artifact file-manifest SHA-256 | \`${facts.artifact.file_manifest_sha256}\` |\n`;
markdown += `| Archived executable ZIP / SHA-256 | \`${facts.artifact.archive}\` / \`${facts.artifact.archive_sha256}\` |\n`;
markdown += `| Screenshot archive | ${facts.artifact.screenshot_count} captures; \`${facts.artifact.screenshot_archive_sha256}\` |\n`;
markdown += `| Units / final volumes | mg, mcg / 10, 50, 100, 250, 500, 1000 mL |\n`;
markdown += `| Runtime application network APIs | None in \`src/App.svelte\`; representative runtime observation is tested separately |\n`;
markdown += `| Evidence JSON SHA-256 | \`${jsonDigest}\` |\n\n`;
markdown += `## Mechanically reproduced worked example\n\n`;
markdown += `10 mg in 1 mL prepared to 50 mL gives 0.2 mg/mL = 200 mcg/mL. `;
markdown += `An already-authorized 2000 mcg dose gives 10 mL. This arithmetic result still requires pharmacy approval as an authoritative clinical example.\n\n`;
markdown += `## Human controls intentionally not automated\n\n`;
markdown += facts.limitations.map((item) => `- ${item}`).join('\n');
markdown = `${markdown.trimEnd()}\n`;

if (mode === 'build') {
  mkdirSync(path.dirname(archivePath), { recursive: true });
  writeFileSync(archivePath, archiveBytes);
  writeFileSync(jsonPath, json);
  writeFileSync(markdownPath, markdown);
  process.stdout.write(`Generated automated regulatory facts; SHA-256 ${jsonDigest}.\n`);
} else if (mode === 'check') {
  if (!readFileSync(archivePath).equals(archiveBytes)) throw new Error('Exact-prototype executable archive is stale');
  if (readFileSync(jsonPath, 'utf8') !== json) throw new Error('AUTOMATED-FACTS.json is stale');
  if (readFileSync(markdownPath, 'utf8') !== markdown) throw new Error('AUTOMATED-FACTS.md is stale');
  process.stdout.write(`Verified automated regulatory facts; SHA-256 ${jsonDigest}.\n`);
} else {
  throw new Error(`Unknown mode ${mode}; use build or check`);
}
