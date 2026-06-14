import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { config } from '../../src/utils/config';

test.describe('Login', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage     = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  // B1.1
  test('Successful login', async () => {
    await loginPage.login(config.username, config.password);
    await dashboardPage.verifyDashboardUrl();
  });

  // B1.2
  test('Failed login invalid password', async () => {
    await loginPage.login(config.username, 'wrongPassword');
    await expect(loginPage.errorMessage).toContainText('Invalid credentials');
  });

  // B1.3
  test('Failed login empty fields', async () => {
    await loginPage.clickLogin();
    await expect(loginPage.requiredMessages).toHaveCount(2);
  });

  // B1.4
  test('Verify required message text', async () => {
    await loginPage.clickLogin();
    await expect(loginPage.requiredMessages.nth(0)).toHaveText('Required');
    await expect(loginPage.requiredMessages.nth(1)).toHaveText('Required');
  });

  // B1.5
  test('Forgot password link navigates to reset page', async ({ page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/requestPasswordResetCode/);
  });
});
