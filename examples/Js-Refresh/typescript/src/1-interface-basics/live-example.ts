// Live Example: E-commerce Product Management System

// Define Product Interface
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
  rating?: number; // Optional
}

// Define Shopping Cart Item Interface
interface CartItem {
  product: Product;
  quantity: number;
}

// Define User Interface
interface User {
  id: number;
  name: string;
  email: string;
  isVerified: boolean;
}

// Sample Products
const products: Product[] = [
  {
    id: 1,
    title: "Wireless Mouse",
    price: 29.99,
    category: "Electronics",
    inStock: true,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    price: 89.99,
    category: "Electronics",
    inStock: true,
    rating: 4.8,
  },
  {
    id: 3,
    title: "USB-C Cable",
    price: 12.99,
    category: "Accessories",
    inStock: false,
  },
  {
    id: 4,
    title: "Laptop Stand",
    price: 45.0,
    category: "Accessories",
    inStock: true,
    rating: 4.3,
  },
];

// Sample User
const currentUser: User = {
  id: 101,
  name: "Sarah Connor",
  email: "sarah@example.com",
  isVerified: true,
};

// Shopping Cart
let shoppingCart: CartItem[] = [];

// Function: Add to Cart
function addToCart(productId: number, quantity: number): void {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.log(`❌ Product with ID ${productId} not found`);
    return;
  }

  if (!product.inStock) {
    console.log(`❌ ${product.title} is out of stock`);
    return;
  }

  const existingItem = shoppingCart.find(
    (item) => item.product.id === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    console.log(
      `✅ Updated ${product.title} quantity to ${existingItem.quantity}`
    );
  } else {
    shoppingCart.push({ product, quantity });
    console.log(`✅ Added ${quantity}x ${product.title} to cart`);
  }
}

// Function: Calculate Total
function calculateTotal(): number {
  return shoppingCart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

// Function: Display Cart
function displayCart(): void {
  console.log("\n🛒 Shopping Cart:");
  console.log("================");

  if (shoppingCart.length === 0) {
    console.log("Your cart is empty");
    return;
  }

  shoppingCart.forEach((item) => {
    const subtotal = item.product.price * item.quantity;
    console.log(
      `${item.product.title} x${item.quantity} - $${subtotal.toFixed(2)}`
    );
  });

  console.log("----------------");
  console.log(`Total: $${calculateTotal().toFixed(2)}`);
}

// Function: Get Products by Category
function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

// Function: Get Available Products
function getAvailableProducts(): Product[] {
  return products.filter((p) => p.inStock);
}

// Function: Display User Info
function displayUserInfo(user: User): void {
  console.log("\n👤 User Information:");
  console.log("===================");
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Verified: ${user.isVerified ? "✓" : "✗"}`);
}

// Run Live Example
console.log("🏪 E-commerce Product Management System");
console.log("======================================\n");

// Display user
displayUserInfo(currentUser);

// Show available products
console.log("\n📦 Available Products:");
console.log("=====================");
getAvailableProducts().forEach((product) => {
  const ratingText = product.rating ? ` ⭐ ${product.rating}` : "";
  console.log(
    `${product.id}. ${product.title} - $${product.price}${ratingText}`
  );
});

// Add items to cart
console.log("\n🛍️ Shopping Actions:");
console.log("===================");
addToCart(1, 2); // Add 2 wireless mice
addToCart(2, 1); // Add 1 keyboard
addToCart(3, 1); // Try to add out-of-stock item
addToCart(1, 1); // Add 1 more mouse (should update quantity)

// Display cart
displayCart();

// Show products by category
console.log("\n🔍 Electronics Category:");
console.log("=======================");
getProductsByCategory("Electronics").forEach((product) => {
  console.log(`- ${product.title} ($${product.price})`);
});

export { Product, CartItem, User, products, shoppingCart };
