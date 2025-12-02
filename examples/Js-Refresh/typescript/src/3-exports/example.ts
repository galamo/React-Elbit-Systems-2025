// TypeScript Exports Examples

// ============================================
// EXAMPLE 1: Named Exports
// ============================================

export const APP_NAME = "MyApp";
export const VERSION = "1.0.0";

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export class Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
}

// ============================================
// EXAMPLE 2: Export List
// ============================================

const API_URL = "https://api.example.com";
const TIMEOUT = 5000;
const MAX_RETRIES = 3;

function validateEmail(email: string): boolean {
  return email.includes("@");
}

class HttpClient {
  get(url: string): Promise<any> {
    return fetch(url).then((res) => res.json());
  }
}

// Export multiple items at once
export { API_URL, TIMEOUT, MAX_RETRIES, validateEmail, HttpClient };

// ============================================
// EXAMPLE 3: Export with Alias
// ============================================

const internalConfig = {
  secret: "abc123",
  key: "xyz789",
};

function internalHelper(): string {
  return "helper";
}

// Export with different names
export { internalConfig as config, internalHelper as helper };

// ============================================
// EXAMPLE 4: Type-Only Exports
// ============================================

export type UserId = number;
export type UserRole = "admin" | "user" | "guest";

export interface Product {
  id: number;
  name: string;
  price: number;
}

// Export only the type, not the value
export type { Product as ProductType };

// ============================================
// EXAMPLE 5: Namespace Export Pattern
// ============================================

const MathUtils = {
  PI: 3.14159,
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
};

export { MathUtils };

// ============================================
// EXAMPLE 6: Mixed Exports (Named + Default)
// ============================================

// Named exports
export const DEFAULT_THEME = "light";
export const THEMES = ["light", "dark", "auto"];

// Default export
export default class ThemeManager {
  private currentTheme: string = DEFAULT_THEME;

  setTheme(theme: string): void {
    if (THEMES.includes(theme)) {
      this.currentTheme = theme;
      console.log(`Theme set to: ${theme}`);
    }
  }

  getTheme(): string {
    return this.currentTheme;
  }
}

// ============================================
// DEMONSTRATION
// ============================================

console.log("=== TypeScript Exports Examples ===\n");

console.log("1. Named Exports:");
console.log(`   APP_NAME: ${APP_NAME}`);
console.log(`   VERSION: ${VERSION}`);
console.log(`   greet("Alice"): ${greet("Alice")}`);

const logger = new Logger();
logger.log("Testing logger");

console.log("\n2. Export List:");
console.log(`   API_URL: ${API_URL}`);
console.log(`   TIMEOUT: ${TIMEOUT}ms`);
console.log(
  `   validateEmail("test@example.com"): ${validateEmail("test@example.com")}`
);

console.log("\n3. Export with Alias:");
console.log(`   config: ${JSON.stringify(internalConfig)}`);
console.log(`   helper(): ${internalHelper()}`);

console.log("\n4. Namespace Export:");
console.log(`   MathUtils.PI: ${MathUtils.PI}`);
console.log(`   MathUtils.add(5, 3): ${MathUtils.add(5, 3)}`);

console.log("\n5. Default Export:");
const themeManager = new ThemeManager();
console.log(`   Current theme: ${themeManager.getTheme()}`);
themeManager.setTheme("dark");
console.log(`   New theme: ${themeManager.getTheme()}`);

// Note: To use these exports in another file:
// import ThemeManager, { DEFAULT_THEME, THEMES } from './example';
// import { greet, Logger, User } from './example';
// import * as Exports from './example';
