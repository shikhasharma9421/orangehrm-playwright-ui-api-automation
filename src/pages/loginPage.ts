import { Page, Locator } from '@playwright/test';
import { config } from '../utils/config';

export class LoginPage {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private requiredMessages: Locator;

  constructor(page: Page) {
    this.page             = page;
    this.usernameField    = page.locator('input[name="username"]');
    this.passwordField    = page.locator('input[name="password"]');
    this.loginButton      = page.locator('button[type="submit"]');
    this.errorMessage     = page.locator('.oxd-alert-content-text');
    this.requiredMessages = page.locator('.oxd-input-field-error-message');
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

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

  // ─── Getters ─────────────────────────────────────────────────────────────────

  getErrorMessage()                  { return this.errorMessage; }
  getRequiredMessages()              { return this.requiredMessages; }
  getRequiredMessage(index: number)  { return this.requiredMessages.nth(index); }
}
