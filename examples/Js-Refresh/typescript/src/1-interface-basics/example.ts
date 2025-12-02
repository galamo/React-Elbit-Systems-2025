// Basic Interface Example

// 1. Simple Interface Definition
interface Product {
  title: string;
  price: number;
  id: number;
  category: string;
}

// 2. Using the Interface
const laptop: Product = {
  title: "MacBook Pro",
  price: 2499,
  id: 1001,
  category: "Electronics"
};

// 3. Function with Interface Parameter
function displayProduct(product: Product): string {
  return `${product.title} costs $${product.price}`;
}

console.log(displayProduct(laptop));

// 4. Optional Properties
interface User {
  name: string;
  age?: number; // Optional
  email: string;
}

const user1: User = {
  name: "John Doe",
  email: "john@example.com"
  // age is optional, so we can omit it
};

const user2: User = {
  name: "Jane Smith",
  age: 28,
  email: "jane@example.com"
};

// 5. Readonly Properties
interface Config {
  readonly apiKey: string;
  readonly endpoint: string;
  timeout: number;
}

const config: Config = {
  apiKey: "abc123",
  endpoint: "https://api.example.com",
  timeout: 5000
};

// config.apiKey = "new-key"; // Error: Cannot assign to 'apiKey' because it is a read-only property
config.timeout = 10000; // OK - not readonly

// 6. Nested Interfaces
interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Customer {
  id: number;
  name: string;
  address: Address;
}

const customer: Customer = {
  id: 1,
  name: "Alice Johnson",
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001"
  }
};

// 7. Array of Interface Objects
const products: Product[] = [
  { title: "Coffee", price: 2, id: 1, category: "Drink" },
  { title: "Tea", price: 1.5, id: 2, category: "Drink" },
  { title: "Sandwich", price: 5, id: 3, category: "Food" }
];

// 8. Function Return Type
function getProduct(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

const foundProduct = getProduct(1);
if (foundProduct) {
  console.log(`Found: ${foundProduct.title}`);
}

export { Product, User, Config, Customer, products };


