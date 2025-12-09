# useDeferredValue Hook

## Overview

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI. It's useful when you have expensive computations or rendering that you want to deprioritize to keep the UI responsive.

## Syntax

```tsx
const deferredValue = useDeferredValue(value);
```

## How It Works

1. **Initial Render**: Returns the same value you passed
2. **During Update**: React first re-renders with the old value, then schedules another render with the new value
3. **Interruption**: If the value changes again before the deferred render completes, React abandons the old render and starts fresh

## Key Concepts

### Deferred vs Regular Updates

```tsx
// Without useDeferredValue - input can lag
function SearchResults({ query }) {
  const results = expensiveFilter(items, query);
  return <List items={results} />;
}

// With useDeferredValue - input stays responsive
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = expensiveFilter(items, deferredQuery);
  return <List items={results} />;
}
```

### Detecting Stale State

```tsx
const deferredValue = useDeferredValue(value);
const isStale = value !== deferredValue;

return (
  <div className={isStale ? 'stale' : ''}>
    {/* Show visual feedback when updating */}
  </div>
);
```

## Common Use Cases

### 1. Search/Filter with Large Datasets

```tsx
function ProductSearch() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  const results = useMemo(
    () => filterProducts(products, deferredQuery),
    [deferredQuery]
  );
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ProductList products={results} />
    </>
  );
}
```

### 2. Heavy Visualizations

```tsx
function DataVisualization() {
  const [dataPoints, setDataPoints] = useState(100);
  const deferredPoints = useDeferredValue(dataPoints);
  
  const chartData = useMemo(
    () => generateChartData(deferredPoints),
    [deferredPoints]
  );
  
  return (
    <>
      <input 
        type="range" 
        value={dataPoints}
        onChange={e => setDataPoints(Number(e.target.value))}
      />
      <Chart data={chartData} />
    </>
  );
}
```

### 3. List Sorting/Filtering

```tsx
function SortableList() {
  const [sortBy, setSortBy] = useState('name');
  const deferredSortBy = useDeferredValue(sortBy);
  
  const sortedItems = useMemo(
    () => sortItems(items, deferredSortBy),
    [deferredSortBy]
  );
  
  return (
    <>
      <SortButtons onSort={setSortBy} />
      <ItemList items={sortedItems} />
    </>
  );
}
```

## Best Practices

### ✅ Do

- **Combine with useMemo**: Always use `useMemo` with deferred values for expensive calculations
- **Show Visual Feedback**: Indicate when the UI is stale/updating
- **Use for Non-Critical Updates**: Defer updates that don't need immediate feedback
- **Test with Real Data**: Performance issues only show with realistic data sizes

### ❌ Don't

- **Don't Defer Critical Feedback**: User actions should feel instant
- **Don't Use for Network Requests**: Use Suspense instead
- **Don't Defer Layout-Affecting Values**: Can cause visual jumps
- **Don't Use as First Optimization**: Profile first, optimize if needed

## Comparison with useTransition

| Feature | useDeferredValue | useTransition |
|---------|------------------|---------------|
| **Use When** | Can't control state update | Control state update |
| **Good For** | Props from parent | Local state |
| **API** | Simpler (just defer value) | More control (isPending) |
| **Example** | Search input from parent | Local filter state |

```tsx
// useDeferredValue - for props
function Results({ query }) {
  const deferredQuery = useDeferredValue(query);
  // ...
}

// useTransition - for local state
function Search() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  
  function handleChange(e) {
    startTransition(() => {
      setQuery(e.target.value);
    });
  }
  // ...
}
```

## Performance Tips

1. **Memoize Expensive Calculations**
   ```tsx
   const deferredValue = useDeferredValue(value);
   const result = useMemo(() => expensiveCalc(deferredValue), [deferredValue]);
   ```

2. **Show Loading States**
   ```tsx
   const isStale = value !== deferredValue;
   return <div className={isStale ? 'loading' : ''}>{content}</div>;
   ```

3. **Debounce vs Defer**
   - Debounce: Delays all updates by fixed time
   - Defer: Updates immediately when possible, defers when busy
   - Prefer defer for better UX

## Common Patterns

### Pattern 1: Search with Stale Indicator

```tsx
function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  
  const results = useMemo(
    () => searchItems(deferredQuery),
    [deferredQuery]
  );
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {isStale && <Spinner />}
      <Results items={results} />
    </>
  );
}
```

### Pattern 2: Slider with Heavy Rendering

```tsx
function Slider() {
  const [value, setValue] = useState(50);
  const deferredValue = useDeferredValue(value);
  
  return (
    <>
      <input 
        type="range" 
        value={value}
        onChange={e => setValue(Number(e.target.value))}
      />
      <HeavyVisualization value={deferredValue} />
    </>
  );
}
```

### Pattern 3: Tab Switching

```tsx
function Tabs() {
  const [tab, setTab] = useState('home');
  const deferredTab = useDeferredValue(tab);
  
  return (
    <>
      <TabButtons activeTab={tab} onTabChange={setTab} />
      <TabContent tab={deferredTab} />
    </>
  );
}
```

## Troubleshooting

### Input Still Feels Laggy
- Ensure you're using `useMemo` with the deferred value
- Check if the computation is truly expensive (profile it)
- Consider if the dataset is too large (virtualization might help)

### Updates Not Happening
- Make sure you're using the deferred value in your expensive computation
- Check that dependencies in `useMemo` include the deferred value

### Visual Jumps
- Don't defer values that affect layout
- Use CSS transitions for smooth updates
- Show loading states during updates

## Resources

- [React Docs: useDeferredValue](https://react.dev/reference/react/useDeferredValue)
- [React 18 Working Group Discussion](https://github.com/reactwg/react-18/discussions)
- [Concurrent Features in React 18](https://react.dev/blog/2022/03/29/react-v18)