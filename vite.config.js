import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const configuredBase = process.env.PUBLIC_BASE_PATH ?? '/';
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

export default defineConfig({
  plugins: [svelte()],
  publicDir: 'static',
  base
});
