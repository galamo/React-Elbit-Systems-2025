// TypeScript Extending Interfaces Examples

console.log("=== Extending Interfaces Examples ===\n");

// ============================================
// EXAMPLE 1: Basic Extension
// ============================================
console.log("1. Basic Extension:");

interface Animal {
  name: string;
  age: number;
  makeSound(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  makeSound() {
    console.log("   Generic animal sound");
  },
  bark() {
    console.log("   Woof! Woof!");
  },
};

console.log(`   Dog: ${myDog.name}, ${myDog.breed}, ${myDog.age} years old`);
myDog.bark();
console.log();

// ============================================
// EXAMPLE 2: Multiple Extension
// ============================================
console.log("2. Multiple Extension:");

interface Flyable {
  fly(): void;
  maxAltitude: number;
}

interface Swimmable {
  swim(): void;
  maxDepth: number;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

const donald: Duck = {
  name: "Donald",
  age: 2,
  maxAltitude: 1000,
  maxDepth: 10,
  makeSound() {
    this.quack();
  },
  fly() {
    console.log(`   ${this.name} is flying up to ${this.maxAltitude}m`);
  },
  swim() {
    console.log(`   ${this.name} is swimming down to ${this.maxDepth}m`);
  },
  quack() {
    console.log("   Quack! Quack!");
  },
};

donald.fly();
donald.swim();
donald.quack();
console.log();

// ============================================
// EXAMPLE 3: Hierarchical Extension
// ============================================
console.log("3. Hierarchical Extension:");

interface Entity {
  id: number;
  createdAt: Date;
}

interface User extends Entity {
  email: string;
  name: string;
}

interface AdminUser extends User {
  permissions: string[];
  role: "admin" | "superadmin";
}

const admin: AdminUser = {
  id: 1,
  createdAt: new Date(),
  email: "admin@example.com",
  name: "Admin User",
  permissions: ["read", "write", "delete"],
  role: "admin",
};

console.log(`   Admin: ${admin.name} (${admin.role})`);
console.log(`   Permissions: ${admin.permissions.join(", ")}`);
console.log();

// ============================================
// EXAMPLE 4: Product Hierarchy (from original file)
// ============================================
console.log("4. Product Hierarchy:");

interface ProductFromLib {
  title: string;
  price: number;
  id: number;
  category: string;
}

interface SuperMarketProduct extends ProductFromLib {
  expirationDate: Date;
  aisle: number;
}

interface ElectronicsProduct extends ProductFromLib {
  warranty: number; // months
  brand: string;
}

const milk: SuperMarketProduct = {
  title: "Whole Milk",
  price: 3.99,
  id: 1001,
  category: "Dairy",
  expirationDate: new Date("2024-12-31"),
  aisle: 5,
};

const laptop: ElectronicsProduct = {
  title: "MacBook Pro",
  price: 2499,
  id: 2001,
  category: "Electronics",
  warranty: 12,
  brand: "Apple",
};

console.log(
  `   Supermarket: ${
    milk.title
  } - Expires: ${milk.expirationDate.toDateString()}`
);
console.log(
  `   Electronics: ${laptop.title} - ${laptop.warranty} months warranty`
);
console.log();

// ============================================
// EXAMPLE 5: Mixin Pattern
// ============================================
console.log("5. Mixin Pattern:");

interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Identifiable {
  id: number;
}

interface Auditable {
  createdBy: string;
  modifiedBy: string;
}

interface BlogPost extends Timestamped, Identifiable, Auditable {
  title: string;
  content: string;
  published: boolean;
}

const post: BlogPost = {
  id: 1,
  title: "Understanding TypeScript",
  content: "TypeScript is a typed superset of JavaScript...",
  published: true,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-15"),
  createdBy: "john@example.com",
  modifiedBy: "jane@example.com",
};

console.log(`   Post: ${post.title}`);
console.log(
  `   Created: ${post.createdAt.toDateString()} by ${post.createdBy}`
);
console.log(
  `   Modified: ${post.updatedAt.toDateString()} by ${post.modifiedBy}`
);
console.log();

// ============================================
// EXAMPLE 6: Overriding Properties
// ============================================
console.log("6. Overriding Properties (More Specific Types):");

interface Vehicle {
  type: string;
  speed: number;
}

interface Car extends Vehicle {
  type: "sedan" | "suv" | "truck"; // More specific than string
  doors: number;
}

const myCar: Car = {
  type: "sedan",
  speed: 120,
  doors: 4,
};

console.log(
  `   Car: ${myCar.type} with ${myCar.doors} doors, max speed ${myCar.speed} km/h`
);
console.log();

// ============================================
// EXAMPLE 7: API Response Pattern
// ============================================
console.log("7. API Response Pattern:");

interface BaseResponse {
  status: number;
  message: string;
  timestamp: Date;
}

interface SuccessResponse<T> extends BaseResponse {
  data: T;
}

interface ErrorResponse extends BaseResponse {
  error: {
    code: string;
    details: string;
  };
}

const successResponse: SuccessResponse<User> = {
  status: 200,
  message: "Success",
  timestamp: new Date(),
  data: {
    id: 1,
    email: "user@example.com",
    name: "John Doe",
    createdAt: new Date(),
  },
};

const errorResponse: ErrorResponse = {
  status: 404,
  message: "Not Found",
  timestamp: new Date(),
  error: {
    code: "USER_NOT_FOUND",
    details: "User with ID 999 does not exist",
  },
};

console.log(
  `   Success: ${successResponse.message} - User: ${successResponse.data.name}`
);
console.log(`   Error: ${errorResponse.message} - ${errorResponse.error.code}`);
console.log();

// ============================================
// EXAMPLE 8: Generic Extension
// ============================================
console.log("8. Generic Extension:");

interface Repository<T> {
  findById(id: number): T | null;
  save(entity: T): T;
  delete(id: number): boolean;
}

interface UserRepository extends Repository<User> {
  findByEmail(email: string): User | null;
  findByRole(role: string): User[];
}

// Simulated implementation
const userRepo: UserRepository = {
  findById(id: number) {
    console.log(`   Finding user by ID: ${id}`);
    return null;
  },
  save(entity: User) {
    console.log(`   Saving user: ${entity.name}`);
    return entity;
  },
  delete(id: number) {
    console.log(`   Deleting user: ${id}`);
    return true;
  },
  findByEmail(email: string) {
    console.log(`   Finding user by email: ${email}`);
    return null;
  },
  findByRole(role: string) {
    console.log(`   Finding users by role: ${role}`);
    return [];
  },
};

userRepo.findByEmail("test@example.com");
console.log();

console.log("=== Examples Complete ===");

export {
  Animal,
  Dog,
  Duck,
  User,
  AdminUser,
  ProductFromLib,
  SuperMarketProduct,
};
