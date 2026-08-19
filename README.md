# OrangeHRM Playwright UI + API Automation

Playwright + TypeScript test automation framework covering:
- **UI**: [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com) — login and dashboard flows, using the Page Object Model.
- **API**: [reqres.in](https://reqres.in) — auth and user CRUD endpoints, using a thin REST client wrapper.

## Tech Stack

- [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- TypeScript
- `dotenv` for environment configuration

## Project Structure

```
src/
  api/
    clients/apiClient.ts     # Thin wrapper over Playwright's APIRequestContext (get/post/put/delete)
    data/endpoints.ts        # API endpoint path constants
    data/users.ts            # Static request payloads for user create/update
    schemas/userSchema.ts    # Expected field/type shape for response validation
  pages/
    loginPage.ts             # Page Object for the login screen
    DashboardPage.ts         # Page Object for the dashboard (widgets, nav, quick launch)
  utils/
    authHelper.ts            # loginAsAdmin() — logs in and lands on the dashboard
    config.ts                # Reads UI/API URLs and credentials from .env

tests/
  ui/
    login.spec.ts            # Login success/failure, validation, forgot-password link
    dashboard.spec.ts        # Widgets, navigation, quick launch, buzz posts
  api/
    auth.spec.ts             # Login validation error cases
    users.spec.ts             # GET/POST/PUT/DELETE on /api/users
    advanced.spec.ts         # Response schema validation

playwright.config.ts         # Test runner config
Jenkinsfile                  # CI pipeline (Windows agent)
```

## Prerequisites

- Node.js (LTS)
- npm

## Setup

1. Install dependencies:
   ```
   npm ci
   ```
2. Install Playwright browsers:
   ```
   npx playwright install --with-deps
   ```
3. Create a `.env` file in the project root:
   ```
   API_BASE_URL=https://reqres.in
   REQRES_API_KEY=<your reqres.in API key>
   UI_BASE_URL=https://opensource-demo.orangehrmlive.com
   USERNAME_DEMO=Admin
   PASSWORD=admin123
   ```
   `.env` is gitignored — it is not committed.

## Running Tests

Run the full suite:
```
npm test
```

Run in headed mode (see the browser):
```
npm run test:headed
```

Run a single file or folder:
```
npx playwright test tests/ui/login.spec.ts
npx playwright test tests/api
```

View the last HTML report:
```
npm run test:report
```

Type-check without running tests:
```
npm run typecheck
```

## Configuration Notes

- Tests run across multiple projects (see `playwright.config.ts` → `projects`): `chrome`, `edge`, `firefox`, `webkit`, `mobile-chrome`, `mobile-safari`, `tablet`. Target one with `npx playwright test --project=<name>` or `npm run test:<name>`.
- Headless on CI (`process.env.CI` set), headed locally so you can watch the run.
- On CI, tests retry twice and run with a single worker; locally there are no retries and workers default to Playwright's auto-detection.
- Screenshots and traces are captured only on failure; video is retained only on failure.
- API requests authenticate via the `x-api-key` header, read from `REQRES_API_KEY`.

## CI (Jenkins)

The `Jenkinsfile` at the repo root defines the pipeline: checkout → `npm ci` → write `.env` → install Playwright browsers → typecheck → run tests → publish the Playwright HTML report and archive `test-results/`. See the Jenkins job `ORANGEHRM_AUTOMATION` for the configured job (built off the `feature` branch).
