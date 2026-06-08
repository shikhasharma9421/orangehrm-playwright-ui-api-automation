import { test } from '@playwright/test';
import { loginAsAdmin } from '../../src/utils/authHelper';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Dashboard', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    dashboard = new DashboardPage(page);
    await dashboard.verifyDashboardUrl();
  });

  // B3.8.1
  test('B3.8.1 — Verify 7 widgets are visible on dashboard', async () => {
    await dashboard.verifyWidgetCount(7);
  });

  // B3.8.2
  test('B3.8.2 — Verify all 7 widget headings are correct', async () => {
    await dashboard.verifyWidgetHeadings([
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
  test('B3.8.3 — Verify watch icon on Time at Work is clickable and navigates to Attendance', async () => {
    await dashboard.clickTimeAtWorkIcon();
    await dashboard.verifyAttendanceUrl();
  });

  // B3.8.4
  test('B3.8.4 — Verify My Actions items are clickable', async () => {
    await dashboard.verifyMyActionsItemsVisible();
  });

  // B3.8.5
  test('B3.8.5 — Verify Quick Launch items are clickable', async () => {
    await dashboard.verifyQuickLaunchButtonsEnabled();
  });

  // B3.8.6
  test('B3.8.6 — Verify Buzz Latest Posts is clickable', async () => {
    await dashboard.verifyBuzzPostVisible();
  });

});
