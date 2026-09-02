import { expect, test } from '@playwright/test';

test('loads the Friend Tracker with its backend and GUI model', async ({ page }) => {
  const pingResponse = page.waitForResponse('**/services/ping');
  const modelResponse = page.waitForResponse('**/model.json');

  await page.goto('/');

  expect((await pingResponse).ok()).toBeTruthy();
  expect((await modelResponse).ok()).toBeTruthy();
  await expect(page.locator('path-framework')).toBeAttached();
  await expect(page.getByText('Friends', { exact: true }).first()).toBeVisible();
});

test('creates a friend and shows it in the friends list', async ({ page }) => {
  const suffix = Date.now().toString();
  const firstName = `Playwright${suffix}`;
  const familyName = `Friend${suffix}`;

  await page.goto('/');
  await page.getByText('Friends', { exact: true }).first().click();
  await page.getByText('New Friend', { exact: true }).click();

  const friendForm = page.locator('path-form').last();
  await expect(friendForm).toBeVisible();
  const textInputs = friendForm.locator('input[type="text"]');
  await textInputs.nth(0).fill(familyName);
  await textInputs.nth(1).fill(firstName);

  const createResponse = page.waitForResponse((response) =>
    response.request().method() === 'POST' && response.url().endsWith('/services/friend')
  );
  await friendForm.getByRole('button', { name: 'Ok', exact: true }).click();

  expect((await createResponse).ok()).toBeTruthy();
  await expect(page.getByText(`${firstName} ${familyName}`, { exact: true })).toBeVisible();
});
