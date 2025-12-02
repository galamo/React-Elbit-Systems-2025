// Exercise: Extending Interfaces

/**
 * This exercise will help you practice extending interfaces in TypeScript.
 * Complete the tasks below by creating interface hierarchies.
 */

/**
 * TASK 1: Basic Extension
 *
 * Create a base interface 'Shape' with:
 * - color: string
 * - area(): number
 *
 * Extend it to create:
 * - Circle (extends Shape) with radius: number
 * - Rectangle (extends Shape) with width: number, height: number
 * - Triangle (extends Shape) with base: number, height: number
 *
 * Create instances of each shape
 */

// TODO: Create Shape interface

// TODO: Create Circle interface extending Shape

// TODO: Create Rectangle interface extending Shape

// TODO: Create Triangle interface extending Shape

// TODO: Create instances of each shape

/**
 * TASK 2: Multiple Extension
 *
 * Create interfaces:
 * - Drivable with drive(): void, speed: number
 * - Flyable with fly(): void, altitude: number
 *
 * Create FlyingCar interface that extends both Drivable and Flyable
 * Add property: mode: 'ground' | 'air'
 *
 * Create a flying car instance
 */

// TODO: Create Drivable interface

// TODO: Create Flyable interface

// TODO: Create FlyingCar interface extending both

// TODO: Create a flying car instance

/**
 * TASK 3: Hierarchical Extension (3 levels)
 *
 * Create a hierarchy:
 *
 * Level 1: Person
 * - name: string
 * - age: number
 *
 * Level 2: Employee extends Person
 * - employeeId: number
 * - department: string
 * - salary: number
 *
 * Level 3: Manager extends Employee
 * - teamSize: number
 * - reports: Employee[]
 * - bonus: number
 *
 * Create a manager instance
 */

// TODO: Create Person interface

// TODO: Create Employee interface extending Person

// TODO: Create Manager interface extending Employee

// TODO: Create a manager instance

/**
 * TASK 4: Product Hierarchy (from original file concept)
 *
 * Create:
 *
 * BaseProduct:
 * - id: number
 * - title: string
 * - price: number
 * - category: string
 *
 * SuperMarketProduct extends BaseProduct:
 * - expirationDate: Date
 * - aisle: number
 * - organic: boolean
 *
 * ElectronicsProduct extends BaseProduct:
 * - warranty: number (months)
 * - brand: string
 * - model: string
 *
 * Create instances of both product types
 */

// TODO: Create BaseProduct interface

// TODO: Create SuperMarketProduct interface

// TODO: Create ElectronicsProduct interface

// TODO: Create product instances

/**
 * TASK 5: Mixin Pattern
 *
 * Create small, focused interfaces:
 * - Timestamped: createdAt: Date, updatedAt: Date
 * - Identifiable: id: number
 * - Deletable: isDeleted: boolean, deletedAt?: Date
 *
 * Create BlogPost interface that extends all three and adds:
 * - title: string
 * - content: string
 * - author: string
 * - published: boolean
 *
 * Create a blog post instance
 */

// TODO: Create Timestamped interface

// TODO: Create Identifiable interface

// TODO: Create Deletable interface

// TODO: Create BlogPost interface extending all three

// TODO: Create a blog post instance

/**
 * TASK 6: API Response Pattern
 *
 * Create:
 *
 * BaseResponse:
 * - status: number
 * - message: string
 * - timestamp: Date
 *
 * SuccessResponse<T> extends BaseResponse:
 * - data: T
 *
 * ErrorResponse extends BaseResponse:
 * - error: { code: string; details: string }
 *
 * PaginatedResponse<T> extends SuccessResponse<T>:
 * - pagination: { page: number; pageSize: number; total: number }
 *
 * Create instances of each response type
 */

// TODO: Create BaseResponse interface

// TODO: Create SuccessResponse interface

// TODO: Create ErrorResponse interface

// TODO: Create PaginatedResponse interface

// TODO: Create response instances

/**
 * TASK 7: Overriding Properties
 *
 * Create:
 *
 * Vehicle:
 * - type: string
 * - wheels: number
 *
 * Car extends Vehicle:
 * - type: 'sedan' | 'suv' | 'truck' (more specific)
 * - doors: number
 *
 * Motorcycle extends Vehicle:
 * - type: 'sport' | 'cruiser' | 'touring' (more specific)
 * - hasWindshield: boolean
 *
 * Create instances
 */

// TODO: Create Vehicle interface

// TODO: Create Car interface with more specific type

// TODO: Create Motorcycle interface with more specific type

// TODO: Create vehicle instances

/**
 * TASK 8: Generic Extension
 *
 * Create:
 *
 * Repository<T>:
 * - findById(id: number): T | null
 * - findAll(): T[]
 * - save(entity: T): T
 * - delete(id: number): boolean
 *
 * UserRepository extends Repository<User>:
 * - findByEmail(email: string): User | null
 * - findByRole(role: string): User[]
 *
 * (Define a simple User interface first)
 *
 * Create a mock implementation
 */

// TODO: Create User interface

// TODO: Create Repository<T> interface

// TODO: Create UserRepository interface

// TODO: Create a mock implementation

/**
 * BONUS TASK: Complex Hierarchy
 *
 * Create a complete e-commerce system:
 *
 * BaseEntity:
 * - id: number
 * - createdAt: Date
 * - updatedAt: Date
 *
 * Product extends BaseEntity:
 * - name: string
 * - price: number
 * - inStock: boolean
 *
 * PhysicalProduct extends Product:
 * - weight: number
 * - shippingCost: number
 *
 * DigitalProduct extends Product:
 * - downloadUrl: string
 * - fileSize: number
 *
 * Order extends BaseEntity:
 * - customerId: number
 * - total: number
 * - status: 'pending' | 'shipped' | 'delivered'
 *
 * PhysicalOrder extends Order:
 * - shippingAddress: string
 * - trackingNumber: string
 *
 * DigitalOrder extends Order:
 * - downloadLinks: string[]
 * - expiresAt: Date
 *
 * Create instances and a function to display order details
 */

// TODO: Create the complete hierarchy

// TODO: Create instances

// TODO: Create a displayOrder function that works with both order types

// Export to avoid errors
export {};
