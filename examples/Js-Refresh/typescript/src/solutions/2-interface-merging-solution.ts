// Solution: Interface Merging Exercise

/**
 * TASK 1: Basic Interface Merging
 */
interface Vehicle {
  brand: string;
  model: string;
}

interface Vehicle {
  year: number;
  color: string;
}

const vehicle: Vehicle = {
  brand: "Toyota",
  model: "Camry",
  year: 2024,
  color: "Silver",
};

console.log("Task 1 - Vehicle:", vehicle);

/**
 * TASK 2: Adding Optional Properties
 */
interface Employee {
  id: number;
  name: string;
  department: string;
}

interface Employee {
  email?: string;
  phone?: string;
  manager?: string;
}

const employee1: Employee = {
  id: 1001,
  name: "John Smith",
  department: "Engineering",
  email: "john.smith@company.com",
  phone: "555-0123",
  manager: "Jane Doe",
};

const employee2: Employee = {
  id: 1002,
  name: "Alice Johnson",
  department: "Marketing",
};

console.log("Task 2 - Employee 1:", employee1);
console.log("Task 2 - Employee 2:", employee2);

/**
 * TASK 3: Method Overloading
 */
interface Formatter {
  format(value: number): string;
}

interface Formatter {
  format(value: Date): string;
}

interface Formatter {
  format(value: boolean): string;
}

const formatter: Formatter = {
  format(value: number | Date | boolean): string {
    if (typeof value === "number") {
      return `Number: ${value.toFixed(2)}`;
    }
    if (value instanceof Date) {
      return `Date: ${value.toLocaleDateString()}`;
    }
    if (typeof value === "boolean") {
      return `Boolean: ${value ? "Yes" : "No"}`;
    }
    return "Unknown";
  },
};

console.log("Task 3 - Format number:", formatter.format(42.5));
console.log("Task 3 - Format date:", formatter.format(new Date()));
console.log("Task 3 - Format boolean:", formatter.format(true));

/**
 * TASK 4: Incremental Type Building
 */
interface Task {
  id: number;
  title: string;
  description: string;
}

interface Task {
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
}

interface Task {
  createdAt: Date;
  updatedAt: Date;
  assignee?: string;
}

const task: Task = {
  id: 1,
  title: "Implement user authentication",
  description: "Add JWT-based authentication to the API",
  status: "in-progress",
  priority: "high",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-15"),
  assignee: "John Smith",
};

console.log("Task 4 - Task:", task);

/**
 * TASK 5: Extending Library Types Pattern
 */
interface ApiResponse {
  status: number;
  data: any;
}

interface ApiResponse {
  timestamp: Date;
  requestId: string;
  cached?: boolean;
}

const apiResponse: ApiResponse = {
  status: 200,
  data: { users: [{ id: 1, name: "John" }] },
  timestamp: new Date(),
  requestId: "req-12345",
  cached: false,
};

console.log("Task 5 - API Response:", apiResponse);

/**
 * TASK 6: Configuration Merging
 */
interface DatabaseConfig {
  host: string;
  port: number;
}

interface DatabaseConfig {
  database: string;
  username: string;
}

interface DatabaseConfig {
  password: string;
  ssl?: boolean;
  poolSize?: number;
}

const dbConfig: DatabaseConfig = {
  host: "localhost",
  port: 5432,
  database: "myapp_db",
  username: "admin",
  password: "secret123",
  ssl: true,
  poolSize: 10,
};

console.log("Task 6 - Database Config:", {
  ...dbConfig,
  password: "***", // Hide password in output
});

/**
 * TASK 7: Method Overloading with Different Return Types
 */
interface DataStore {
  get(key: string): string | undefined;
}

interface DataStore {
  get(key: string, defaultValue: string): string;
}

// Create a class to properly implement the overloaded methods
class DataStoreImpl implements DataStore {
  private data: Record<string, string> = {
    username: "john_doe",
    theme: "dark",
  };

  get(key: string): string | undefined;
  get(key: string, defaultValue: string): string;
  get(key: string, defaultValue?: string): string | undefined {
    const value = this.data[key];
    if (value !== undefined) {
      return value;
    }
    return defaultValue;
  }
}

const dataStore = new DataStoreImpl();

console.log("Task 7 - Get existing key:", dataStore.get("username"));
console.log("Task 7 - Get missing key:", dataStore.get("email"));
console.log(
  "Task 7 - Get with default:",
  dataStore.get("email", "default@example.com")
);

/**
 * BONUS TASK: Complex Merging Scenario
 */
interface GameCharacter {
  name: string;
  level: number;
}

interface GameCharacter {
  health: number;
  mana: number;
  strength: number;
}

interface GameCharacter {
  inventory: string[];
  gold: number;
}

interface GameCharacter {
  attack(target: string): void;
  heal(amount: number): void;
  addItem(item: string): void;
}

const gameCharacter: GameCharacter = {
  name: "Aragorn",
  level: 15,
  health: 100,
  mana: 50,
  strength: 85,
  inventory: ["Sword", "Shield", "Health Potion"],
  gold: 250,

  attack(target: string): void {
    console.log(
      `${this.name} attacks ${target} with ${this.strength} strength!`
    );
    this.mana -= 5;
  },

  heal(amount: number): void {
    this.health = Math.min(this.health + amount, 100);
    console.log(
      `${this.name} healed for ${amount}. Current health: ${this.health}`
    );
  },

  addItem(item: string): void {
    this.inventory.push(item);
    console.log(
      `${this.name} acquired ${item}. Inventory: ${this.inventory.join(", ")}`
    );
  },
};

console.log("\nBonus Task - Game Character:");
console.log(`Name: ${gameCharacter.name}, Level: ${gameCharacter.level}`);
console.log(
  `Health: ${gameCharacter.health}, Mana: ${gameCharacter.mana}, Strength: ${gameCharacter.strength}`
);
console.log(
  `Gold: ${gameCharacter.gold}, Inventory: ${gameCharacter.inventory.join(
    ", "
  )}`
);
console.log("\nActions:");
gameCharacter.attack("Orc");
gameCharacter.heal(20);
gameCharacter.addItem("Magic Ring");

// ============================================
// SUMMARY
// ============================================

console.log("\n" + "=".repeat(50));
console.log("✅ All Tasks Completed Successfully!");
console.log("=".repeat(50));

export {
  Vehicle,
  Employee,
  Formatter,
  Task,
  ApiResponse,
  DatabaseConfig,
  DataStore,
  GameCharacter,
};
