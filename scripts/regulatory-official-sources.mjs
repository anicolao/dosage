import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const directory = path.join(root, 'docs/regulatory/evidence/OFFICIAL-SOURCES');
const planPath = path.join(directory, 'source-plan.json');
const manifestPath = path.join(directory, 'MANIFEST.json');
const readmePath = path.join(directory, 'README.md');
const mode = process.argv[2] ?? 'check';

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

const planBytes = readFileSync(planPath);
const plan = JSON.parse(planBytes);

function torontoDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function fetchSource(source) {
  const response = await fetch(source.url, { redirect: 'follow', headers: { 'user-agent': 'Dosage regulatory evidence capture' } });
  if (!response.ok) throw new Error(`${source.id} returned HTTP ${response.status}`);
  const body = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get('content-type')?.split(';')[0] ?? null;
  if (source.content_type && contentType !== source.content_type) {
    throw new Error(`${source.id} returned ${contentType}, expected ${source.content_type}`);
  }
  const requiredText = Array.isArray(source.required_text) ? source.required_text : [source.required_text].filter(Boolean);
  for (const expected of requiredText) {
    if (!body.toString('utf8').includes(expected)) throw new Error(`${source.id} did not contain required text: ${expected}`);
  }
  return {
    id: source.id,
    title: source.title,
    version: source.version,
    requested_url: source.url,
    final_url: response.url,
    http_status: response.status,
    content_type: contentType,
    last_modified: response.headers.get('last-modified'),
    bytes: body.length,
    sha256: sha256(body),
    verified_text: requiredText
  };
}

function updateField(documentPath, fieldId, value, evidenceRef) {
  const source = readFileSync(documentPath, 'utf8');
  const document = YAML.parseDocument(source, { schema: 'core' });
  const record = document.toJS();
  const index = record.required_fields.findIndex(({ id }) => id === fieldId);
  if (index < 0) throw new Error(`${path.basename(documentPath)} has no field ${fieldId}`);
  document.setIn(['required_fields', index, 'value'], value);
  document.setIn(['required_fields', index, 'evidence_ref'], evidenceRef);
  writeFileSync(documentPath, document.toString({ lineWidth: 0 }));
}

function applyCurrentSourceFacts(manifest) {
  const source = (id) => manifest.sources.find((item) => item.id === id);
  const guidance = source('HC-SAMD-DEFINITION');
  const examples = source('HC-SAMD-EXAMPLES');
  const routing = source('HC-MDEL-0292-CURRENT');
  const futureRouting = source('HC-MDEL-0292-2026-12-14');
  const evidence = 'docs/regulatory/evidence/OFFICIAL-SOURCES/MANIFEST.json; refresh with npm run regulatory:sources on the submission day';
  const routeValue = `${routing.title}; ${routing.version}; ${routing.final_url}; accessed ${manifest.access_date}. Pending transition checked: ${futureRouting.title}; ${futureRouting.version}; ${futureRouting.final_url}.`;
  const addressValue = `meddevices-instrumentsmed@hc-sc.gc.ca, mechanically verified in the current FRM-0292 response captured ${manifest.access_date}; must be refreshed on the actual submission day`;
  const querySummary = manifest.mdall.queries.map(({ term, result_count: count }) => `${term}=${count}`).join(', ');
  const dilution = manifest.mdall.queries.find(({ term }) => term === 'dilution');
  const mdallValue = `${manifest.access_date} automated active-licence-name API searches (${querySummary}). “Dilution” matches: ${dilution.results.map((item) => `${item.licence_name}, licence ${item.original_licence_no}, Class ${item.appl_risk_class}`).join('; ')}. See manifest limitations.`;

  const inquiry = path.join(root, 'docs/regulatory/records/data/inquiry');
  const submission = path.join(root, 'docs/regulatory/records/data/submission');
  updateField(path.join(submission, 'SUB-007.yaml'), 'EXC-F01', `${guidance.title}; ${guidance.version}; ${guidance.final_url}; content SHA-256 ${guidance.sha256}; accessed ${manifest.access_date}`, evidence);
  updateField(path.join(submission, 'SUB-007.yaml'), 'EXC-F02', `${examples.title}; ${examples.version}; ${examples.final_url}; content SHA-256 ${examples.sha256}; accessed ${manifest.access_date}`, evidence);
  updateField(path.join(submission, 'SUB-008.yaml'), 'FAL-F03', mdallValue, evidence);
  updateField(path.join(inquiry, 'IQ-002.yaml'), 'IQ2-F02', routeValue, evidence);
  updateField(path.join(inquiry, 'IQ-002.yaml'), 'IQ2-F03', addressValue, evidence);
  updateField(path.join(submission, 'COR-002.yaml'), 'COR-F01', routeValue, evidence);
  updateField(path.join(submission, 'COR-002.yaml'), 'COR-F02', addressValue, evidence);
  updateField(path.join(submission, 'SUB-000.yaml'), 'COV-F05', addressValue, evidence);
}

async function refresh() {
  const sources = [];
  for (const source of plan.sources) sources.push(await fetchSource(source));
  const queries = [];
  for (const term of plan.mdall_queries) {
    const url = new URL('https://health-products.canada.ca/api/medical-devices/licence/');
    for (const [key, value] of Object.entries({ lang: 'en', type: 'json', state: 'active', licence_name: term })) {
      url.searchParams.set(key, value);
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`MDALL query ${term} returned HTTP ${response.status}`);
    const results = await response.json();
    queries.push({ term, url: url.toString(), result_count: results.length, results });
  }
  return {
    schema_version: 1,
    access_date: torontoDate(),
    time_zone: 'America/Toronto',
    source_plan: 'docs/regulatory/evidence/OFFICIAL-SOURCES/source-plan.json',
    source_plan_sha256: sha256(planBytes),
    sources,
    mdall: {
      limitation: 'MDALL covers licensed Class II, III and IV products; licence-name keyword results do not establish equivalence or absence of a comparable product.',
      queries
    }
  };
}

function markdown(manifest) {
  let output = `# Official-source and MDALL search evidence\n\n`;
  output += `Accessed ${manifest.access_date} (${manifest.time_zone}). This mechanical capture proves what URLs returned; it is not legal/regulatory approval and must be refreshed on the submission day.\n\n`;
  output += `## Official sources\n\n| ID | Title | HTTP | Content SHA-256 |\n| --- | --- | ---: | --- |\n`;
  for (const source of manifest.sources) {
    output += `| \`${source.id}\` | [${source.title}](${source.final_url}) | ${source.http_status} | \`${source.sha256}\` |\n`;
  }
  output += `\n## MDALL active-licence name searches\n\n| Search term | Results |\n| --- | ---: |\n`;
  for (const query of manifest.mdall.queries) output += `| ${query.term} | ${query.result_count} |\n`;
  output += `\n${manifest.mdall.limitation}\n\n`;
  const dilution = manifest.mdall.queries.find(({ term }) => term === 'dilution');
  if (dilution?.results.length) {
    output += `The “dilution” matches were reviewed as keyword results: ${dilution.results.map((item) => `${item.licence_name} (licence ${item.original_licence_no}, Class ${item.appl_risk_class})`).join('; ')}. Their names do not identify comparable medication-calculation software. A qualified reviewer must confirm this assessment and any off-database comparators.\n`;
  }
  return `${output.trimEnd()}\n`;
}

if (mode === 'refresh') {
  const manifest = await refresh();
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  writeFileSync(readmePath, markdown(manifest));
  applyCurrentSourceFacts(manifest);
  process.stdout.write(`Captured ${manifest.sources.length} official sources and ${manifest.mdall.queries.length} MDALL searches for ${manifest.access_date}.\n`);
} else if (mode === 'check') {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  if (manifest.source_plan_sha256 !== sha256(planBytes)) throw new Error('Official-source plan changed without refresh');
  if (readFileSync(readmePath, 'utf8') !== markdown(manifest)) throw new Error('Official-source README is stale');
  if (manifest.sources.length !== plan.sources.length || manifest.mdall.queries.length !== plan.mdall_queries.length) {
    throw new Error('Official-source manifest is incomplete');
  }
  process.stdout.write(`Verified captured official-source evidence from ${manifest.access_date}.\n`);
} else {
  throw new Error(`Unknown mode ${mode}; use refresh or check`);
}
