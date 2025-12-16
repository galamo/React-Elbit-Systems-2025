import { useState, useDeferredValue, useMemo } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// Generate product data
const generateProducts = (count: number) => {
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Toys"];
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: i,
      name: `Product ${i + 1}`,
      category: categories[i % categories.length],
      price: Math.floor(Math.random() * 1000) + 10,
      rating: (Math.random() * 5).toFixed(1),
    });
  }
  return products;
};

const PRODUCTS = generateProducts(3000);

// Simulate heavy filtering
function filterProducts(products: any[], query: string, category: string) {
  const startTime = performance.now();
  while (performance.now() - startTime < 30) {
    // Simulate expensive operation
  }
  
  return products.filter((product) => {
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query.toLowerCase())
      : true;
    const matchesCategory = category !== "all" ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });
}

// Exercise 1: Product Search with Deferred Value
function DeferredProductSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  // TODO: Create a deferred value for searchQuery
  // Hint: Use useDeferredValue(searchQuery)
  const deferredQuery = searchQuery; // Replace this

  // TODO: Use the deferred query in the filter
  const filteredProducts = useMemo(
    () => filterProducts(PRODUCTS, searchQuery, category), // Fix this to use deferredQuery
    [searchQuery, category] // Fix dependencies
  );

  // TODO: Check if the UI is stale
  const isStale = false; // Replace this

  return (
    <div className="exercise-section">
      <h3>🛍️ Exercise 1: Product Search</h3>
      <p className="exercise-description">
        Implement useDeferredValue to keep the search input responsive
      </p>

      <div className="search-controls">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="search-input"
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
          <option value="Sports">Sports</option>
          <option value="Toys">Toys</option>
        </select>

        {/* TODO: Show stale indicator when isStale is true */}
      </div>

      <div className="results-info">
        <p>Found {filteredProducts.length} products</p>
      </div>

      <div className={`products-grid ${isStale ? "stale" : ""}`}>
        {filteredProducts.slice(0, 20).map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p className="product-category">{product.category}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-rating">⭐ {product.rating}</p>
          </div>
        ))}
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Use useDeferredValue to defer the searchQuery</li>
          <li>Use the deferred value in useMemo dependencies</li>
          <li>Compare searchQuery !== deferredQuery to detect stale state</li>
          <li>Show a loading indicator when isStale is true</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 2: Data Visualization with Deferred Slider
function DeferredDataViz() {
  const [dataPoints, setDataPoints] = useState(100);

  // TODO: Create a deferred value for dataPoints
  const deferredDataPoints = dataPoints; // Replace this

  // Generate visualization data (expensive operation)
  const vizData = useMemo(() => {
    const startTime = performance.now();
    while (performance.now() - startTime < 50) {
      // Simulate expensive calculation
    }
    
    const data = [];
    for (let i = 0; i < deferredDataPoints; i++) {
      data.push({
        x: i,
        y: Math.sin(i / 10) * 50 + 50,
      });
    }
    return data;
  }, [deferredDataPoints]); // Fix dependencies if needed

  // TODO: Check if visualization is stale
  const isStale = false; // Replace this

  return (
    <div className="exercise-section">
      <h3>📊 Exercise 2: Data Visualization</h3>
      <p className="exercise-description">
        Use useDeferredValue to keep the slider responsive while rendering heavy visualizations
      </p>

      <div className="viz-controls">
        <label>
          Data Points: {dataPoints}
          <input
            type="range"
            min="10"
            max="1000"
            value={dataPoints}
            onChange={(e) => setDataPoints(Number(e.target.value))}
            className="slider"
          />
        </label>
        {/* TODO: Show updating indicator when isStale */}
      </div>

      <div className={`viz-container ${isStale ? "stale" : ""}`}>
        <svg width="100%" height="200" className="chart">
          <polyline
            points={vizData
              .map((point) => `${(point.x / deferredDataPoints) * 800},${150 - point.y}`)
              .join(" ")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
        </svg>
        <p className="viz-info">Rendering {vizData.length} data points</p>
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Defer the dataPoints value to keep slider smooth</li>
          <li>Use deferred value in the expensive calculation</li>
          <li>Show visual feedback during updates</li>
          <li>The slider should feel instant even with 1000 points</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 3: List Sorting with Deferred Value
function DeferredSorting() {
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [items] = useState(() => generateProducts(2000));

  // TODO: Create a deferred value for sortBy
  const deferredSortBy = sortBy; // Replace this

  // Expensive sorting operation
  const sortedItems = useMemo(() => {
    const startTime = performance.now();
    while (performance.now() - startTime < 40) {
      // Simulate expensive sort
    }

    return [...items].sort((a, b) => {
      if (deferredSortBy === "name") return a.name.localeCompare(b.name);
      if (deferredSortBy === "price") return a.price - b.price;
      return Number(b.rating) - Number(a.rating);
    });
  }, [items, deferredSortBy]); // Fix dependencies if needed

  // TODO: Check if list is stale
  const isStale = false; // Replace this

  return (
    <div className="exercise-section">
      <h3>📋 Exercise 3: List Sorting</h3>
      <p className="exercise-description">
        Implement deferred sorting to keep sort buttons responsive
      </p>

      <div className="sort-controls">
        <button
          onClick={() => setSortBy("name")}
          className={`sort-button ${sortBy === "name" ? "active" : ""}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("price")}
          className={`sort-button ${sortBy === "price" ? "active" : ""}`}
        >
          Sort by Price
        </button>
        <button
          onClick={() => setSortBy("rating")}
          className={`sort-button ${sortBy === "rating" ? "active" : ""}`}
        >
          Sort by Rating
        </button>
        {/* TODO: Show sorting indicator when isStale */}
      </div>

      <div className={`items-list ${isStale ? "stale" : ""}`}>
        {sortedItems.slice(0, 30).map((item) => (
          <div key={item.id} className="list-item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">${item.price}</span>
            <span className="item-rating">⭐ {item.rating}</span>
          </div>
        ))}
        <div className="more-results">... and {sortedItems.length - 30} more items</div>
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Defer the sortBy value</li>
          <li>Use deferred value in the sorting logic</li>
          <li>Buttons should respond instantly</li>
          <li>Show "Sorting..." indicator when stale</li>
        </ul>
      </div>
    </div>
  );
}

export default function UseDeferredValueExercise() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useDeferredValue Hook - Exercises</h1>
        <p className="feature-description">
          Practice implementing deferred values for responsive UIs
        </p>
        <div className="navigation-links">
          <Link to="/use-deferred-value" className="nav-link">
            ← Back to Examples
          </Link>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>

      <div className="exercises-container">
        <DeferredProductSearch />
        <DeferredDataViz />
        <DeferredSorting />
      </div>

      <div className="completion-checklist">
        <h2>✅ Completion Checklist</h2>
        <ul>
          <li>
            <input type="checkbox" id="ex1" />
            <label htmlFor="ex1">
              Product search input remains smooth while typing
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex2" />
            <label htmlFor="ex2">
              Stale indicator shows during search updates
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex3" />
            <label htmlFor="ex3">
              Slider moves smoothly even with 1000 data points
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex4" />
            <label htmlFor="ex4">
              Sort buttons respond instantly when clicked
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex5" />
            <label htmlFor="ex5">
              Visual feedback shows when UI is updating
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

