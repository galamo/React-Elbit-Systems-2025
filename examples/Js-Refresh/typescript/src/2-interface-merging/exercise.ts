// Exercise: Interface Merging (Declaration Merging)

/**
 * TASK 1: Basic Interface Merging
 * Create an interface called 'Vehicle' with properties:
 * - brand: string
 * - model: string
 *
 * Then create another declaration of 'Vehicle' with:
 * - year: number
 * - color: string
 *
 * Create a vehicle object that uses all four properties
 */

// TODO: First Vehicle interface declaration

// TODO: Second Vehicle interface declaration

// TODO: Create a vehicle object

/**
 * TASK 2: Adding Optional Properties
 * Create an interface called 'Employee' with:
 * - id: number
 * - name: string
 * - department: string
 *
 * Then merge it with optional properties:
 * - email?: string
 * - phone?: string
 * - manager?: string
 *
 * Create two employee objects:
 * - One with all optional properties
 * - One without any optional properties
 */

// TODO: First Employee interface

// TODO: Second Employee interface with optional properties

// TODO: Create employee1 with all properties

// TODO: Create employee2 without optional properties

/**
 * TASK 3: Method Overloading
 * Create an interface called 'Formatter' with a format method that:
 * - Takes a number and returns a string
 *
 * Then merge it with another format method that:
 * - Takes a Date and returns a string
 *
 * Then merge it with another format method that:
 * - Takes a boolean and returns a string
 *
 * Implement the formatter object with all three overloads
 */

// TODO: First Formatter interface with number overload

// TODO: Second Formatter interface with Date overload

// TODO: Third Formatter interface with boolean overload

// TODO: Implement the formatter object

/**
 * TASK 4: Incremental Type Building
 * Create a 'Task' interface in three separate declarations:
 *
 * Declaration 1 (Core properties):
 * - id: number
 * - title: string
 * - description: string
 *
 * Declaration 2 (Status properties):
 * - status: "todo" | "in-progress" | "done"
 * - priority: "low" | "medium" | "high"
 *
 * Declaration 3 (Metadata):
 * - createdAt: Date
 * - updatedAt: Date
 * - assignee?: string
 *
 * Create a task object with all properties
 */

// TODO: First Task interface (core)

// TODO: Second Task interface (status)

// TODO: Third Task interface (metadata)

// TODO: Create a task object

/**
 * TASK 5: Extending Library Types Pattern
 * Imagine you're using a third-party library that defines:
 *
 * interface ApiResponse {
 *   status: number;
 *   data: any;
 * }
 *
 * Merge this interface to add your application-specific properties:
 * - timestamp: Date
 * - requestId: string
 * - cached?: boolean
 *
 * Create an API response object with all properties
 */

// TODO: Original library interface (provided)
interface ApiResponse {
  status: number;
  data: any;
}

// TODO: Merge with your custom properties

// TODO: Create an apiResponse object

/**
 * TASK 6: Configuration Merging
 * Create a 'DatabaseConfig' interface in multiple declarations:
 *
 * Declaration 1:
 * - host: string
 * - port: number
 *
 * Declaration 2:
 * - database: string
 * - username: string
 *
 * Declaration 3:
 * - password: string
 * - ssl?: boolean
 * - poolSize?: number
 *
 * Create a database config object
 */

// TODO: First DatabaseConfig interface

// TODO: Second DatabaseConfig interface

// TODO: Third DatabaseConfig interface

// TODO: Create dbConfig object

/**
 * TASK 7: Method Overloading with Different Return Types
 * Create a 'DataStore' interface with a 'get' method:
 *
 * First declaration:
 * - get(key: string): string | undefined
 *
 * Second declaration:
 * - get(key: string, defaultValue: string): string
 *
 * Implement the dataStore object
 */

// TODO: First DataStore interface

// TODO: Second DataStore interface

// TODO: Implement dataStore object

/**
 * BONUS TASK: Complex Merging Scenario
 * Create a 'GameCharacter' interface in four declarations:
 *
 * Declaration 1 (Basic info):
 * - name: string
 * - level: number
 *
 * Declaration 2 (Stats):
 * - health: number
 * - mana: number
 * - strength: number
 *
 * Declaration 3 (Inventory):
 * - inventory: string[]
 * - gold: number
 *
 * Declaration 4 (Methods):
 * - attack(target: string): void
 * - heal(amount: number): void
 * - addItem(item: string): void
 *
 * Create a complete game character object with implementation
 */

// TODO: First GameCharacter interface

// TODO: Second GameCharacter interface

// TODO: Third GameCharacter interface

// TODO: Fourth GameCharacter interface

// TODO: Create and implement gameCharacter object

// Export for testing
export {};
