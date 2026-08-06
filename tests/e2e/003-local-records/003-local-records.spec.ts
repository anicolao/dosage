import { expect, test } from '@playwright/test';
import { completeCalculationReview, enterStandardCalculation, TestStepHelper } from '../helpers/test-step-helper';

test('favourites and history stay local without carrying an order forward', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Local favourites and history',
    'Medication label facts can be reused, while ordered doses and confirmations must be entered again.'
  );

  await page.clock.install({ time: new Date('2026-08-06T14:32:00-04:00') });
  await page.goto('/');
  await enterStandardCalculation(page);
  await page.getByRole('button', { name: 'Save medication as favourite' }).click();
  await page.getByRole('button', { name: /Favourites/ }).click();

  await steps.step('favourite-saved', {
    description: 'A favourite stores only vial-label facts',
    verifications: [
      { spec: 'The medication name and 10 mg in 1 mL appear', check: async () => {
        await expect(page.locator('.saved-list li')).toHaveCount(1);
        await expect(page.locator('.saved-list li')).toContainText('Example medication');
        await expect(page.locator('.saved-list li')).toContainText('10 mg in 1 mL');
      } },
      { spec: 'No ordered dose appears in the favourite', check: async () => {
        await expect(page.locator('.saved-list')).not.toContainText('2000 mcg');
      } }
    ]
  });

  await page.getByRole('button', { name: 'Use', exact: true }).click();
  await expect(page.getByLabel('Dose from the medication order', { exact: true })).toHaveValue('');
  await expect(page.locator('[data-testid="calculation-result"]')).toHaveCount(0);
  await expect(page.getByLabel('Ordered-dose unit', { exact: true })).toHaveValue('mcg');
  await expect(page.locator('.volume-grid button[aria-pressed="true"]')).toHaveCount(0);
  await page.getByRole('button', { name: '50 mL', exact: true }).click();
  await page.getByLabel('Dose from the medication order', { exact: true }).fill('2000');
  await expect(page.getByRole('button', { name: 'Save mix on this phone' })).toHaveCount(0);
  await completeCalculationReview(page);
  const save = page.getByRole('button', { name: 'Save mix on this phone' });
  await expect(save).toBeDisabled();
  await page.getByRole('checkbox').check();
  await save.click();
  await page.getByRole('button', { name: /History/ }).click();

  await steps.step('mix-saved', {
    description: 'An acknowledged calculation is reviewable in local history',
    verifications: [
      { spec: 'The original vial and order units are preserved', check: async () => {
        await expect(page.locator('.history-list li')).toContainText('10 mg in 1 mL vial → 50 mL final');
        await expect(page.locator('.history-result')).toHaveText('2000 mcg → 10 mL');
      } },
      { spec: 'The converted prepared concentration is retained', check: async () => {
        await expect(page.locator('.history-list li')).toContainText('0.2 mg/mL = 200 mcg/mL');
      } }
    ]
  });

  await page.reload();
  await page.getByRole('button', { name: /History/ }).click();
  await expect(page.locator('.history-list li')).toHaveCount(1);
  await page.getByRole('button', { name: 'Delete mix for Example medication' }).click();
  await expect(page.getByText('No saved mixes')).toBeVisible();

  await page.getByRole('button', { name: /Favourites/ }).click();
  await page.getByRole('button', { name: 'Delete Example medication' }).click();
  await steps.step('records-deleted', {
    description: 'Local records can be removed without affecting the calculator',
    verifications: [
      { spec: 'The favourite is deleted', check: async () => {
        await expect(page.getByText('No favourites yet')).toBeVisible();
      } },
      { spec: 'Mix remains available as the primary navigation destination', check: async () => {
        await expect(page.getByRole('button', { name: /Mix/ })).toBeVisible();
      } }
    ]
  });

  steps.generateDocs();
});
