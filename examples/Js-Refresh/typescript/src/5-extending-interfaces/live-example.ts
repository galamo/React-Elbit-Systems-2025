// Live Example: E-commerce System with Interface Extension

console.log("🛒 E-commerce System - Interface Extension\n");
console.log("=".repeat(50) + "\n");

// ============================================
// BASE INTERFACES
// ============================================

interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

// ============================================
// SPECIALIZED PRODUCT TYPES
// ============================================

interface PhysicalProduct extends Product {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  shippingCost: number;
}

interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize: number; // in MB
  format: string;
}

interface SubscriptionProduct extends Product {
  billingCycle: "monthly" | "yearly";
  trialDays: number;
  features: string[];
}

// ============================================
// USER HIERARCHY
// ============================================

interface BaseUser extends BaseEntity {
  email: string;
  name: string;
  isActive: boolean;
}

interface Customer extends BaseUser {
  shippingAddress?: string;
  billingAddress?: string;
  orderHistory: number[]; // order IDs
}

interface Vendor extends BaseUser {
  companyName: string;
  products: number[]; // product IDs
  rating: number;
}

interface Admin extends BaseUser {
  permissions: string[];
  role: "admin" | "superadmin";
  lastLogin: Date;
}

// ============================================
// ORDER SYSTEM
// ============================================

interface BaseOrder extends BaseEntity {
  customerId: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

interface PhysicalOrder extends BaseOrder {
  shippingAddress: string;
  trackingNumber?: string;
  estimatedDelivery: Date;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}

interface DigitalOrder extends BaseOrder {
  downloadLinks: string[];
  expiresAt: Date;
  items: Array<{
    productId: number;
    price: number;
  }>;
}

// ============================================
// CREATE SAMPLE DATA
// ============================================

console.log("📦 Creating Products:");
console.log("===================\n");

const book: PhysicalProduct = {
  id: 1,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  name: "TypeScript Handbook",
  description: "Complete guide to TypeScript",
  price: 45.99,
  category: "Books",
  inStock: true,
  weight: 0.5,
  dimensions: { length: 23, width: 15, height: 2 },
  shippingCost: 5.99,
};

const ebook: DigitalProduct = {
  id: 2,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  name: "TypeScript Handbook (Digital)",
  description: "Complete guide to TypeScript - Digital Edition",
  price: 29.99,
  category: "eBooks",
  inStock: true,
  downloadUrl: "https://example.com/download/typescript-handbook.pdf",
  fileSize: 15.5,
  format: "PDF",
};

const subscription: SubscriptionProduct = {
  id: 3,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  name: "Premium Learning Platform",
  description: "Access to all courses and resources",
  price: 29.99,
  category: "Subscriptions",
  inStock: true,
  billingCycle: "monthly",
  trialDays: 14,
  features: ["All Courses", "Live Sessions", "Certificate", "Priority Support"],
};

console.log(`Physical: ${book.name} - $${book.price} (${book.weight}kg)`);
console.log(`Digital: ${ebook.name} - $${ebook.price} (${ebook.fileSize}MB)`);
console.log(
  `Subscription: ${subscription.name} - $${subscription.price}/${subscription.billingCycle}`
);
console.log();

// ============================================
// CREATE USERS
// ============================================

console.log("👥 Creating Users:");
console.log("=================\n");

const customer: Customer = {
  id: 101,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
  email: "john@example.com",
  name: "John Doe",
  isActive: true,
  shippingAddress: "123 Main St, New York, NY 10001",
  billingAddress: "123 Main St, New York, NY 10001",
  orderHistory: [],
};

const vendor: Vendor = {
  id: 201,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  email: "vendor@bookstore.com",
  name: "Jane Smith",
  isActive: true,
  companyName: "Best Books Inc.",
  products: [1],
  rating: 4.8,
};

const admin: Admin = {
  id: 301,
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2024-01-20"),
  email: "admin@example.com",
  name: "Admin User",
  isActive: true,
  permissions: ["read", "write", "delete", "manage_users"],
  role: "admin",
  lastLogin: new Date(),
};

console.log(`Customer: ${customer.name} (${customer.email})`);
console.log(
  `Vendor: ${vendor.name} - ${vendor.companyName} (⭐ ${vendor.rating})`
);
console.log(
  `Admin: ${admin.name} - ${admin.role} (${admin.permissions.length} permissions)`
);
console.log();

// ============================================
// CREATE ORDERS
// ============================================

console.log("📋 Creating Orders:");
console.log("==================\n");

const physicalOrder: PhysicalOrder = {
  id: 1001,
  createdAt: new Date(),
  updatedAt: new Date(),
  customerId: customer.id,
  total: book.price + book.shippingCost,
  status: "processing",
  shippingAddress: customer.shippingAddress!,
  trackingNumber: "TRK123456789",
  estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
  items: [
    {
      productId: book.id,
      quantity: 1,
      price: book.price,
    },
  ],
};

const digitalOrder: DigitalOrder = {
  id: 1002,
  createdAt: new Date(),
  updatedAt: new Date(),
  customerId: customer.id,
  total: ebook.price,
  status: "delivered",
  downloadLinks: [ebook.downloadUrl],
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  items: [
    {
      productId: ebook.id,
      price: ebook.price,
    },
  ],
};

console.log(`Physical Order #${physicalOrder.id}:`);
console.log(`  Status: ${physicalOrder.status}`);
console.log(`  Total: $${physicalOrder.total.toFixed(2)}`);
console.log(`  Tracking: ${physicalOrder.trackingNumber}`);
console.log(`  Delivery: ${physicalOrder.estimatedDelivery.toDateString()}`);
console.log();

console.log(`Digital Order #${digitalOrder.id}:`);
console.log(`  Status: ${digitalOrder.status}`);
console.log(`  Total: $${digitalOrder.total.toFixed(2)}`);
console.log(`  Downloads: ${digitalOrder.downloadLinks.length}`);
console.log(`  Expires: ${digitalOrder.expiresAt.toDateString()}`);
console.log();

// ============================================
// UTILITY FUNCTIONS
// ============================================

function displayProductInfo(product: Product): void {
  console.log(`\n📦 ${product.name}`);
  console.log(`   Category: ${product.category}`);
  console.log(`   Price: $${product.price}`);
  console.log(`   In Stock: ${product.inStock ? "✓" : "✗"}`);

  if ("weight" in product) {
    const physical = product as PhysicalProduct;
    console.log(`   Type: Physical (${physical.weight}kg)`);
    console.log(`   Shipping: $${physical.shippingCost}`);
  } else if ("downloadUrl" in product) {
    const digital = product as DigitalProduct;
    console.log(`   Type: Digital (${digital.fileSize}MB ${digital.format})`);
  } else if ("billingCycle" in product) {
    const sub = product as SubscriptionProduct;
    console.log(`   Type: Subscription (${sub.billingCycle})`);
    console.log(`   Trial: ${sub.trialDays} days`);
  }
}

console.log("📊 Product Details:");
console.log("==================");
displayProductInfo(book);
displayProductInfo(ebook);
displayProductInfo(subscription);

console.log("\n" + "=".repeat(50));
console.log("✅ E-commerce System Example Complete!");
console.log("=".repeat(50));

export {
  BaseEntity,
  Product,
  PhysicalProduct,
  DigitalProduct,
  SubscriptionProduct,
  BaseUser,
  Customer,
  Vendor,
  Admin,
  BaseOrder,
  PhysicalOrder,
  DigitalOrder,
};
