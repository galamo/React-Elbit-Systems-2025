// product.ts - Product module with default and named exports

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
}

export const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food",
  "Books",
  "Home",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Default export - main function
export default function createProduct(
  title: string,
  price: number,
  category: ProductCategory
): Product {
  return {
    id: Math.floor(Math.random() * 10000),
    title,
    price,
    category,
    inStock: true,
  };
}

// Named export - utility function
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function isExpensive(product: Product): boolean {
  return product.price > 100;
}
