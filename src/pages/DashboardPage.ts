import { Page, Locator } from '@playwright/test';
import { config } from '../utils/config';

export class DashboardPage {
  private page: Page;
  private dashboardUrl;
  private attendanceUrl;
  private widgets: Locator;
  private widgetHeadings: Locator;
  private leaveSettingsPopup: Locator;
  private subUnitCanvas: Locator;
  private subUnitLegendItems: Locator;
  private locationCanvas: Locator;
  private locationLegendItems: Locator;

  constructor(page: Page) {
    this.page                = page;
    this.dashboardUrl        = /dashboard/;
    this.attendanceUrl       = /attendance/;
    this.widgets             = page.locator('.oxd-sheet.oxd-sheet--rounded');
    this.widgetHeadings      = page.locator('.orangehrm-dashboard-widget-header p');
    this.leaveSettingsPopup  = page.locator('.orangehrm-modal-header');
    this.subUnitCanvas       = this.widgets.filter({ hasText: 'Employee Distribution by Sub Unit' }).locator('canvas');
    this.subUnitLegendItems  = this.widgets.filter({ hasText: 'Employee Distribution by Sub Unit' }).locator('li');
    this.locationCanvas      = this.widgets.filter({ hasText: 'Employee Distribution by Location' }).locator('canvas');
    this.locationLegendItems = this.widgets.filter({ hasText: 'Employee Distribution by Location' }).locator('li');
  }

  async goto() {
    await this.page.goto(config.uiUrl + '/web/index.php/dashboard');
  }

  // ─── Getters ─────────────────────────────────────────────────────────────────

  getDashboardUrl()       { return this.dashboardUrl; }
  getAttendanceUrl()      { return this.attendanceUrl; }
  getWidgets()            { return this.widgets; }
  getWidgetHeadings()     { return this.widgetHeadings; }
  getLeaveSettingsPopup() { return this.leaveSettingsPopup; }
  getSubUnitCanvas()      { return this.subUnitCanvas; }
  getLocationCanvas()     { return this.locationCanvas; }

  getMyActionsItems() {
    return this.widgets.filter({ hasText: 'My Actions' }).locator('li');
  }

  getQuickLaunchButtons() {
    return this.widgets.filter({ hasText: 'Quick Launch' }).locator('.oxd-icon-button');
  }

  getBuzzPost() {
    return this.widgets.filter({ hasText: 'Buzz Latest Posts' }).locator('p').nth(1);
  }

  getSubUnitLegendItem(index: number = 0) {
    return this.subUnitLegendItems.nth(index);
  }

  getLegendDot(itemText: string): Locator {
    return this.locationLegendItems
      .filter({ hasText: itemText })
      .locator('.orangehrm-chart-legend-dot');
  }

  getUnassignedLegendItem() {
    return this.locationLegendItems.filter({ hasText: 'Unassigned' });
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  // B3.8.3
  async clickTimeAtWorkIcon() {
    await this.widgets.filter({ hasText: 'Time at Work' }).locator('.oxd-icon-button').first().click();
  }

  // B3.8.7
  async clickLeaveSettingsIcon() {
    await this.widgets.filter({ hasText: 'Employees on Leave Today' }).locator('.orangehrm-leave-time-icon').click();
  }

  // B3.8.8
  async clickSubUnitLegendItem(index: number = 0) {
    await this.subUnitLegendItems.nth(index).click();
  }

  // B3.8.9
  async clickUnassignedLegendItem() {
    await this.locationLegendItems.filter({ hasText: 'Unassigned' }).click();
  }
}
