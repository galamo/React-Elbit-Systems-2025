// index.ts - Barrel export file that re-exports from other modules
// This creates a clean import path for consumers

// Re-export everything from product module
export * from "./product";

// Re-export everything from user module
export * from "./user";

// Re-export specific items from utils
export {
  formatDate,
  capitalize,
  truncate,
  generateId,
  StringUtils,
} from "./utils";

// Re-export default as named export
export { default as createProduct } from "./product";

// You can also create a namespace-style export
import * as ProductModule from "./product";
import * as UserModule from "./user";
import * as UtilsModule from "./utils";

export const Modules = {
  Product: ProductModule,
  User: UserModule,
  Utils: UtilsModule,
};
