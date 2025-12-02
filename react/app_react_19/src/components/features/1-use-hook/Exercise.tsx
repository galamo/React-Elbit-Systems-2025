import { Suspense, use, useState } from "react";
import { Link } from "react-router-dom";

/**
 * EXERCISE: use() Hook Practice
 *
 * Complete the TODOs below to practice using the use() hook
 */

// TODO 1: Create a function that returns a Promise
// The promise should resolve after 1.5 seconds with a list of products
// Each product should have: id, name, price
const fetchProducts = (): Promise<
  Array<{ id: number; name: string; price: number }>
> => {
  // TODO: Implement this function
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // TODO: Add 3-5 products here
      ]);
    }, 1500);
  });
};

// TODO 2: Create the promise outside the component
// const productsPromise = ...

// TODO 3: Create a ProductList component that uses the use() hook
function ProductList() {
  // TODO: Use the use() hook to read the products promise
  // const products = use(productsPromise);

  return (
    <div className="demo-box">
      <h3>Product List</h3>
      {/* TODO: Map over products and display them */}
      <p>TODO: Display products here</p>
    </div>
  );
}

// TODO 4: Create a conditional data fetching example
// Create a component that only fetches data when a button is clicked
function ConditionalFetch() {
  const [shouldFetch, setShouldFetch] = useState(false);

  // TODO: Create a promise that fetches user data
  // const userPromise = shouldFetch ? fetchUser() : null;

  return (
    <div className="demo-box">
      <h3>Conditional Fetching</h3>
      <button onClick={() => setShouldFetch(true)}>Load User Data</button>

      {shouldFetch && (
        <Suspense fallback={<p>Loading user...</p>}>
          {/* TODO: Create a component that uses the use() hook */}
          <p>TODO: Display user data here</p>
        </Suspense>
      )}
    </div>
  );
}

export default function UseHookExercise() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>use() Hook - Exercise</h1>
        <p>Practice using the use() hook</p>
      </div>

      <div className="feature-nav">
        <Link to="/use-hook">← Back to Example</Link>
        <Link to="/">Home</Link>
      </div>

      <div className="exercise-container">
        <div className="section">
          <h2>📝 Instructions</h2>
          <p>Complete the following tasks:</p>
          <ol>
            <li>
              Create a <code>fetchProducts</code> function that returns a
              Promise
            </li>
            <li>Create the promise outside the component</li>
            <li>
              Use the <code>use()</code> hook to read the promise
            </li>
            <li>Display the products in a list</li>
            <li>Implement conditional data fetching</li>
          </ol>
        </div>

        <div className="section">
          <h2>🎯 Task 1: Product List</h2>
          <p>Fetch and display a list of products using the use() hook</p>

          {/* TODO: Wrap ProductList with Suspense */}
          <div className="warning-box">
            <p>⚠️ Remember to wrap with Suspense boundary!</p>
          </div>

          {/* <Suspense fallback={<div>Loading products...</div>}>
            <ProductList />
          </Suspense> */}

          <div className="demo-box">
            <p>TODO: Implement ProductList component above</p>
          </div>
        </div>

        <div className="section">
          <h2>🎯 Task 2: Conditional Fetching</h2>
          <p>Implement conditional data fetching with the use() hook</p>

          <ConditionalFetch />
        </div>

        <div className="section">
          <h2>💡 Hints</h2>
          <div className="info-box">
            <ul>
              <li>Create promises outside components or use useMemo</li>
              <li>Always wrap use() calls with Suspense</li>
              <li>The use() hook can be called conditionally</li>
              <li>Handle loading states with Suspense fallback</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <h2>✅ Expected Result</h2>
          <p>When complete, you should see:</p>
          <ul>
            <li>A loading state while fetching products</li>
            <li>A list of products with names and prices</li>
            <li>A button that conditionally loads user data</li>
            <li>Proper Suspense boundaries for all async operations</li>
          </ul>
        </div>

        <div className="section">
          <h2>🔗 Solution</h2>
          <p>Check the solutions folder for the complete implementation</p>
          <div className="success-box">
            <p>
              📁 <code>src/solutions/1-use-hook-solution.tsx</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
