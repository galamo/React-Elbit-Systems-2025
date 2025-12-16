# Playwright E2E Testing for React App_13

This directory contains end-to-end (E2E) tests for the React 19 features application (app_13) using Playwright.

## Overview

The test suite covers the following React 19 features:

- **Navigation & Routing**: Tests for page navigation and routing functionality
- **useOptimistic Hook**: Tests for optimistic UI updates in Todo list, Like button, and Chat messages
- **useFormStatus Hook**: Tests for form submission status tracking across multiple form examples

## Prerequisites

Before running the tests, ensure you have:

1. Node.js installed (v18 or higher recommended)
2. The React app_13 application set up and ready to run

## Installation

The dependencies are already installed, but if you need to reinstall:

```bash
cd node_js_testing
npm install
```

## Running the Tests

### 1. Start the React Application

First, you need to start the React app_13 development server:

```bash
cd ../react/app_13
npm install  # If not already installed
npm run dev
```

The app should be running on `http://localhost:5173`

### 2. Run All Tests

In a new terminal, from the `node_js_testing` directory:

```bash
# Run all tests in headless mode
npm test

# Or using npx
npx playwright test
```

### 3. Run Tests with UI Mode (Recommended for Development)

```bash
npx playwright test --ui
```

This opens an interactive UI where you can:

- See all tests
- Run individual tests
- Watch tests execute in real-time
- Debug failures

### 4. Run Specific Test Files

```bash
# Run only navigation tests
npx playwright test app13-navigation.spec.ts

# Run only useOptimistic tests
npx playwright test app13-use-optimistic.spec.ts

# Run only useFormStatus tests
npx playwright test app13-use-form-status.spec.ts
```

### 5. Run Tests in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### 6. Debug Tests

```bash
# Debug a specific test
npx playwright test --debug

# Debug a specific test file
npx playwright test app13-use-optimistic.spec.ts --debug
```

## Test Structure

### 📁 Test Files

```
tests/
├── app13-navigation.spec.ts       # Navigation and routing tests
├── app13-use-optimistic.spec.ts   # useOptimistic hook tests
└── app13-use-form-status.spec.ts  # useFormStatus hook tests
```

### 🧪 Test Coverage

#### Navigation Tests (app13-navigation.spec.ts)

- ✅ Home page display with feature cards
- ✅ Navigation to useOptimistic page
- ✅ Navigation to useFormStatus page
- ✅ Back navigation to home
- ✅ Navigation header functionality
- ✅ Feature card information display

#### useOptimistic Tests (app13-use-optimistic.spec.ts)

- ✅ Todo List:
  - Display initial todos
  - Add new todo with optimistic update
  - Show "Saving..." pending state
  - Handle multiple todo additions
  - Prevent empty todo submissions
- ✅ Like Button:
  - Display initial like count
  - Toggle like state optimistically
- ✅ Chat Messages:
  - Display initial messages
  - Send message with optimistic update
  - Show "Sending..." indicator

#### useFormStatus Tests (app13-use-form-status.spec.ts)

- ✅ Basic Form:
  - Form submission with loading state
  - Field validation
- ✅ Multi-Action Form:
  - Save action with loading state
  - Publish action with loading state
- ✅ Progress Form:
  - Progress indicator during submission
- ✅ Disabled Inputs Form:
  - All inputs disabled during submission
  - Terms checkbox validation

## Configuration

The Playwright configuration is in `playwright.config.ts`:

- **Base URL**: `http://localhost:5173`
- **Test Directory**: `./tests`
- **Timeout**: 30 seconds per test
- **Browser**: Chromium (Desktop Chrome)
- **Auto-start**: Automatically starts the React dev server before tests

## Viewing Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Troubleshooting

### Tests Fail to Start

1. **Check if React app is running**:

   ```bash
   curl http://localhost:5173
   ```

2. **Port conflict**: If port 5173 is in use, update the port in:
   - `playwright.config.ts` (baseURL and webServer.url)
   - React app's vite config

### Tests Timeout

- Increase timeout in `playwright.config.ts`:
  ```typescript
  timeout: 60 * 1000, // 60 seconds
  ```

### Browser Not Found

Install browsers:

```bash
npx playwright install chromium
```

## Best Practices

1. **Run tests before committing**: Ensure all tests pass
2. **Use UI mode for debugging**: `npx playwright test --ui`
3. **Keep tests independent**: Each test should work in isolation
4. **Use meaningful test names**: Describe what the test validates
5. **Wait for elements**: Use Playwright's auto-waiting features

## CI/CD Integration

To run tests in CI/CD pipelines:

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps chromium

# Run tests
npx playwright test

# Generate report
npx playwright show-report
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Test Scenarios Covered

### 🎯 Key Features Tested

1. **Optimistic UI Updates**

   - Immediate feedback on user actions
   - Pending state indicators
   - Automatic rollback on errors

2. **Form Status Tracking**

   - Loading states during submission
   - Disabled inputs during processing
   - Progress indicators
   - Multiple action buttons

3. **Navigation & Routing**
   - Client-side routing
   - Page transitions
   - Navigation links
   - URL updates

## Contributing

When adding new tests:

1. Follow the existing test structure
2. Use descriptive test names
3. Add comments for complex assertions
4. Update this README with new test coverage

## License

This test suite is part of the React Elbit Systems 2025 training materials.
