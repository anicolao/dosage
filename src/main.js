import { mount } from 'svelte';
import App from './App.svelte';

mount(App, { target: document.getElementById('app') });

async function registerOfflineApp() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  try {
    await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}service-worker.js`,
      { scope: import.meta.env.BASE_URL }
    );
    await navigator.serviceWorker.ready;
    document.documentElement.dataset.offlineReady = 'true';
  } catch {
    document.documentElement.dataset.offlineReady = 'false';
  }
}

registerOfflineApp();
