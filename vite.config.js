import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
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

export default defineConfig({
  plugins: [svelte()],
  publicDir: 'static',
  base,
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageVersion),
    'import.meta.env.VITE_GIT_HASH': JSON.stringify(shortGitHash())
  }
});
