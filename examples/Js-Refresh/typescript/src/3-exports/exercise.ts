// Exercise: TypeScript Exports (Default & Named)

/**
 * This exercise will help you practice different export patterns in TypeScript.
 * Create separate files as instructed and implement the required exports.
 */

/**
 * TASK 1: Create a math.ts file with named exports
 *
 * File: math.ts
 *
 * Export the following:
 * - Constant: PI = 3.14159
 * - Function: add(a: number, b: number): number
 * - Function: subtract(a: number, b: number): number
 * - Function: multiply(a: number, b: number): number
 * - Function: divide(a: number, b: number): number
 *
 * Then import and use them in this file
 */

// TODO: Create math.ts file
// TODO: Import and test the functions here

/**
 * TASK 2: Create a book.ts file with a default export
 *
 * File: book.ts
 *
 * Create an interface Book with:
 * - id: number
 * - title: string
 * - author: string
 * - year: number
 *
 * Export the interface as a named export
 *
 * Create and export a default function createBook that:
 * - Takes title, author, and year as parameters
 * - Returns a Book object with a random id
 *
 * Then import and use it in this file
 */

// TODO: Create book.ts file
// TODO: Import default and named exports here

/**
 * TASK 3: Create a config.ts file with mixed exports
 *
 * File: config.ts
 *
 * Named exports:
 * - API_URL: string = "https://api.example.com"
 * - TIMEOUT: number = 5000
 * - MAX_RETRIES: number = 3
 *
 * Default export:
 * - An object containing all the above values
 *
 * Then import both ways in this file
 */

// TODO: Create config.ts file
// TODO: Import named exports
// TODO: Import default export

/**
 * TASK 4: Create a validators.ts file with export list
 *
 * File: validators.ts
 *
 * Create the following functions (don't export inline):
 * - validateEmail(email: string): boolean
 * - validatePhone(phone: string): boolean
 * - validateAge(age: number): boolean (age >= 18)
 *
 * Export all three using an export list at the end of the file
 *
 * Then import and use them in this file
 */

// TODO: Create validators.ts file
// TODO: Import validators

/**
 * TASK 5: Create a types.ts file with type-only exports
 *
 * File: types.ts
 *
 * Create and export:
 * - type UserId = number
 * - type UserRole = "admin" | "user" | "guest"
 * - interface User with id: UserId, name: string, role: UserRole
 *
 * Use type-only export syntax where appropriate
 *
 * Then import and use the types in this file
 */

// TODO: Create types.ts file
// TODO: Import types

/**
 * TASK 6: Create a utils folder with barrel exports
 *
 * Create a utils folder with:
 *
 * File: utils/string.ts
 * - export function capitalize(str: string): string
 * - export function reverse(str: string): string
 *
 * File: utils/array.ts
 * - export function unique<T>(arr: T[]): T[]
 * - export function shuffle<T>(arr: T[]): T[]
 *
 * File: utils/index.ts (barrel file)
 * - Re-export everything from string.ts and array.ts
 *
 * Then import from the barrel file in this file
 */

// TODO: Create utils folder structure
// TODO: Import from utils/index

/**
 * TASK 7: Create a logger.ts file with export aliases
 *
 * File: logger.ts
 *
 * Create:
 * - const internalLog = (message: string) => console.log(message)
 * - const internalError = (message: string) => console.error(message)
 *
 * Export them with aliases:
 * - internalLog as log
 * - internalError as error
 *
 * Then import and use them in this file
 */

// TODO: Create logger.ts file
// TODO: Import with aliases

/**
 * TASK 8: Create a product.ts file with namespace export
 *
 * File: product.ts
 *
 * Create a ProductUtils object with:
 * - formatPrice(price: number): string
 * - calculateDiscount(price: number, discount: number): number
 * - isInStock(quantity: number): boolean
 *
 * Export the entire object as ProductUtils
 *
 * Then import and use it in this file
 */

// TODO: Create product.ts file
// TODO: Import ProductUtils

/**
 * BONUS TASK: Create a complete module system
 *
 * Create a models folder with:
 *
 * File: models/user.model.ts
 * - Interface UserModel
 * - Default export: createUser function
 *
 * File: models/product.model.ts
 * - Interface ProductModel
 * - Default export: createProduct function
 *
 * File: models/order.model.ts
 * - Interface OrderModel
 * - Default export: createOrder function
 *
 * File: models/index.ts
 * - Re-export all interfaces
 * - Re-export all default functions as named exports
 *
 * Then import everything from models/index in this file
 */

// TODO: Create models folder structure
// TODO: Import from models/index

// Export this file to avoid errors
export {};
