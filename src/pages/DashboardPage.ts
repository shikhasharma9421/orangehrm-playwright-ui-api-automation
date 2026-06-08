import { Page, Locator, expect } from '@playwright/test';
import { config } from '../utils/config';

export class DashboardPage {
  private page: Page;
  private dashboardUrl;
  private attendanceUrl;
  private widgets: Locator;
  private widgetHeadings: Locator;
 

  constructor(page: Page) {
    this.page                = page;
    this.dashboardUrl        = /dashboard/;
    this.attendanceUrl       = /attendance/;
    this.widgets             = page.locator('.oxd-sheet.oxd-sheet--rounded');
    this.widgetHeadings      = page.locator('.orangehrm-dashboard-widget-header p');
  
  }

  async goto() {
    await this.page.goto(config.uiUrl + '/web/index.php/dashboard');
  }

   async verifyDashboardUrl() {
    await expect(this.page).toHaveURL(this.dashboardUrl);
  }

   async verifyWidgetHeadings(texts: string[]) {
    await expect(this.widgetHeadings).toHaveText(texts);
  }

  async clickTimeAtWorkIcon() {
    await this.widgets.filter({ hasText: 'Time at Work' }).locator('.oxd-icon-button').first().click();
  }

  async clickLeaveSettingsIcon() {
    await this.widgets.filter({ hasText: 'Employees on Leave Today' }).locator('.orangehrm-leave-time-icon').click();
  }

  async verifyAttendanceUrl() {
    await expect(this.page).toHaveURL(this.attendanceUrl);
  }

  async verifyWidgetCount(count: number) {
    await expect(this.widgets).toHaveCount(count);
  }

  async verifyMyActionsItemsVisible() {
    const items = this.widgets.filter({ hasText: 'My Actions' }).locator('li');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toBeVisible();
    }
  }

  async verifyQuickLaunchButtonsEnabled() {
    const buttons = this.widgets.filter({ hasText: 'Quick Launch' }).locator('.oxd-icon-button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeEnabled();
    }
  }

  async verifyBuzzPostVisible() {
    await expect(this.widgets.filter({ hasText: 'Buzz Latest Posts' }).locator('p').nth(1)).toBeVisible();
  }

}
