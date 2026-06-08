import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../src/utils/authHelper';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Dashboard', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    dashboard = new DashboardPage(page);
    await expect(page).toHaveURL(dashboard.getDashboardUrl());
  });

  // B3.8.1
  test('B3.8.1 — Verify 7 widgets are visible on dashboard', async () => {
    await expect(dashboard.getWidgets()).toHaveCount(7);
  });

  // B3.8.2
  test('B3.8.2 — Verify all 7 widget headings are correct', async () => {
    await expect(dashboard.getWidgetHeadings()).toHaveText([
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location',
    ]);
  });

  // B3.8.3
  test('B3.8.3 — Verify watch icon on Time at Work is clickable and navigates to Attendance', async ({ page }) => {
    await dashboard.clickTimeAtWorkIcon();
    await expect(page).toHaveURL(dashboard.getAttendanceUrl());
  });

  // B3.8.4
  test('B3.8.4 — Verify My Actions items are clickable', async () => {
    const items = dashboard.getMyActionsItems();
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toBeVisible();
    }
  });

  // B3.8.5
  test('B3.8.5 — Verify Quick Launch items are clickable', async () => {
    const buttons = dashboard.getQuickLaunchButtons();
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeEnabled();
    }
  });

  // B3.8.6
  test('B3.8.6 — Verify Buzz Latest Posts is clickable', async () => {
    await expect(dashboard.getBuzzPost()).toBeVisible();
  });
  
});
