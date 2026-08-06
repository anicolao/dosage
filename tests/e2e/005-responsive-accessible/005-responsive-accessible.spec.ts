import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { TestStepHelper } from '../helpers/test-step-helper';

test('the calculation remains accessible and responsive', async ({ page }, testInfo) => {
  const steps = new TestStepHelper(page, testInfo);
  steps.setMetadata(
    'Responsive and accessible calculation',
    'The critical calculation remains labelled, keyboard-operable, and readable across supported viewports.'
  );

  await page.goto('/');
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
      { spec: 'The KaTeX rendering includes accessible MathML', check: async () => {
        await expect(page.locator('[data-testid="calculation-result"] math')).toHaveCount(4);
        await expect(page.locator('[data-testid="administration-equation"] annotation')).toContainText('V_{\\mathrm{admin}}');
      } },
      { spec: 'Interactive controls provide at least a 44px target, excluding the checkbox inside its larger label', check: async () => {
        const undersized = await page
          .locator('button:not(:disabled), input:not([type="checkbox"]), select')
          .evaluateAll((controls) => controls
            .filter((control) => {
              const rect = control.getBoundingClientRect();
              return rect.width < 44 || rect.height < 44;
            })
            .map((control) => `${control.tagName}:${control.textContent?.trim() ?? ''}`));
        expect(undersized).toEqual([]);
      } },
      { spec: 'The page has no horizontal overflow', check: async () => {
        const widths = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
        expect(widths.content).toBeLessThanOrEqual(widths.viewport + 1);
      } }
    ]
  });

  await page.keyboard.press('Tab');
  await expect(page.locator(':focus-visible')).toBeVisible();

  if (testInfo.project.name === 'phone') {
    await page.setViewportSize({ width: 320, height: 852 });
    const widths = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport + 1);
  }

  steps.generateDocs();
});
