import { useState, useMemo } from 'react';
import './App.css';

// ============================================
// Example 1: React 19 - No useMemo Needed for Simple Calculations
// ============================================
function SimpleCalculationExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ React 18: Would need useMemo to prevent recalculation
  // ✅ React 19: Automatically memoized - no useMemo needed!
  const doubled = count * 2;
  const tripled = count * 3;

  console.log('SimpleCalculationExample rendered');

  return (
    <div className="example-card">
      <h2>🎯 Example 1: Simple Calculations (No useMemo Needed)</h2>
      <p className="description">
        React 19 automatically memoizes simple calculations. No need for useMemo!
      </p>
      
      <div className="controls">
        <div className="control-group">
          <label>Count: {count}</label>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
        
        <div className="control-group">
          <label>Type something (doesn't affect calculations):</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
          />
        </div>
      </div>

      <div className="results">
        <div className="result-item">
          <strong>Doubled:</strong> {doubled}
        </div>
        <div className="result-item">
          <strong>Tripled:</strong> {tripled}
        </div>
      </div>

      <div className="code-example">
        <pre>{`// ✅ React 19: No useMemo needed!
const doubled = count * 2;
const tripled = count * 3;

// ❌ React 18: Would need this
// const doubled = useMemo(() => count * 2, [count]);`}</pre>
      </div>
    </div>
  );
}

// ============================================
// Example 2: React 19 - No useMemo Needed for Object/Array Creation
// ============================================
function ObjectCreationExample() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [age, setAge] = useState(25);

  // ❌ React 18: Would need useMemo to prevent new object creation
  // ✅ React 19: Automatically memoized if values don't change!
  const user = {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    age,
  };

  const hobbies = ['Reading', 'Coding', 'Gaming'];

  console.log('ObjectCreationExample rendered');

  return (
    <div className="example-card">
      <h2>🎯 Example 2: Object/Array Creation (No useMemo Needed)</h2>
      <p className="description">
        React 19 automatically memoizes objects and arrays when their values don't change.
      </p>

      <div className="controls">
        <div className="control-group">
          <label>First Name:</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        
        <div className="control-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="control-group">
          <label>Age: {age}</label>
          <button onClick={() => setAge(age + 1)}>+</button>
          <button onClick={() => setAge(age - 1)}>-</button>
        </div>
      </div>

      <div className="results">
        <div className="result-item">
          <strong>User Object:</strong>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
        <div className="result-item">
          <strong>Hobbies Array:</strong>
          <pre>{JSON.stringify(hobbies, null, 2)}</pre>
        </div>
      </div>

      <div className="code-example">
        <pre>{`// ✅ React 19: No useMemo needed!
const user = {
  firstName,
  lastName,
  fullName: \`\${firstName} \${lastName}\`,
  age,
};

// ❌ React 18: Would need this
// const user = useMemo(() => ({
//   firstName,
//   lastName,
//   fullName: \`\${firstName} \${lastName}\`,
//   age,
// }), [firstName, lastName, age]);`}</pre>
      </div>
    </div>
  );
}

// ============================================
// Example 3: STILL NEED useMemo - Expensive Calculations
// ============================================
function ExpensiveCalculationExample() {
  const [number, setNumber] = useState(1000);
  const [text, setText] = useState('');

  // Expensive calculation - simulate heavy computation
  function calculatePrimes(max: number): number[] {
    console.log('🔴 Calculating primes... (expensive operation)');
    const primes: number[] = [];
    for (let i = 2; i <= max; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    return primes;
  }

  // ✅ STILL NEED useMemo for expensive calculations!
  const primes = useMemo(() => {
    return calculatePrimes(number);
  }, [number]);

  // ❌ Without useMemo, this would recalculate on every render
  // const primes = calculatePrimes(number);

  console.log('ExpensiveCalculationExample rendered');

  return (
    <div className="example-card expensive">
      <h2>⚠️ Example 3: Expensive Calculations (STILL NEED useMemo)</h2>
      <p className="description">
        React 19 doesn't automatically memoize expensive computations. Use useMemo!
      </p>

      <div className="controls">
        <div className="control-group">
          <label>Calculate primes up to: {number}</label>
          <input 
            type="range" 
            min="100" 
            max="5000" 
            step="100"
            value={number} 
            onChange={(e) => setNumber(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Type something (watch console):</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to trigger re-render..."
          />
        </div>
      </div>

      <div className="results">
        <div className="result-item">
          <strong>Prime Numbers Found:</strong> {primes.length}
        </div>
        <div className="result-item">
          <strong>First 10 Primes:</strong> {primes.slice(0, 10).join(', ')}
        </div>
      </div>

      <div className="code-example">
        <pre>{`// ✅ STILL NEED useMemo for expensive operations!
const primes = useMemo(() => {
  return calculatePrimes(number);
}, [number]);

// ❌ Without useMemo: recalculates on EVERY render
// const primes = calculatePrimes(number);`}</pre>
      </div>

      <div className="warning">
        <strong>⚠️ Note:</strong> Type in the text field and watch the console. 
        With useMemo, primes are only recalculated when 'number' changes!
      </div>
    </div>
  );
}

// ============================================
// Example 4: STILL NEED useMemo - Filtering Large Lists
// ============================================
function FilteringExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Generate large dataset (memoized to avoid regeneration)
  const allItems = useMemo(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: (i * 7) % 1000, // Deterministic value instead of random
    }))
  , []);

  // ✅ STILL NEED useMemo for filtering/sorting large datasets!
  const filteredAndSorted = useMemo(() => {
    console.log('🔴 Filtering and sorting... (expensive operation)');
    
    const result = allItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) =>
      sortOrder === 'asc' ? a.value - b.value : b.value - a.value
    );

    return result;
  }, [allItems, searchTerm, sortOrder]);

  console.log('FilteringExample rendered');

  return (
    <div className="example-card expensive">
      <h2>⚠️ Example 4: Large List Filtering (STILL NEED useMemo)</h2>
      <p className="description">
        Filtering/sorting large datasets is expensive. Use useMemo!
      </p>

      <div className="controls">
        <div className="control-group">
          <label>Search (10,000 items):</label>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
          />
        </div>

        <div className="control-group">
          <label>Sort Order:</label>
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className={sortOrder === 'asc' ? 'active' : ''}
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>
      </div>

      <div className="results">
        <div className="result-item">
          <strong>Filtered Results:</strong> {filteredAndSorted.length} items
        </div>
        <div className="result-item">
          <strong>First 5 Items:</strong>
          <ul>
            {filteredAndSorted.slice(0, 5).map(item => (
              <li key={item.id}>
                {item.name} - Value: {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="code-example">
        <pre>{`// ✅ STILL NEED useMemo for large list operations!
const filteredAndSorted = useMemo(() => {
  let result = allItems.filter(item => 
    item.name.includes(searchTerm)
  );
  result.sort((a, b) => 
    sortOrder === 'asc' ? a.value - b.value : b.value - a.value
  );
  return result;
}, [searchTerm, sortOrder]);`}</pre>
      </div>

      <div className="warning">
        <strong>⚠️ Note:</strong> Watch the console. Filtering only happens 
        when searchTerm or sortOrder changes!
      </div>
    </div>
  );
}

// ============================================
// Main App Component
// ============================================
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ React 19: useMemo Guide</h1>
        <p className="subtitle">
          Understanding when you DON'T need useMemo and when you STILL DO
        </p>
      </header>

      <div className="summary-card">
        <h2>📚 Summary</h2>
        <div className="summary-grid">
          <div className="summary-item no-memo">
            <h3>✅ No useMemo Needed (React 19)</h3>
            <ul>
              <li>Simple calculations (x * 2, x + y)</li>
              <li>Object/array creation with stable values</li>
              <li>String concatenation</li>
              <li>Basic transformations</li>
            </ul>
          </div>
          <div className="summary-item need-memo">
            <h3>⚠️ Still Need useMemo</h3>
            <ul>
              <li>Expensive calculations (loops, recursion)</li>
              <li>Large list filtering/sorting</li>
              <li>Complex data transformations</li>
              <li>Heavy computations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="examples-container">
        <SimpleCalculationExample />
        <ObjectCreationExample />
        <ExpensiveCalculationExample />
        <FilteringExample />
      </div>

      <footer className="app-footer">
        <p>
          💡 <strong>Pro Tip:</strong> In React 19, start without useMemo. 
          Add it only when you identify performance issues through profiling.
        </p>
      </footer>
    </div>
  );
}

export default App;

