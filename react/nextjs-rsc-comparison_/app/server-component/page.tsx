// REACT SERVER COMPONENT APPROACH (New Way - React 19)
// This component is a Server Component by default (no "use client" directive)
// It can fetch data directly on the server without API routes

import styles from "./index.module.css";
import "./index.css";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

// Direct database/data access - no API route needed!
async function getProducts(): Promise<Product[]> {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 100));

  // In a real app, this would be:
  // const products = await db.products.findMany();
  // or
  // const products = await prisma.product.findMany();

  return [
    {
      id: 1,
      name: "Laptop Pro",
      price: 1299.99,
      description: "High-performance laptop for professionals",
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 29.99,
      description: "Ergonomic wireless mouse",
      category: "Accessories",
      inStock: true,
    },
    {
      id: 3,
      name: "USB-C Hub",
      price: 49.99,
      description: "7-in-1 USB-C hub with multiple ports",
      category: "Accessories",
      inStock: false,
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 159.99,
      description: "RGB mechanical keyboard with blue switches",
      category: "Accessories",
      inStock: true,
    },
    {
      id: 5,
      name: "4K Monitor",
      price: 599.99,
      description: "27-inch 4K IPS monitor",
      category: "Electronics",
      inStock: true,
    },
  ];
}

// Server Component - async by default!
export default async function ServerComponentPage() {
  // Fetch data directly on the server - no useEffect, no loading states!
  const products = await getProducts();
  const renderTime = new Date().toISOString();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🟢 React Server Component ???</h1>
        <p className={styles.subtitle}>
          Direct server-side data fetching (React 19)
        </p>
      </div>

      <div className={`${styles.infoBox} ${styles.server}`}>
        <h3>How This Works:</h3>
        <ol>
          <li>✅ Server fetches data directly (no API route)</li>
          <li>✅ Server renders component with data</li>
          <li>✅ Streams HTML to client</li>
          <li>✅ Client receives fully rendered content</li>
          <li>✅ Only interactive parts need JavaScript</li>
        </ol>

        <h3>Benefits:</h3>
        <ul>
          <li>✅ No API route needed</li>
          <li>✅ Data fetched BEFORE rendering (no waterfall)</li>
          <li>✅ Zero JavaScript for this component</li>
          <li>✅ No loading states needed</li>
          <li>✅ No error handling UI needed</li>
          <li>✅ Smaller JavaScript bundle</li>
          <li>✅ Faster time to interactive</li>
          <li>✅ Better SEO (fully rendered HTML)</li>
        </ul>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.label}>Bundle Size:</span>
            <span className={styles.value}>~0KB (server only)</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.label}>API Calls:</span>
            <span className={styles.value}>0 (direct access)</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.label}>Hydration:</span>
            <span className={styles.value}>None needed</span>
          </div>
        </div>

        <div className={styles.serverInfo}>
          🖥️ Rendered on server at: {renderTime}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productHeader}>
                <h3>{product.name}</h3>
                <span
                  className={`${styles.badge} ${
                    product.inStock ? styles.inStock : styles.outOfStock
                  }`}
                >
                  {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </span>
              </div>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.productFooter}>
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
                {/* Note: Button would need "use client" for interactivity */}
                <button className={styles.btn}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.comparisonNote}>
        <p>
          👉 <strong>Compare with:</strong> Visit{" "}
          <a href="/traditional-ssr">/traditional-ssr</a> to see the traditional
          approach
        </p>
      </div>

      <div className={styles.technicalNote}>
        <h3>Technical Details:</h3>
        <ul>
          <li>
            This component has NO "use client" directive - it's a Server
            Component
          </li>
          <li>The async function runs on the server only</li>
          <li>Data is fetched before rendering (no loading state)</li>
          <li>The rendered HTML is sent to the client</li>
          <li>No JavaScript is sent for this component</li>
          <li>To make the button interactive, wrap it in a Client Component</li>
        </ul>
      </div>
    </div>
  );
}
