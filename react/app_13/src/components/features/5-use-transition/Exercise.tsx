import { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// Generate data
const generateItems = (count: number, prefix: string): string[] => {
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    items.push(`${prefix} ${i + 1}`);
  }
  return items;
};

// Simulate expensive filtering
function filterItems(items: string[], query: string): string[] {
  if (!query) return items;
  
  const startTime = performance.now();
  while (performance.now() - startTime < 40) {
    // Simulate expensive operation
  }
  
  return items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}

const LIBRARY_ITEMS = generateItems(4000, "Book");

// Exercise 1: Library Search with Transition
function TransitionLibrarySearch() {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(LIBRARY_ITEMS);

  // TODO: Add useTransition hook
  // Hint: const [isPending, startTransition] = useTransition();
  const isPending = false; // Replace this

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    
    // TODO: Update query immediately (urgent update)
    // TODO: Wrap the filtering in startTransition (non-urgent update)
    // Hint: setQuery should be outside transition
    // Hint: setFilteredBooks should be inside transition
    
    setQuery(value);
    setFilteredBooks(filterItems(LIBRARY_ITEMS, value));
  }

  return (
    <div className="exercise-section">
      <h3>📚 Exercise 1: Library Search</h3>
      <p className="exercise-description">
        Implement useTransition to keep the search input responsive while filtering 4000 books
      </p>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search library..."
          className="search-input"
        />
        {/* TODO: Show pending indicator when isPending is true */}
      </div>

      <div className="results-info">
        <p>Found {filteredBooks.length} books</p>
      </div>

      <div className={`results-list ${isPending ? "pending" : ""}`}>
        {filteredBooks.slice(0, 40).map((book, index) => (
          <div key={index} className="result-item">
            {book}
          </div>
        ))}
        {filteredBooks.length > 40 && (
          <div className="more-results">
            ... and {filteredBooks.length - 40} more books
          </div>
        )}
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Use useTransition to get isPending and startTransition</li>
          <li>Keep setQuery outside the transition (urgent)</li>
          <li>Wrap setFilteredBooks in startTransition (non-urgent)</li>
          <li>Show a "Searching..." indicator when isPending is true</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 2: Dashboard Tabs with Transition
interface DashboardTab {
  id: string;
  name: string;
  data: string[];
}

const DASHBOARD_TABS: DashboardTab[] = [
  { id: "analytics", name: "Analytics", data: generateItems(800, "Analytics Item") },
  { id: "reports", name: "Reports", data: generateItems(800, "Report") },
  { id: "settings", name: "Settings", data: generateItems(800, "Setting") },
  { id: "users", name: "Users", data: generateItems(800, "User") },
];

function TransitionDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  // TODO: Add useTransition hook
  const isPending = false; // Replace this

  function handleTabChange(tabId: string) {
    // TODO: Wrap setActiveTab in startTransition
    // Hint: startTransition(() => { setActiveTab(tabId); });
    setActiveTab(tabId);
  }

  const currentTab = DASHBOARD_TABS.find((tab) => tab.id === activeTab)!;

  return (
    <div className="exercise-section">
      <h3>📊 Exercise 2: Dashboard Tabs</h3>
      <p className="exercise-description">
        Use useTransition to make tab switching smooth and responsive
      </p>

      <div className="tabs-container">
        {DASHBOARD_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            disabled={isPending}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* TODO: Show loading banner when isPending is true */}

      <div className={`tab-content ${isPending ? "pending" : ""}`}>
        <h4>{currentTab.name}</h4>
        {currentTab.data.slice(0, 25).map((item, index) => (
          <div key={index} className="tab-item">
            {item}
          </div>
        ))}
        <div className="more-results">
          ... and {currentTab.data.length - 25} more items
        </div>
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Wrap the setActiveTab call in startTransition</li>
          <li>Disable buttons while isPending is true</li>
          <li>Show a loading banner during transitions</li>
          <li>Add pending class to content for visual feedback</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 3: Product Filtering with Multiple Criteria
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const generateProducts = (count: number): Product[] => {
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: i,
      name: `Product ${i + 1}`,
      category: categories[i % categories.length],
      price: Math.floor(Math.random() * 500) + 10,
      inStock: Math.random() > 0.3,
    });
  }
  return products;
};

const PRODUCTS = generateProducts(3000);

function filterProducts(
  products: Product[],
  category: string,
  inStockOnly: boolean,
  maxPrice: number
): Product[] {
  // Simulate expensive filtering
  const startTime = performance.now();
  while (performance.now() - startTime < 50) {
    // Artificial delay
  }

  return products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesStock = !inStockOnly || product.inStock;
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesStock && matchesPrice;
  });
}

function TransitionProductFilter() {
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

  // TODO: Add useTransition hook
  const isPending = false; // Replace this

  function handleFilterChange(
    newCategory?: string,
    newInStockOnly?: boolean,
    newMaxPrice?: number
  ) {
    // Update filter states immediately (urgent)
    if (newCategory !== undefined) setCategory(newCategory);
    if (newInStockOnly !== undefined) setInStockOnly(newInStockOnly);
    if (newMaxPrice !== undefined) setMaxPrice(newMaxPrice);

    // TODO: Wrap the filtering in startTransition (non-urgent)
    const filtered = filterProducts(
      PRODUCTS,
      newCategory ?? category,
      newInStockOnly ?? inStockOnly,
      newMaxPrice ?? maxPrice
    );
    setFilteredProducts(filtered);
  }

  return (
    <div className="exercise-section">
      <h3>🛍️ Exercise 3: Product Filtering</h3>
      <p className="exercise-description">
        Implement transitions for smooth filtering with multiple criteria
      </p>

      <div className="filter-controls">
        <div className="filter-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => handleFilterChange(undefined, e.target.checked)}
            />
            In Stock Only
          </label>
        </div>

        <div className="filter-group">
          <label>
            Max Price: ${maxPrice}
            <input
              type="range"
              min="10"
              max="500"
              value={maxPrice}
              onChange={(e) => handleFilterChange(undefined, undefined, Number(e.target.value))}
              className="price-slider"
            />
          </label>
        </div>

        {/* TODO: Show filtering indicator when isPending */}
      </div>

      <div className="results-info">
        <p>Found {filteredProducts.length} products</p>
      </div>

      <div className={`products-grid ${isPending ? "pending" : ""}`}>
        {filteredProducts.slice(0, 20).map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p className="product-category">{product.category}</p>
            <p className="product-price">${product.price}</p>
            <p className={`product-stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
              {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
            </p>
          </div>
        ))}
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Keep filter state updates outside the transition</li>
          <li>Wrap only the expensive filtering in startTransition</li>
          <li>Show "Filtering..." indicator when isPending</li>
          <li>All filter controls should remain responsive</li>
        </ul>
      </div>
    </div>
  );
}

export default function UseTransitionExercise() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useTransition Hook - Exercises</h1>
        <p className="feature-description">
          Practice implementing transitions for responsive UIs
        </p>
        <div className="navigation-links">
          <Link to="/use-transition" className="nav-link">
            ← Back to Examples
          </Link>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>

      <div className="exercises-container">
        <TransitionLibrarySearch />
        <TransitionDashboard />
        <TransitionProductFilter />
      </div>

      <div className="completion-checklist">
        <h2>✅ Completion Checklist</h2>
        <ul>
          <li>
            <input type="checkbox" id="ex1" />
            <label htmlFor="ex1">
              Library search input remains responsive while filtering
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex2" />
            <label htmlFor="ex2">
              Pending indicator shows during search
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex3" />
            <label htmlFor="ex3">
              Dashboard tabs switch smoothly without blocking
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex4" />
            <label htmlFor="ex4">
              Product filters remain responsive during updates
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex5" />
            <label htmlFor="ex5">
              Visual feedback shows during all transitions
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

// 
