import { Page, Locator } from '@playwright/test';
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
    this.usernameField      = page.locator('input[name="username"]');
    this.passwordField      = page.locator('input[name="password"]');
    this.loginButton        = page.locator('button[type="submit"]');
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
}
