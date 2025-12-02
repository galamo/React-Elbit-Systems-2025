# useFetch Hook - Solution Explanation

## 📖 Overview

This document explains the complete solution for the custom `useFetch` hook exercise.

## 🔧 Implementation Breakdown

### 1. Type Definitions

```typescript
interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
```

**Why?**
- Provides type safety for the hook's return value
- Uses generic `<T>` to allow any data type
- Makes the API clear and self-documenting

### 2. State Management

```typescript
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
```

**Key Points:**
- `data`: Stores the fetched data (generic type T)
- `loading`: Tracks the loading state
- `error`: Stores error messages
- `refetchTrigger`: Counter to trigger manual refetches

### 3. The Fetch Logic (useEffect)

```typescript
useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (!signal.aborted) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  fetchData();

  return () => {
    abortController.abort();
  };
}, [url, options, refetchTrigger]);
```

**Important Concepts:**

#### AbortController
- Creates a signal to cancel the fetch request
- Prevents memory leaks and race conditions
- Cleanup function aborts the request when component unmounts or dependencies change

#### Error Handling
- Checks `response.ok` for HTTP errors
- Uses try-catch for network errors
- Type-safe error handling with `instanceof Error`

#### Signal Checks
- `if (!signal.aborted)` prevents state updates after component unmount
- Avoids "Can't perform a React state update on an unmounted component" warning

#### Dependencies
- `[url, options, refetchTrigger]` - refetch when any of these change
- `refetchTrigger` allows manual refetch without changing URL

### 4. Refetch Function

```typescript
const refetch = useCallback(() => {
  setRefetchTrigger((prev) => prev + 1);
}, []);
```

**Why useCallback?**
- Memoizes the function to prevent unnecessary re-renders
- Returns the same function reference unless dependencies change
- Empty dependency array `[]` means it never changes

**How it works:**
- Increments `refetchTrigger` state
- Triggers useEffect to run again
- Fetches fresh data

## 🎯 Key Features Explained

### 1. TypeScript Generics

```typescript
export function useFetch<T>(url: string, options?: RequestInit): UseFetchReturn<T>
```

- `<T>` is a type parameter
- Allows the hook to work with any data type
- Provides type safety: `useFetch<User[]>()` returns `data: User[] | null`

### 2. Automatic Fetching

The `useEffect` runs when:
- Component mounts (initial fetch)
- `url` changes (fetch new endpoint)
- `options` change (fetch with new config)
- `refetchTrigger` changes (manual refetch)

### 3. Request Cancellation

```typescript
const abortController = new AbortController();
// ...
return () => {
  abortController.abort();
};
```

Prevents issues when:
- Component unmounts before fetch completes
- URL changes before previous fetch completes
- Multiple rapid requests

### 4. Loading States

```typescript
setLoading(true);  // Start of fetch
// ... fetch logic ...
setLoading(false); // End of fetch (success or error)
```

Allows UI to show loading indicators

### 5. Error Handling

```typescript
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
```

Handles both:
- HTTP errors (404, 500, etc.)
- Network errors (no connection, timeout)

## 💡 Best Practices Demonstrated

### 1. Cleanup
Always cleanup side effects to prevent memory leaks

### 2. Type Safety
Use TypeScript for better developer experience and fewer bugs

### 3. Separation of Concerns
Hook handles data fetching, component handles UI

### 4. Reusability
One hook works for any API endpoint and data type

### 5. Error Handling
Graceful error handling with user-friendly messages

### 6. Performance
Use `useCallback` to prevent unnecessary re-renders

## 🚀 Usage Examples

### Basic Usage
```typescript
const { data, loading, error, refetch } = useFetch<User[]>(
  'https://api.example.com/users'
);
```

### With Options
```typescript
const { data, loading, error } = useFetch<Post>(
  'https://api.example.com/posts/1',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
```

### Dynamic URL
```typescript
const [userId, setUserId] = useState(1);
const { data } = useFetch<User>(
  `https://api.example.com/users/${userId}`
);
// Automatically refetches when userId changes
```

## 🔍 Common Pitfalls Avoided

### 1. Race Conditions
✅ AbortController prevents outdated responses from updating state

### 2. Memory Leaks
✅ Cleanup function cancels pending requests

### 3. State Updates on Unmounted Components
✅ Signal checks prevent updates after abort

### 4. Missing Error Handling
✅ Comprehensive try-catch with type-safe error messages

### 5. Unnecessary Re-renders
✅ useCallback memoizes refetch function

## 📚 Learning Outcomes

After completing this exercise, you should understand:

1. ✅ How to create custom hooks
2. ✅ TypeScript generics in React
3. ✅ Managing complex state
4. ✅ Side effects and cleanup
5. ✅ Request cancellation
6. ✅ Error handling patterns
7. ✅ Performance optimization with useCallback
8. ✅ Type-safe API integration

## 🎓 Next Steps

Try these enhancements:
1. Add caching mechanism
2. Implement retry logic
3. Add request debouncing
4. Support POST/PUT/DELETE methods
5. Add timeout functionality
6. Implement pagination support

## 📖 Additional Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [AbortController MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)