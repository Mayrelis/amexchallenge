import { useEffect, useState } from 'react';

type UseCachingFetch = (url: string) => {
  isLoading: boolean;
  data: Record<string, any> | null; // Define un tipo más claro
  error: Error | null;
};

// In-memory cache for storing fetched data
const cache: Record<string, Record<string, any> | null> = {};

// Track ongoing fetch requests to avoid duplicate calls
const pendingRequests: Record<string, Promise<Record<string, any> | null>> = {};

/**
 * 1. Implement a caching fetch hook. The hook should return an object with the following properties:
 * - isLoading: a boolean that is true when the fetch is in progress and false otherwise
 * - data: the data returned from the fetch, or null if the fetch has not completed
 * - error: an error object if the fetch fails, or null if the fetch is successful
 *
 * This hook is called three times on the client:
 *  - 1 in App.tsx
 *  - 2 in Person.tsx
 *  - 3 in Name.tsx
 *
 * Acceptance Criteria:
 * 1. The application at /appWithoutSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should only see 1 network request in the browser's network tab when visiting the /appWithoutSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const useCachingFetch: UseCachingFetch = (url) => {
  const [data, setData] = useState<Record<string, any> | null>(cache[url] || null);
  const [isLoading, setIsLoading] = useState(!cache[url]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If the data is already cached, skip fetching
    if (cache[url]) return;

    setIsLoading(true);

    // Avoid duplicate requests for the same URL
    if (!pendingRequests[url]) {
      pendingRequests[url] = fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((result) => {
          cache[url] = result; // Cache the result
          return result;
        })
        .catch((fetchError) => {
          console.error(`Error fetching data from ${url}:`, fetchError);
          throw fetchError;
        })
        .finally(() => {
          delete pendingRequests[url]; // Remove the pending request
        });
    }

    // Handle the promise
    pendingRequests[url]
      .then((result) => setData(result))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [url]);

  return { isLoading, data, error };
};

/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 */
export const preloadCachingFetch = async (url: string): Promise<void> => {
  if (cache[url]) return;

  if (!pendingRequests[url]) {
    pendingRequests[url] = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to preload data from ${url}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        cache[url] = data;
        return data;
      })
      .catch((error) => {
        console.error(`Error preloading data from ${url}:`, error);
        throw error;
      });
  }

  await pendingRequests[url];
};

/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 */
export const serializeCache = (): string => {
  try {
    return JSON.stringify(cache);
  } catch (error) {
    console.error('Error serializing cache:', error);
    return '{}';
  }
};

/**
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
export const initializeCache = (serializedCache: string): void => {
  try {
    const parsedCache = JSON.parse(serializedCache) as Record<string, Record<string, any>>;
    Object.assign(cache, parsedCache);
  } catch (error) {
    console.error('Error initializing cache:', error);
  }
};

/**
 * Clears all entries in the cache.
 */
export const wipeCache = (): void => {
  Object.keys(cache).forEach((key) => delete cache[key]);
};
