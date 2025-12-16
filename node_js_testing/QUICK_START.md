# Quick Start Guide - Playwright E2E Tests for App_13

## 🚀 Quick Setup & Run

### Step 1: Start the React Application

```bash
# Terminal 1 - Start React app_13
cd react/app_13
npm install  # First time only
npm run dev
```

Wait for the app to start on `http://localhost:5173`

### Step 2: Run the Tests

```bash
# Terminal 2 - Run tests
cd node_js_testing
npm test
```

## 📊 Test Summary

**Total: 33 E2E Tests**

### Navigation Tests (6 tests)

- Home page display
- Feature navigation
- Back navigation
- Navigation header
- Feature cards

### useOptimistic Tests (13 tests)

- **Todo List** (8 tests)
  - Display & add todos
  - Optimistic updates
  - Pending states
  - Validation
- **Like Button** (2 tests)
  - Toggle likes optimistically
- **Chat Messages** (3 tests)
  - Send messages with optimistic UI

### useFormStatus Tests (14 tests)

- **Basic Form** (3 tests)
  - Submission & loading states
- **Multi-Action Form** (3 tests)
  - Save & publish actions
- **Progress Form** (2 tests)
  - Progress indicators
- **Disabled Inputs Form** (3 tests)
  - Input disabling during submission
- **General Features** (3 tests)
  - Code examples & best practices

## 🎯 Common Commands

```bash
# Run all tests
npm test

# Run with UI (recommended for development)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report

# Run specific test file
npx playwright test app13-navigation.spec.ts
npx playwright test app13-use-optimistic.spec.ts
npx playwright test app13-use-form-status.spec.ts
```

## ✅ What Gets Tested

### React 19 Features

- ✅ useOptimistic hook - Optimistic UI updates
- ✅ useFormStatus hook - Form submission tracking
- ✅ React Router - Client-side routing
- ✅ Form actions - Server-like form handling

### User Interactions

- ✅ Form submissions
- ✅ Button clicks
- ✅ Input validation
- ✅ Navigation
- ✅ Loading states
- ✅ Optimistic updates

### UI States

- ✅ Pending indicators
- ✅ Disabled states
- ✅ Success messages
- ✅ Progress bars
- ✅ Error handling

## 🔍 Test Files Location

```
node_js_testing/
├── tests/
│   ├── app13-navigation.spec.ts       # 6 tests
│   ├── app13-use-optimistic.spec.ts   # 13 tests
│   └── app13-use-form-status.spec.ts  # 14 tests
├── playwright.config.ts               # Configuration
├── package.json                       # Scripts
└── README.md                          # Full documentation
```

## 💡 Tips

1. **First time?** Run `npm run test:ui` to see tests visually
2. **Debugging?** Use `npm run test:debug` to step through tests
3. **CI/CD?** Tests auto-start the React app (no manual start needed)
4. **Failed test?** Check `playwright-report/` for screenshots

## 🐛 Troubleshooting

**Tests won't start?**

- Ensure React app is running on port 5173
- Check `http://localhost:5173` in browser

**Port conflict?**

- Update port in `playwright.config.ts`
- Update port in React app's vite config

**Browser not found?**

```bash
npx playwright install chromium
```

## 📚 Learn More

- Full documentation: [README.md](./README.md)
- Playwright docs: https://playwright.dev/
- React 19 docs: https://react.dev/

---

**Ready to test?** Run `npm test` or `npm run test:ui` 🎉
