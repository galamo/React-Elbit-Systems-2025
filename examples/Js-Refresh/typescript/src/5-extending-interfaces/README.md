# TypeScript Extending Interfaces

## What is Interface Extension?

Interface extension allows you to create new interfaces that inherit properties from existing interfaces. This promotes code reuse and creates clear type hierarchies.

## Key Concepts

### 1. Basic Extension with `extends`

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  bark() {
    console.log("Woof!");
  }
};
```

### 2. Multiple Interface Extension

Extend multiple interfaces at once:

```typescript
interface Flyable {
  fly(): void;
  altitude: number;
}

interface Swimmable {
  swim(): void;
  depth: number;
}

interface Duck extends Flyable, Swimmable {
  quack(): void;
}
```

### 3. Extension vs Merging

**Extension** creates a new interface:
```typescript
interface Base {
  id: number;
}

interface Extended extends Base {
  name: string;
}
```

**Merging** combines declarations with the same name:
```typescript
interface Base {
  id: number;
}

interface Base {
  name: string;
}
// Both declarations merge into one
```

## From the Original File

The original `interface.ts` shows a commented example:

```typescript
// interface SuperMarketProduct extends ProductFromLib {
//   expirationDate: Date;
// }
```

This demonstrates:
- Creating a specialized interface (`SuperMarketProduct`)
- Extending a base interface (`ProductFromLib`)
- Adding domain-specific properties (`expirationDate`)

## Common Patterns

### 1. Base + Specific Interfaces

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

interface PhysicalProduct extends Product {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSize: number;
}
```

### 2. Hierarchical Extension

```typescript
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
  role: 'admin' | 'superadmin';
}
```

### 3. Mixin Pattern

```typescript
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
}
```

### 4. Overriding Properties

You can make properties more specific:

```typescript
interface Vehicle {
  type: string;
  speed: number;
}

interface Car extends Vehicle {
  type: 'sedan' | 'suv' | 'truck'; // More specific than string
  doors: number;
}
```

## Best Practices

1. **Use Extension for "is-a" Relationships**
   - `AdminUser extends User` ✅
   - `Car extends Vehicle` ✅

2. **Keep Base Interfaces Focused**
   - Small, single-purpose base interfaces
   - Easier to compose and extend

3. **Avoid Deep Hierarchies**
   - Prefer composition over deep inheritance
   - Max 2-3 levels of extension

4. **Use Multiple Extension for Mixins**
   - Combine orthogonal concerns
   - `interface A extends B, C, D`

5. **Document Extension Relationships**
   - Comment why interfaces extend others
   - Explain the hierarchy

## Extension vs Composition

### Extension (Inheritance)
```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}
```

### Composition
```typescript
interface Animal {
  name: string;
}

interface Dog {
  animal: Animal;
  breed: string;
}
```

**When to use each:**
- **Extension**: Clear "is-a" relationship, shared behavior
- **Composition**: "has-a" relationship, more flexibility

## Common Use Cases

### 1. API Response Types
```typescript
interface BaseResponse {
  status: number;
  message: string;
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
```

### 2. Form Data
```typescript
interface BaseFormData {
  id?: number;
  createdAt?: Date;
}

interface UserFormData extends BaseFormData {
  name: string;
  email: string;
  password: string;
}

interface ProductFormData extends BaseFormData {
  title: string;
  price: number;
  category: string;
}
```

### 3. Database Models
```typescript
interface BaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends BaseModel {
  email: string;
  passwordHash: string;
}

interface PostModel extends BaseModel {
  title: string;
  content: string;
  authorId: number;
}
```

## Advanced Patterns

### 1. Conditional Extension
```typescript
interface Base {
  id: number;
}

interface Extended<T extends boolean> extends Base {
  data: T extends true ? string : number;
}
```

### 2. Generic Extension
```typescript
interface Repository<T> {
  findById(id: number): T | null;
  save(entity: T): T;
}

interface UserRepository extends Repository<User> {
  findByEmail(email: string): User | null;
}
```

### 3. Partial Extension
```typescript
interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface PublicUser extends Omit<FullUser, 'password'> {
  // All properties except password
}
```

## Extending vs Implementing

**Interfaces extend interfaces:**
```typescript
interface A extends B { }
```

**Classes implement interfaces:**
```typescript
class MyClass implements MyInterface { }
```

**Classes can extend classes:**
```typescript
class Child extends Parent { }