import { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// Simulate heavy computation
function filterItems(items: string[], query: string): string[] {
  if (!query) return items;
  
  // Simulate expensive filtering
  const startTime = performance.now();
  while (performance.now() - startTime < 40) {
    // Artificial delay
  }
  
  return items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}

// Generate large dataset
const generateItems = (count: number): string[] => {
  const categories = ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Node.js", "Python", "Java"];
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    items.push(`${category} Tutorial ${i + 1}`);
  }
  return items;
};

const ITEMS = generateItems(5000);

// Example 1: Search with Transition
function TransitionSearch() {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(ITEMS);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value); // Urgent: update input immediately
    
    startTransition(() => {
      // Non-urgent: filter results
      setFilteredItems(filterItems(ITEMS, value));
    });
  }

  return (
    <div className="example-section">
      <h3>🔍 Search with useTransition</h3>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search 5000 items..."
          className="search-input"
        />
        {isPending && <span className="pending-indicator">Filtering...</span>}
      </div>
      
      <div className="results-info">
        <p>Found {filteredItems.length} items</p>
      </div>
      
      <div className={`results-list ${isPending ? "pending" : ""}`}>
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
      
      <p className="hint">
        💡 Notice how the input remains responsive while filtering happens in the background
      </p>
    </div>
  );
}

// Example 2: Tab Switching with Transition
interface TabContent {
  id: string;
  title: string;
  items: string[];
}

function generateTabContent(id: string, count: number): string[] {
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    items.push(`${id} Item ${i + 1}`);
  }
  return items;
}

const TABS: TabContent[] = [
  { id: "posts", title: "Posts", items: generateTabContent("Post", 1000) },
  { id: "comments", title: "Comments", items: generateTabContent("Comment", 1000) },
  { id: "users", title: "Users", items: generateTabContent("User", 1000) },
];

function TransitionTabs() {
  const [activeTab, setActiveTab] = useState("posts");
  const [isPending, startTransition] = useTransition();

  function handleTabChange(tabId: string) {
    startTransition(() => {
      setActiveTab(tabId);
    });
  }

  const currentTab = TABS.find((tab) => tab.id === activeTab)!;

  return (
    <div className="example-section">
      <h3>📑 Tab Switching with Transition</h3>
      <div className="tabs-container">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            disabled={isPending}
          >
            {tab.title} ({tab.items.length})
          </button>
        ))}
      </div>
      
      {isPending && (
        <div className="loading-banner">
          <span>Loading {TABS.find(t => t.id !== activeTab)?.title}...</span>
        </div>
      )}
      
      <div className={`tab-content ${isPending ? "pending" : ""}`}>
        <h4>{currentTab.title}</h4>
        {currentTab.items.slice(0, 20).map((item, index) => (
          <div key={index} className="tab-item">
            {item}
          </div>
        ))}
        <div className="more-results">... and {currentTab.items.length - 20} more items</div>
      </div>
      
      <p className="hint">
        💡 Tabs switch smoothly without blocking the UI
      </p>
    </div>
  );
}

// Example 3: Comparison - Without useTransition
function RegularSearch() {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(ITEMS);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    setFilteredItems(filterItems(ITEMS, value));
  }

  return (
    <div className="example-section comparison">
      <h3>🐌 Without useTransition (Comparison)</h3>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search 5000 items..."
          className="search-input"
        />
      </div>
      
      <div className="results-info">
        <p>Found {filteredItems.length} items</p>
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
      
      <p className="hint warning">
        ⚠️ Notice the input lag when typing quickly - all updates are treated as urgent
      </p>
    </div>
  );
}

// Example 4: List Sorting with Transition
interface Item {
  id: number;
  name: string;
  price: number;
  rating: number;
}

const generateProducts = (count: number): Item[] => {
  const products: Item[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: i,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 10,
      rating: Math.floor(Math.random() * 5) + 1,
    });
  }
  return products;
};

const PRODUCTS = generateProducts(2000);

function TransitionSorting() {
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [sortedItems, setSortedItems] = useState(PRODUCTS);
  const [isPending, startTransition] = useTransition();

  function handleSort(newSortBy: "name" | "price" | "rating") {
    setSortBy(newSortBy); // Urgent: update button state
    
    startTransition(() => {
      // Non-urgent: sort items
      const sorted = [...PRODUCTS].sort((a, b) => {
        if (newSortBy === "name") return a.name.localeCompare(b.name);
        if (newSortBy === "price") return a.price - b.price;
        return b.rating - a.rating;
      });
      
      // Simulate expensive operation
      const startTime = performance.now();
      while (performance.now() - startTime < 50) {
        // Artificial delay
      }
      
      setSortedItems(sorted);
    });
  }

  return (
    <div className="example-section">
      <h3>📊 List Sorting with Transition</h3>
      <div className="sort-controls">
        <button
          onClick={() => handleSort("name")}
          className={`sort-button ${sortBy === "name" ? "active" : ""}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => handleSort("price")}
          className={`sort-button ${sortBy === "price" ? "active" : ""}`}
        >
          Sort by Price
        </button>
        <button
          onClick={() => handleSort("rating")}
          className={`sort-button ${sortBy === "rating" ? "active" : ""}`}
        >
          Sort by Rating
        </button>
        {isPending && <span className="pending-indicator">Sorting...</span>}
      </div>
      
      <div className={`items-list ${isPending ? "pending" : ""}`}>
        {sortedItems.slice(0, 30).map((item) => (
          <div key={item.id} className="list-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price}</span>
            <span className="item-rating">⭐ {item.rating}</span>
          </div>
        ))}
        <div className="more-results">... and {sortedItems.length - 30} more items</div>
      </div>
      
      <p className="hint">
        💡 Sort buttons respond instantly, list updates smoothly
      </p>
    </div>
  );
}

export default function UseTransitionExample() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useTransition Hook</h1>
        <p className="feature-description">
          Mark state updates as non-urgent to keep the UI responsive
        </p>
        <div className="navigation-links">
          <Link to="/" className="nav-link">
            ← Home
          </Link>
          <Link to="/use-transition/exercise" className="nav-link">
            Try Exercise →
          </Link>
        </div>
      </div>

      <div className="examples-container">
        <TransitionSearch />
        <RegularSearch />
        <TransitionTabs />
        <TransitionSorting />
      </div>

      <div className="code-section">
        <h2>📖 How It Works</h2>
        <pre className="code-block">
          {`import { useTransition } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleSearch(value) {
    // Urgent: update input immediately
    setQuery(value);
    
    // Non-urgent: filter results
    startTransition(() => {
      setResults(filterData(value));
    });
  }

  return (
    <>
      <input value={query} onChange={e => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <Results data={results} />
    </>
  );
}`}
        </pre>

        <h2>✨ Key Benefits</h2>
        <ul className="benefits-list">
          <li>
            <strong>Responsive UI:</strong> Urgent updates happen immediately
          </li>
          <li>
            <strong>Better UX:</strong> Show pending states during transitions
          </li>
          <li>
            <strong>Prioritized Updates:</strong> React handles scheduling automatically
          </li>
          <li>
            <strong>Interruptible:</strong> New transitions can interrupt old ones
          </li>
        </ul>

        <h2>🎯 When to Use</h2>
        <div className="use-cases">
          <div className="use-case-card">
            <h3>✅ Good Use Cases</h3>
            <ul>
              <li>Search/filter with large datasets</li>
              <li>Tab switching with heavy content</li>
              <li>Sorting/pagination operations</li>
              <li>Complex form updates</li>
              <li>Data visualization updates</li>
            </ul>
          </div>
          <div className="use-case-card">
            <h3>❌ Not Needed For</h3>
            <ul>
              <li>Simple, fast operations</li>
              <li>User input fields</li>
              <li>Critical feedback (errors, validation)</li>
              <li>Small datasets</li>
              <li>Already optimized code</li>
            </ul>
          </div>
        </div>

        <h2>🔄 useTransition vs useDeferredValue</h2>
        <div className="comparison-table">
          <div className="comparison-row">
            <div className="comparison-cell">
              <h4>useTransition</h4>
              <ul>
                <li>Marks state updates as transitions</li>
                <li>Use when you control the state update</li>
                <li>Provides isPending flag</li>
                <li>Good for local state</li>
                <li>More explicit control</li>
              </ul>
            </div>
            <div className="comparison-cell">
              <h4>useDeferredValue</h4>
              <ul>
                <li>Defers a value</li>
                <li>Use when you can't control the update</li>
                <li>No isPending flag (check manually)</li>
                <li>Good for props from parent</li>
                <li>Simpler API</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>💡 Best Practices</h2>
        <div className="best-practices">
          <div className="practice-card">
            <h3>✅ Do</h3>
            <ul>
              <li>Use for non-urgent state updates</li>
              <li>Show isPending indicators</li>
              <li>Keep urgent updates outside transitions</li>
              <li>Combine with Suspense when appropriate</li>
              <li>Test with realistic data sizes</li>
            </ul>
          </div>
          <div className="practice-card">
            <h3>❌ Don't</h3>
            <ul>
              <li>Wrap urgent updates in transitions</li>
              <li>Use for network requests (use Suspense)</li>
              <li>Forget to show pending states</li>
              <li>Use as first optimization attempt</li>
              <li>Wrap every state update</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
