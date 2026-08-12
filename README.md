# OrangeHRM Playwright UI + API Automation

A Playwright + TypeScript automation framework for testing the OrangeHRM application through both UI and REST APIs.

The framework is designed to support reliable functional, regression, and end-to-end testing with reusable test components and CI execution.

## What is Covered

### UI Testing
- Login and authentication
- Dashboard validation
- Form and field validation
- Positive and negative scenarios
- Page Object Model (POM)

### API Testing
- REST API testing
- GET, POST, PUT and DELETE requests
- Request and response validation
- Status code validation
- API data validation

## Tech Stack

- Playwright
- TypeScript
- Node.js
- REST APIs
- Jenkins
- Git / GitHub

## Project Structure

```text
src/
├── api/
│   ├── clients/
│   ├── data/
│   └── schemas/
│
├── pages/
│   ├── LoginPage.ts
│   └── DashboardPage.ts
│
└── utils/
    ├── authHelper.ts
    └── config.ts

tests/
├── ui/
│   ├── login.spec.ts
│   └── dashboard.spec.ts
│
└── api/
    ├── auth.spec.ts
    ├── users.spec.ts
    └── advanced.spec.ts

playwright.config.ts
Jenkinsfile
package.json
