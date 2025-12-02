# TypeScript Type Declarations

## What are Type Declarations?

Type declarations (`.d.ts` files) provide type information for JavaScript code. They describe the shape of existing JavaScript libraries, allowing TypeScript to provide type checking and IntelliSense.

## Key Concepts

### 1. Declaration Files (.d.ts)

Declaration files contain only type information, no implementation:

```typescript
// types.d.ts
declare module 'my-library' {
  export function doSomething(value: string): number;
  export const VERSION: string;
}
```

### 2. Ambient Declarations

Declare types for global variables or modules:

```typescript
// globals.d.ts
declare const API_KEY: string;
declare function fetchData(url: string): Promise<any>;

declare namespace MyApp {
  interface Config {
    apiUrl: string;
    timeout: number;
  }
}
```

### 3. Module Augmentation

Extend existing module types:

```typescript
// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        name: string;
      };
    }
  }
}
```

### 4. Triple-Slash Directives

Reference other declaration files:

```typescript
/// <reference types="node" />
/// <reference path="./custom-types.d.ts" />
```

## Common Use Cases

### 1. Typing JavaScript Libraries

```typescript
// lodash.d.ts
declare module 'lodash' {
  export function chunk<T>(array: T[], size: number): T[][];
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T;
}
```

### 2. Global Type Definitions

```typescript
// global.d.ts
declare global {
  interface Window {
    myCustomProperty: string;
    myCustomFunction(): void;
  }
  
  var MY_GLOBAL_VAR: string;
}

export {};
```

### 3. Declaring Module Types

```typescript
// images.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
```

### 4. Environment Variables

```typescript
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    API_URL: string;
    API_KEY: string;
    PORT?: string;
  }
}
```

## From the Original File

The original `interface.ts` file demonstrates:

```typescript
// Type Declaration comment
//  export statements

export default function getProduct(): ProductFromLib {
  return {
    title: "Coffee",
    price: 2,
    id: 1234,
    category: "Drink",
    expirationDate: new Date(),
  };
}
```

This shows:
- Function with explicit return type (`ProductFromLib`)
- Type declarations guide the function's contract
- Export statements make types available to other modules

## Best Practices

1. **Separate Concerns**: Keep type declarations in `.d.ts` files
2. **Use `declare`**: For ambient declarations
3. **Module Augmentation**: Extend third-party types carefully
4. **Document Types**: Add JSDoc comments to declarations
5. **Version Control**: Include `.d.ts` files in version control
6. **DefinitelyTyped**: Use `@types/*` packages when available

## Declaration File Structure

```typescript
// my-library.d.ts

// Type definitions for my-library 1.0
// Project: https://github.com/user/my-library
// Definitions by: Your Name <https://github.com/yourname>

// Ambient module declaration
declare module 'my-library' {
  // Interfaces
  export interface Config {
    apiKey: string;
    timeout: number;
  }
  
  // Classes
  export class Client {
    constructor(config: Config);
    request(url: string): Promise<Response>;
  }
  
  // Functions
  export function initialize(config: Config): Client;
  
  // Constants
  export const VERSION: string;
}

// Global augmentation
declare global {
  interface Window {
    MyLibrary: typeof import('my-library');
  }
}

export {};
```

## Common Patterns

### Pattern 1: Declaring External Modules
```typescript
declare module 'untyped-library' {
  export function doSomething(): void;
}
```

### Pattern 2: Wildcard Module Declarations
```typescript
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

### Pattern 3: Namespace Declarations
```typescript
declare namespace MyLibrary {
  interface Options {
    debug: boolean;
  }
  
  function init(options: Options): void;
}
```

### Pattern 4: UMD Modules
```typescript
export as namespace MyLib;
export = MyLib;

declare namespace MyLib {
  function doSomething(): void;
}
```

## When to Use Type Declarations

✅ **Use when:**
- Working with JavaScript libraries without types
- Defining global types
- Extending third-party library types
- Declaring module types for non-TS files

❌ **Don't use when:**
- Writing new TypeScript code (use regular `.ts` files)
- Types can be inferred automatically
- Library already has `@types/*` package