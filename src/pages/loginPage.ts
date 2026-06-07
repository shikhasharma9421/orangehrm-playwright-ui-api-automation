import { Page, expect } from '@playwright/test';
import { config } from '../utils/config';

export class LoginPage {
  private page: Page;
  private usernameField;
  private passwordField;
  private loginButton;
  private errorMessage;
  private requiredMessages;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton   = page.locator('button[type="submit"]');
    this.errorMessage  = page.locator('.oxd-alert-content-text');
    this.requiredMessages = page.locator('.oxd-input-field-error-message');
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

  async verifyLoginError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async verifyRequiredMessages(count: number) {
    await expect(this.requiredMessages).toHaveCount(count);
  }

  async verifyRequiredMessageText(index: number, message: string) {
    await expect(this.requiredMessages.nth(index)).toHaveText(message);
  }
}