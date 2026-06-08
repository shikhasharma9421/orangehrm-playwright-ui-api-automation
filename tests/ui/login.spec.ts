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
  test('Successful login', async ({ page }) => {
    await loginPage.login(config.username, config.password);
    await expect(page).toHaveURL(dashboardPage.getDashboardUrl());
  });

  // B1.2
  test('Failed login invalid password', async () => {
    await loginPage.login(config.username, 'wrongPassword');
    await expect(loginPage.getErrorMessage()).toContainText('Invalid credentials');
  });

  // B1.3
  test('Failed login empty fields', async () => {
    await loginPage.clickLogin();
    await expect(loginPage.getRequiredMessages()).toHaveCount(2);
  });

  // B1.4
  test('Verify required message text', async () => {
    await loginPage.clickLogin();
    await expect(loginPage.getRequiredMessage(0)).toHaveText('Required');
    await expect(loginPage.getRequiredMessage(1)).toHaveText('Required');
  });
});
