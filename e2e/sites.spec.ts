import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 390, 320])
  for (const route of [
    '/',
    '/docs/',
    '/docs/getting-started/',
    '/docs/gexec/',
    '/models/',
    '/models/qwen3-8-flash-next/',
    '/performance/',
  ]) {
    test(`${route} accessible at ${width}px`, async ({ page }, info) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBeTruthy();
      expect(
        (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
          .violations,
      ).toEqual([]);
      expect(errors).toEqual([]);
      await page.screenshot({ path: info.outputPath('page.png'), fullPage: true });
    });
  }

test('catalog filters, empty results, and durable detail links', async ({ page }) => {
  await page.goto('/models/');
  await page.getByLabel('Compatibility status').selectOption('Research');
  await expect(page.locator('[data-model-card]:visible')).toHaveCount(1);
  await page.getByRole('link', { name: 'View compatibility & sources' }).last().click();
  await page.reload();
  await expect(page.locator('h1')).toHaveText('Eon');
  await page.goBack();
  await page.getByLabel('Search models').fill('not-a-model');
  await expect(page.locator('#model-empty')).toBeVisible();
});

test('docs full text search, deep links, and complete long documents', async ({ page }) => {
  await page.goto('/docs/');
  await page.getByLabel('Search the documentation').fill('atomic');
  await expect(page.locator('#search-results a').first()).toBeVisible();
  await page.goto('/docs/phase66/');
  await page.reload();
  await expect(page.locator('h1')).toContainText('Phase 6.6');
  await expect(page.locator('.markdown')).toContainText('8.5 Reproducible Calibration');
  await page.goto('/docs/architecture/');
  await page.locator('.markdown a').filter({ hasText: 'GPACK_FORMAT.md' }).first().click();
  await expect(page).toHaveURL(/\/docs\/gpack\/$/);
});

test('routing illustration, token stepping, pulse animation, and clipboard feedback work', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Send a token pulse' }).click();
  await expect(page.locator('[data-field-card]')).toHaveClass(/is-pulsing/);
  await page.getByRole('button', { name: 'Qwen · 10 / 512' }).click();
  await expect(page.locator('#route-caption')).toContainText('10 of 512');
  await page.getByRole('button', { name: /Step next token/ }).click();
  await expect(page.locator('.network-grid i.on').first()).toBeVisible();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/models/qwen3-8-flash-next/');
  await page.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'guild pull qwen3.8-flash-next',
  );
});
