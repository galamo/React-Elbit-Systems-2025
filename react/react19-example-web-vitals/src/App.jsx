import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <h1>React 19 Demo</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/bad-lcp">BAD LCP</Link>
          <Link to="/products">Products</Link>
          <Link to="/users">Users</Link>
          <Link to="/reports">Reports</Link>
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/bad-lcp" element={<BadLCPPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

function BadLCPPage() {
  const [showLargeContent, setShowLargeContent] = useState(false);

  useEffect(() => {
    // Delay 4 seconds to simulate slow render
    const timer = setTimeout(() => {
      setShowLargeContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Testing Bad LCP</h1>

      {showLargeContent && (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVfYdX2J0avbjhiZQwmqg-DvZzMDF4UzrbLQ&s"
          alt="Large content"
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
}
