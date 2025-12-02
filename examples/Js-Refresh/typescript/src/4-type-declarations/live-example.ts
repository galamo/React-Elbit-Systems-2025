// Live Example: Using Type Declarations
// This file demonstrates how to use the type declarations from example.d.ts

console.log("🔷 TypeScript Type Declarations - Live Example\n");
console.log("=".repeat(50) + "\n");

// Example 1: Using global variables (declared in example.d.ts)
console.log("1️⃣  Global Variables:");
// These would be available if example.d.ts declarations were active
// console.log(`App Version: ${APP_VERSION}`);
// console.log(`Is Production: ${IS_PRODUCTION}`);
console.log("   (Declared as: declare const APP_VERSION: string)");
console.log();

// Example 2: Using global functions
console.log("2️⃣  Global Functions:");
// logMessage("Application started", "info");
console.log("   (Declared as: declare function logMessage(...))");
console.log();

// Example 3: Using namespace
console.log("3️⃣  Namespace:");
// const sum = MathUtils.add(5, 3);
// console.log(`Sum: ${sum}`);
// console.log(`PI: ${MathUtils.PI}`);
console.log("   (Declared as: declare namespace MathUtils {...})");
console.log();

// Example 4: Simulating module usage
console.log("4️⃣  Module Declaration:");
console.log("   // import { Client, initialize } from 'my-custom-library';");
console.log(
  "   // const client = initialize({ apiKey: 'abc', timeout: 5000 });"
);
console.log();

// Example 5: Window extensions
console.log("5️⃣  Window Extensions:");
console.log("   // window.myCustomAPI.init();");
console.log("   // console.log(window.myCustomAPI.version);");
console.log("   (Extends global Window interface)");
console.log();

// Example 6: Environment variables
console.log("6️⃣  Environment Variables:");
console.log("   // const apiUrl = process.env.API_URL;");
console.log("   // const nodeEnv = process.env.NODE_ENV;");
console.log("   (Extends NodeJS.ProcessEnv interface)");
console.log();

// Practical Example: Creating a typed wrapper for a JS library
console.log("7️⃣  Practical Example - Typed Wrapper:");

// Simulating a JavaScript library without types
const jsLibrary = {
  version: "1.0.0",
  init: (config: any) => {
    console.log(`   Initialized with config:`, config);
  },
  getData: () => {
    return { id: 1, name: "Test Data" };
  },
};

// Type declaration for the library (would be in .d.ts file)
interface JSLibraryConfig {
  apiKey: string;
  debug: boolean;
}

interface JSLibraryData {
  id: number;
  name: string;
}

interface JSLibrary {
  version: string;
  init(config: JSLibraryConfig): void;
  getData(): JSLibraryData;
}

// Now we can use it with type safety
const typedLibrary = jsLibrary as unknown as JSLibrary;
typedLibrary.init({ apiKey: "abc123", debug: true });
const data = typedLibrary.getData();
console.log(`   Retrieved data:`, data);
console.log();

// Example 8: Module augmentation in practice
console.log("8️⃣  Module Augmentation:");

// Extending an existing interface
interface CustomRequest {
  user?: {
    id: number;
    name: string;
  };
}

const mockRequest: CustomRequest = {
  user: {
    id: 1,
    name: "John Doe",
  },
};

console.log(`   Request user:`, mockRequest.user);
console.log();

console.log("=".repeat(50));
console.log("✅ Type Declarations Example Complete!");
console.log("=".repeat(50));

/*
KEY POINTS:

1. Type declarations (.d.ts) provide types without implementation
2. Use 'declare' keyword for ambient declarations
3. Extend global types with 'declare global'
4. Declare modules for external libraries
5. Type declarations enable IntelliSense and type checking
6. Useful for JavaScript libraries and global variables
*/

export {};
