import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { config } from '../../src/utils/config';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // B3.1.1
  test('B3.1.1 — Successful login with valid credentials navigates to dashboard', async ({ page }) => {
    await loginPage.login(config.username, config.password);
    await page.waitForURL('**/dashboard**');
    await expect(page).toHaveURL(/dashboard/);
  });

  // B3.1.2
  test('B3.1.2 — Invalid credentials show error message', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.verifyLoginError('Invalid credentials');
  });

  // B3.1.3
  test('B3.1.3 — Empty form submission shows required field messages', async () => {
    await loginPage.clickLogin();
    await loginPage.verifyRequiredMessages(2);
  });

  // B3.1.4
  test('B3.1.4 — Empty username shows required field message', async ({ page }) => {
    await loginPage.login('', config.password);
    await loginPage.verifyRequiredMessages(1);
  });

  // B3.1.5
  test('B3.1.5 — Empty password shows required field message', async ({ page }) => {
    await loginPage.login(config.username, '');
    await loginPage.verifyRequiredMessages(1);
  });

  // B3.1.6
  test('B3.1.6 — Login page title is visible', async ({ page }) => {
    await expect(page).toHaveTitle(/OrangeHRM/);
  });
});
