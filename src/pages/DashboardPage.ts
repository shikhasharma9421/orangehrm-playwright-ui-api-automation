import { Page, Locator, expect } from '@playwright/test';
import { config } from '../utils/config';

export class DashboardPage {
  private page: Page;
  readonly widgets: Locator;
  readonly widgetHeadings: Locator;
  readonly myActionsItems: Locator;
  readonly quickLaunchButtons: Locator;
  readonly buzzPost: Locator;
  readonly buzzPostContent: Locator;
  readonly leaveEmployeeRows: Locator;
  readonly leaveEmptyState: Locator;
  readonly topBar: Locator;
  readonly sidebarAdmin: Locator;
  readonly sidebarPIM: Locator;
  readonly homeLogo: Locator;

  constructor(page: Page) {
    this.page               = page;
    this.widgets            = page.locator('.oxd-sheet.oxd-sheet--rounded');
    this.widgetHeadings     = page.locator('.orangehrm-dashboard-widget-header p');
    this.myActionsItems     = page.locator('.orangehrm-action-widget .oxd-text--p');
    this.quickLaunchButtons = page.locator('.orangehrm-quick-launch-card button');
    this.buzzPost           = page.locator('.orangehrm-buzz-newsfeed-post');
    this.buzzPostContent    = page.locator('.orangehrm-buzz-newsfeed-post .orangehrm-buzz-post-body-content p');
    this.leaveEmployeeRows  = page.locator('.orangehrm-leave-employee-content');
    this.leaveEmptyState    = page.locator('.orangehrm-leave-employee-null-state');
    this.topBar             = page.locator('.oxd-topbar');
    this.sidebarAdmin       = page.locator('.oxd-main-menu-item').filter({ hasText: 'Admin' });
    this.sidebarPIM         = page.locator('.oxd-main-menu-item').filter({ hasText: 'PIM' });
    this.homeLogo           = page.locator('.oxd-brand-banner img');
  }

  async goto() {
    await this.page.goto(config.uiUrl + '/web/index.php/dashboard/index');
  }

  // ── Page Load ──────────────────────────────────────────────────────────────

  async verifyDashboardUrl() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/OrangeHRM/);
  }


  // ── Widgets ────────────────────────────────────────────────────────────────

  async verifyWidgetCount(count: number) {
    await expect(this.widgets).toHaveCount(count);
  }

  async verifyWidgetHeadings(headings: string[]) {
    await expect(this.widgetHeadings).toHaveText(headings);
  }

  // ── Time at Work ───────────────────────────────────────────────────────────

  async clickTimeAtWorkIcon() {
    await this.widgets
      .filter({ hasText: 'Time at Work' })
      .locator('.oxd-icon-button')
      .first()
      .click();
  }

  async verifyAttendanceUrl() {
    await expect(this.page).toHaveURL(/attendance/);
  }

  // ── Employees on Leave Today ───────────────────────────────────────────────

  async clickLeaveSettingsIcon() {
    await this.widgets
      .filter({ hasText: 'Employees on Leave Today' })
      .locator('.orangehrm-leave-time-icon')
      .click();
  }

  async verifyLeaveUrl() {
    await expect(this.page).toHaveURL(/leave/);
  }

  async verifyLeaveDataOrEmptyState() {
    const rows       = await this.leaveEmployeeRows.count();
    const emptyState = await this.leaveEmptyState.count();
    expect(rows + emptyState).toBeGreaterThan(0);
  }

  // ── My Actions ─────────────────────────────────────────────────────────────

  async verifyMyActionsItemsVisible() {
    await expect(this.myActionsItems.first()).toBeVisible();
  }

  async clickMyActionsItem(index: number) {
    await this.myActionsItems.nth(index).click();
  }

  // ── Quick Launch ───────────────────────────────────────────────────────────

  async getQuickLaunchButtonCount(): Promise<number> {
    return this.quickLaunchButtons.count();
  }

  async verifyQuickLaunchButtonsEnabled() {
    const count = await this.quickLaunchButtons.count();
    for (let i = 0; i < count; i++) {
      await expect(this.quickLaunchButtons.nth(i)).toBeEnabled();
    }
  }

  async clickQuickLaunchButton(index: number) {
    await this.quickLaunchButtons.nth(index).click();
  }

  // ── Buzz Latest Posts ──────────────────────────────────────────────────────

  async verifyBuzzPostVisible() {
    await expect(this.buzzPost.first()).toBeVisible();
  }

  async verifyBuzzPostContentNotEmpty() {
    const text = await this.buzzPostContent.first().textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  async verifyTopBarVisible() {
    await expect(this.topBar).toBeVisible();
  }

  async clickSidebarAdmin() {
    await this.sidebarAdmin.click();
  }

  async verifyAdminUrl() {
    await expect(this.page).toHaveURL(/viewAdminModule/);
  }

  async clickSidebarPIM() {
    await this.sidebarPIM.click();
  }

  async verifyPIMUrl() {
    await expect(this.page).toHaveURL(/viewPimModule/);
  }

  async clickHomeLogo() {
    await this.homeLogo.click();
  }

  async navigateBack() {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }
}
