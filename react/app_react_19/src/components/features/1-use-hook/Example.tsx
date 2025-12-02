import { Suspense, use } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Simulate API call
const fetchUser = (id: number): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`
      });
    }, 1000);
  });
};

// Create promise outside component
const userPromise = fetchUser(1);

function UserData() {
  // use() hook suspends until promise resolves
  const user = use(userPromise);
  
  return (
    <div className="demo-box">
      <h3>User Data:</h3>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default function UseHookExample() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>use() Hook</h1>
        <p className="feature-description">
          Read resources like Promises and Context in React 19
        </p>
        <div className="navigation-links">
          <Link to="/" className="nav-link">← Home</Link>
          <Link to="/use-hook/exercise" className="nav-link">Try Exercise →</Link>
        </div>
      </div>

      <div className="examples-container">
        <div className="example-section">
          <h2>📖 What is use()?</h2>
          <p>
            The <code>use()</code> hook lets you read the value of a resource like a Promise or Context.
            It suspends the component until the resource is ready.
          </p>
        </div>

        <div className="example-section">
          <h2>✨ Key Features</h2>
          <ul className="benefits-list">
            <li>Suspends component until Promise resolves</li>
            <li>Can be used conditionally (unlike other hooks)</li>
            <li>Works with Suspense boundaries</li>
            <li>Simplifies async data fetching</li>
          </ul>
        </div>

        <div className="example-section">
          <h2>💻 Live Example</h2>
          <p>This example fetches user data using the use() hook:</p>
          
          <Suspense fallback={
            <div className="demo-box">
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading user data...</p>
              </div>
            </div>
          }>
            <UserData />
          </Suspense>
        </div>
      </div>

      <div className="code-section">
        <h2>📝 Code Example</h2>
        <pre className="code-block">
{`import { use, Suspense } from 'react';

// Create promise outside component
const userPromise = fetch('/api/user/1')
  .then(res => res.json());

function UserData() {
  // use() suspends until promise resolves
  const user = use(userPromise);
  
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserData />
    </Suspense>
  );
}`}
        </pre>

        <h2>⚠️ Important Notes</h2>
        <div className="warning-box">
          <ul>
            <li>Must be wrapped in a Suspense boundary</li>
            <li>Promise should be created outside component or memoized</li>
            <li>Use Error Boundaries to handle errors</li>
            <li>Can be called conditionally (unlike other hooks)</li>
          </ul>
        </div>

        <h2>🆚 use() vs useEffect</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>use()</th>
                <th>useEffect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Suspends</td>
                <td>✅ Yes</td>
                <td>❌ No</td>
              </tr>
              <tr>
                <td>Conditional</td>
                <td>✅ Yes</td>
                <td>❌ No</td>
              </tr>
              <tr>
                <td>Server-side</td>
                <td>✅ Yes</td>
                <td>❌ No</td>
              </tr>
              <tr>
                <td>Loading state</td>
                <td>Automatic</td>
                <td>Manual</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>✅ Best Practices</h2>
        <div className="best-practices">
          <div className="practice-card">
            <h3>✅ Do</h3>
            <ul>
              <li>Create promises outside components or use useMemo</li>
              <li>Always wrap with Suspense boundary</li>
              <li>Use Error Boundaries for error handling</li>
              <li>Consider caching strategies for repeated requests</li>
            </ul>
          </div>
          <div className="practice-card">
            <h3>❌ Don't</h3>
            <ul>
              <li>Create promises inside component body</li>
              <li>Forget Suspense boundary</li>
              <li>Ignore error handling</li>
              <li>Use for synchronous operations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
