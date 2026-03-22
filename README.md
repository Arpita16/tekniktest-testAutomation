# tekniktest-testAutomation

This repository contains automated test solutions for the tekniktest-testAutomation using **TypeScript** and **Playwright**.

## Environment / URL

Test environment: `https://daedalus.janniskaranikis.dev/`

## Installation

The following should be installed on  machine:

- Node.js
- npm

### 1. Clone the repository

               git clone https://github.com/Arpita16/tekniktest-testAutomation.git
               cd tekniktest-testAutomation

### 2.Install dependencies
              npm install

### 3.Install Playwright browsers
              npx playwright install

### 4.Execution
  
  **Run all tests**
           
           npx playwright test
  
  **Run tests in headed mode**
        
        npx playwright test --headed
  
  **Run a specific test file**
        
        npx playwright test tests/<filename>.spec.ts

**Run tests in UI mode**

          npx playwright test --ui

### 5.Show the HTML report

           playwright show-report

### Architecture 

The solution is implemented using Playwright with TypeScript to keep the test code readable, maintainable, and scalable.

### Structure

```bash
├── tests/
│   ├── TS01PressButton.spec.ts
│   ├── TS02Login.spec.ts
│   ├── TS03MrRobot.spec.ts
│   ├── TS04BadData.spec.ts
│   ├── TS05CreateQuote.spec.ts
│   └── TS06CounterSign.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

### Design choices

- Playwright Test Runner is used for built-in test execution, assertions and reporting.

- TypeScript is used for used for better type safety and code clarity.

- Tests are written independently so they are easier to debug and maintain.

- Locators are chosen to be as stable as possible, favoring accessible selectors such as:

  - getByRole()

  - getByLabel()

  - getByText() where appropriate

- Explicit waits and Playwright assertions are used to improve reliability and reduce flaky behavior.

### Design pattern

For this challenge, I mainly used a straightforward test structure with reusable logic where needed.I used comments to describe the steps I performed to solve the challenges.

### Technical choices

- Framework: Playwright

- Language: TypeScript

- Assertions: Playwright built-in(expect)

- Execution: Playwright Test Runner

**Why these choices**

-Playwright provides strong support for modern web testing.(Recommended)

-It includes built-in auto-waiting, browser management, tracing, and reporting.

-TypeScript improves readability and helps catch mistakes earlier during development.(Recommended)

### Author

Arpita Banerjee Darnal

