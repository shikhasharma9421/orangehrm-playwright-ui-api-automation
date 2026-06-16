import { Page, Locator, expect } from '@playwright/test';
import { config } from '../utils/config';

export class LoginPage {
  private page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly requiredMessages: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page               = page;
    this.usernameField      = page.getByRole('textbox', { name: 'Username' });
    this.passwordField      = page.getByRole('textbox', { name: 'Password' });
    this.loginButton        = page.getByRole('button', { name: 'Login' });
    this.errorMessage       = page.locator('.oxd-alert-content-text');
    this.requiredMessages   = page.locator('.oxd-input-field-error-message');
    this.forgotPasswordLink = page.locator('.orangehrm-login-forgot-header');
  }

  async goto() {
    await this.page.goto(config.uiUrl + '/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async verifyErrorMessage(text: string) {
    await expect(this.errorMessage).toContainText(text);
  }

  async verifyRequiredMessageCount(count: number) {
    await expect(this.requiredMessages).toHaveCount(count);
  }

  async verifyRequiredMessagesText() {
    await expect(this.requiredMessages.nth(0)).toHaveText('Required');
    await expect(this.requiredMessages.nth(1)).toHaveText('Required');
  }

  async verifyForgotPasswordUrl() {
    await expect(this.page).toHaveURL(/requestPasswordResetCode/);
  }
}
