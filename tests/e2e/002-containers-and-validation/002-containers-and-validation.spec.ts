import { expect, test } from '@playwright/test';
import { TestStepHelper } from '../helpers/test-step-helper';

test('containers, boundaries, and activity units remain safe', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Containers and validation',
    'Every supported final volume calculates deterministically and invalid inputs remove the result.'
  );

  await page.goto('/');
  const expected = new Map([
    [10, '2 mL'], [50, '10 mL'], [100, '20 mL'],
    [250, '50 mL'], [500, '100 mL'], [1000, '200 mL']
  ]);

  for (const [volume, result] of expected) {
    const option = page.getByRole('button', { name: `${volume} mL`, exact: true });
    await option.click();
    await expect(option).toHaveAttribute('aria-pressed', 'true');
    await expect(option.locator('img')).toHaveJSProperty('complete', true);
    await expect(page.locator('.result-number')).toHaveText(result);
  }

  await steps.step('all-supported-containers', {
    description: 'All six supported visual containers produce the expected result',
    verifications: [
      { spec: 'Only 10, 50, 100, 250, 500, and 1000 mL are offered', check: async () => {
        await expect(page.locator('.volume-grid button')).toHaveCount(6);
        expect(await page.locator('.volume-grid button strong').allTextContents())
          .toEqual(['10 mL', '50 mL', '100 mL', '250 mL', '500 mL', '1000 mL']);
      } },
      { spec: 'At 1000 mL final volume the calculated volume is 200 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('200 mL');
      } }
    ]
  });

  await page.getByLabel('Dose from the medication order', { exact: true }).fill('11000');
  await steps.step('excessive-dose-blocked', {
    description: 'An order exceeding the one-vial contents is blocked',
    verifications: [
      { spec: 'The one-vial error is visible', check: async () => {
        await expect(page.getByRole('alert')).toContainText('greater than the medication available in one vial');
      } },
      { spec: 'No actionable result or save control remains', check: async () => {
        await expect(page.locator('[data-testid="calculation-result"]')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Save mix on this phone' })).toHaveCount(0);
      } }
    ]
  });

  await page.getByLabel('Dose from the medication order', { exact: true }).fill('2000');
  await page.getByLabel(/Vial volume/).fill('51');
  await page.getByRole('button', { name: '50 mL', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('cannot be smaller than the vial volume');

  await page.getByLabel(/Vial volume/).fill('1');
  await page.getByLabel('Vial unit', { exact: true }).selectOption('units');
  await page.getByLabel('Amount in vial').fill('1000');
  await page.getByRole('button', { name: '100 mL', exact: true }).click();
  await page.getByLabel('Dose from the medication order', { exact: true }).fill('250');

  await steps.step('activity-units', {
    description: 'Activity units stay in their own non-convertible dimension',
    verifications: [
      { spec: 'A units-labelled vial forces the ordered unit to units', check: async () => {
        const selector = page.getByLabel('Ordered-dose unit', { exact: true });
        await expect(selector).toHaveValue('units');
        await expect(selector.locator('option')).toHaveCount(1);
      } },
      { spec: '1000 units in 100 mL for 250 units calculates to 25 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('25 mL');
        await page.getByRole('button', { name: 'Review calculation' }).click();
        await expect(page.getByRole('tab')).toHaveCount(3);
        await expect(page.getByRole('tab', { name: /Units/ })).toHaveCount(0);
        await page.getByRole('button', { name: 'Close calculation details' }).click();
      } }
    ]
  });

  steps.generateDocs();
});
