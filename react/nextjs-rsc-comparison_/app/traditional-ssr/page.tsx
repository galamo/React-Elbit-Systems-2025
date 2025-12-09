"use client";

// TRADITIONAL SSR APPROACH (Old Way)
// This component uses the traditional client-side data fetching pattern
// Even though Next.js can SSR the initial HTML, the data fetching happens on the client

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

export default function TraditionalSSRPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data fetching happens AFTER the component mounts on the client
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Must call an API route - cannot access database directly
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Runs after component mounts

  return (
    <div className="container">
      <div className="header">
        <h1>🔴 Traditional SSR Approach</h1>
        <p className="subtitle">Client-side data fetching with useEffect</p>
      </div>

      <div className="info-box traditional">
        <h3>How This Works:</h3>
        <ol>
          <li>✅ Server renders initial HTML (empty state)</li>
          <li>✅ Client downloads JavaScript bundle (~150KB+)</li>
          <li>✅ React hydrates the component</li>
          <li>✅ useEffect runs and fetches from /api/products</li>
          <li>✅ Component re-renders with data</li>
        </ol>
        
        <h3>Drawbacks:</h3>
        <ul>
          <li>❌ Requires API route (/api/products)</li>
          <li>❌ Data fetching happens AFTER page load (waterfall)</li>
          <li>❌ ALL component code sent to client</li>
          <li>❌ Need loading states</li>
          <li>❌ Need error handling</li>
          <li>❌ Larger JavaScript bundle</li>
          <li>❌ Slower time to interactive</li>
        </ul>

        <div className="metrics">
          <div className="metric">
            <span className="label">Bundle Size:</span>
            <span className="value">~150KB+</span>
          </div>
          <div className="metric">
            <span className="label">API Calls:</span>
            <span className="value">1 (client-side)</span>
          </div>
          <div className="metric">
            <span className="label">Hydration:</span>
            <span className="value">Full page</span>
          </div>
        </div>
      </div>

      <div className="content">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>❌ Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <h3>{product.name}</h3>
                  <span className={`badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                </div>
                <p className="category">{product.category}</p>
                <p className="description">{product.description}</p>
                <div className="product-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button className="btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="comparison-note">
        <p>
          👉 <strong>Compare with:</strong> Visit <a href="/server-component">/server-component</a> to see the React Server Components approach
        </p>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          color: #dc2626;
        }
        .subtitle {
          color: #666;
          margin: 10px 0;
        }
        .info-box {
          background: #fff;
          border: 2px solid #dc2626;
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 30px;
        }
        .info-box h3 {
          margin: 0 0 15px 0;
          color: #333;
        }
        .info-box ol, .info-box ul {
          margin: 10px 0;
          padding-left: 25px;
        }
        .info-box li {
          margin: 8px 0;
          line-height: 1.6;
        }
        .metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid #fee;
        }
        .metric {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: #fef2f2;
          border-radius: 6px;
        }
        .metric .label {
          font-weight: bold;
          color: #666;
        }
        .metric .value {
          color: #dc2626;
          font-weight: bold;
        }
        .loading {
          text-align: center;
          padding: 60px 20px;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #dc2626;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error {
          background: #fee;
          border: 2px solid #dc2626;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          color: #dc2626;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .product-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        .product-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }
        .product-header h3 {
          margin: 0;
          color: #333;
          font-size: 18px;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .in-stock {
          background: #dcfce7;
          color: #166534;
        }
        .out-of-stock {
          background: #fee;
          color: #dc2626;
        }
        .category {
          display: inline-block;
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #666;
          margin: 10px 0;
        }
        .description {
          color: #666;
          line-height: 1.5;
          margin: 15px 0;
        }
        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        .price {
          font-size: 24px;
          font-weight: bold;
          color: #dc2626;
        }
        .btn {
          padding: 8px 16px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .btn:hover {
          background: #b91c1c;
        }
        .comparison-note {
          margin-top: 40px;
          padding: 20px;
          background: #fef3c7;
          border-radius: 8px;
          text-align: center;
        }
        .comparison-note a {
          color: #dc2626;
          font-weight: bold;
          text-decoration: none;
        }
        .comparison-note a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

// Made with Bob
