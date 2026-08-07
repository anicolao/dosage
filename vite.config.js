import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const configuredBase = process.env.PUBLIC_BASE_PATH ?? '/';
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;
const packageVersion = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')).version;

function shortGitHash() {
  const suppliedHash = process.env.DOSAGE_GIT_HASH?.trim();
  if (suppliedHash) return suppliedHash.slice(0, 7);

  try {
    return execFileSync('git', ['rev-parse', '--short=7', 'HEAD'], {
      encoding: 'utf8'
    }).trim();
  } catch {
    throw new Error('Unable to determine the Git revision. Set DOSAGE_GIT_HASH when building outside a Git checkout.');
  }
}

const gitHash = shortGitHash();

function offlineServiceWorker() {
  let outputDirectory;

  return {
    name: 'dosage-offline-service-worker',
    apply: 'build',
    configResolved(config) {
      outputDirectory = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const files = [];
      const visit = (directory) => {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
          const entryPath = path.join(directory, entry.name);
          if (entry.isDirectory()) visit(entryPath);
          else if (entry.name !== 'service-worker.js' && statSync(entryPath).isFile()) {
            files.push(path.relative(outputDirectory, entryPath).split(path.sep).join('/'));
          }
        }
      };
      visit(outputDirectory);

      const appShell = ['./', ...files.sort().map((file) => `./${file}`)];
      const scopeName = base === '/'
        ? 'root'
        : base.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      const cachePrefix = `dosage-app-${scopeName}-`;
      const cacheName = `${cachePrefix}${packageVersion}-${gitHash}`;
      const source = `const CACHE_PREFIX = ${JSON.stringify(cachePrefix)};
const CACHE_NAME = ${JSON.stringify(cacheName)};
const APP_SHELL = ${JSON.stringify(appShell, null, 2)};

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names
        .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
        .map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(async (cached) => {
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    })
  );
});
`;
      writeFileSync(path.join(outputDirectory, 'service-worker.js'), source);
    }
  };
}

export default defineConfig({
  plugins: [svelte(), offlineServiceWorker()],
  publicDir: 'static',
  base,
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageVersion),
    'import.meta.env.VITE_GIT_HASH': JSON.stringify(gitHash)
  }
});
