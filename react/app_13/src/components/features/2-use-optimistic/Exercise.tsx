import { useState, useOptimistic } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate API calls
async function addToCartAPI(item: Omit<CartItem, "id">): Promise<CartItem> {
  await delay(1500);
  return { ...item, id: Date.now() };
}

async function updateQuantityAPI(id: number, quantity: number): Promise<void> {
  await delay(1000);
}

// Exercise 1: Shopping Cart with Optimistic Updates
function OptimisticShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "React Book", price: 29.99, quantity: 1 },
    { id: 2, name: "TypeScript Guide", price: 34.99, quantity: 1 },
  ]);

  // TODO: Create optimistic state for cart
  // Hint: Use useOptimistic with cart as the initial state
  // The updater function should handle adding items and updating quantities
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    cart,
    (
      state,
      action: {
        type: "add" | "update";
        item?: CartItem;
        id?: number;
        quantity?: number;
      }
    ) => {
      // TODO: Implement the updater function
      // For 'add': add the new item to the cart
      // For 'update': update the quantity of an existing item
      return state; // Replace this with your implementation
    }
  );

  async function addToCart(name: string, price: number) {
    // TODO: Implement optimistic add to cart
    // 1. Create a temporary item with a temporary id
    // 2. Call updateOptimisticCart to show the item immediately
    // 3. Make the API call
    // 4. Update the real cart state with the response

    console.log("TODO: Implement addToCart");
  }

  async function updateQuantity(id: number, newQuantity: number) {
    // TODO: Implement optimistic quantity update
    // 1. Call updateOptimisticCart to show the change immediately
    // 2. Make the API call
    // 3. Update the real cart state

    console.log("TODO: Implement updateQuantity");
  }

  const total = optimisticCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="exercise-section">
      <h3>🛒 Exercise 1: Shopping Cart</h3>
      <p className="exercise-description">
        Implement optimistic updates for adding items and changing quantities
      </p>

      <div className="cart-container">
        <div className="cart-items">
          {optimisticCart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h4>Total: ${total.toFixed(2)}</h4>
        </div>

        <div className="add-item-section">
          <button
            onClick={() => addToCart("JavaScript Handbook", 24.99)}
            className="add-to-cart-button"
          >
            Add JavaScript Handbook ($24.99)
          </button>
        </div>
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>
            Use useOptimistic with an action object containing type and data
          </li>
          <li>For adding: create a temp item with Date.now() as id</li>
          <li>For updating: find the item and update its quantity</li>
          <li>Always update the real state after the API call completes</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 2: Comment System with Optimistic Posting
function OptimisticComments() {
  const [comments, setComments] = useState<
    Array<{ id: number; text: string; author: string }>
  >([
    { id: 1, text: "Great article!", author: "Alice" },
    { id: 2, text: "Very helpful, thanks!", author: "Bob" },
  ]);
  const [input, setInput] = useState("");

  // TODO: Create optimistic state for comments
  // Hint: The updater should add new comments to the array
  const optimisticComments = comments; // Replace with useOptimistic

  async function postComment(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // TODO: Implement optimistic comment posting
    // 1. Create a temporary comment with sending: true flag
    // 2. Show it immediately using optimistic state
    // 3. Clear the input
    // 4. Make the API call (simulate with delay)
    // 5. Update the real comments state

    console.log("TODO: Implement postComment");
  }

  return (
    <div className="exercise-section">
      <h3>💬 Exercise 2: Comment System</h3>
      <p className="exercise-description">
        Add optimistic updates when posting comments
      </p>

      <div className="comments-section">
        <div className="comments-list">
          {optimisticComments.map((comment) => (
            <div key={comment.id} className="comment">
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={postComment} className="comment-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className="comment-input"
          />
          <button type="submit" className="post-button">
            Post Comment
          </button>
        </form>
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Add a 'sending' flag to temporary comments</li>
          <li>Show a visual indicator for pending comments</li>
          <li>Use 'You' as the author for new comments</li>
          <li>Simulate API call with delay(1500)</li>
        </ul>
      </div>
    </div>
  );
}

// Exercise 3: Toggle with Optimistic State
function OptimisticToggle() {
  const [isEnabled, setIsEnabled] = useState(false);

  // TODO: Create optimistic state for the toggle
  // Hint: The updater should toggle the boolean value
  const optimisticIsEnabled = isEnabled; // Replace with useOptimistic

  async function handleToggle() {
    // TODO: Implement optimistic toggle
    // 1. Show the toggled state immediately
    // 2. Make the API call (simulate with delay)
    // 3. Update the real state
    // 4. Handle errors and revert if needed

    console.log("TODO: Implement handleToggle");
  }

  return (
    <div className="exercise-section">
      <h3>🔄 Exercise 3: Settings Toggle</h3>
      <p className="exercise-description">
        Implement optimistic updates for a settings toggle
      </p>

      <div className="toggle-container">
        <label className="toggle-label">
          <span>Enable Notifications</span>
          <button
            onClick={handleToggle}
            className={`toggle-button ${optimisticIsEnabled ? "active" : ""}`}
          >
            <span className="toggle-slider" />
          </button>
        </label>
        <p className="toggle-status">
          Status: {optimisticIsEnabled ? "✅ Enabled" : "❌ Disabled"}
        </p>
      </div>

      <div className="exercise-hints">
        <h4>💡 Hints:</h4>
        <ul>
          <li>Use useOptimistic with a boolean value</li>
          <li>The updater function should toggle the value</li>
          <li>Show the new state immediately on click</li>
          <li>Update real state after API call completes</li>
        </ul>
      </div>
    </div>
  );
}

export default function UseOptimisticExercise() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useOptimistic Hook - Exercises</h1>
        <p className="feature-description">
          Practice implementing optimistic UI updates
        </p>
        <div className="navigation-links">
          <Link to="/use-optimistic" className="nav-link">
            ← Back to Examples
          </Link>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>

      <div className="exercises-container">
        <OptimisticShoppingCart />
        <OptimisticComments />
        <OptimisticToggle />
      </div>

      <div className="completion-checklist">
        <h2>✅ Completion Checklist</h2>
        <ul>
          <li>
            <input type="checkbox" id="ex1" />
            <label htmlFor="ex1">
              Shopping cart shows items immediately when added
            </label>
          </li>
          <li>
            <input type="checkbox" id="ex2" />
            <label htmlFor="ex2">Quantity updates appear instantly</label>
          </li>
          <li>
            <input type="checkbox" id="ex3" />
            <label htmlFor="ex3">Comments appear immediately when posted</label>
          </li>
          <li>
            <input type="checkbox" id="ex4" />
            <label htmlFor="ex4">Toggle switches instantly</label>
          </li>
          <li>
            <input type="checkbox" id="ex5" />
            <label htmlFor="ex5">
              Real state updates after API calls complete
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
