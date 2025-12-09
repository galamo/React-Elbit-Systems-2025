# Next.js: Traditional SSR vs React Server Components Comparison

## Overview

This example demonstrates the key differences between:
1. **Traditional SSR (Server-Side Rendering)** - The old way
2. **React Server Components (RSC)** - The new React 19 way

Both approaches render on the server, but they work very differently.

## Quick Comparison

| Feature | Traditional SSR | React Server Components |
|---------|----------------|------------------------|
| **Rendering** | Server → HTML → Client hydration | Server → Streamed components |
| **JavaScript Bundle** | All components sent to client | Only client components sent |
| **Data Fetching** | API routes + useEffect/getServerSideProps | Direct in component |
| **Re-rendering** | Full page or client-side only | Selective server re-render |
| **Interactivity** | After hydration | Immediate for client components |
| **Bundle Size** | Larger (all components) | Smaller (only interactive parts) |

## File Structure

```
nextjs-rsc-comparison/
├── README.md (this file)
├── COMPARISON.md (detailed analysis)
├── app/
│   ├── traditional-ssr/
│   │   └── page.tsx              # Traditional SSR approach
│   ├── server-component/
│   │   └── page.tsx              # RSC approach
│   ├── api/
│   │   └── products/
│   │       └── route.ts          # API route for traditional SSR
│   └── page.tsx                  # Home page with links
└── package.json
```

## Setup Instructions

### 1. Create Next.js Project

```bash
npx create-next-app@latest nextjs-rsc-comparison --typescript --app --no-tailwind
cd nextjs-rsc-comparison
```

### 2. Copy Files

Copy all files from this directory into your Next.js project.

### 3. Run the Project

```bash
npm run dev
```

Visit:
- http://localhost:3000 - Home page with links
- http://localhost:3000/traditional-ssr - Traditional SSR example
- http://localhost:3000/server-component - RSC example

## Key Differences Explained

### Traditional SSR (Old Way)

```tsx
"use client"; // Everything is a client component

export default function TraditionalSSR() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch from API route after page loads
    fetch('/api/products')
      .then(r => r.json())
      .then(setData);
  }, []);
  
  return <div>{data?.map(...)}</div>;
}
```

**Problems:**
- ❌ Requires API route
- ❌ Data fetches after page load (waterfall)
- ❌ All JavaScript sent to client
- ❌ Loading states needed
- ❌ Full page hydration required

### React Server Components (New Way)

```tsx
// No "use client" - it's a Server Component by default

export default async function ServerComponent() {
  // Fetch directly on server
  const data = await fetchProducts();
  
  return <div>{data.map(...)}</div>;
}
```

**Benefits:**
- ✅ No API route needed
- ✅ Data fetched before render
- ✅ Zero JavaScript for this component
- ✅ No loading states needed
- ✅ No hydration for server parts

## Performance Impact

### Bundle Size Comparison

**Traditional SSR:**
```
Page JS: 150 KB (includes all components)
First Load JS: 200 KB
```

**React Server Components:**
```
Page JS: 50 KB (only interactive components)
First Load JS: 100 KB
Server Component: 0 KB (stays on server)
```

### Loading Time Comparison

**Traditional SSR:**
1. Server renders HTML (100ms)
2. Send HTML to client
3. Download JavaScript (200ms)
4. Hydrate components (150ms)
5. Fetch data from API (100ms)
6. Re-render with data (50ms)
**Total: ~600ms to interactive with data**

**React Server Components:**
1. Server fetches data (100ms)
2. Server renders component (50ms)
3. Stream to client (50ms)
4. Hydrate only client components (50ms)
**Total: ~250ms to interactive with data**

## When to Use Each

### Use Traditional SSR When:
- Working with Next.js Pages Router
- Need compatibility with older React versions
- Team is familiar with the pattern
- Migrating existing application

### Use React Server Components When:
- Starting new Next.js 13+ project
- Want optimal performance
- Need to reduce bundle size
- Want simpler data fetching
- Using Next.js App Router

## Migration Path

If you have existing SSR code, you can migrate gradually:

1. **Keep existing pages** in Pages Router
2. **Create new pages** in App Router with RSC
3. **Migrate page by page** as needed
4. **Remove API routes** that only fetch data for RSC pages

## Learn More

- See `COMPARISON.md` for detailed side-by-side code comparison
- Check individual page files for inline comments
- Read Next.js App Router documentation

## Running the Examples

Both examples fetch the same product data but use different approaches. Compare:
- Network tab (API calls vs none)
- Bundle size (DevTools)
- Time to interactive
- JavaScript sent to client