import { test } from '@playwright/test';
import { loginAsAdmin } from '../../src/utils/authHelper';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Dashboard', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    dashboard = new DashboardPage(page);
  });

  // B3.8.1
  test('B3.8.1 — Verify 7 widgets are visible on dashboard', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyWidgetCount(7);
  });

  // B3.8.2
  test('B3.8.2 — Verify all 7 widget headings are correct', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyWidgetHeadings();
  });

  // B3.8.3
  test('B3.8.3 — Verify watch icon on Time at Work is clickable and navigates to Attendance', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.clickTimeAtWorkIcon();
    await dashboard.verifyAttendancePage();
  });

  // B3.8.4
  test('B3.8.4 — Verify My Actions items are clickable', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyMyActionsItemsClickable();
  });

  // B3.8.5
  test('B3.8.5 — Verify Quick Launch items are clickable', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyQuickLaunchItemsClickable();
  });

  // B3.8.6
  test('B3.8.6 — Verify Buzz Latest Posts is clickable', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyBuzzPostClickable();
  });

  // B3.8.7
  test('B3.8.7 — Verify Employees on Leave settings icon opens popup', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.clickLeaveSettingsIcon();
    await dashboard.verifyLeaveSettingsPopupVisible();
  });

  // B3.8.8
  test('B3.8.8 — Employee Distribution by Sub Unit chart and legend interaction', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifySubUnitChartVisible();
    await dashboard.clickSubUnitLegendItem(0);
    await dashboard.verifySubUnitLegendItemStrikethrough(0);
    await dashboard.verifySubUnitChartUpdated();
  });

  // B3.8.9
  test('B3.8.9 — Employee Distribution by Location chart and legend interaction', async () => {
    await dashboard.verifyDashboardLoaded();
    await dashboard.verifyLocationChartVisible();
    await dashboard.verifyLegendItemColor('Unassigned', 'rgb(255, 0, 0)');
    await dashboard.verifyLegendItemColor('Client Services', 'rgb(255, 0, 0)');
    await dashboard.clickUnassignedLegendItem();
    await dashboard.verifyUnassignedLegendStrikethrough();
  });
});
