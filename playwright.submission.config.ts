import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/submission',
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  reporter: [['line']],
  use: {
    baseURL: 'http://127.0.0.1:4176',
    browserName: 'chromium',
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 1,
    timezoneId: 'America/Toronto',
    locale: 'en-CA',
    reducedMotion: 'reduce',
    serviceWorkers: 'allow',
    actionTimeout: 5000,
    launchOptions: {
      args: [
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
        '--disable-lcd-text',
        '--force-device-scale-factor=1',
        '--disable-gpu',
        '--use-gl=swiftshader'
      ]
    }
  },
  snapshotPathTemplate: 'docs/regulatory/evidence/SUB-002/screenshots/{arg}{ext}',
  webServer: {
    command: 'npm run preview:e2e',
    url: 'http://127.0.0.1:4176',
    reuseExistingServer: false
  },
  timeout: 60000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 0,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css'
    }
  }
});
