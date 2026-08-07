import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 4,
  forbidOnly: true,
  retries: 0,
  reporter: [['line'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4176',
    trace: 'retain-on-failure',
    serviceWorkers: 'block',
    deviceScaleFactor: 1,
    timezoneId: 'America/Toronto',
    locale: 'en-CA',
    reducedMotion: 'reduce',
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
  snapshotPathTemplate: '{testDir}/{testFileDir}/screenshots/{arg}{ext}',
  projects: [
    {
      name: 'phone',
      testIgnore: '**/006-installable-offline/*.spec.ts',
      use: { browserName: 'chromium', viewport: { width: 393, height: 852 } }
    },
    {
      name: 'desktop',
      testMatch: '**/005-responsive-accessible/*.spec.ts',
      use: { browserName: 'chromium', viewport: { width: 1280, height: 1000 } }
    },
    {
      name: 'offline',
      testMatch: '**/006-installable-offline/*.spec.ts',
      use: {
        browserName: 'chromium',
        viewport: { width: 393, height: 852 },
        serviceWorkers: 'allow'
      }
    }
  ],
  webServer: {
    command: 'npm run preview:e2e',
    url: 'http://127.0.0.1:4176',
    reuseExistingServer: false
  },
  timeout: 30000,
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
