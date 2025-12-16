# Hooks

## use

## use optimistic 2

**useOptimistic Summary:**

`useOptimistic` must be wrapped in `startTransition` or a React Action, not for scheduling/delay, but for **lifecycle management**. React needs a clear boundary to know when to rollback, commit, or abandon optimistic updates during concurrent renders.

**Key Points:**

- `startTransition` is a **transaction boundary**, not a delay mechanism
- Optimistic updates still flush immediately inside transitions
- Without this boundary, React can't safely manage rollbacks when async operations fail or get interrupted
- The error enforces structure to prevent state corruption in concurrent scenarios

**Mental Model:** Think of `startTransition` as defining a "transaction scope" where React can track and reconcile temporary optimistic state, not as a way to deprioritize UI updates.

- setTodos((prev) => [...prev, { ...newTodo, isPending: false }]);

# Server Components

# MFS

- lecture
- examples

# Web Worker

- worker example

# e2e Tests

- playwright
