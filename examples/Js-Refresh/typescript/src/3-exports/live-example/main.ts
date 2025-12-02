import { ProductWithId } from "./product";

import type { ProductWithId } from "./product";
// ============================================
// EXAMPLE 1: Import default export
// ============================================
import createProduct from "./product";

console.log("1️⃣  Default Export (createProduct):");
const laptop = createProduct("MacBook Pro", 2499, "Electronics");
console.log("   Created product:", laptop);
console.log();

// ============================================
// EXAMPLE 2: Import named exports
// ============================================
import { formatPrice, isExpensive, PRODUCT_CATEGORIES } from "./product";

console.log(
  "2️⃣  Named Exports (formatPrice, isExpensive, PRODUCT_CATEGORIES):"
);
console.log("   Formatted price:", formatPrice(laptop.price));
console.log("   Is expensive?", isExpensive(laptop));
console.log("   Available categories:", PRODUCT_CATEGORIES.join(", "));
console.log();

// ============================================
// EXAMPLE 3: Import default + named exports
// ============================================
import createProductFunc, { Product, ProductCategory } from "./product";

console.log("3️⃣  Mixed Import (default + named):");
const book: Product = createProductFunc("TypeScript Handbook", 45, "Books");
console.log("   Created book:", book);
console.log();

// ============================================
// EXAMPLE 4: Import all as namespace
// ============================================
import * as ProductModule from "./product";

console.log("4️⃣  Namespace Import (* as ProductModule):");
const phone = ProductModule.default("iPhone 15", 999, "Electronics");
console.log("   Created phone:", phone);
console.log("   Formatted:", ProductModule.formatPrice(phone.price));
console.log();

// ============================================
// EXAMPLE 5: Import from user module (named only)
// ============================================
import { createUser, isAdmin, validateEmail, DEFAULT_ROLE } from "./user";

console.log("5️⃣  Named Exports from User Module:");
const user1 = createUser("john_doe", "john@example.com", "admin");
const user2 = createUser("jane_smith", "jane@example.com"); // Uses DEFAULT_ROLE
console.log("   User 1:", user1);
console.log("   Is admin?", isAdmin(user1));
console.log("   User 2:", user2);
console.log("   Is admin?", isAdmin(user2));
console.log("   Email valid?", validateEmail("test@example.com"));
console.log();

// ============================================
// EXAMPLE 6: Import from utils with aliases
// ============================================
import { formatDate, capitalize, generateId, StringUtils } from "./utils";

console.log("6️⃣  Utils Module:");
console.log("   Formatted date:", formatDate(new Date()));
console.log("   Capitalized:", capitalize("hello world"));
console.log("   Generated ID:", generateId());
console.log("   Reversed string:", StringUtils.reverse("TypeScript"));
console.log("   Is palindrome 'racecar'?", StringUtils.isPalindrome("racecar"));
console.log();

// ============================================
// EXAMPLE 7: Import from barrel file (index.ts)
// ============================================
import {
  Product as Prod,
  User,
  formatPrice as price,
  createUser as newUser,
} from "./index";

console.log("7️⃣  Barrel Export (from index.ts):");
const adminUser: User = newUser("admin", "admin@example.com", "admin");
console.log("   Admin user:", adminUser);
console.log();

// ============================================
// EXAMPLE 8: Demonstrating re-exports
// ============================================
import { Modules } from "./index";

console.log("8️⃣  Namespace Re-export:");
const product = Modules.Product.default("Keyboard", 89, "Electronics");
console.log("   Product via Modules:", product);
console.log("   Price:", Modules.Product.formatPrice(product.price));
console.log();

// ============================================
// SUMMARY
// ============================================
console.log("=".repeat(50));
console.log("✅ All import patterns demonstrated successfully!");
console.log("=".repeat(50));

/*
KEY TAKEAWAYS:

1. Default Export: import createProduct from './product'
2. Named Exports: import { formatPrice, isExpensive } from './product'
3. Mixed: import createProduct, { formatPrice } from './product'
4. Namespace: import * as ProductModule from './product'
5. Aliases: import { formatPrice as price } from './product'
6. Barrel Exports: Centralize exports in index.ts
7. Re-exports: export * from './module' or export { item } from './module'
*/
