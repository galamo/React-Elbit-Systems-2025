import { useState, useEffect, useCallback } from "react";

/**
 * Return type for the useFetch hook
 */
interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching data from an API
 *
 * @param url - The API endpoint to fetch from
 * @param options - Optional fetch configuration
 * @returns An object containing data, loading state, error, and refetch function
 *
 * Features:
 * - Automatic fetching on mount and URL change
 * - Loading state management
 * - Error handling
 * - Request cancellation with AbortController
 * - Manual refetch capability
 * - TypeScript generics for type safety
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchReturn<T> {
  // State management
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);

  // Fetch function
  useEffect(() => {
    // Create AbortController for cleanup
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Async fetch function
    const fetchData = async () => {
      // Reset states
      setLoading(true);
      setError(null);

      try {
        // Perform fetch with abort signal
        const response = await fetch(url, {
          ...options,
          signal,
        });

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const result = await response.json();

        // Update data state only if not aborted
        if (!signal.aborted) {
          setData(result);
        }
      } catch (err) {
        // Handle errors only if not aborted
        if (!signal.aborted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      } finally {
        // Set loading to false only if not aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    // Execute fetch
    fetchData();

    // Cleanup function - abort request on unmount or URL change
    return () => {
      abortController.abort();
    };
  }, [url, options, refetchTrigger]); // Re-run when URL, options, or refetchTrigger changes

  // Refetch function using useCallback to prevent unnecessary re-renders
  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  // Return hook values
  return {
    data,
    loading,
    error,
    refetch,
  };
}
