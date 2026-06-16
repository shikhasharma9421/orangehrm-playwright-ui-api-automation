import { test } from '@playwright/test';
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
    await loginPage.verifyErrorMessage('Invalid credentials');
  });

  // B1.3
  test('Failed login empty fields', async () => {
    await loginPage.clickLogin();
    await loginPage.verifyRequiredMessageCount(2);
  });

  // B1.4
  test('Verify required message text', async () => {
    await loginPage.clickLogin();
    await loginPage.verifyRequiredMessagesText();
  });

  // B1.5
  test('Forgot password link navigates to reset page', async () => {
    await loginPage.clickForgotPassword();
    await loginPage.verifyForgotPasswordUrl();
  });
});
