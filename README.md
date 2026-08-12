## OrangeHRM Playwright UI + API Automation Framework
Playwright + TypeScript test automation framework covering:

- **UI:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com) — login and dashboard flows using the Page Object Model.
- **API:** [ReqRes](https://reqres.in) — authentication and user CRUD API testing using a reusable REST client.

## Tech Stack
- Playwright
- TypeScript
- REST API
- dotenv
- Jenkins
- Git/GitHub

## Project Structure
```text
src/
├── api/
│   ├── clients/
│   ├── data/
│   └── utils/
├── pages/
└── utils/

tests/
├── api/
└── ui/

playwright.config.ts
Jenkinsfile
package.json
tsconfig.json
```

## Setup
### Prerequisites
- Node.js 18+ LTS
- npm
- Git

Check versions:

```bash
node --version
npm --version
git --version
```

### Installation
Clone the repository:

```bash
git clone <your-repository-url>
cd orangehrm-playwright-ui-api-automation
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Environment Configuration
Create a `.env` file in the project root:

```env
UI_BASE_URL=https://opensource-demo.orangehrmlive.com
API_BASE_URL=https://reqres.in
USERNAME=Admin
PASSWORD=your_password
REQRES_API_KEY=your_api_key
```

Do not commit real passwords, API keys, or tokens to GitHub.

## Run Tests
```bash
# Run all tests
npx playwright test

# Run UI tests
npx playwright test tests/ui/

# Run API tests
npx playwright test tests/api/

# Run a specific test
npx playwright test tests/ui/login.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

## Test Report
Open the Playwright HTML report:

```bash
npx playwright show-report
```

Screenshots and traces are captured for failed tests and stored in the test results.

## Testing Coverage

### UI
- Login and authentication
- Dashboard validation
- Form validation
- Positive and negative scenarios
- End-to-end workflows
- Page Object Model

### API
- GET, POST, PUT and DELETE requests
- Request and response validation
- Status code validation
- Positive and negative scenarios
- API data validation

## CI/CD
The project includes a Jenkins pipeline that:

1. Checks out the code
2. Installs dependencies
3. Installs Playwright
4. Runs automated tests
5. Generates test reports
6. Archives test results

## Author
Shikha Sharma  
Senior Test Engineer | QA Automation | Playwright | API Testing
