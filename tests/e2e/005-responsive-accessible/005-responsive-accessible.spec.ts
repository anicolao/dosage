import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { completeCalculationReview, enterStandardCalculation, TestStepHelper } from '../helpers/test-step-helper';

const packageVersion = JSON.parse(
  readFileSync(new URL('../../../package.json', import.meta.url), 'utf8')
).version;
const gitHash = execFileSync('git', ['rev-parse', '--short=7', 'HEAD'], { encoding: 'utf8' }).trim();

test('the calculation remains accessible and responsive', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Responsive and accessible calculation',
    'The critical calculation remains labelled, keyboard-operable, and readable across supported viewports.'
  );

  await page.goto('/');
  const buildIdentifier = page.getByTestId('build-identifier');
  for (const destination of ['Mix', 'Favourites', 'History']) {
    await page.getByRole('button', { name: destination, exact: true }).click();
    await expect(buildIdentifier).toBeVisible();
    await expect(buildIdentifier).toHaveText(`v${packageVersion} · ${gitHash}`);
  }
  await page.getByRole('button', { name: 'Mix', exact: true }).click();
  await enterStandardCalculation(page);
  await steps.step('accessible-layout', {
    description: `The ${testInfo.project.name} layout is operable and exposes mathematical semantics`,
    verifications: [
      { spec: 'Automated WCAG A/AA analysis reports no violations', check: async () => {
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(results.violations).toEqual([]);
      } },
      { spec: 'Every critical input has an accessible label', check: async () => {
        await expect(page.getByLabel('Amount in vial')).toBeVisible();
        await expect(page.getByLabel('Vial unit', { exact: true })).toBeVisible();
        await expect(page.getByLabel(/Vial volume/)).toBeVisible();
        await expect(page.getByLabel('Dose from the medication order', { exact: true })).toBeVisible();
        await expect(page.getByLabel('Ordered-dose unit', { exact: true })).toBeVisible();
      } },
      { spec: 'Every screen shows the package version and source revision in the persistent header', check: async () => {
        await expect(buildIdentifier).toHaveAttribute(
          'aria-label',
          `Dosage version ${packageVersion}, revision ${gitHash}`
        );
      } },
      { spec: 'The KaTeX rendering includes accessible MathML', check: async () => {
        await page.getByRole('button', { name: 'Review calculation' }).click();
        await expect(page.getByRole('dialog').locator('math')).toHaveCount(4);
        await expect(page.getByTestId('administration-equation').locator('annotation')).toContainText('2{,}000');
        const overflowing = await page.locator('dialog, .equation-list, .equation-step, .equation').evaluateAll((elements) => elements
          .filter((element) => element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1)
          .map((element) => `${element.className}:${element.scrollWidth}×${element.scrollHeight}/${element.clientWidth}×${element.clientHeight}`));
        expect(overflowing).toEqual([]);
        await completeCalculationReview(page);
        await expect(page.locator('.result-number')).toHaveText('10 mL');
      } },
      { spec: 'Interactive controls provide at least a 44px target, excluding the checkbox inside its larger label', check: async () => {
        const undersized = await page
          .locator('button:not(:disabled), input:not([type="checkbox"]), select')
          .evaluateAll((controls) => controls
            .filter((control) => {
              const rect = control.getBoundingClientRect();
              if (rect.width === 0 && rect.height === 0) return false;
              return rect.width < 44 || rect.height < 44;
            })
            .map((control) => `${control.tagName}:${control.textContent?.trim() ?? ''}`));
        expect(undersized).toEqual([]);
      } },
      { spec: 'The page has no horizontal or vertical scrolling', check: async () => {
        const size = await page.evaluate(() => ({
          viewportWidth: innerWidth,
          viewportHeight: innerHeight,
          contentWidth: document.documentElement.scrollWidth,
          contentHeight: document.documentElement.scrollHeight
        }));
        expect(size.contentWidth).toBeLessThanOrEqual(size.viewportWidth + 1);
        expect(size.contentHeight).toBeLessThanOrEqual(size.viewportHeight + 1);
      } }
    ]
  });

  await page.keyboard.press('Tab');
  await expect(page.locator(':focus-visible')).toBeVisible();

  if (testInfo.project.name === 'phone') {
    await page.setViewportSize({ width: 320, height: 852 });
    const size = await page.evaluate(() => ({
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
      contentWidth: document.documentElement.scrollWidth,
      contentHeight: document.documentElement.scrollHeight
    }));
    expect(size.contentWidth).toBeLessThanOrEqual(size.viewportWidth + 1);
    expect(size.contentHeight).toBeLessThanOrEqual(size.viewportHeight + 1);
    const clippedPanels = await page.locator('.app-shell, [data-e2e-layout], main > section').evaluateAll((panels) => panels
      .filter((panel) => panel.scrollWidth > panel.clientWidth + 1 || panel.scrollHeight > panel.clientHeight + 1)
      .map((panel) => `${panel.tagName}:${panel.scrollWidth}×${panel.scrollHeight}/${panel.clientWidth}×${panel.clientHeight}`));
    expect(clippedPanels).toEqual([]);
    await expect(page.getByRole('button', { name: 'Save mix on this phone' })).toBeInViewport();
    await page.getByRole('button', { name: 'Review again' }).click();
    const clippedReview = await page.locator('dialog, .equation-list, .equation-step, .equation').evaluateAll((elements) => elements
      .filter((element) => element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1)
      .map((element) => `${element.className}:${element.scrollWidth}×${element.scrollHeight}/${element.clientWidth}×${element.clientHeight}`));
    expect(clippedReview).toEqual([]);
    await expect(page.getByRole('dialog').locator('math')).toHaveCount(4);
    await page.getByRole('button', { name: 'Go back' }).click();
  }

  steps.generateDocs();
});
