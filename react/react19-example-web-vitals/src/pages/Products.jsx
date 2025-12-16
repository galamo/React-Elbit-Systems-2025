import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/fakeApi";

export default function Products() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    let mounted = true;
    fetchProducts().then((data) => {
      if (mounted) setProducts(data);
    });
    return () => (mounted = false);
  }, []);
  if (!products)
    return <div className="card loading">Loading products (fast)...</div>;
  return (
    <div>
      <h2>Products</h2>
      <input type="text" />
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <div className="small">
              {p.category} • ${p.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
