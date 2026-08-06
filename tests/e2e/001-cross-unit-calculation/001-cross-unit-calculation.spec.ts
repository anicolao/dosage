import { expect, test } from '@playwright/test';
import { TestStepHelper } from '../helpers/test-step-helper';

test('cross-unit calculations expose every mathematical step', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Cross-unit calculation',
    'A vial labelled in mg is safely reconciled with an order written in mcg.'
  );

  await page.clock.install({ time: new Date('2026-08-06T18:30:00-04:00') });
  await page.goto('/');

  const vialUnit = page.getByLabel('Vial unit', { exact: true });
  const orderedUnit = page.getByLabel('Ordered-dose unit', { exact: true });
  const orderedDose = page.getByLabel('Dose from the medication order', { exact: true });

  await steps.step('mg-vial-mcg-order', {
    description: 'The common mg vial and mcg order are converted visibly',
    verifications: [
      { spec: 'The vial is 10 mg in 1 mL', check: async () => {
        await expect(page.getByLabel('Amount in vial')).toHaveValue('10');
        await expect(vialUnit).toHaveValue('mg');
        await expect(page.getByLabel(/Vial volume/)).toHaveValue('1');
      } },
      { spec: 'The order remains in its original 2000 mcg unit', check: async () => {
        await expect(orderedDose).toHaveValue('2000');
        await expect(orderedUnit).toHaveValue('mcg');
      } },
      { spec: 'The answer is 10 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } },
      { spec: 'KaTeX exposes vial, preparation, conversion, and administration equations', check: async () => {
        await page.getByRole('button', { name: 'Review calculation' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('tab')).toHaveCount(4);
        await page.getByRole('tab', { name: /Units/ }).click();
        await expect(page.getByTestId('conversion-equation').locator('annotation'))
          .toContainText('\\frac{1000\\,\\mathrm{mcg}}{1\\,\\mathrm{mg}}');
        await page.getByRole('tab', { name: /Dose/ }).click();
        await expect(page.getByTestId('administration-equation').locator('annotation'))
          .toContainText('V_{\\mathrm{admin}}');
        await expect(page.getByTestId('administration-equation').locator('annotation'))
          .toContainText('2{,}000');
        await page.getByRole('button', { name: 'Close calculation details' }).click();
      } }
    ]
  });

  await page.getByRole('button', { name: 'Review calculation' }).click();
  await page.getByRole('tab', { name: /Units/ }).click();
  await steps.step('unit-conversion-review', {
    description: 'The dimensional conversion opens as a readable, no-scroll review step',
    verifications: [
      { spec: 'Only one focused KaTeX equation is presented at a time', check: async () => {
        await expect(page.getByRole('tabpanel').locator('math')).toHaveCount(1);
        await expect(page.getByRole('tab', { name: /Units/ })).toHaveAttribute('aria-selected', 'true');
      } },
      { spec: 'The review sheet fits without horizontal or vertical scrolling', check: async () => {
        const size = await page.getByRole('dialog').evaluate((dialog) => ({
          clientHeight: dialog.clientHeight,
          scrollHeight: dialog.scrollHeight,
          clientWidth: dialog.clientWidth,
          scrollWidth: dialog.scrollWidth
        }));
        expect(size.scrollHeight).toBeLessThanOrEqual(size.clientHeight + 1);
        expect(size.scrollWidth).toBeLessThanOrEqual(size.clientWidth + 1);
      } }
    ]
  });
  await page.getByRole('button', { name: 'Close calculation details' }).click();

  await orderedUnit.selectOption('mg');
  await expect(orderedDose).toHaveValue('');
  await orderedDose.fill('2');
  await steps.step('equivalent-mg-order', {
    description: 'An equivalent order in mg produces the same answer without a conversion step',
    verifications: [
      { spec: '2 mg also calculates to 10 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
        await page.getByRole('button', { name: 'Review calculation' }).click();
        await expect(page.getByRole('tab')).toHaveCount(3);
        await expect(page.getByRole('tab', { name: /Units/ })).toHaveCount(0);
        await page.getByRole('button', { name: 'Close calculation details' }).click();
      } },
      { spec: 'Changing the unit cleared the previous 2000 mcg value before entry', check: async () => {
        await expect(orderedDose).toHaveValue('2');
      } }
    ]
  });

  await page.getByLabel('Amount in vial').fill('10000');
  await vialUnit.selectOption('mcg');
  await orderedDose.fill('2');
  await steps.step('mcg-vial-mg-order', {
    description: 'The reverse mcg-to-mg conversion is equally explicit',
    verifications: [
      { spec: '10000 mcg at 2 mg calculates to 10 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } },
      { spec: 'The reverse dimensional factor is visible', check: async () => {
        await page.getByRole('button', { name: 'Review calculation' }).click();
        await page.getByRole('tab', { name: /Units/ }).click();
        await expect(page.getByTestId('conversion-equation').locator('annotation'))
          .toContainText('\\frac{1\\,\\mathrm{mg}}{1000\\,\\mathrm{mcg}}');
        await page.getByRole('button', { name: 'Close calculation details' }).click();
      } }
    ]
  });

  steps.generateDocs();
});
