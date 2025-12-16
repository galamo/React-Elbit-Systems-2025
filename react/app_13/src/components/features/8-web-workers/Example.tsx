import { useState, useRef, useEffect } from "react";
import "./styles.css";

/**
 * Web Workers Example - Comparing Performance
 *
 * This example demonstrates the critical difference between:
 * 1. Running heavy calculations on the MAIN THREAD (blocks UI)
 * 2. Running heavy calculations in a WEB WORKER (non-blocking)
 *
 * Key Concepts:
 * - Main thread handles UI rendering and user interactions
 * - Heavy calculations on main thread = frozen UI
 * - Web Workers run in separate threads = responsive UI
 */

interface WorkerMessage {
  type: string;
  data: {
    primes?: number[];
    count?: number;
    result?: number;
    progress?: number;
    currentResult?: number;
    iterations?: number;
    message?: string;
  };
}

export default function WebWorkersExample() {
  // State for main thread calculation
  const [mainThreadResult, setMainThreadResult] = useState<string>("");
  const [mainThreadTime, setMainThreadTime] = useState<number>(0);
  const [isMainThreadBusy, setIsMainThreadBusy] = useState(false);

  // State for worker thread calculation
  const [workerResult, setWorkerResult] = useState<string>("");
  const [workerTime, setWorkerTime] = useState<number>(0);
  const [isWorkerBusy, setIsWorkerBusy] = useState(false);

  // State for UI responsiveness test
  const [counter, setCounter] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Reference to the Web Worker instance
  const workerRef = useRef<Worker | null>(null);

  /**
   * Initialize Web Worker on component mount
   * Workers are created from separate .ts files
   */
  useEffect(() => {
    // Create worker from the worker file
    // Note: Vite handles worker imports with ?worker suffix
    workerRef.current = new Worker(
      new URL("./calculation.worker.ts", import.meta.url),
      { type: "module" }
    );

    // Set up message handler for worker responses
    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, data } = e.data;

      switch (type) {
        case "PRIMES_RESULT":
          setWorkerResult(`Found ${data.count} prime numbers`);
          setIsWorkerBusy(false);
          break;

        case "FIBONACCI_RESULT":
          setWorkerResult(`Fibonacci result: ${data.result}`);
          setIsWorkerBusy(false);
          break;

        case "COMPUTATION_COMPLETE":
          setWorkerResult(
            `Computation complete: ${data.result?.toFixed(2) ?? "N/A"}`
          );
          setIsWorkerBusy(false);
          break;

        case "PROGRESS":
          setWorkerResult(`Progress: ${data.progress}%`);
          break;

        case "ERROR":
          setWorkerResult(`Error: ${data.message}`);
          setIsWorkerBusy(false);
          break;
      }
    };

    // Cleanup: terminate worker when component unmounts
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  /**
   * Animation loop to test UI responsiveness
   * This will stutter/freeze when main thread is blocked
   */
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setAnimationFrame((prev) => (prev + 1) % 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  /**
   * MAIN THREAD CALCULATION
   * This runs on the same thread as React rendering
   * Result: UI FREEZES during calculation
   */
  const calculateOnMainThread = (limit: number) => {
    setIsMainThreadBusy(true);
    setMainThreadResult("Calculating...");

    const startTime = performance.now();

    // This blocks the main thread!
    // Try clicking buttons or typing during this calculation
    const primes: number[] = [];
    for (let num = 2; num <= limit; num++) {
      let isPrime = true;
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

    const endTime = performance.now();
    const duration = endTime - startTime;

    setMainThreadResult(`Found ${primes.length} prime numbers`);
    setMainThreadTime(duration);
    setIsMainThreadBusy(false);
  };

  /**
   * WEB WORKER CALCULATION
   * This runs in a separate thread
   * Result: UI REMAINS RESPONSIVE during calculation
   */
  const calculateWithWorker = (limit: number) => {
    if (!workerRef.current) {
      setWorkerResult("Worker not initialized");
      return;
    }

    setIsWorkerBusy(true);
    setWorkerResult("Calculating...");

    const startTime = performance.now();

    // Send message to worker to start calculation
    // This is non-blocking! Main thread continues immediately
    workerRef.current.postMessage({
      type: "CALCULATE_PRIMES",
      data: { limit },
    });

    // Track time when result comes back
    const originalOnMessage = workerRef.current.onmessage;
    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      if (e.data.type === "PRIMES_RESULT") {
        const endTime = performance.now();
        setWorkerTime(endTime - startTime);
      }
      if (originalOnMessage && workerRef.current) {
        originalOnMessage.call(workerRef.current, e);
      }
    };
  };

  /**
   * Calculate Fibonacci on main thread (very slow for n > 40)
   */
  const fibonacciMainThread = (n: number) => {
    setIsMainThreadBusy(true);
    setMainThreadResult("Calculating Fibonacci...");

    const startTime = performance.now();

    // Recursive Fibonacci - exponential time complexity!
    const fib = (num: number): number => {
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    };

    const result = fib(n);
    const endTime = performance.now();

    setMainThreadResult(`Fibonacci(${n}) = ${result}`);
    setMainThreadTime(endTime - startTime);
    setIsMainThreadBusy(false);
  };

  /**
   * Calculate Fibonacci with worker
   */
  const fibonacciWorker = (n: number) => {
    if (!workerRef.current) return;

    setIsWorkerBusy(true);
    setWorkerResult("Calculating Fibonacci...");

    const startTime = performance.now();

    workerRef.current.postMessage({
      type: "FIBONACCI",
      data: { n },
    });

    const originalOnMessage = workerRef.current.onmessage;
    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      if (e.data.type === "FIBONACCI_RESULT") {
        const endTime = performance.now();
        setWorkerTime(endTime - startTime);
      }
      if (originalOnMessage && workerRef.current) {
        originalOnMessage.call(workerRef.current, e);
      }
    };
  };

  return (
    <div className="web-workers-container">
      <h1>🧵 Web Workers: Main Thread vs Worker Thread</h1>

      <div className="explanation-box">
        <h3>What are Web Workers?</h3>
        <p>
          Web Workers allow you to run JavaScript in background threads,
          separate from the main UI thread. This prevents heavy calculations
          from blocking user interactions and rendering.
        </p>
        <ul>
          <li>
            <strong>Main Thread:</strong> Handles UI, events, rendering
          </li>
          <li>
            <strong>Worker Thread:</strong> Handles heavy computations
          </li>
          <li>
            <strong>Communication:</strong> Via postMessage() API
          </li>
        </ul>
      </div>

      {/* UI Responsiveness Indicator */}
      <div className="responsiveness-test">
        <h3>UI Responsiveness Test</h3>
        <p>Watch this animation and counter during calculations:</p>
        <div className="test-controls">
          <div
            className="spinner"
            style={{ transform: `rotate(${animationFrame}deg)` }}
          >
            🔄
          </div>
          <div className="counter-display">
            <button onClick={() => setCounter((c) => c + 1)}>
              Click Me: {counter}
            </button>
            <p className="hint">Try clicking during calculations!</p>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="comparison-grid">
        {/* Main Thread Column */}
        <div className="calculation-column main-thread">
          <h2>🔴 Main Thread (Blocking)</h2>
          <div className="status-badge">
            {isMainThreadBusy ? "⏳ Busy - UI Frozen!" : "✅ Ready"}
          </div>

          <div className="controls">
            <button
              onClick={() => calculateOnMainThread(100000)}
              disabled={isMainThreadBusy}
              className="calc-button"
            >
              Calculate Primes (100k)
            </button>

            <button
              onClick={() => fibonacciMainThread(40)}
              disabled={isMainThreadBusy}
              className="calc-button"
            >
              Fibonacci(40)
            </button>
          </div>

          <div className="result-box">
            <h4>Result:</h4>
            <p>{mainThreadResult || "No calculation yet"}</p>
            {mainThreadTime > 0 && (
              <p className="time">⏱️ Time: {mainThreadTime.toFixed(2)}ms</p>
            )}
          </div>

          <div className="explanation">
            <h4>What happens:</h4>
            <ul>
              <li>❌ UI freezes during calculation</li>
              <li>❌ Animation stops</li>
              <li>❌ Buttons don't respond</li>
              <li>❌ User experience suffers</li>
            </ul>
          </div>
        </div>

        {/* Worker Thread Column */}
        <div className="calculation-column worker-thread">
          <h2>🟢 Web Worker (Non-blocking)</h2>
          <div className="status-badge">
            {isWorkerBusy ? "⏳ Working..." : "✅ Ready"}
          </div>

          <div className="controls">
            <button
              onClick={() => calculateWithWorker(100000)}
              disabled={isWorkerBusy}
              className="calc-button"
            >
              Calculate Primes (100k)
            </button>

            <button
              onClick={() => fibonacciWorker(40)}
              disabled={isWorkerBusy}
              className="calc-button"
            >
              Fibonacci(40)
            </button>
          </div>

          <div className="result-box">
            <h4>Result:</h4>
            <p>{workerResult || "No calculation yet"}</p>
            {workerTime > 0 && (
              <p className="time">⏱️ Time: {workerTime.toFixed(2)}ms</p>
            )}
          </div>

          <div className="explanation">
            <h4>What happens:</h4>
            <ul>
              <li>✅ UI stays responsive</li>
              <li>✅ Animation continues smoothly</li>
              <li>✅ Buttons work immediately</li>
              <li>✅ Great user experience</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="code-comparison">
        <h3>Code Comparison</h3>
        <div className="code-grid">
          <div className="code-block">
            <h4>Main Thread (Bad ❌)</h4>
            <pre>{`// Blocks UI!
const calculatePrimes = (limit) => {
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    // Heavy calculation...
  }
  return primes;
};

// UI freezes here
const result = calculatePrimes(100000);`}</pre>
          </div>

          <div className="code-block">
            <h4>Web Worker (Good ✅)</h4>
            <pre>{`// Create worker
const worker = new Worker(
  new URL('./worker.ts', import.meta.url)
);

// Send task (non-blocking!)
worker.postMessage({
  type: 'CALCULATE_PRIMES',
  data: { limit: 100000 }
});

// Receive result
worker.onmessage = (e) => {
  console.log(e.data.result);
};`}</pre>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="best-practices">
        <h3>When to Use Web Workers</h3>
        <div className="practices-grid">
          <div className="practice-card good">
            <h4>✅ Good Use Cases</h4>
            <ul>
              <li>Heavy mathematical calculations</li>
              <li>Large data processing</li>
              <li>Image/video manipulation</li>
              <li>Cryptography operations</li>
              <li>Parsing large files</li>
              <li>Complex algorithms</li>
            </ul>
          </div>

          <div className="practice-card bad">
            <h4>❌ Not Suitable For</h4>
            <ul>
              <li>DOM manipulation (workers can't access DOM)</li>
              <li>Quick operations (less than 16ms)</li>
              <li>Operations needing window/document</li>
              <li>Simple state updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="tips-box">
        <h3>💡 Performance Tips</h3>
        <ul>
          <li>
            <strong>Worker overhead:</strong> Creating workers has a small cost.
            Reuse workers for multiple tasks instead of creating new ones.
          </li>
          <li>
            <strong>Data transfer:</strong> Large data transfers between main
            thread and worker can be slow. Use Transferable Objects when
            possible.
          </li>
          <li>
            <strong>Number of workers:</strong> Don't create too many workers.
            Generally, use navigator.hardwareConcurrency to determine optimal
            count.
          </li>
          <li>
            <strong>Shared Workers:</strong> For tasks shared across
            tabs/windows, consider SharedWorker instead of Worker.
          </li>
        </ul>
      </div>
    </div>
  );
}
