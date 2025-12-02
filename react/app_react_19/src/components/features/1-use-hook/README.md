# React 19: use() Hook

## What is it?

The `use()` hook is a new React 19 feature that lets you read the value of a resource like a Promise or Context.

## Key Features

- **Read Promises**: Suspend component until Promise resolves
- **Read Context**: Alternative to useContext
- **Conditional Usage**: Can be called conditionally (unlike other hooks)
- **Automatic Suspense**: Works with Suspense boundaries

## Basic Syntax

```tsx
import { use } from 'react';

function Component() {
  const data = use(promise);
  return <div>{data}</div>;
}
```

## Use Cases

1. **Data Fetching**: Load data asynchronously
2. **Context Reading**: Read context values
3. **Resource Loading**: Load any async resource

## Example: Fetching Data

```tsx
const dataPromise = fetch('/api/data').then(res => res.json());

function DataComponent() {
  const data = use(dataPromise);
  return <div>{data.message}</div>;
}
```

## Important Notes

- ⚠️ Must be wrapped in `<Suspense>` boundary
- ✅ Can be used conditionally
- ✅ Works with both Promises and Context
- ⚠️ Promise should be created outside component or memoized

## Differences from useEffect

| Feature | use() | useEffect |
|---------|-------|-----------|
| Suspends | ✅ Yes | ❌ No |
| Conditional | ✅ Yes | ❌ No |
| Server-side | ✅ Yes | ❌ No |
| Loading state | Automatic | Manual |

## Best Practices

1. Create promises outside components
2. Use with Suspense boundaries
3. Handle errors with Error Boundaries
4. Memoize promises when needed