# Running the API

1. cd apps
2. run `docker compose up --build`

## Slides

https://gamma.app/docs/TypeScript-e3v9su0jf3qrion?mode=present#card-iwrhvd826qm8ls3

# Today Subjects & Examples

- Using Key Vs not using Key in Child components ( reorder + search app_11/my_react_app)
- useTransition - when to use?

```javascript
useEffect(() => {
  let isLatest = true;

  async function load() {
    setIsLoadingCountries(true);

    const result = !filter
      ? await getCountriesApi()
      : await getCountriesByNameApi(filter);

    if (isLatest) {
      setCountries(result);
    }
    setIsLoadingCountries(false);
  }

  load();

  return () => {
    isLatest = false;
  };
}, [filter]);
```

```javascript
import { useState, useEffect } from "react";

/**
 * Custom hook to handle async effects with cancellation
 * @param {Function} asyncCallback - The async function to run
 * @param {Array} deps - Dependency array for useEffect
 * @deprecated
 */
export function useAsyncEffect(asyncCallback, deps = []) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isLatest = true;

    async function run() {
      setIsLoading(true);
      try {
        const result = await asyncCallback();
        if (isLatest) setData(result);
      } catch (error) {
        if (isLatest) console.error(error);
      } finally {
        if (isLatest) setIsLoading(false);
      }
    }

    run();

    return () => {
      isLatest = false;
    };
  }, deps);

  return { data, isLoading };
}
```
