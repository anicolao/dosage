import { expect, test } from '@playwright/test';
import { completeCalculationReview, enterStandardCalculation, TestStepHelper } from '../helpers/test-step-helper';

test('normal operation emits no runtime requests and survives unavailable storage', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Privacy and recovery',
    'Calculations require no runtime service, patient field, or working persistence layer.'
  );

  const requests: Array<{ method: string; url: string }> = [];
  page.on('request', (request) => requests.push({ method: request.method(), url: request.url() }));
  await page.addInitScript(() => {
    const calls: string[] = [];
    Object.defineProperty(window, '__dosageNetworkCalls', { value: calls });
    const originalFetch = window.fetch.bind(window);
    window.fetch = (...args) => {
      calls.push(`fetch:${String(args[0])}`);
      return originalFetch(...args);
    };
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      calls.push(`xhr:${method}:${String(url)}`);
      return originalOpen.call(this, method, url, ...rest);
    };
    const originalBeacon = navigator.sendBeacon?.bind(navigator);
    if (originalBeacon) {
      navigator.sendBeacon = (...args) => {
        calls.push(`beacon:${String(args[0])}`);
        return originalBeacon(...args);
      };
    }
  });

  await page.goto('/');
  await enterStandardCalculation(page);
  await page.getByRole('button', { name: 'Save medication as favourite' }).click();
  await completeCalculationReview(page);
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Save mix on this phone' }).click();

  await steps.step('local-only-operation', {
    description: 'Saving and calculation use only same-origin static assets and local storage',
    verifications: [
      { spec: 'No runtime fetch, XHR, or beacon is used', check: async () => {
        const calls = await page.evaluate(() => (window as Window & { __dosageNetworkCalls: string[] }).__dosageNetworkCalls);
        expect(calls).toEqual([]);
      } },
      { spec: 'Every browser request is a same-origin GET', check: async () => {
        expect(requests.length).toBeGreaterThan(0);
        for (const request of requests) {
          expect(request.method).toBe('GET');
          expect(new URL(request.url).origin).toBe('http://127.0.0.1:4176');
        }
      } },
      { spec: 'No patient, room, order identifier, or free-text note field exists', check: async () => {
        await expect(page.locator('input:not([type="checkbox"])')).toHaveCount(4);
        await expect(page.getByText(/patient information/i)).toBeVisible();
      } },
      { spec: 'Only versioned Dosage records are written', check: async () => {
        const keys = await page.evaluate(() => Object.keys(localStorage).sort());
        expect(keys).toEqual(['dosage.favourites.v2', 'dosage.history.v2']);
      } }
    ]
  });

  await page.evaluate(() => {
    localStorage.setItem('dosage.favourites.v2', '{not valid json');
  });
  await page.reload();
  await enterStandardCalculation(page);
  await completeCalculationReview(page);

  await steps.step('storage-recovery', {
    description: 'A corrupt local record disables saving but never disables calculation',
    verifications: [
      { spec: 'The 10 mL calculation remains available', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } },
      { spec: 'The user is told that records cannot be saved', check: async () => {
        await expect(page.getByText('This browser cannot save records. Your calculation still works.')).toBeVisible();
      } },
      { spec: 'Persistence actions are disabled', check: async () => {
        await expect(page.getByRole('button', { name: 'Save medication as favourite' })).toBeDisabled();
        await expect(page.getByRole('button', { name: 'Save mix on this phone' })).toBeDisabled();
      } }
    ]
  });

  steps.generateDocs();
});
