import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import Mustache from 'mustache';
import YAML from 'yaml';

// The target is Markdown, not HTML. Values are controlled YAML content and
// pipe characters in table cells are escaped explicitly by display().
Mustache.escape = (value) => String(value);

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const recordsRoot = path.join(repositoryRoot, 'docs/regulatory/records');
const dataRoot = path.join(recordsRoot, 'data');
const templatesRoot = path.join(recordsRoot, 'templates');
const completedRoot = path.join(repositoryRoot, 'docs/regulatory/completed');
const schemaPath = path.join(recordsRoot, 'record.schema.json');
const generatorVersion = '1';

function fail(message) {
  throw new Error(message);
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function posixRelative(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/');
}

function recursivelyList(directory, extension) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...recursivelyList(entryPath, extension));
    else if (entry.isFile() && entry.name.endsWith(extension)) files.push(entryPath);
  }
  return files.sort();
}

function readText(filePath) {
  return readFileSync(filePath, 'utf8');
}

function hasValue(value) {
  return value !== null && value !== undefined &&
    (typeof value !== 'string' || value.trim().length > 0);
}

function missingMarker(recordId, location) {
  return `⟦MISSING: ${recordId}.${location}⟧`;
}

function display(value, marker) {
  return hasValue(value) ? String(value).replaceAll('|', '\\|') : marker;
}

function statusLabel(status) {
  return {
    incomplete: 'INCOMPLETE / NOT APPROVED',
    in_review: 'IN REVIEW / NOT APPROVED',
    approved: 'APPROVED IN STRUCTURED SOURCE',
    superseded: 'SUPERSEDED / DO NOT RELY'
  }[status];
}

function kindLabel(kind) {
  return kind.replaceAll('_', ' ');
}

function recordMissing(record) {
  const missing = [];
  const add = (location) => missing.push(`${record.record_id}.${location}`);

  if (!hasValue(record.source_baseline)) add('source_baseline');

  for (const field of record.required_fields) {
    if (!field.required) continue;
    if (!hasValue(field.value)) add(`required_fields.${field.id}.value`);
    if (!hasValue(field.evidence_ref)) add(`required_fields.${field.id}.evidence_ref`);
  }

  record.sections.forEach((section, index) => {
    if (section.required !== false && !hasValue(section.body)) {
      add(`sections.${index + 1}.body`);
    }
  });

  for (const decision of record.decisions) {
    if (!decision.required) continue;
    if (!hasValue(decision.decision)) add(`decisions.${decision.id}.decision`);
    if (!hasValue(decision.rationale)) add(`decisions.${decision.id}.rationale`);
    if (!hasValue(decision.evidence_ref)) add(`decisions.${decision.id}.evidence_ref`);
  }

  for (const evidence of record.evidence) {
    if (!evidence.required) continue;
    if (!hasValue(evidence.reference)) add(`evidence.${evidence.id}.reference`);
    if (!['accepted', 'not_applicable'].includes(evidence.status)) {
      add(`evidence.${evidence.id}.status`);
    }
  }

  record.approvals.forEach((approval, index) => {
    if (!approval.required) return;
    const location = `approvals.${index + 1}`;
    if (!hasValue(approval.name)) add(`${location}.name`);
    if (!hasValue(approval.organization)) add(`${location}.organization`);
    if (approval.decision !== 'approved') add(`${location}.decision`);
    if (!hasValue(approval.date)) add(`${location}.date`);
    if (!hasValue(approval.signature_ref)) add(`${location}.signature_ref`);
  });

  if (!hasValue(record.completion_statement)) add('completion_statement');
  if (record.status !== 'approved') add('status');
  return [...new Set(missing)].sort();
}

function prepareView(record, sourcePath, templatePath, sourceText, templateText) {
  const missing = recordMissing(record);
  const marker = (location) => missingMarker(record.record_id, location);
  const preparedFields = record.required_fields.map((field) => {
    const complete = !field.required || (hasValue(field.value) && hasValue(field.evidence_ref));
    return {
      ...field,
      value_display: display(field.value, marker(`required_fields.${field.id}.value`)),
      evidence_display: display(field.evidence_ref, marker(`required_fields.${field.id}.evidence_ref`)),
      required_label: field.required ? 'Yes' : 'No',
      state_label: complete ? 'Complete' : 'Open'
    };
  });
  const preparedSections = record.sections.map((section, index) => ({
    ...section,
    number: index + 1,
    body_display: display(section.body, marker(`sections.${index + 1}.body`))
  }));
  const preparedDecisions = record.decisions.map((decision) => {
    const complete = !decision.required ||
      (hasValue(decision.decision) && hasValue(decision.rationale) && hasValue(decision.evidence_ref));
    return {
      ...decision,
      decision_display: display(decision.decision, marker(`decisions.${decision.id}.decision`)),
      rationale_display: display(decision.rationale, marker(`decisions.${decision.id}.rationale`)),
      evidence_display: display(decision.evidence_ref, marker(`decisions.${decision.id}.evidence_ref`)),
      state_label: complete ? 'Complete' : 'Open'
    };
  });
  const preparedEvidence = record.evidence.map((evidence) => {
    const complete = !evidence.required ||
      (hasValue(evidence.reference) && ['accepted', 'not_applicable'].includes(evidence.status));
    return {
      ...evidence,
      reference_display: display(evidence.reference, marker(`evidence.${evidence.id}.reference`)),
      required_label: evidence.required ? 'Yes' : 'No',
      state_label: complete ? 'Complete' : 'Open'
    };
  });
  const preparedApprovals = record.approvals.map((approval, index) => {
    const location = `approvals.${index + 1}`;
    const complete = !approval.required ||
      (hasValue(approval.name) && hasValue(approval.organization) &&
        approval.decision === 'approved' && hasValue(approval.date) && hasValue(approval.signature_ref));
    const identity = hasValue(approval.name) && hasValue(approval.organization)
      ? `${approval.name} / ${approval.organization}`
      : marker(`${location}.name/organization`);
    return {
      ...approval,
      identity_display: identity,
      decision_display: display(approval.decision, marker(`${location}.decision`)),
      date_display: display(approval.date, marker(`${location}.date`)),
      signature_display: display(approval.signature_ref, marker(`${location}.signature_ref`)),
      state_label: complete ? 'Complete' : 'Open'
    };
  });

  return {
    ...record,
    kind_label: kindLabel(record.kind),
    status_label: statusLabel(record.status),
    source_baseline_display: display(record.source_baseline, marker('source_baseline')),
    source_path: posixRelative(sourcePath),
    template_path: posixRelative(templatePath),
    source_hash: sha256(sourceText),
    template_hash: sha256(templateText),
    required_fields: preparedFields,
    sections: preparedSections,
    decisions: preparedDecisions,
    evidence: preparedEvidence,
    approvals: preparedApprovals,
    missing,
    completion_label: missing.length === 0 ? 'READY FOR HUMAN GATE DECISION' : 'NOT READY',
    completion_statement_display: display(record.completion_statement, marker('completion_statement'))
  };
}

function loadRecords() {
  const schema = JSON.parse(readText(schemaPath));
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
  const validate = ajv.compile(schema);
  const files = recursivelyList(dataRoot, '.yaml');
  if (files.length === 0) fail(`No YAML records found under ${posixRelative(dataRoot)}`);

  const ids = new Set();
  const outputs = new Set();
  return files.map((sourcePath) => {
    const sourceText = readText(sourcePath);
    const record = YAML.parse(sourceText, { schema: 'core' });
    if (!validate(record)) {
      const details = validate.errors.map((error) =>
        `${error.instancePath || '/'} ${error.message}`).join('; ');
      fail(`${posixRelative(sourcePath)} violates record.schema.json: ${details}`);
    }
    if (ids.has(record.record_id)) fail(`Duplicate record_id: ${record.record_id}`);
    if (outputs.has(record.output)) fail(`Duplicate output: ${record.output}`);
    ids.add(record.record_id);
    outputs.add(record.output);

    const normalizedOutput = path.posix.normalize(record.output);
    if (normalizedOutput.startsWith('../') || path.posix.isAbsolute(normalizedOutput)) {
      fail(`${record.record_id} has unsafe output path: ${record.output}`);
    }
    const templatePath = path.join(templatesRoot, record.template);
    if (!existsSync(templatePath) || !statSync(templatePath).isFile()) {
      fail(`${record.record_id} references missing template ${record.template}`);
    }
    const templateText = readText(templatePath);
    const view = prepareView(record, sourcePath, templatePath, sourceText, templateText);
    const outputText = `${Mustache.render(templateText, view).trimEnd()}\n`;
    return {
      record,
      sourcePath,
      sourceText,
      templatePath,
      templateText,
      view,
      outputPath: path.join(completedRoot, normalizedOutput),
      outputText
    };
  });
}

function expectedFiles(records) {
  const manifest = {
    schema_version: 1,
    generator_version: generatorVersion,
    records: records.map((entry) => ({
      record_id: entry.record.record_id,
      status: entry.record.status,
      ready: entry.view.missing.length === 0,
      source: posixRelative(entry.sourcePath),
      source_sha256: sha256(entry.sourceText),
      template: posixRelative(entry.templatePath),
      template_sha256: sha256(entry.templateText),
      output: posixRelative(entry.outputPath),
      output_sha256: sha256(entry.outputText),
      missing: entry.view.missing
    }))
  };
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
  const completenessRows = manifest.records.map((record) =>
    `| \`${record.record_id}\` | ${record.status} | ${record.ready ? 'READY' : 'NOT READY'} | ${record.missing.length} | \`${record.output}\` |`
  ).join('\n');
  const completenessText = `# Regulatory record completeness\n\n` +
    `> **GENERATED — DO NOT EDIT.** This index reports only mechanical\n` +
    `> completeness of the structured sources. READY is not a human approval.\n\n` +
    `| Record | Controlled status | Mechanical result | Open items | Output |\n` +
    `| --- | --- | --- | ---: | --- |\n${completenessRows}\n\n` +
    `Manifest SHA-256: \`${sha256(manifestText)}\`\n`;

  return new Map([
    ...records.map((entry) => [entry.outputPath, entry.outputText]),
    [path.join(completedRoot, 'MANIFEST.json'), manifestText],
    [path.join(completedRoot, 'COMPLETENESS.md'), completenessText]
  ]);
}

function build(files) {
  for (const [filePath, content] of files) {
    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
  }
  console.log(`Generated ${files.size - 2} controlled records plus manifest and completeness index.`);
}

function check(files) {
  const mismatches = [];
  for (const [filePath, content] of files) {
    if (!existsSync(filePath)) mismatches.push(`${posixRelative(filePath)} is missing`);
    else if (readText(filePath) !== content) mismatches.push(`${posixRelative(filePath)} is stale`);
  }
  if (mismatches.length > 0) {
    fail(`${mismatches.join('\n')}\nRun npm run regulatory:build and commit the generated outputs.`);
  }
  console.log(`Verified ${files.size - 2} generated records and deterministic manifest.`);
}

function selectedRecordIds(args) {
  const ids = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--record') {
      if (!args[index + 1]) fail('--record requires a record ID');
      ids.push(args[index + 1]);
      index += 1;
    } else {
      fail(`Unknown ready option: ${args[index]}`);
    }
  }
  return ids;
}

function ready(records, args) {
  const requested = selectedRecordIds(args);
  const selected = requested.length === 0
    ? records
    : records.filter((entry) => requested.includes(entry.record.record_id));
  const found = new Set(selected.map((entry) => entry.record.record_id));
  const unknown = requested.filter((id) => !found.has(id));
  if (unknown.length > 0) fail(`Unknown record ID(s): ${unknown.join(', ')}`);
  const blocked = selected.filter((entry) => entry.view.missing.length > 0);
  if (blocked.length > 0) {
    const details = blocked.map((entry) =>
      `${entry.record.record_id}:\n  ${entry.view.missing.join('\n  ')}`).join('\n');
    fail(`Records are not ready:\n${details}`);
  }
  console.log(`Ready for human decision: ${selected.map((entry) => entry.record.record_id).join(', ')}`);
}

function git(args, options = {}) {
  const result = spawnSync('git', args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit'
  });
  if (result.status !== 0) fail(`git ${args.join(' ')} failed${result.stderr ? `: ${result.stderr.trim()}` : ''}`);
  return result.stdout?.trim() ?? '';
}

function commit(records, files, args) {
  const message = args.join(' ').trim();
  if (!message) fail('Usage: npm run regulatory:commit -- "Descriptive audit commit message"');
  const staged = git(['diff', '--cached', '--name-only'], { capture: true });
  if (staged) fail(`Refusing to commit while files are already staged:\n${staged}`);
  build(files);
  check(files);
  git(['add', '--', 'docs/regulatory/records/data', 'docs/regulatory/completed']);
  const stagedAfter = git(['diff', '--cached', '--name-only'], { capture: true });
  if (!stagedAfter) fail('No structured regulatory changes to commit.');
  const outside = stagedAfter.split('\n').filter((file) =>
    !file.startsWith('docs/regulatory/records/data/') &&
    !file.startsWith('docs/regulatory/completed/'));
  if (outside.length > 0) fail(`Refusing unexpected staged path(s): ${outside.join(', ')}`);
  git(['commit', '-m', message]);
  console.log('Committed structured YAML and matching generated documentation.');
}

try {
  const [command = 'build', ...args] = process.argv.slice(2);
  const records = loadRecords();
  const files = expectedFiles(records);
  if (command === 'build') build(files);
  else if (command === 'check') check(files);
  else if (command === 'ready') ready(records, args);
  else if (command === 'commit') commit(records, files, args);
  else fail(`Unknown command: ${command}`);
} catch (error) {
  console.error(`regulatory-records: ${error.message}`);
  process.exitCode = 1;
}
