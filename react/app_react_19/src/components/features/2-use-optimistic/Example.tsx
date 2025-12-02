import { useState, useOptimistic } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Message {
  id: number;
  text: string;
  sending?: boolean;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate API call
async function addTodoAPI(text: string): Promise<Todo> {
  await delay(2000);
  return {
    id: Date.now(),
    text,
    completed: false,
  };
}

async function sendMessageAPI(text: string): Promise<Message> {
  await delay(1500);
  return {
    id: Date.now(),
    text,
  };
}

// Example 1: Optimistic Todo List
function OptimisticTodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React 19", completed: true },
    { id: 2, text: "Build awesome apps", completed: false },
  ]);
  const [input, setInput] = useState("");

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const tempTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    // Show optimistic update immediately
    addOptimisticTodo(tempTodo);
    setInput("");

    try {
      // Simulate API call
      const newTodo = await addTodoAPI(input);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
      // Optimistic update automatically reverts on error
    }
  }

  return (
    <div className="example-section">
      <h3>📝 Optimistic Todo List</h3>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>
      <ul className="todo-list">
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
            {!todos.find((t) => t.id === todo.id) && (
              <span className="pending-badge">Saving...</span>
            )}
          </li>
        ))}
      </ul>
      <p className="hint">
        💡 Notice how todos appear instantly, then show "Saving..." while the
        API call completes
      </p>
    </div>
  );
}

// Example 2: Optimistic Like Button
function OptimisticLikeButton() {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state, amount: number) => state + amount
  );

  async function handleLike() {
    const change = isLiked ? -1 : 1;

    // Optimistic update
    addOptimisticLike(change);
    setIsLiked(!isLiked);

    try {
      await delay(1000);
      setLikes(likes + change);
    } catch (error) {
      console.error("Failed to update like:", error);
      setIsLiked(isLiked); // Revert on error
    }
  }

  return (
    <div className="example-section">
      <h3>❤️ Optimistic Like Button</h3>
      <div className="like-container">
        <button
          onClick={handleLike}
          className={`like-button ${isLiked ? "liked" : ""}`}
        >
          {isLiked ? "❤️" : "🤍"} {optimisticLikes}
        </button>
      </div>
      <p className="hint">
        💡 Click the heart - it updates instantly without waiting for the server
      </p>
    </div>
  );
}

// Example 3: Optimistic Message Sending
function OptimisticMessages() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How are you?" },
    { id: 2, text: "I'm learning React 19!" },
  ]);
  const [input, setInput] = useState("");

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: Message) => [...state, newMessage]
  );

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const tempMessage: Message = {
      id: Date.now(),
      text: input,
      sending: true,
    };

    // Show message immediately
    addOptimisticMessage(tempMessage);
    setInput("");

    try {
      const sentMessage = await sendMessageAPI(input);
      setMessages([...messages, sentMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  return (
    <div className="example-section">
      <h3>💬 Optimistic Chat Messages</h3>
      <div className="messages-container">
        {optimisticMessages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sending ? "sending" : ""}`}
          >
            <p>{message.text}</p>
            {message.sending && (
              <span className="sending-indicator">Sending...</span>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="message-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      <p className="hint">
        💡 Messages appear instantly with a "Sending..." indicator
      </p>
    </div>
  );
}

export default function UseOptimisticExample() {
  return (
    <div className="feature-page">
      <div className="feature-header">
        <h1>useOptimistic Hook</h1>
        <p className="feature-description">
          Show optimistic UI updates while async operations are in progress
        </p>
        <div className="navigation-links">
          <Link to="/" className="nav-link">
            ← Home
          </Link>
          <Link to="/use-optimistic/exercise" className="nav-link">
            Try Exercise →
          </Link>
        </div>
      </div>

      <div className="examples-container">
        <OptimisticTodoList />
        <OptimisticLikeButton />
        <OptimisticMessages />
      </div>

      <div className="code-section">
        <h2>📖 How It Works</h2>
        <pre className="code-block">
          {`import { useOptimistic } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  
  // Create optimistic state
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentState, newTodo) => [...currentState, newTodo]
  );

  async function addTodo(text) {
    // 1. Show optimistic update immediately
    addOptimisticTodo({ id: Date.now(), text });
    
    // 2. Make API call
    const newTodo = await api.addTodo(text);
    
    // 3. Update real state
    setTodos([...todos, newTodo]);
  }

  // Use optimisticTodos for rendering
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`}
        </pre>

        <h2>✨ Key Benefits</h2>
        <ul className="benefits-list">
          <li>
            <strong>Instant Feedback:</strong> Users see changes immediately
          </li>
          <li>
            <strong>Better UX:</strong> No waiting for server responses
          </li>
          <li>
            <strong>Automatic Rollback:</strong> Reverts on error
          </li>
          <li>
            <strong>Simple API:</strong> Easy to implement and understand
          </li>
        </ul>

        <h2>🎯 Best Practices</h2>
        <div className="best-practices">
          <div className="practice-card">
            <h3>✅ Do</h3>
            <ul>
              <li>Use for user-initiated actions</li>
              <li>Always update real state after API call</li>
              <li>Handle errors gracefully</li>
              <li>Show pending indicators</li>
            </ul>
          </div>
          <div className="practice-card">
            <h3>❌ Don't</h3>
            <ul>
              <li>Use for complex state updates</li>
              <li>Forget to update real state</li>
              <li>Ignore error handling</li>
              <li>Use for read-only operations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
