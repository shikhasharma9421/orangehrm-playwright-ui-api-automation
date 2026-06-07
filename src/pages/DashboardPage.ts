import { Page, expect, Locator } from '@playwright/test';
import { config } from '../utils/config';

export class DashboardPage {
  private page: Page;
  private dashboardUrl: RegExp;
  private widgets: Locator;
  private widgetHeadings: Locator;

  private timeAtWorkWidget: Locator;
  private timeAtWorkIcon: Locator;

  private myActionsWidget: Locator;
  private myActionsItems: Locator;

  private quickLaunchWidget: Locator;
  private quickLaunchItems: Locator;

  private buzzWidget: Locator;
  private buzzPostLink: Locator;

  private leaveWidget: Locator;
  private leaveSettingsIcon: Locator;
  private leaveSettingsPopup: Locator;

  private subUnitWidget: Locator;
  private subUnitChart: Locator;
  private subUnitLegendItems: Locator;

  private locationWidget: Locator;
  private locationChart: Locator;
  private unassignedLegendItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardUrl = /dashboard/;
    this.widgets = page.locator('.oxd-grid-item');
    this.widgetHeadings = page.locator('.orangehrm-dashboard-widget-header p');

    this.timeAtWorkWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Time at Work' });
    this.timeAtWorkIcon = this.timeAtWorkWidget.locator('.oxd-icon-button').first();

    this.myActionsWidget = page.locator('.oxd-grid-item').filter({ hasText: 'My Actions' });
    this.myActionsItems = this.myActionsWidget.locator('li');

    this.quickLaunchWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Quick Launch' });
    this.quickLaunchItems = this.quickLaunchWidget.locator('.oxd-icon-button');

    this.buzzWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Buzz Latest Posts' });
    this.buzzPostLink = this.buzzWidget.locator('a').first();

    this.leaveWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Employees on Leave Today' });
    this.leaveSettingsIcon = this.leaveWidget.locator('.oxd-icon-button');
    this.leaveSettingsPopup = page.locator('.orangehrm-modal-header');

    this.subUnitWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Employee Distribution by Sub Unit' });
    this.subUnitChart = this.subUnitWidget.locator('canvas');
    this.subUnitLegendItems = this.subUnitWidget.locator('.orangehrm-chart-legend-item');

    this.locationWidget = page.locator('.oxd-grid-item').filter({ hasText: 'Employee Distribution by Location' });
    this.locationChart = this.locationWidget.locator('canvas');
    this.unassignedLegendItem = this.locationWidget
      .locator('.orangehrm-chart-legend-item')
      .filter({ hasText: 'Unassigned' });
  }

  async goto() {
    await this.page.goto(config.uiUrl + '/web/index.php/dashboard');
  }

  // B3.8.1
  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(this.dashboardUrl);
  }

  async verifyWidgetCount(expected: number = 7) {
    await expect(this.widgets).toHaveCount(expected);
  }

  // B3.8.2
  async verifyWidgetHeadings() {
    const expectedHeadings = [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location',
    ];
    for (const heading of expectedHeadings) {
      await expect(this.widgetHeadings.filter({ hasText: heading })).toBeVisible();
    }
  }

  // B3.8.3
  async clickTimeAtWorkIcon() {
    await this.timeAtWorkIcon.click();
  }

  async verifyAttendancePage() {
    await expect(this.page).toHaveURL(/attendance/);
  }

  // B3.8.4
  async verifyMyActionsItemsClickable() {
    const count = await this.myActionsItems.count();
    for (let i = 0; i < count; i++) {
      await expect(this.myActionsItems.nth(i)).toBeEnabled();
    }
  }

  // B3.8.5
  async verifyQuickLaunchItemsClickable() {
    const count = await this.quickLaunchItems.count();
    for (let i = 0; i < count; i++) {
      await expect(this.quickLaunchItems.nth(i)).toBeEnabled();
    }
  }

  // B3.8.6
  async verifyBuzzPostClickable() {
    await expect(this.buzzPostLink).toBeEnabled();
  }

  // B3.8.7
  async clickLeaveSettingsIcon() {
    await this.leaveSettingsIcon.click();
  }

  async verifyLeaveSettingsPopupVisible() {
    await expect(this.leaveSettingsPopup).toBeVisible();
  }

  // B3.8.8
  async verifySubUnitChartVisible() {
    await expect(this.subUnitChart).toBeVisible();
  }

  async clickSubUnitLegendItem(index: number = 0) {
    await this.subUnitLegendItems.nth(index).click();
  }

  async verifySubUnitLegendItemStrikethrough(index: number = 0) {
    await expect(this.subUnitLegendItems.nth(index)).toHaveCSS('text-decoration-line', 'line-through');
  }

  async verifySubUnitChartUpdated() {
    await expect(this.subUnitChart).toBeVisible();
  }

  // B3.8.9
  async verifyLocationChartVisible() {
    await expect(this.locationChart).toBeVisible();
  }

  async verifyLegendItemColor(itemText: string, expectedColor: string) {
    const dot = this.locationWidget
      .locator('.orangehrm-chart-legend-item')
      .filter({ hasText: itemText })
      .locator('.orangehrm-chart-legend-dot');
    await expect(dot).toHaveCSS('background-color', expectedColor);
  }

  async clickUnassignedLegendItem() {
    await this.unassignedLegendItem.click();
  }

  async verifyUnassignedLegendStrikethrough() {
    await expect(this.unassignedLegendItem).toHaveCSS('text-decoration-line', 'line-through');
  }
}
