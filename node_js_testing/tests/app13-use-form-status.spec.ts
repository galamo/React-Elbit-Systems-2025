import { test, expect } from "@playwright/test";

/**
 * E2E Tests for useFormStatus Hook
 * Tests form submission status tracking in React 19
 */

test.describe("useFormStatus - Basic Form", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the useFormStatus example page
    await page.goto("/use-form-status");

    // Wait for the page to load
    await expect(page.locator("h1")).toContainText("useFormStatus Hook");
  });

  test("should display the basic form section", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Basic Form with Status",
    });
    await expect(formSection).toBeVisible();

    // Check form elements
    await expect(formSection.locator('input[name="name"]')).toBeVisible();
    await expect(formSection.locator('input[name="email"]')).toBeVisible();
    await expect(formSection.locator(".submit-button")).toBeVisible();
  });

  test("should submit form and show loading state", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Basic Form with Status",
    });
    const nameInput = formSection.locator('input[name="name"]');
    const emailInput = formSection.locator('input[name="email"]');
    const submitButton = formSection.locator(".submit-button");

    // Fill in the form
    await nameInput.fill("John Doe");
    await emailInput.fill("john@example.com");

    // Submit the form
    await submitButton.click();

    // Check for loading state immediately
    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toContainText("Submitting...");

    // Check for spinner
    await expect(submitButton.locator(".spinner")).toBeVisible();

    // Wait for submission to complete (2 seconds as per code)
    await expect(formSection.locator(".success-message")).toBeVisible({
      timeout: 3000,
    });
    await expect(formSection.locator(".success-message")).toContainText(
      "Form submitted!"
    );
    await expect(formSection.locator(".success-message")).toContainText(
      "John Doe"
    );
    await expect(formSection.locator(".success-message")).toContainText(
      "john@example.com"
    );

    // Button should be enabled again
    await expect(submitButton).toBeEnabled();
    await expect(submitButton).toContainText("Submit");
  });

  test("should validate required fields", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Basic Form with Status",
    });
    const submitButton = formSection.locator(".submit-button");

    // Try to submit without filling fields
    await submitButton.click();

    // HTML5 validation should prevent submission
    // The form should not show success message
    await expect(formSection.locator(".success-message")).not.toBeVisible();
  });
});

test.describe("useFormStatus - Multi-Action Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/use-form-status");
  });

  test("should display multi-action form", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Multiple Actions",
    });
    await expect(formSection).toBeVisible();

    // Check for both action buttons
    await expect(formSection.locator(".save-button")).toBeVisible();
    await expect(formSection.locator(".publish-button")).toBeVisible();

    // Check form fields
    await expect(formSection.locator('input[name="title"]')).toBeVisible();
    await expect(formSection.locator('textarea[name="content"]')).toBeVisible();
  });

  test("should handle save action with loading state", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Multiple Actions",
    });
    const titleInput = formSection.locator('input[name="title"]');
    const saveButton = formSection.locator(".save-button");
    const publishButton = formSection.locator(".publish-button");

    // Fill in the form
    await titleInput.fill("My Draft Article");

    // Click save button
    await saveButton.click();

    // Check save button shows loading state
    await expect(saveButton).toBeDisabled();
    await expect(saveButton).toContainText("Saving...");

    // Publish button should also be disabled during submission
    await expect(publishButton).toBeDisabled();

    // Wait for completion
    await expect(formSection.locator(".success-message")).toBeVisible({
      timeout: 2000,
    });
    await expect(formSection.locator(".success-message")).toContainText(
      "Saved: My Draft Article"
    );

    // Buttons should be enabled again
    await expect(saveButton).toBeEnabled();
    await expect(publishButton).toBeEnabled();
  });

  test("should handle publish action with loading state", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Multiple Actions",
    });
    const titleInput = formSection.locator('input[name="title"]');
    const publishButton = formSection.locator(".publish-button");

    // Fill in the form
    await titleInput.fill("My Published Article");

    // Click publish button
    await publishButton.click();

    // Check publish button shows loading state
    await expect(publishButton).toBeDisabled();
    await expect(publishButton).toContainText("Publishing...");

    // Wait for completion
    await expect(formSection.locator(".success-message")).toBeVisible({
      timeout: 2000,
    });
    await expect(formSection.locator(".success-message")).toContainText(
      "Published: My Published Article"
    );
  });
});

test.describe("useFormStatus - Progress Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/use-form-status");
  });

  test("should display progress form", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Progress Indicator",
    });
    await expect(formSection).toBeVisible();

    await expect(formSection.locator('input[name="name"]')).toBeVisible();
    await expect(formSection.locator('input[name="phone"]')).toBeVisible();
  });

  test("should show progress indicator during submission", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Progress Indicator",
    });
    const nameInput = formSection.locator('input[name="name"]');
    const phoneInput = formSection.locator('input[name="phone"]');
    const submitButton = formSection.locator(".submit-button");

    // Fill in the form
    await nameInput.fill("Jane Smith");
    await phoneInput.fill("555-1234");

    // Submit the form
    await submitButton.click();

    // Check for progress indicator
    await expect(submitButton).toContainText("Processing...");

    // Check for progress bar
    const progressInfo = formSection.locator(".progress-info");
    await expect(progressInfo).toBeVisible();
    await expect(progressInfo.locator(".progress-bar")).toBeVisible();
    await expect(progressInfo.locator(".progress-text")).toContainText(
      "Jane Smith"
    );

    // Wait for completion (3 seconds as per code)
    await expect(formSection.locator(".success-message")).toBeVisible({
      timeout: 4000,
    });
    await expect(formSection.locator(".success-message")).toContainText(
      "Successfully registered Jane Smith!"
    );

    // Progress indicator should disappear
    await expect(progressInfo).not.toBeVisible();
  });
});

test.describe("useFormStatus - Disabled Inputs Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/use-form-status");
  });

  test("should display signup form", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Disabled Inputs",
    });
    await expect(formSection).toBeVisible();

    await expect(formSection.locator('input[name="username"]')).toBeVisible();
    await expect(formSection.locator('input[name="password"]')).toBeVisible();
    await expect(formSection.locator('input[name="terms"]')).toBeVisible();
  });

  test("should disable all inputs during submission", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Disabled Inputs",
    });
    const usernameInput = formSection.locator('input[name="username"]');
    const passwordInput = formSection.locator('input[name="password"]');
    const termsCheckbox = formSection.locator('input[name="terms"]');
    const submitButton = formSection.locator(".submit-button");

    // Fill in the form
    await usernameInput.fill("testuser");
    await passwordInput.fill("password123");
    await termsCheckbox.check();

    // Submit the form
    await submitButton.click();

    // All inputs should be disabled immediately
    await expect(usernameInput).toBeDisabled();
    await expect(passwordInput).toBeDisabled();
    await expect(termsCheckbox).toBeDisabled();
    await expect(submitButton).toBeDisabled();

    // Check button text
    await expect(submitButton).toContainText("Creating Account...");
    await expect(submitButton.locator(".spinner")).toBeVisible();

    // Wait for completion (2.5 seconds as per code)
    await expect(formSection.locator(".success-message")).toBeVisible({
      timeout: 3000,
    });
    await expect(formSection.locator(".success-message")).toContainText(
      "Account created for testuser!"
    );

    // Inputs should be enabled again
    await expect(usernameInput).toBeEnabled();
    await expect(passwordInput).toBeEnabled();
    await expect(termsCheckbox).toBeEnabled();
    await expect(submitButton).toBeEnabled();
  });

  test("should require terms checkbox to be checked", async ({ page }) => {
    const formSection = page.locator(".example-section", {
      hasText: "Form with Disabled Inputs",
    });
    const usernameInput = formSection.locator('input[name="username"]');
    const passwordInput = formSection.locator('input[name="password"]');
    const submitButton = formSection.locator(".submit-button");

    // Fill in username and password but not terms
    await usernameInput.fill("testuser");
    await passwordInput.fill("password123");

    // Try to submit
    await submitButton.click();

    // Should not show success message due to validation
    await expect(formSection.locator(".success-message")).not.toBeVisible();
  });
});

test.describe("useFormStatus - General Features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/use-form-status");
  });

  test("should display all example sections", async ({ page }) => {
    const sections = [
      "Basic Form with Status",
      "Form with Multiple Actions",
      "Form with Progress Indicator",
      "Form with Disabled Inputs",
    ];

    for (const sectionTitle of sections) {
      const section = page.locator(".example-section", {
        hasText: sectionTitle,
      });
      await expect(section).toBeVisible();

      // Each section should have a hint
      await expect(section.locator(".hint")).toBeVisible();
    }
  });

  test("should display code examples and best practices", async ({ page }) => {
    // Check for code section
    const codeSection = page.locator(".code-section");
    await expect(codeSection).toBeVisible();

    // Check for code block
    await expect(codeSection.locator(".code-block")).toBeVisible();

    // Check for benefits list
    await expect(codeSection.locator(".benefits-list")).toBeVisible();

    // Check for best practices
    await expect(codeSection.locator(".best-practices")).toBeVisible();
    await expect(
      codeSection.locator(".practice-card", { hasText: "✅ Do" })
    ).toBeVisible();
    await expect(
      codeSection.locator(".practice-card", { hasText: "❌ Don't" })
    ).toBeVisible();
  });

  test("should have navigation links", async ({ page }) => {
    const navLinks = page.locator(".navigation-links");
    await expect(navLinks).toBeVisible();

    // Check for home link
    await expect(navLinks.locator("text=← Home")).toBeVisible();

    // Check for exercise link
    await expect(navLinks.locator("text=Try Exercise →")).toBeVisible();
  });
});


