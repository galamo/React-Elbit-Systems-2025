# Web Workers in React

## Overview

Web Workers allow you to run JavaScript code in background threads, separate from the main UI thread. This prevents heavy computations from blocking user interactions and rendering.

## Why Use Web Workers?

### The Problem: Main Thread Blocking

JavaScript is single-threaded. When you run heavy calculations on the main thread:

- ❌ UI freezes
- ❌ Animations stop
- ❌ User interactions are delayed
- ❌ Poor user experience

### The Solution: Web Workers

Web Workers run in separate threads:

- ✅ UI remains responsive
- ✅ Smooth animations
- ✅ Immediate user interactions
- ✅ Better performance

## How Web Workers Work

```
┌─────────────────┐         ┌─────────────────┐
│   Main Thread   │         │  Worker Thread  │
│                 │         │                 │
│  - UI Rendering │         │  - Heavy Calc   │
│  - User Events  │◄───────►│  - Data Process │
│  - React State  │postMsg  │  - No DOM Access│
└─────────────────┘         └─────────────────┘
```

## Key Concepts

### 1. Thread Separation

- **Main Thread**: Handles UI, events, React rendering
- **Worker Thread**: Handles computations, data processing
- **Communication**: Via `postMessage()` API

### 2. Worker Lifecycle

```typescript
// Create worker
const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

// Send message to worker
worker.postMessage({ type: "CALCULATE", data: { value: 100 } });

// Receive message from worker
worker.onmessage = (e) => {
  console.log("Result:", e.data);
};

// Cleanup
worker.terminate();
```

### 3. Worker File Structure

```typescript
// calculation.worker.ts
self.onmessage = (e: MessageEvent) => {
  const { type, data } = e.data;

  // Perform heavy calculation
  const result = heavyCalculation(data);

  // Send result back
  self.postMessage({ type: "RESULT", data: result });
};
```

## Performance Comparison

### Main Thread (Blocking)

```typescript
// ❌ Blocks UI during calculation
const calculatePrimes = (limit: number) => {
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    // Heavy calculation...
  }
  return primes; // UI frozen until this returns
};
```

### Web Worker (Non-blocking)

```typescript
// ✅ UI stays responsive
worker.postMessage({ type: "CALCULATE_PRIMES", data: { limit: 100000 } });
// Execution continues immediately, UI remains responsive

worker.onmessage = (e) => {
  // Result arrives asynchronously
  console.log("Primes calculated:", e.data);
};
```

## Best Practices

### When to Use Workers

✅ **Good Use Cases:**

- Mathematical calculations (prime numbers, Fibonacci, etc.)
- Large data processing (sorting, filtering large arrays)
- Image/video manipulation
- Cryptography operations
- Parsing large files (JSON, CSV, XML)
- Complex algorithms (pathfinding, simulations)

❌ **Not Suitable For:**

- DOM manipulation (workers can't access DOM)
- Quick operations (< 16ms)
- Operations requiring `window` or `document`
- Simple state updates

### Performance Tips

1. **Reuse Workers**

   ```typescript
   // ✅ Good: Reuse worker
   const worker = useRef<Worker>();

   useEffect(() => {
     worker.current = new Worker(...);
     return () => worker.current?.terminate();
   }, []);

   // ❌ Bad: Create new worker each time
   const handleClick = () => {
     const worker = new Worker(...); // Overhead!
   };
   ```

2. **Use Transferable Objects**

   ```typescript
   // ✅ Transfer ownership (zero-copy)
   const buffer = new ArrayBuffer(1024);
   worker.postMessage({ buffer }, [buffer]);

   // ❌ Clone data (slower for large data)
   worker.postMessage({ buffer });
   ```

3. **Limit Worker Count**

   ```typescript
   // Use hardware concurrency as guide
   const maxWorkers = navigator.hardwareConcurrency || 4;
   ```

4. **Handle Errors**
   ```typescript
   worker.onerror = (error) => {
     console.error("Worker error:", error);
   };
   ```

## Common Patterns

### 1. Progress Updates

```typescript
// Worker
for (let i = 0; i < total; i++) {
  // Work...
  if (i % 1000 === 0) {
    self.postMessage({
      type: "PROGRESS",
      data: { progress: (i / total) * 100 },
    });
  }
}
```

### 2. Cancellation

```typescript
// Main thread
let currentWorker: Worker | null = null;

const startWork = () => {
  currentWorker = new Worker(...);
};

const cancelWork = () => {
  currentWorker?.terminate();
  currentWorker = null;
};
```

### 3. Worker Pool

```typescript
class WorkerPool {
  private workers: Worker[] = [];
  private queue: Task[] = [];

  constructor(size: number) {
    for (let i = 0; i < size; i++) {
      this.workers.push(new Worker(...));
    }
  }

  execute(task: Task) {
    const worker = this.getAvailableWorker();
    worker.postMessage(task);
  }
}
```

## Limitations

1. **No DOM Access**: Workers can't manipulate the DOM
2. **No Window Object**: Can't access `window`, `document`, `localStorage`
3. **Limited APIs**: Some browser APIs are not available
4. **Communication Overhead**: Message passing has a small cost
5. **Debugging**: Harder to debug than main thread code

## Browser Support

Web Workers are supported in all modern browsers:

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Advanced Topics

### Shared Workers

For sharing workers across multiple tabs/windows:

```typescript
const sharedWorker = new SharedWorker("worker.js");
sharedWorker.port.postMessage("Hello");
```

### Service Workers

For offline functionality and caching:

```typescript
navigator.serviceWorker.register("/sw.js");
```

### OffscreenCanvas

For canvas operations in workers:

```typescript
const canvas = document.getElementById("canvas");
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

## Resources

- [MDN Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Transferable Objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)
- [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)

## Example Use Cases

### 1. Prime Number Calculation

Heavy mathematical computation that benefits from worker threads.

### 2. Fibonacci Sequence

Recursive algorithm with exponential time complexity.

### 3. Image Processing

Applying filters to images without blocking UI.

### 4. Data Parsing

Processing large JSON/CSV files.

### 5. Real-time Analytics

Computing statistics on streaming data.

## Conclusion

Web Workers are essential for building performant web applications that handle heavy computations. By offloading work to background threads, you ensure your UI remains responsive and provides a smooth user experience.

Remember: **Use workers for CPU-intensive tasks, not for everything!**
