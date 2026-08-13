import { expect, test } from '@playwright/test';
import { completeCalculationReview, enterStandardCalculation } from '../helpers/test-step-helper';

test('the installed app shell and local records work without a network', async ({ context, page }) => {
  await page.goto('/');

  const manifest = await page.evaluate(async () => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (!link) throw new Error('Missing web app manifest link');
    return fetch(link.href).then((response) => response.json());
  });
  expect(manifest).toMatchObject({
    name: 'Dosage',
    start_url: './',
    scope: './',
    display: 'standalone'
  });
  expect(manifest.icons).toEqual(expect.arrayContaining([
    expect.objectContaining({ sizes: '192x192', type: 'image/png' }),
    expect.objectContaining({ sizes: '512x512', type: 'image/png' })
  ]));
  const iconDimensions = await page.evaluate(async (icons: Array<{ src: string }>) => Promise.all(
    icons.map(({ src }) => new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => reject(new Error(`Unable to load ${src}`));
      image.src = new URL(src, document.querySelector<HTMLLinkElement>('link[rel="manifest"]')?.href).href;
    }))
  ), manifest.icons);
  expect(iconDimensions).toEqual([{ width: 192, height: 192 }, { width: 512, height: 512 }]);
  const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
  await expect(appleTouchIcon).toHaveAttribute('sizes', '180x180');

  await expect(page.locator('html')).toHaveAttribute('data-offline-ready', 'true');
  await page.reload();
  expect(await page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  await context.setOffline(true);
  await page.close();
  const offlinePage = await context.newPage();
  await offlinePage.goto('/');
  await expect(offlinePage.getByRole('heading', { name: 'Prepare a dose' })).toBeVisible();
  await expect(offlinePage.getByText('Prototype only — not for patient care.')).toBeVisible();

  await enterStandardCalculation(offlinePage);
  await completeCalculationReview(offlinePage);
  await offlinePage.getByRole('checkbox').check();
  await offlinePage.getByRole('button', { name: 'Save mix on this phone' }).click();

  await offlinePage.reload();
  await offlinePage.getByRole('button', { name: /History/ }).click();
  await expect(offlinePage.locator('.history-list li')).toContainText('10 mg in 1 mL vial → 50 mL final');
  await expect(offlinePage.locator('.history-result')).toHaveText('2000 mcg → 10 mL');
  await offlinePage.getByRole('button', { name: 'Review mix for Example medication' }).click();
  await expect(offlinePage.getByRole('dialog')).toBeVisible();
  await expect(offlinePage.getByRole('dialog').locator('.step-check')).toHaveCount(4);
});
