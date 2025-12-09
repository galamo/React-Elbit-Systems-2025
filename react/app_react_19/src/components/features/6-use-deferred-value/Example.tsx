import { useState, useDeferredValue, useMemo } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// Simulate heavy computation
function filterItems(items: string[], query: string): string[] {
  if (!query) return items;
  
  // Simulate expensive filtering
  const startTime = performance.now();
  while (performance.now() - startTime < 50) {
    // Artificial delay to simulate heavy computation
  }
  
  return items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}

// Generate large dataset
const generateItems = (count: number): string[] => {
  const categories = ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Node.js"];
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    items.push(`${category} Item ${i + 1}`);
  }
  return items;
};

const ITEMS = generateItems(5000);

// Example 1: Search with Deferred Value
function DeferredSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  
  const filteredItems = useMemo(
    () => filterItems(ITEMS, deferredQuery),
    [deferredQuery]
  );
  
  const isStale = query !== deferredQuery;

  return (
    <div className="example-section">
      <h3>🔍 Deferred Search (5000 items)</h3>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="search-input"
        />
        {isStale && <span className="stale-indicator">Updating...</span>}
      </div>
      
      <div className="results-info">
        <p>Found {filteredItems.length} items</p>
        <p className="hint">
          💡 Notice how typing remains smooth even with heavy filtering
        </p>
      </div>
      
      <div className={`results-list ${isStale ? "stale" : ""}`}>
        {filteredItems.slice(0, 50).map((item, index) => (
          <div key={index} className="result-item">
            {item}
          </div>
        ))}
        {filteredItems.length > 50 && (
          <div className="more-results">
            ... and {filteredItems.length - 50} more items
          </div>
        )}
      </div>
    </div>
  );
}

// Example 2: Comparison - Without useDeferredValue
function RegularSearch() {
  const [query, setQuery] = useState("");
  
  const filteredItems = useMemo(
    () => filterItems(ITEMS, query),
    [query]
  );

  return (
    <div className="example-section comparison">
      <h3>🐌 Regular Search (Without Deferred)</h3>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="search-input"
        />
      </div>
      
      <div className="results-info">
        <p>Found {filteredItems.length} items</p>
        <p className="hint warning">
          ⚠️ Notice the input lag when typing quickly
        </p>
      </div>
      
      <div className="results-list">
        {filteredItems.slice(0, 50).map((item, index) => (
          <div key={index} className="result-item">
            {item}
          </div>
        ))}
        {filteredItems.length > 50 && (
          <div className="more-results">
            ... and {filteredItems.length - 50} more items
          </div>
        )}
      </div>
    </div>
  );
}

// Example 3: Deferred Tab Content
function DeferredTabs() {
  const [activeTab, setActiveTab] = useState<"posts" | "comments" | "users">("posts");
  const deferredTab = useDeferredValue(activeTab);
  
  const isStale = activeTab !== deferredTab;

  // Simulate heavy content rendering
  const renderContent = (tab: string) => {
    const items = [];
    for (let i = 0; i < 1000; i++) {
      items.push(
        <div key={i} className="tab-item">
          {tab} Item {i + 1}
        </div>
      );
    }
    return items;
  };

  return (
    <div className="example-section">
      <h3>📑 Deferred Tab Switching</h3>
      <div className="tabs-container">
        <button
          onClick={() => setActiveTab("posts")}
          className={`tab-button ${activeTab === "posts" ? "active" : ""}`}
        >
          Posts (1000)
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
        >
          Comments (1000)
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
        >
          Users (1000)
        </button>
      </div>
      
      {isStale && (
        <div className="loading-overlay">
          <span>Loading {activeTab}...</span>
        </div>
      )}
      
      <div className={`tab-content ${isStale ? "stale" : ""}`}>
        {renderContent(deferredTab).slice(0, 20)}
        <div className="more-results">... and 980 more items</div>
      </div>
      
      <p className="hint">
        💡 Tab switching feels instant, content updates smoothly
      </p>
    </div>
  );
}

export default function UseDeferredValueExample() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useDeferredValue Hook</h1>
        <p className="feature-description">
          Defer updating non-urgent parts of the UI to keep the interface responsive
        </p>
        <div className="navigation-links">
          <Link to="/" className="nav-link">
            ← Home
          </Link>
          <Link to="/use-deferred-value/exercise" className="nav-link">
            Try Exercise →
          </Link>
        </div>
      </div>

      <div className="examples-container">
        <DeferredSearch />
        <RegularSearch />
        <DeferredTabs />
      </div>

      <div className="code-section">
        <h2>📖 How It Works</h2>
        <pre className="code-block">
          {`import { useDeferredValue, useMemo } from 'react';

function SearchResults({ query }) {
  // Defer the query value
  const deferredQuery = useDeferredValue(query);
  
  // Use deferred value for expensive operations
  const results = useMemo(
    () => searchItems(deferredQuery),
    [deferredQuery]
  );
  
  // Check if UI is stale
  const isStale = query !== deferredQuery;

  return (
    <div className={isStale ? 'stale' : ''}>
      {results.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}`}
        </pre>

        <h2>✨ Key Benefits</h2>
        <ul className="benefits-list">
          <li>
            <strong>Responsive Input:</strong> User input remains smooth
          </li>
          <li>
            <strong>Prioritized Updates:</strong> Urgent updates happen first
          </li>
          <li>
            <strong>No Debouncing:</strong> No artificial delays needed
          </li>
          <li>
            <strong>Automatic:</strong> React handles the scheduling
          </li>
        </ul>

        <h2>🎯 When to Use</h2>
        <div className="use-cases">
          <div className="use-case-card">
            <h3>✅ Good Use Cases</h3>
            <ul>
              <li>Search with large datasets</li>
              <li>Filtering/sorting heavy lists</li>
              <li>Complex visualizations</li>
              <li>Heavy computations</li>
              <li>Tab switching with heavy content</li>
            </ul>
          </div>
          <div className="use-case-card">
            <h3>❌ Not Needed For</h3>
            <ul>
              <li>Simple, fast operations</li>
              <li>Small datasets</li>
              <li>Already optimized code</li>
              <li>Network requests (use Suspense)</li>
            </ul>
          </div>
        </div>

        <h2>🔄 useDeferredValue vs useTransition</h2>
        <div className="comparison-table">
          <div className="comparison-row">
            <div className="comparison-cell">
              <h4>useDeferredValue</h4>
              <ul>
                <li>Defers a value</li>
                <li>Use when you can't control the state update</li>
                <li>Good for props from parent</li>
                <li>Simpler API</li>
              </ul>
            </div>
            <div className="comparison-cell">
              <h4>useTransition</h4>
              <ul>
                <li>Marks state updates as transitions</li>
                <li>Use when you control the state update</li>
                <li>Good for local state</li>
                <li>More control with isPending</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>💡 Best Practices</h2>
        <div className="best-practices">
          <div className="practice-card">
            <h3>✅ Do</h3>
            <ul>
              <li>Combine with useMemo for expensive calculations</li>
              <li>Show visual feedback when stale</li>
              <li>Use for non-critical UI updates</li>
              <li>Test with realistic data sizes</li>
            </ul>
          </div>
          <div className="practice-card">
            <h3>❌ Don't</h3>
            <ul>
              <li>Use for critical user feedback</li>
              <li>Defer values that affect layout</li>
              <li>Use as a replacement for optimization</li>
              <li>Defer values used in effects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
