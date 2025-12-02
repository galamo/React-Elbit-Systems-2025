import { useState, useEffect, useCallback } from "react";

/**
 * TODO: Define the return type for the useFetch hook
 * It should include:
 * - data: T | null
 * - loading: boolean
 * - error: string | null
 * - refetch: () => void
 */
interface UseFetchReturn<T> {
  // TODO: Add properties here
}

/**
 * Custom hook for fetching data from an API
 *
 * @param url - The API endpoint to fetch from
 * @param options - Optional fetch configuration
 * @returns An object containing data, loading state, error, and refetch function
 *
 * TODO: Implement the useFetch hook with the following features:
 * 1. State management for data, loading, and error
 * 2. Fetch data when component mounts or URL changes
 * 3. Handle loading states properly
 * 4. Handle errors gracefully
 * 5. Implement cleanup with AbortController
 * 6. Provide a refetch function
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchReturn<T> {
  // TODO: Initialize state variables

  // TODO: Implement the fetch function

  // TODO: Implement useEffect for fetching data

  // TODO: Implement refetch function with useCallback

  // TODO: Return the hook's values
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  };
}
