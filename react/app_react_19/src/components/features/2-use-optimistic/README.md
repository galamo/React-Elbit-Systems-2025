# React 19: useOptimistic Hook

## What is it?

`useOptimistic` lets you show a different state while an async action is in progress, providing instant feedback to users.

## Key Features

- **Instant UI Updates**: Show optimistic state immediately
- **Automatic Rollback**: Reverts on error
- **Better UX**: No waiting for server response
- **Simple API**: Easy to implement

## Basic Syntax

```tsx
import { useOptimistic } from 'react';

const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (currentState, optimisticValue) => {
    // Return new state with optimistic update
    return [...currentState, optimisticValue];
  }
);
```

## Use Cases

1. **Like/Unlike**: Instant feedback on social actions
2. **Add to Cart**: Immediate cart updates
3. **Form Submissions**: Show pending state
4. **Comments**: Display comment before server confirms

## Example

```tsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, amount) => state + amount
  );

  async function handleLike() {
    addOptimisticLike(1);
    await updateLikes(postId);
    setLikes(likes + 1);
  }

  return <button onClick={handleLike}>{optimisticLikes} ❤️</button>;
}
```

## Best Practices

1. Always update real state after async operation
2. Handle errors and rollback if needed
3. Use for user-initiated actions
4. Keep optimistic updates simple