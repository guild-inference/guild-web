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
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(450);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBeTruthy();
      await expect(page.locator('h1')).toBeVisible();
      expect(
        await page.evaluate(() =>
          [...document.querySelectorAll('h1, .note, .panel, [data-model-card]')].every(
            (el) => Number(getComputedStyle(el).opacity) === 1,
          ),
        ),
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

test('engine surface: the plan fills, the command lookup filters, and copying works', async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => {
    const plan = document.querySelector<HTMLElement>('#plan')!;
    window.scrollTo(0, plan.offsetTop + plan.offsetHeight - innerHeight * 1.2);
  });
  await expect(page.locator('[data-plan-stage]')).toHaveAttribute('data-step', '4');
  await expect(page.locator('[data-part="gpu"]')).toHaveClass(/on-gpu/);
  await page.getByLabel('Look up a command').fill('serve');
  await expect(page.locator('#lookup-list li:visible')).toHaveCount(1);
  await expect(page.locator('#lookup-list li:visible')).toContainText('OpenAI-compatible');
  await page.getByLabel('Look up a command').fill('launch-rocket');
  await expect(page.locator('#lookup-empty')).toBeVisible();
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/models/qwen3-8-flash-next/');
  await page.getByRole('button', { name: 'Copy', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'guild pull qwen3.8-flash-next',
  );
});
