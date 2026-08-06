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
        await page.getByRole('button', { name: 'Review calculation' }).click();
        await expect(page.getByRole('tab')).toHaveCount(4);
        for (const tabName of ['Vial', 'Mixed', 'Units', 'Dose']) {
          await page.getByRole('tab', { name: new RegExp(tabName) }).click();
          await expect(page.getByRole('tabpanel').locator('math')).toHaveCount(1);
        }
        await expect(page.getByTestId('administration-equation').locator('annotation')).toContainText('V_{\\mathrm{admin}}');
        const dialogSize = await page.getByRole('dialog').evaluate((dialog) => ({
          clientHeight: dialog.clientHeight,
          scrollHeight: dialog.scrollHeight,
          clientWidth: dialog.clientWidth,
          scrollWidth: dialog.scrollWidth
        }));
        expect(dialogSize.scrollHeight).toBeLessThanOrEqual(dialogSize.clientHeight + 1);
        expect(dialogSize.scrollWidth).toBeLessThanOrEqual(dialogSize.clientWidth + 1);
        await page.getByRole('button', { name: 'Close calculation details' }).click();
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
  }

  steps.generateDocs();
});
