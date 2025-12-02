# TypeScript Interfaces - Basics

## What are Interfaces?

Interfaces in TypeScript are a powerful way to define contracts for object shapes. They describe the structure of an object by specifying the types of its properties.

## Key Concepts

### 1. Basic Interface Definition
```typescript
interface Product {
  title: string;
  price: number;
  id: number;
  category: string;
}
```

### 2. Using Interfaces
```typescript
function displayProduct(product: Product): void {
  console.log(`${product.title} - $${product.price}`);
}

const myProduct: Product = {
  title: "Coffee",
  price: 2,
  id: 1234,
  category: "Drink"
};
```

### 3. Optional Properties
```typescript
interface User {
  name: string;
  age?: number; // Optional property
  email: string;
}
```

### 4. Readonly Properties
```typescript
interface Config {
  readonly apiKey: string;
  readonly endpoint: string;
}
```

## Benefits

- **Type Safety**: Catch errors at compile time
- **IntelliSense**: Better IDE autocomplete
- **Documentation**: Self-documenting code
- **Refactoring**: Easier to maintain and refactor

## Common Use Cases

1. API Response types
2. Component Props (React)
3. Function parameters
4. Configuration objects
5. Data models

## Best Practices

- Use PascalCase for interface names
- Prefix with 'I' is optional (modern TypeScript doesn't require it)
- Keep interfaces focused and single-purpose
- Use optional properties when appropriate