import { expect, test } from '@playwright/test';
import { completeCalculationReview, enterStandardCalculation, TestStepHelper } from '../helpers/test-step-helper';

test('cross-unit calculations expose every mathematical step', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Cross-unit calculation',
    'An incomplete calculator gates its answer behind a simultaneous, individually checked review of every substituted equation.'
  );

  await page.clock.install({ time: new Date('2026-08-06T18:30:00-04:00') });
  await page.goto('/');

  const vialUnit = page.getByLabel('Vial unit', { exact: true });
  const orderedUnit = page.getByLabel('Ordered-dose unit', { exact: true });
  const orderedDose = page.getByLabel('Dose from the medication order', { exact: true });

  await steps.step('blank-calculator', {
    description: 'Only vial unit, vial volume, and ordered-dose unit have safe starting defaults',
    verifications: [
      { spec: 'Medication name, vial amount, and ordered dose remain blank', check: async () => {
        await expect(page.getByLabel(/Medication name/)).toHaveValue('');
        await expect(page.getByLabel('Amount in vial')).toHaveValue('');
        await expect(orderedDose).toHaveValue('');
      } },
      { spec: 'Vial unit defaults to mg, vial volume to 1 mL, and ordered-dose unit to mcg', check: async () => {
        await expect(vialUnit).toHaveValue('mg');
        await expect(page.getByLabel(/Vial volume/)).toHaveValue('1');
        await expect(orderedUnit).toHaveValue('mcg');
      } },
      { spec: 'No final prepared volume is preselected', check: async () => {
        await expect(page.locator('.volume-grid button[aria-pressed="true"]')).toHaveCount(0);
      } },
      { spec: 'No answer or review action is present for incomplete input', check: async () => {
        await expect(page.locator('.result-number')).toHaveCount(0);
        await expect(page.getByRole('button', { name: 'Review calculation' })).toHaveCount(0);
      } }
    ]
  });

  await enterStandardCalculation(page);
  await expect(page.locator('.result-number')).toHaveCount(0);
  await expect(page.getByText('Answer hidden until review')).toBeVisible();
  await page.getByRole('button', { name: 'Review calculation' }).click();

  await steps.step('simultaneous-calculation-review', {
    description: 'All four large single-line equations fit together in one no-scroll review panel',
    verifications: [
      { spec: 'Vial, preparation, conversion, and administration MathML are simultaneously visible', check: async () => {
        await expect(page.getByRole('dialog').locator('math')).toHaveCount(4);
        for (const testId of ['vial-equation', 'prepared-equation', 'conversion-equation', 'administration-equation']) {
          await expect(page.getByTestId(testId)).toBeVisible();
        }
      } },
      { spec: 'The mg-to-mcg factor and substituted 2000 mcg order remain explicit', check: async () => {
        await expect(page.getByTestId('conversion-equation').locator('annotation'))
          .toContainText('\\frac{1000\\,\\mathrm{mcg}}{1\\,\\mathrm{mg}}');
        await expect(page.getByTestId('administration-equation').locator('annotation'))
          .toContainText('2{,}000');
      } },
      { spec: 'Every equation is emitted as one uninterrupted KaTeX line', check: async () => {
        const sources = await page.getByRole('dialog').locator('.equation annotation').allTextContents();
        expect(sources).toHaveLength(4);
        for (const source of sources) {
          expect(source).not.toContain('\\begin{gathered}');
          expect(source).not.toContain('\\\\');
        }
      } },
      { spec: 'Headings are left aligned, formulas vertically centred, and grey checks sit on the right', check: async () => {
        const layout = await page.locator('.equation-step').evaluateAll((steps) => steps.map((step) => {
          const card = step.getBoundingClientRect();
          const heading = step.querySelector('h3')!.getBoundingClientRect();
          const equation = step.querySelector('.equation')!.getBoundingClientRect();
          const formula = step.querySelector('.katex')!.getBoundingClientRect();
          const check = step.querySelector('.step-check')!;
          const checkRect = check.getBoundingClientRect();
          return {
            headingNearLeft: heading.left < card.left + card.width / 2,
            formulaCentred: Math.abs((formula.top + formula.height / 2) - (equation.top + equation.height / 2)) < 2,
            checkOnRight: checkRect.left > card.left + card.width / 2,
            checkColour: getComputedStyle(check).backgroundColor
          };
        }));
        expect(layout.every(({ headingNearLeft, formulaCentred, checkOnRight }) => headingNearLeft && formulaCentred && checkOnRight)).toBe(true);
        expect(layout.every(({ checkColour }) => checkColour === 'rgb(238, 240, 239)')).toBe(true);
      } },
      { spec: 'The review sheet and every equation fit without scrolling or clipping', check: async () => {
        const overflowing = await page.locator('dialog, .equation-list, .equation-step, .equation').evaluateAll((elements) => elements
          .filter((element) => element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1)
          .map((element) => `${element.className}:${element.scrollWidth}×${element.scrollHeight}/${element.clientWidth}×${element.clientHeight}`));
        expect(overflowing).toEqual([]);
      } },
      { spec: 'The administration answer is still absent from the underlying calculator', check: async () => {
        await expect(page.locator('.result-number')).toHaveCount(0);
      } }
    ]
  });

  await completeCalculationReview(page);
  await steps.step('mg-vial-mcg-order', {
    description: 'Completing review reveals the 10 mL administration volume',
    verifications: [
      { spec: 'The vial is 10 mg in 1 mL and the order remains 2000 mcg', check: async () => {
        await expect(page.getByLabel('Amount in vial')).toHaveValue('10');
        await expect(vialUnit).toHaveValue('mg');
        await expect(page.getByLabel(/Vial volume/)).toHaveValue('1');
        await expect(orderedDose).toHaveValue('2000');
        await expect(orderedUnit).toHaveValue('mcg');
      } },
      { spec: 'Only after completed review is the answer shown as 10 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } }
    ]
  });

  await orderedUnit.selectOption('mg');
  await expect(page.getByLabel(/Medication name/)).toHaveValue('Example medication');
  await expect(page.getByLabel('Amount in vial')).toHaveValue('10');
  await expect(page.getByLabel(/Vial volume/)).toHaveValue('1');
  await expect(orderedDose).toHaveValue('2000');
  await orderedDose.fill('2');
  await expect(page.locator('.result-number')).toHaveCount(0);
  await page.getByRole('button', { name: 'Review calculation' }).click();
  await expect(page.getByRole('dialog').locator('math')).toHaveCount(3);
  await expect(page.getByTestId('conversion-equation')).toHaveCount(0);
  await completeCalculationReview(page);
  await steps.step('equivalent-mg-order', {
    description: 'An equivalent order in mg produces the same answer after a fresh review',
    verifications: [
      { spec: '2 mg also calculates to 10 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } },
      { spec: 'Changing the unit preserved the entered number until it was deliberately edited', check: async () => {
        await expect(orderedDose).toHaveValue('2');
      } }
    ]
  });

  await page.getByLabel('Amount in vial').fill('10000');
  await vialUnit.selectOption('mcg');
  await expect(orderedDose).toHaveValue('2');
  await orderedUnit.selectOption('mg');
  await orderedDose.fill('2');
  await expect(page.locator('.result-number')).toHaveCount(0);
  await page.getByRole('button', { name: 'Review calculation' }).click();
  await expect(page.getByTestId('conversion-equation').locator('annotation'))
    .toContainText('\\frac{1\\,\\mathrm{mg}}{1000\\,\\mathrm{mcg}}');
  await completeCalculationReview(page);
  await steps.step('mcg-vial-mg-order', {
    description: 'The reverse mcg-to-mg conversion is equally explicit',
    verifications: [
      { spec: '10000 mcg at 2 mg calculates to 10 mL', check: async () => {
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } },
      { spec: 'Changing any critical value required another completed review', check: async () => {
        await expect(page.getByRole('button', { name: 'Review again' })).toBeVisible();
      } }
    ]
  });

  steps.generateDocs();
});
