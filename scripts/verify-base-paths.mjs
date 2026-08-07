import fs from 'node:fs';
import path from 'node:path';

const configuredBase = process.env.PUBLIC_BASE_PATH;
if (!configuredBase || configuredBase === '/') {
  throw new Error('PUBLIC_BASE_PATH must be set to a non-root deployment path');
}

const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;
const distDirectory = path.resolve('dist');
const indexPath = path.join(distDirectory, 'index.html');

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html does not exist; build before checking base paths');
}

const files = [];
const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(entryPath);
    else if (/\.(?:html|js|css|webmanifest)$/.test(entry.name)) files.push(entryPath);
  }
};
visit(distDirectory);

const failures = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const match of content.matchAll(/(?:src|href)=["'](\/[^"']+)["']/g)) {
    if (!match[1].startsWith(base)) failures.push(`${path.relative('.', file)}: ${match[1]}`);
  }
  if (content.includes('"/images/')) failures.push(`${path.relative('.', file)}: absolute /images/ reference`);
}

if (failures.length > 0) {
  throw new Error(`Found paths that escape ${base}:\n${failures.join('\n')}`);
}

const index = fs.readFileSync(indexPath, 'utf8');
if (!index.includes(`${base}assets/`)) {
  throw new Error(`dist/index.html does not reference assets under ${base}`);
}
if (!index.includes(`${base}manifest.webmanifest`)) {
  throw new Error(`dist/index.html does not reference the manifest under ${base}`);
}

const serviceWorkerPath = path.join(distDirectory, 'service-worker.js');
if (!fs.existsSync(serviceWorkerPath)) {
  throw new Error('dist/service-worker.js does not exist');
}
const serviceWorker = fs.readFileSync(serviceWorkerPath, 'utf8');
if (serviceWorker.includes('"/')) {
  throw new Error('dist/service-worker.js contains a root-absolute precache path');
}
const scopeName = base.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
if (!serviceWorker.includes(`dosage-app-${scopeName}-`)) {
  throw new Error(`dist/service-worker.js cache is not namespaced to ${base}`);
}

console.log(`Verified deployment assets remain under ${base}`);
