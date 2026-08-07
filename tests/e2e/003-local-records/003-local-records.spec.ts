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
  const favouriteToggle = page.getByRole('button', { name: 'Remove medication from favourites' });
  await steps.step('favourite-saved', {
    description: 'The main screen marks saved vial facts with a filled favourite star',
    verifications: [
      { spec: 'The star is filled and exposes a pressed state', check: async () => {
        await expect(favouriteToggle).toHaveAttribute('aria-pressed', 'true');
        await expect(favouriteToggle).toContainText('★');
      } },
      { spec: 'The accessible label offers to remove the saved favourite', check: async () => {
        await expect(favouriteToggle).toHaveAccessibleName('Remove medication from favourites');
      } }
    ]
  });

  await page.getByRole('button', { name: /Favourites/ }).click();
  await expect(page.locator('.saved-list li')).toHaveCount(1);
  await expect(page.locator('.saved-list li')).toContainText('Example medication');
  await expect(page.locator('.saved-list li')).toContainText('10 mg in 1 mL');
  await expect(page.locator('.saved-list')).not.toContainText('2000 mcg');

  await page.getByRole('button', { name: 'Use', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Remove medication from favourites' })).toHaveAttribute('aria-pressed', 'true');
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
    description: 'A saved calculation reopens directly in mandatory review',
    verifications: [
      { spec: 'The original vial and order units are preserved', check: async () => {
        await expect(page.locator('.history-list li')).toContainText('10 mg in 1 mL vial → 50 mL final');
        await expect(page.locator('.history-result')).toHaveText('2000 mcg → 10 mL');
      } },
      { spec: 'The converted prepared concentration is retained', check: async () => {
        await expect(page.locator('.history-list li')).toContainText('0.2 mg/mL = 200 mcg/mL');
      } },
      { spec: 'Review restores the inputs but not verification or acknowledgement', check: async () => {
        await page.getByRole('button', { name: 'Review mix for Example medication' }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(page.getByRole('button', { name: /Mix/ })).toHaveAttribute('aria-current', 'page');
        await expect(page.getByLabel(/Medication name/)).toHaveValue('Example medication');
        await expect(page.getByLabel('Amount in vial')).toHaveValue('10');
        await expect(page.getByLabel('Vial unit', { exact: true })).toHaveValue('mg');
        await expect(page.getByLabel(/Vial volume/)).toHaveValue('1');
        await expect(page.getByRole('button', { name: '50 mL', exact: true })).toHaveAttribute('aria-pressed', 'true');
        await expect(page.getByLabel('Dose from the medication order', { exact: true })).toHaveValue('2000');
        await expect(page.getByLabel('Ordered-dose unit', { exact: true })).toHaveValue('mcg');
        await expect(dialog.locator('.step-check')).toHaveCount(4);
        await expect(dialog.locator('.step-check[aria-pressed="true"]')).toHaveCount(0);
        await expect(dialog.getByRole('button', { name: 'Complete review' })).toBeDisabled();
        await expect(page.locator('[data-testid="calculation-result"]')).toHaveCount(0);
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

  const favouriteFixtures = Array.from({ length: 7 }, (_, index) => ({
    id: `favourite-${index + 1}`,
    name: `Saved medication ${index + 1}`,
    medicationAmount: String(index + 1),
    vialUnit: 'mg',
    vialVolume: '1',
    createdAt: new Date().toISOString()
  }));
  await page.evaluate((fixtures) => {
    localStorage.setItem('dosage.favourites.v2', JSON.stringify(fixtures));
  }, favouriteFixtures);
  await page.reload();
  await page.getByRole('button', { name: /Favourites/ }).click();

  await steps.step('full-favourites-page', {
    description: 'A favourites page uses the available space before offering pagination',
    verifications: [
      { spec: 'The first page shows six saved medications at once', check: async () => {
        await expect(page.locator('.saved-list li')).toHaveCount(6);
        await expect(page.locator('.saved-list')).toContainText('Saved medication 1');
        await expect(page.locator('.saved-list')).toContainText('Saved medication 6');
      } },
      { spec: 'Paging reports two pages for seven favourites', check: async () => {
        await expect(page.getByLabel('Favourite pages')).toContainText('Page 1 of 2');
      } }
    ]
  });

  await page.setViewportSize({ width: 320, height: 852 });
  const narrowLayout = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    viewportWidth: innerWidth,
    viewportHeight: innerHeight
  }));
  expect(narrowLayout.width).toBeLessThanOrEqual(narrowLayout.viewportWidth + 1);
  expect(narrowLayout.height).toBeLessThanOrEqual(narrowLayout.viewportHeight + 1);
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('.saved-list li')).toHaveCount(1);
  await expect(page.locator('.saved-list')).toContainText('Saved medication 7');
  await expect(page.getByLabel('Favourite pages')).toContainText('Page 2 of 2');

  steps.generateDocs();
});
