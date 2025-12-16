import { test, expect } from "@playwright/test";

/**
 * E2E Tests for React app_13 Navigation and Routing
 * Tests the main navigation and routing functionality
 */

test.describe("App Navigation and Routing", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test("should display home page with React 19 features", async ({ page }) => {
    // Check page title
    await expect(page.locator("h1")).toContainText("React 19 New Features");

    // Check subtitle
    await expect(page.locator(".subtitle")).toContainText(
      "Learn React 19's latest features"
    );

    // Verify feature cards are displayed
    const featureCards = page.locator(".feature-card");
    await expect(featureCards).toHaveCount(10); // Should have 10 feature cards
  });

  test("should navigate to useOptimistic example page", async ({ page }) => {
    // Click on the useOptimistic feature card
    await page.click("text=useOptimistic");

    // Wait for navigation
    await page.waitForURL("**/use-optimistic");

    // Verify we're on the correct page
    await expect(page.locator("h1")).toContainText("useOptimistic Hook");
    await expect(page.locator(".feature-description")).toContainText(
      "Show optimistic UI updates"
    );
  });

  test("should navigate to useFormStatus example page", async ({ page }) => {
    // Click on the useFormStatus feature card
    await page.click("text=useFormStatus");

    // Wait for navigation
    await page.waitForURL("**/use-form-status");

    // Verify we're on the correct page
    await expect(page.locator("h1")).toContainText("useFormStatus Hook");
    await expect(page.locator(".feature-description")).toContainText(
      "Track form submission status"
    );
  });

  test("should navigate back to home from feature page", async ({ page }) => {
    // Navigate to a feature page
    await page.click("text=useOptimistic");
    await page.waitForURL("**/use-optimistic");

    // Click the home link
    await page.click("text=← Home");

    // Verify we're back on home page
    await page.waitForURL("/");
    await expect(page.locator("h1")).toContainText("React 19 New Features");
  });

  test("should have working navigation header", async ({ page }) => {
    // Check navigation header exists
    const nav = page.locator(".main-nav");
    await expect(nav).toBeVisible();

    // Check logo link
    await expect(nav.locator(".logo")).toContainText("React 19 Features");

    // Check docs link
    const docsLink = nav.locator('a[href*="react.dev"]');
    await expect(docsLink).toBeVisible();
    await expect(docsLink).toHaveAttribute("target", "_blank");
  });

  test("should display all feature cards with correct information", async ({
    page,
  }) => {
    const features = [
      { title: "use() Hook", description: "Load resources asynchronously" },
      { title: "useOptimistic", description: "Optimistic UI updates" },
      { title: "useFormStatus", description: "Track form submission state" },
      {
        title: "useFormState",
        description: "Manage form state with Server Actions",
      },
    ];

    for (const feature of features) {
      const card = page.locator(".feature-card", { hasText: feature.title });
      await expect(card).toBeVisible();
      await expect(card).toContainText(feature.description);
      await expect(card.locator(".learn-more")).toContainText("Learn More →");
    }
  });
});


