import { expect, test } from '@playwright/test';
import { completeCalculationReview, enterStandardCalculation, TestStepHelper } from '../helpers/test-step-helper';

test('containers, boundaries, and supported units remain safe', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Containers and validation',
    'Every supported final volume calculates deterministically and invalid inputs remove the result.'
  );

  await page.goto('/');
  await enterStandardCalculation(page);
  const expected = new Map([
    [10, '2 mL'], [50, '10 mL'], [100, '20 mL'],
    [250, '50 mL'], [500, '100 mL'], [1000, '200 mL']
  ]);

  for (const [volume, result] of expected) {
    const option = page.getByRole('button', { name: `${volume} mL`, exact: true });
    await option.click();
    await expect(option).toHaveAttribute('aria-pressed', 'true');
    await expect(option.locator('img')).toHaveJSProperty('complete', true);
    await expect(page.locator('.result-number')).toHaveCount(0);
    await completeCalculationReview(page);
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
      { spec: 'The syringe image has transparent corners instead of a rectangular background', check: async () => {
        const alpha = await page.getByRole('button', { name: '10 mL', exact: true }).locator('img').evaluate((image) => {
          if (!(image instanceof HTMLImageElement)) throw new Error('Missing syringe image');
          const canvas = document.createElement('canvas');
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Canvas unavailable');
          context.drawImage(image, 0, 0);
          const corners = [
            context.getImageData(0, 0, 1, 1).data[3],
            context.getImageData(canvas.width - 1, 0, 1, 1).data[3],
            context.getImageData(0, canvas.height - 1, 1, 1).data[3],
            context.getImageData(canvas.width - 1, canvas.height - 1, 1, 1).data[3]
          ];
          return corners;
        });
        expect(alpha).toEqual([0, 0, 0, 0]);
      } },
      { spec: 'The flexible 500 mL bag is visibly wider than every other IV bag', check: async () => {
        const silhouettes = await page.locator('.volume-grid button').evaluateAll((buttons) => buttons.slice(1).map((button) => {
          const image = button.querySelector('img');
          const label = button.querySelector('strong')?.textContent?.trim() ?? '';
          if (!(image instanceof HTMLImageElement)) throw new Error(`Missing image for ${label}`);
          const canvas = document.createElement('canvas');
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Canvas unavailable');
          context.drawImage(image, 0, 0);
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
          let minimumX = canvas.width;
          let maximumX = -1;
          for (let y = 0; y < canvas.height; y += 1) {
            for (let x = 0; x < canvas.width; x += 1) {
              const offset = (y * canvas.width + x) * 4;
              if (pixels[offset] < 220 || pixels[offset + 1] < 220 || pixels[offset + 2] < 220) {
                minimumX = Math.min(minimumX, x);
                maximumX = Math.max(maximumX, x);
              }
            }
          }
          return { label, width: maximumX - minimumX + 1 };
        }));
        const fiveHundred = silhouettes.find(({ label }) => label === '500 mL');
        const otherWidths = silhouettes.filter(({ label }) => label !== '500 mL').map(({ width }) => width);
        expect(fiveHundred?.width).toBeGreaterThan(Math.max(...otherWidths) + 15);
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
  await page.evaluate(() => {
    localStorage.setItem('dosage.favourites.v2', JSON.stringify([{
      id: 'legacy-activity-favourite',
      name: 'Legacy activity medication',
      medicationAmount: '1000',
      vialUnit: 'units',
      vialVolume: '1'
    }]));
    localStorage.setItem('dosage.history.v2', JSON.stringify([{
      id: 'legacy-activity-history',
      medicationName: 'Legacy activity medication',
      medicationAmount: '1000',
      vialUnit: 'units',
      vialVolume: '1',
      finalVolume: 100,
      orderedDose: '250',
      orderedUnit: 'units',
      administrationVolume: 25
    }]));
  });
  await page.reload();

  await steps.step('mass-units-only', {
    description: 'Only mg and mcg medication units are available',
    verifications: [
      { spec: 'Both unit selectors offer only mg and mcg', check: async () => {
        const vialOptions = await page.getByLabel('Vial unit', { exact: true }).locator('option').evaluateAll(
          (options) => options.map((option) => ({ value: option.value, label: option.textContent }))
        );
        const orderedOptions = await page.getByLabel('Ordered-dose unit', { exact: true }).locator('option').evaluateAll(
          (options) => options.map((option) => ({ value: option.value, label: option.textContent }))
        );
        expect(vialOptions).toEqual([
          { value: '', label: 'Select' },
          { value: 'mg', label: 'mg' },
          { value: 'mcg', label: 'mcg' }
        ]);
        expect(orderedOptions).toEqual([
          { value: '', label: 'Select' },
          { value: 'mcg', label: 'mcg' },
          { value: 'mg', label: 'mg' }
        ]);
      } },
      { spec: 'Legacy activity-unit favourites and history cannot repopulate the calculator', check: async () => {
        await page.getByRole('button', { name: /Favourites/ }).click();
        await expect(page.getByText('No favourites yet')).toBeVisible();
        await page.getByRole('button', { name: /History/ }).click();
        await expect(page.getByText('No saved mixes')).toBeVisible();
        await page.getByRole('button', { name: /Mix/ }).click();
      } }
    ]
  });

  steps.generateDocs();
});
