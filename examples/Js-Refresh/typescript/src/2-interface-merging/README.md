# TypeScript Interface Merging (Declaration Merging)

## What is Interface Merging?

Interface merging, also known as declaration merging, is a unique TypeScript feature where multiple interface declarations with the same name are automatically merged into a single interface definition.

## Key Concepts

### 1. Basic Interface Merging
When you declare the same interface multiple times, TypeScript combines all declarations:

```typescript
interface Product {
  title: string;
  price: number;
}

interface Product {
  id: number;
  category: string;
}

// Result: Product has all four properties
const product: Product = {
  title: "Coffee",
  price: 2,
  id: 1234,
  category: "Drink"
};
```

### 2. Why Use Interface Merging?

- **Extending Third-Party Libraries**: Add properties to existing library types
- **Module Augmentation**: Extend types from external modules
- **Incremental Development**: Add properties as needed
- **Plugin Systems**: Allow plugins to extend base interfaces

### 3. Rules for Merging

1. **Properties must be compatible**: If the same property appears in multiple declarations, their types must be identical
2. **Methods can be overloaded**: Multiple method signatures create overloads
3. **Order matters for methods**: Later declarations appear first in overload list

### 4. Common Use Cases

#### Extending Window Object
```typescript
interface Window {
  myCustomProperty: string;
}

window.myCustomProperty = "Hello";
```

#### Augmenting Library Types
```typescript
// Extending Express Request
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
```

## Merging vs Extending

### Interface Merging
```typescript
interface User {
  name: string;
}

interface User {
  email: string;
}
// Both declarations merge automatically
```

### Interface Extending
```typescript
interface User {
  name: string;
}

interface AdminUser extends User {
  role: string;
}
// Creates a new interface that includes User properties
```

## Best Practices

1. **Use for augmentation**: Best for extending existing types from libraries
2. **Be careful with conflicts**: Ensure property types match across declarations
3. **Document merging**: Comment why you're using multiple declarations
4. **Prefer extending for new types**: Use `extends` when creating new related types
5. **Avoid overuse**: Too many merges can make code hard to follow

## Common Pitfalls

❌ **Conflicting property types**
```typescript
interface Product {
  price: number;
}

interface Product {
  price: string; // Error: Subsequent property declarations must have the same type
}
```

✅ **Correct approach**
```typescript
interface Product {
  price: number;
}

interface Product {
  discount?: number; // OK: New property
}
```

## When NOT to Use Merging

- Creating new, distinct types (use `extends` instead)
- When you want explicit control over type composition
- In most application code (merging is mainly for library augmentation)