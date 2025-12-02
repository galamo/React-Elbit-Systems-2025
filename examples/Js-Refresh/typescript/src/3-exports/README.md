# TypeScript Exports (Default & Named)

## What are Exports?

Exports allow you to share code between different files and modules. TypeScript supports both ES6 module syntax and additional export patterns.

## Types of Exports

### 1. Named Exports

Export specific items by name. You can export multiple items from a single file.

```typescript
// math.ts
export const PI = 3.14159;
export function add(a: number, b: number): number {
  return a + b;
}
export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}
```

**Importing Named Exports:**
```typescript
import { PI, add, Calculator } from './math';
// or
import { PI as pi, add } from './math'; // with alias
// or
import * as Math from './math'; // import all
```

### 2. Default Exports

Export a single "main" value from a module. Each module can have only one default export.

```typescript
// product.ts
export default function getProduct() {
  return { id: 1, name: "Coffee" };
}
```

**Importing Default Exports:**
```typescript
import getProduct from './product';
// or with any name
import fetchProduct from './product';
```

### 3. Mixed Exports

Combine default and named exports in the same file.

```typescript
// user.ts
export default class User {
  constructor(public name: string) {}
}

export const DEFAULT_ROLE = "user";
export function validateUser(user: User): boolean {
  return user.name.length > 0;
}
```

**Importing Mixed Exports:**
```typescript
import User, { DEFAULT_ROLE, validateUser } from './user';
```

## Export Patterns

### 1. Inline Exports
```typescript
export const name = "value";
export function func() {}
export class MyClass {}
export interface MyInterface {}
```

### 2. Export List
```typescript
const name = "value";
function func() {}
class MyClass {}

export { name, func, MyClass };
```

### 3. Export with Alias
```typescript
const internalName = "value";
export { internalName as publicName };
```

### 4. Re-exporting
```typescript
// Re-export from another module
export { something } from './other-module';
export * from './other-module'; // Re-export all
export { default } from './other-module'; // Re-export default
```

### 5. Export Type Only (TypeScript specific)
```typescript
export type { MyInterface, MyType };
export type { MyInterface as PublicInterface };
```

## Common Use Cases

### 1. Utility Functions
```typescript
// utils.ts
export function formatDate(date: Date): string {
  return date.toISOString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

### 2. Configuration
```typescript
// config.ts
export const API_URL = "https://api.example.com";
export const TIMEOUT = 5000;
export default {
  apiUrl: API_URL,
  timeout: TIMEOUT
};
```

### 3. Type Definitions
```typescript
// types.ts
export interface User {
  id: number;
  name: string;
}

export type UserRole = "admin" | "user" | "guest";
```

### 4. Barrel Exports (Index Files)
```typescript
// index.ts
export { User } from './user';
export { Product } from './product';
export { Order } from './order';
export * from './utils';
```

## Best Practices

1. **Prefer Named Exports**: More explicit and easier to refactor
2. **Use Default Exports for Main Component**: In React components or main module exports
3. **Consistent Naming**: Keep export names consistent with file names
4. **Barrel Files**: Use index.ts to create clean import paths
5. **Type-Only Exports**: Use `export type` for type-only exports to improve tree-shaking

## Named vs Default Exports

### Named Exports ✅
- Multiple exports per file
- Explicit naming (better for refactoring)
- Better IDE support
- Easier to find usage

### Default Exports ⚠️
- One per file
- Can be renamed on import (less explicit)
- Common in React components
- Simpler for single-purpose modules

## Common Patterns from the Original File

```typescript
// From interface.ts
export default function getProduct(): ProductFromLib {
  return {
    title: "Coffee",
    price: 2,
    id: 1234,
    category: "Drink",
    expirationDate: new Date(),
  };
}

const user = 1;
const nameSpace = { UserNameSpace: user };
export { nameSpace };
```

This demonstrates:
- **Default export**: The main function `getProduct`
- **Named export**: The `nameSpace` object
- Both can be imported separately

## Import Examples

```typescript
// Import default
import getProduct from './interface';

// Import named
import { nameSpace } from './interface';

// Import both
import getProduct, { nameSpace } from './interface';