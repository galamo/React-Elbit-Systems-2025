# React 19: useTransition Improvements

## What's New in React 19?

React 19 improves `useTransition` with better performance, automatic batching, and enhanced concurrent rendering capabilities.

## Key Features

- **Improved Performance**: Faster transitions with better scheduling
- **Automatic Batching**: Multiple state updates batched automatically
- **Better Error Handling**: Improved error boundaries integration
- **Enhanced Suspense**: Better integration with Suspense boundaries

## Basic Syntax

```tsx
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

startTransition(() => {
  // Non-urgent state updates
  setSearchQuery(value);
});
```

## Use Cases

1. **Search/Filter**: Defer expensive filtering operations
2. **Tab Switching**: Smooth transitions between views
3. **Data Loading**: Show stale content while loading new data
4. **Heavy Computations**: Keep UI responsive during calculations

## Example

```tsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  
  function handleChange(e) {
    const value = e.target.value;
    setQuery(value); // Urgent: update input
    
    startTransition(() => {
      // Non-urgent: filter results
      setFilteredResults(filterData(value));
    });
  }
  
  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results data={filteredResults} />
    </>
  );
}
```

## Best Practices

1. Use for non-urgent updates
2. Show pending indicators
3. Keep urgent updates outside transitions
4. Combine with Suspense for better UX
5. Use for expensive operations