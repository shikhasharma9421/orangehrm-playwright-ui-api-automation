import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { config } from '../../src/utils/config';

// B1.1
test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(config.username, config.password);
  await dashboardPage.verifyDashboardLoaded();
});

// B1.2
test('Failed login invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(config.username, 'wrongPassword');
  await loginPage.verifyLoginError('Invalid credentials');
});

// B1.3
test('Failed login empty fields', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.clickLogin();
  await loginPage.verifyRequiredMessages(2);
});