import { test, expect } from "@playwright/test";

/**
 * E2E Tests for useOptimistic Hook - Todo List Example
 * Tests the optimistic UI updates functionality in React 19
 */

test.describe("useOptimistic - Todo List", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the useOptimistic example page
    await page.goto("/use-optimistic");

    // Wait for the page to load
    await expect(page.locator("h1")).toContainText("useOptimistic Hook");
  });

  test("should display the optimistic todo list section", async ({ page }) => {
    // Check that the todo list section exists
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    await expect(todoSection).toBeVisible();

    // Check for the form elements
    await expect(todoSection.locator(".todo-input")).toBeVisible();
    await expect(todoSection.locator(".add-button")).toBeVisible();

    // Check for existing todos
    const todoList = todoSection.locator(".todo-list");
    await expect(todoList).toBeVisible();
  });

  test("should display initial todos", async ({ page }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    const todoItems = todoSection.locator(".todo-item");

    // Should have at least 2 initial todos
    await expect(todoItems).toHaveCount(2);

    // Check initial todo content
    await expect(todoItems.first()).toContainText("Learn React 19");
    await expect(todoItems.nth(1)).toContainText("Build awesome apps");
  });

  test("should add a new todo with optimistic update", async ({ page }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    const input = todoSection.locator(".todo-input");
    const addButton = todoSection.locator(".add-button");
    const todoItems = todoSection.locator(".todo-item");

    // Get initial count
    const initialCount = await todoItems.count();

    // Type a new todo
    const newTodoText = "Test Playwright E2E";
    await input.fill(newTodoText);

    // Submit the form
    await addButton.click();

    // Immediately check that the new todo appears (optimistic update)
    await expect(todoItems).toHaveCount(initialCount + 1);

    // Check that the new todo is visible
    const newTodo = todoSection.locator(".todo-item", { hasText: newTodoText });
    await expect(newTodo).toBeVisible();

    // Check for "Saving..." indicator (optimistic state)
    await expect(newTodo.locator(".pending-badge")).toBeVisible();
    await expect(newTodo.locator(".pending-badge")).toContainText("Saving");

    // Wait for the API call to complete (5 seconds as per the code)
    // The pending badge should disappear
    await expect(newTodo.locator(".pending-badge")).not.toBeVisible({
      timeout: 6000,
    });

    // Verify the input was cleared
    await expect(input).toHaveValue("");
  });

  test("should show pending state during todo addition", async ({ page }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    const input = todoSection.locator(".todo-input");
    const addButton = todoSection.locator(".add-button");

    // Add a new todo
    await input.fill("Check pending state");
    await addButton.click();

    // Immediately check for pending badge
    const pendingBadge = todoSection.locator(".pending-badge").first();
    await expect(pendingBadge).toBeVisible();
    await expect(pendingBadge).toContainText("Saving");
  });

  test("should handle multiple todo additions", async ({ page }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    const input = todoSection.locator(".todo-input");
    const addButton = todoSection.locator(".add-button");
    const todoItems = todoSection.locator(".todo-item");

    const initialCount = await todoItems.count();

    // Add first todo
    await input.fill("First new todo");
    await addButton.click();

    // Wait a bit and add second todo
    await page.waitForTimeout(1000);
    await input.fill("Second new todo");
    await addButton.click();

    // Should have 2 more todos
    await expect(todoItems).toHaveCount(initialCount + 2);

    // Verify both todos are visible
    await expect(
      todoSection.locator(".todo-item", { hasText: "First new todo" })
    ).toBeVisible();
    await expect(
      todoSection.locator(".todo-item", { hasText: "Second new todo" })
    ).toBeVisible();
  });

  test("should not add empty todos", async ({ page }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    const input = todoSection.locator(".todo-input");
    const addButton = todoSection.locator(".add-button");
    const todoItems = todoSection.locator(".todo-item");

    const initialCount = await todoItems.count();

    // Try to add empty todo
    await input.fill("   "); // Just spaces
    await addButton.click();

    // Count should remain the same
    await expect(todoItems).toHaveCount(initialCount);
  });

  test("should display hint text about optimistic updates", async ({
    page,
  }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });
    const hint = todoSection.locator(".hint");

    await expect(hint).toBeVisible();
    await expect(hint).toContainText("Notice how todos appear instantly");
    await expect(hint).toContainText("Saving...");
  });

  test("should show completed state for initial todos", async ({ page }) => {
    const todoSection = page.locator(".example-section", {
      hasText: "Optimistic Todo List",
    });

    // First todo should be completed
    const firstTodo = todoSection.locator(".todo-item").first();
    const completedSpan = firstTodo.locator(".completed");

    await expect(completedSpan).toBeVisible();
    await expect(completedSpan).toContainText("Learn React 19");
  });
});

test.describe("useOptimistic - Like Button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/use-optimistic");
  });

  test("should display like button with initial count", async ({ page }) => {
    const likeSection = page.locator(".example-section", {
      hasText: "Optimistic Like Button",
    });
    await expect(likeSection).toBeVisible();

    const likeButton = likeSection.locator(".like-button");
    await expect(likeButton).toBeVisible();
    await expect(likeButton).toContainText("42"); // Initial count
  });

  test("should toggle like state optimistically", async ({ page }) => {
    const likeSection = page.locator(".example-section", {
      hasText: "Optimistic Like Button",
    });
    const likeButton = likeSection.locator(".like-button");

    // Initial state should be unliked (white heart)
    await expect(likeButton).toContainText("🤍");
    await expect(likeButton).toContainText("42");

    // Click to like
    await likeButton.click();

    // Should immediately show liked state (red heart) and increment count
    await expect(likeButton).toContainText("❤️");
    await expect(likeButton).toContainText("43");

    // Click again to unlike
    await likeButton.click();

    // Should immediately show unliked state and decrement count
    await expect(likeButton).toContainText("🤍");
    await expect(likeButton).toContainText("42");
  });
});

test.describe("useOptimistic - Chat Messages", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/use-optimistic");
  });

  test("should display chat messages section", async ({ page }) => {
    const chatSection = page.locator(".example-section", {
      hasText: "Optimistic Chat Messages",
    });
    await expect(chatSection).toBeVisible();

    // Check for messages container
    await expect(chatSection.locator(".messages-container")).toBeVisible();

    // Check for input form
    await expect(chatSection.locator(".message-input")).toBeVisible();
    await expect(chatSection.locator(".send-button")).toBeVisible();
  });

  test("should display initial messages", async ({ page }) => {
    const chatSection = page.locator(".example-section", {
      hasText: "Optimistic Chat Messages",
    });
    const messages = chatSection.locator(".message");

    // Should have at least 2 initial messages
    await expect(messages).toHaveCount(2);

    await expect(messages.first()).toContainText("Hello! How are you?");
    await expect(messages.nth(1)).toContainText("I'm learning React 19!");
  });

  test("should send message with optimistic update", async ({ page }) => {
    const chatSection = page.locator(".example-section", {
      hasText: "Optimistic Chat Messages",
    });
    const input = chatSection.locator(".message-input");
    const sendButton = chatSection.locator(".send-button");
    const messages = chatSection.locator(".message");

    const initialCount = await messages.count();

    // Type and send a message
    const newMessage = "Testing optimistic messages!";
    await input.fill(newMessage);
    await sendButton.click();

    // Message should appear immediately
    await expect(messages).toHaveCount(initialCount + 1);

    // Check for the new message with sending indicator
    const newMsg = chatSection.locator(".message", { hasText: newMessage });
    await expect(newMsg).toBeVisible();
    await expect(newMsg.locator(".sending-indicator")).toBeVisible();
    await expect(newMsg.locator(".sending-indicator")).toContainText(
      "Sending..."
    );

    // Wait for the API call to complete
    await expect(newMsg.locator(".sending-indicator")).not.toBeVisible({
      timeout: 6000,
    });

    // Input should be cleared
    await expect(input).toHaveValue("");
  });
});

