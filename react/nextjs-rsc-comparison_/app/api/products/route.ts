// API Route for Traditional SSR approach
// This is needed when using client components that fetch data

import { NextResponse } from 'next/server';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
}

// Simulated database query
async function getProductsFromDatabase(): Promise<Product[]> {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    {
      id: 1,
      name: 'Laptop Pro',
      price: 1299.99,
      description: 'High-performance laptop for professionals',
      category: 'Electronics',
      inStock: true,
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 29.99,
      description: 'Ergonomic wireless mouse',
      category: 'Accessories',
      inStock: true,
    },
    {
      id: 3,
      name: 'USB-C Hub',
      price: 49.99,
      description: '7-in-1 USB-C hub with multiple ports',
      category: 'Accessories',
      inStock: false,
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      price: 159.99,
      description: 'RGB mechanical keyboard with blue switches',
      category: 'Accessories',
      inStock: true,
    },
    {
      id: 5,
      name: '4K Monitor',
      price: 599.99,
      description: '27-inch 4K IPS monitor',
      category: 'Electronics',
      inStock: true,
    },
  ];
}

// GET /api/products
export async function GET() {
  try {
    const products = await getProductsFromDatabase();
    
    return NextResponse.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    );
  }
}

// This API route is ONLY needed for the Traditional SSR approach
// With React Server Components, you can fetch data directly in the component

