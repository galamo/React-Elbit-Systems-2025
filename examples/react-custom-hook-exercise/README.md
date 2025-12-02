# React Custom Hook Exercise - useFetch

## 📚 Learning Objectives

Create a reusable custom hook called `useFetch` that handles data fetching with TypeScript. This exercise will help you understand:

- Creating custom hooks in React
- TypeScript generics with hooks
- Managing loading, error, and data states
- Handling side effects with useEffect
- Cleanup and abort controllers

## 🎯 Exercise Requirements

Create a custom hook `useFetch<T>` that:

1. **Accepts parameters:**
   - `url: string` - The API endpoint to fetch from
   - `options?: RequestInit` - Optional fetch configuration

2. **Returns an object with:**
   - `data: T | null` - The fetched data (generic type)
   - `loading: boolean` - Loading state
   - `error: string | null` - Error message if request fails
   - `refetch: () => void` - Function to manually trigger a refetch

3. **Features to implement:**
   - Automatically fetch data when the component mounts
   - Handle loading states
   - Handle errors gracefully
   - Support request cancellation (cleanup)
   - Allow manual refetch
   - Use TypeScript generics for type safety

## 📝 Instructions

### Step 1: Create the Hook Structure
Create a file `useFetch.ts` in the `starter` folder and implement the hook with proper TypeScript types.

### Step 2: Implement State Management
Use `useState` to manage:
- data state
- loading state
- error state

### Step 3: Implement the Fetch Logic
Use `useEffect` to:
- Fetch data when URL changes
- Handle AbortController for cleanup
- Update states appropriately

### Step 4: Test Your Hook
Use the provided `App.tsx` to test your implementation with the JSONPlaceholder API.

## 🧪 Test Cases

Your hook should handle:

1. ✅ Successful data fetch
2. ✅ Loading state during fetch
3. ✅ Error handling for failed requests
4. ✅ Request cancellation on unmount
5. ✅ Manual refetch functionality
6. ✅ Type safety with TypeScript generics

## 💡 Hints

<details>
<summary>Click to see hints</summary>

1. Use `AbortController` to cancel requests on cleanup
2. Remember to handle the cleanup function in `useEffect`
3. Use `useCallback` for the refetch function to avoid unnecessary re-renders
4. Don't forget to set loading to `false` in both success and error cases
5. Use a generic type parameter `<T>` for the data type

</details>

## 🚀 Bonus Challenges

Once you complete the basic implementation, try these enhancements:

1. Add a `cache` mechanism to avoid refetching the same URL
2. Add a `debounce` option to delay requests
3. Add support for POST/PUT/DELETE methods
4. Add retry logic for failed requests
5. Add request timeout functionality

## 📦 API for Testing

Use the JSONPlaceholder API for testing:
- Users: `https://jsonplaceholder.typicode.com/users`
- Posts: `https://jsonplaceholder.typicode.com/posts`
- Single User: `https://jsonplaceholder.typicode.com/users/1`

## 🎓 What You'll Learn

- How to create reusable custom hooks
- Managing complex state in hooks
- TypeScript generics and type inference
- Proper cleanup in React effects
- Error handling patterns
- API integration best practices

Good luck! 🍀