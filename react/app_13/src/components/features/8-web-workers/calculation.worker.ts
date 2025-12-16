/**
 * Web Worker for Heavy Calculations
 *
 * Web Workers run in a separate thread from the main UI thread.
 * This prevents blocking the UI during intensive computations.
 *
 * Key Benefits:
 * - Non-blocking: UI remains responsive during calculations
 * - Parallel processing: Utilizes multiple CPU cores
 * - Better UX: No frozen interface during heavy operations
 *
 * Communication:
 * - Main thread sends data via postMessage()
 * - Worker receives via onmessage event
 * - Worker sends results back via postMessage()
 */

// Listen for messages from the main thread
self.onmessage = (e: MessageEvent) => {
  const { type, data } = e.data;

  switch (type) {
    case "CALCULATE_PRIMES": {
      // Perform heavy calculation: find prime numbers up to a limit
      const primes = calculatePrimes(data.limit);

      // Send result back to main thread
      self.postMessage({
        type: "PRIMES_RESULT",
        data: { primes, count: primes.length },
      });
      break;
    }

    case "FIBONACCI": {
      // Calculate Fibonacci sequence
      const fibonacci = calculateFibonacci(data.n);

      self.postMessage({
        type: "FIBONACCI_RESULT",
        data: { result: fibonacci },
      });
      break;
    }

    case "HEAVY_COMPUTATION": {
      // Simulate heavy computation with progress updates
      performHeavyComputation(data.iterations);
      break;
    }

    default:
      self.postMessage({
        type: "ERROR",
        data: { message: "Unknown operation type" },
      });
  }
};

/**
 * Calculate all prime numbers up to a given limit
 * Time Complexity: O(n * sqrt(n))
 * This is intentionally inefficient to demonstrate blocking behavior
 */
function calculatePrimes(limit: number): number[] {
  const primes: number[] = [];

  for (let num = 2; num <= limit; num++) {
    let isPrime = true;

    // Check if num is divisible by any number from 2 to sqrt(num)
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(num);
    }
  }

  return primes;
}

/**
 * Calculate Fibonacci number recursively (inefficient on purpose)
 * Time Complexity: O(2^n) - exponential!
 */
function calculateFibonacci(n: number): number {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

/**
 * Perform heavy computation with progress updates
 * Demonstrates how workers can send intermediate results
 */
function performHeavyComputation(iterations: number): void {
  let result = 0;
  const chunkSize = Math.floor(iterations / 10);

  for (let i = 0; i < iterations; i++) {
    // Simulate complex calculation
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);

    // Send progress updates every 10%
    if (i % chunkSize === 0) {
      self.postMessage({
        type: "PROGRESS",
        data: {
          progress: Math.floor((i / iterations) * 100),
          currentResult: result,
        },
      });
    }
  }

  // Send final result
  self.postMessage({
    type: "COMPUTATION_COMPLETE",
    data: { result, iterations },
  });
}

// Export empty object to make this a module
export {};
