import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { completeCalculationReview, enterStandardCalculation } from '../e2e/helpers/test-step-helper';

const plan = JSON.parse(readFileSync(
  new URL('../../docs/regulatory/evidence/SUB-002/capture-plan.json', import.meta.url),
  'utf8'
));
const expectedCaptureIds = plan.captures.map((capture: { id: string }) => capture.id);
const actualCaptureIds: string[] = [];

async function capture(page: Page, id: string) {
  expect(expectedCaptureIds).toContain(id);
  await expect(page.getByTestId('build-identifier')).toHaveText('v0.1.0 · 6b53fde');
  await expect(page.getByText('Prototype only — not for patient care.')).toBeVisible();
  await page.mouse.move(0, 0);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        })));
  });
  await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true });
  actualCaptureIds.push(id);
}

test('capture the exact-prototype workflow submission archive', async ({ context, page }) => {
  await page.clock.install({ time: new Date(plan.fixed_clock) });
  await page.goto('/');
  await capture(page, '01-blank-mix');

  await enterStandardCalculation(page);
  await expect(page.getByText('Answer hidden until review')).toBeVisible();
  await expect(page.locator('[data-testid="calculation-result"]')).toHaveCount(0);
  await capture(page, '02-complete-inputs-answer-hidden');

  await page.getByRole('button', { name: 'Review calculation' }).click();
  await expect(page.getByRole('dialog').locator('.step-check')).toHaveCount(4);
  await capture(page, '03-equation-review');

  await completeCalculationReview(page);
  await expect(page.locator('.result-number')).toHaveText('10 mL');
  await expect(page.getByRole('button', { name: 'Save mix on this phone' })).toBeDisabled();
  await capture(page, '04-result-revealed');

  await page.getByRole('button', { name: 'Save medication as favourite' }).click();
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: 'Save mix on this phone' })).toBeEnabled();
  await capture(page, '05-result-acknowledged');
  await page.getByRole('button', { name: 'Save mix on this phone' }).click();

  await page.getByLabel('Dose from the medication order', { exact: true }).fill('11000');
  await expect(page.getByRole('alert')).toContainText('greater than the medication available in one vial');
  await capture(page, '06-one-vial-block');

  await page.getByLabel('Dose from the medication order', { exact: true }).fill('2000');
  await page.getByLabel(/Vial volume/).fill('51');
  await expect(page.getByRole('alert')).toContainText('cannot be smaller than the vial volume');
  await capture(page, '07-final-volume-block');

  await page.getByRole('button', { name: /Favourites/ }).click();
  await expect(page.locator('.saved-list li')).toContainText('10 mg in 1 mL');
  await expect(page.locator('.saved-list')).not.toContainText('2000 mcg');
  await capture(page, '08-favourites-local-record');

  await page.getByRole('button', { name: /History/ }).click();
  await expect(page.locator('.history-result')).toHaveText('2000 mcg → 10 mL');
  await capture(page, '09-history-local-record');

  await page.getByRole('button', { name: 'Review mix for Example medication' }).click();
  await expect(page.getByRole('dialog').locator('.step-check[aria-pressed="true"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="calculation-result"]')).toHaveCount(0);
  await capture(page, '10-history-rereview');
  await page.getByRole('button', { name: 'Close calculation details' }).click();

  await page.evaluate(() => localStorage.setItem('dosage.favourites.v2', '{not valid json'));
  await page.reload();
  await enterStandardCalculation(page);
  await completeCalculationReview(page);
  await expect(page.getByText('This browser cannot save records. Your calculation still works.')).toBeVisible();
  await expect(page.locator('.result-number')).toHaveText('10 mL');
  await capture(page, '11-storage-unavailable');

  await context.setOffline(false);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-offline-ready', 'true');
  await page.reload();
  expect(await page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  await page.close();
  const offlinePage = await context.newPage();
  await offlinePage.goto('/');
  await expect(offlinePage.getByRole('heading', { name: 'Prepare a dose' })).toBeVisible();
  await capture(offlinePage, '12-offline-reopen');

  expect(actualCaptureIds).toEqual(expectedCaptureIds);
});
