# React 19 - useMemo Guide

This application demonstrates when `useMemo` is **no longer needed** in React 19 and when it's **still required**.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📚 What's Inside

### Example 1: Simple Calculations (No useMemo Needed)
- **React 19 Improvement**: Automatically memoizes simple calculations
- **What it shows**: Basic arithmetic operations don't need useMemo anymore
- **Try it**: Change the count and type in the text field - calculations are optimized automatically

### Example 2: Object/Array Creation (No useMemo Needed)
- **React 19 Improvement**: Automatically memoizes objects and arrays when values don't change
- **What it shows**: Creating objects/arrays with stable values is now optimized
- **Try it**: Update the user fields - objects are only recreated when values actually change

### Example 3: Expensive Calculations (STILL NEED useMemo)
- **Still Required**: Heavy computations need explicit memoization
- **What it shows**: Prime number calculation (expensive operation)
- **Try it**: Type in the text field and watch the console - with useMemo, primes are only recalculated when the number changes

### Example 4: Large List Filtering (STILL NEED useMemo)
- **Still Required**: Filtering/sorting large datasets needs useMemo
- **What it shows**: Filtering 10,000 items
- **Try it**: Search and sort - operations only run when dependencies change

## 🎯 Key Takeaways

### ✅ No useMemo Needed in React 19
- Simple calculations (`x * 2`, `x + y`)
- Object/array creation with stable values
- String concatenation
- Basic transformations

### ⚠️ Still Need useMemo
- Expensive calculations (loops, recursion)
- Large list filtering/sorting
- Complex data transformations
- Heavy computations

## 💡 Best Practice

In React 19:
1. **Start without useMemo** - React 19 handles most cases automatically
2. **Profile your app** - Use React DevTools Profiler
3. **Add useMemo only when needed** - For expensive operations that show up in profiling

## 🔍 How to Verify

Open the browser console and watch the logs:
- Simple calculations: No logs on re-render
- Expensive operations: Logs only when dependencies change

## 📖 React 19 Features

This app uses:
- React 19 RC (Release Candidate)
- Automatic memoization for simple operations
- TypeScript for type safety
- Vite for fast development

## 🛠️ Tech Stack

- React 19 RC
- TypeScript
- Vite
- CSS3 (with gradients and animations)

## 📝 Notes

The examples use console.log statements to demonstrate when expensive operations run. Keep the browser console open to see the optimization in action!
