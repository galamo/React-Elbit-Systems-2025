// Interface Merging Examples

// Example 1: Basic Interface Merging
console.log("=== Example 1: Basic Interface Merging ===\n");

interface Product {
  title: string;
  price: number;
}

interface Product {
  id: number;
  category: string;
}

// Both declarations are merged into one
const product: Product = {
  title: "Coffee",
  price: 2,
  id: 1234,
  category: "Drink",
};

console.log("Product:", product);
console.log();

// Example 2: Adding Optional Properties
console.log("=== Example 2: Adding Optional Properties ===\n");

interface User {
  id: number;
  name: string;
}

interface User {
  email?: string;
  phone?: string;
}

const user1: User = {
  id: 1,
  name: "John Doe",
  // email and phone are optional
};

const user2: User = {
  id: 2,
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "555-0123",
};

console.log("User 1:", user1);
console.log("User 2:", user2);
console.log();

// Example 3: Method Overloading through Merging
console.log("=== Example 3: Method Overloading ===\n");

interface Calculator {
  add(a: number, b: number): number;
}

interface Calculator {
  add(a: string, b: string): string;
}

interface Calculator {
  add(a: number[], b: number[]): number[];
}

// Implementation must handle all overloads
const calculator: Calculator = {
  add(a: any, b: any): any {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a + b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b];
    }
  },
};

console.log("Add numbers:", calculator.add(5, 3));
console.log("Add strings:", calculator.add("Hello ", "World"));
console.log("Add arrays:", calculator.add([1, 2], [3, 4]));
console.log();

// Example 4: Incremental Type Building
console.log("=== Example 4: Incremental Type Building ===\n");

// Base properties
interface BlogPost {
  id: number;
  title: string;
  content: string;
}

// Add metadata
interface BlogPost {
  author: string;
  publishedDate: Date;
}

// Add engagement metrics
interface BlogPost {
  views: number;
  likes: number;
  comments?: number;
}

const blogPost: BlogPost = {
  id: 1,
  title: "Understanding TypeScript",
  content: "TypeScript is a typed superset of JavaScript...",
  author: "Alice Developer",
  publishedDate: new Date("2024-01-15"),
  views: 1250,
  likes: 89,
  comments: 12,
};

console.log("Blog Post:", blogPost);
console.log();

// Example 5: Namespace Merging with Interfaces
console.log("=== Example 5: Namespace Pattern ===\n");

interface Config {
  apiUrl: string;
}

interface Config {
  timeout: number;
}

interface Config {
  retries: number;
}

const appConfig: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};

console.log("App Config:", appConfig);
console.log();

// Example 6: Merging with Different Property Types (This would error)
console.log("=== Example 6: Property Type Compatibility ===\n");

interface Settings {
  theme: "light" | "dark";
  fontSize: number;
}

// This is OK - adding new properties
interface Settings {
  language: string;
  notifications: boolean;
}

// This would cause an error if uncommented:
// interface Settings {
//   theme: string; // Error: Subsequent property declarations must have the same type
// }

const settings: Settings = {
  theme: "dark",
  fontSize: 14,
  language: "en",
  notifications: true,
};

console.log("Settings:", settings);
console.log();

// Example 7: Real-world Pattern - Extending Library Types
console.log("=== Example 7: Library Extension Pattern ===\n");

// Simulating a library interface
interface LibraryProduct {
  id: number;
  name: string;
}

// Your application extends it
interface LibraryProduct {
  customField: string;
  internalId: string;
}

const extendedProduct: LibraryProduct = {
  id: 100,
  name: "Extended Product",
  customField: "Custom Value",
  internalId: "INT-100",
};

console.log("Extended Product:", extendedProduct);

export {
  Product,
  User,
  Calculator,
  BlogPost,
  Config,
  Settings,
  LibraryProduct,
};
