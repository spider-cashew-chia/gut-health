import { createClient } from '@sanity/client';

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// Custom fetch function that uses proxy in development to avoid CORS issues
// Note: For production, configure CORS in Sanity project settings at https://www.sanity.io/manage
const customFetch = isDevelopment
  ? async (url, options = {}) => {
      // Handle both string URLs and Request objects
      let originalUrl =
        typeof url === 'string'
          ? url
          : url?.url || url?.toString() || String(url);

      // Only proxy Sanity API URLs
      if (
        !originalUrl.includes('4aoe166b.api.sanity.io') &&
        !originalUrl.includes('4aoe166b.apicdn.sanity.io')
      ) {
        return fetch(url, options);
      }

      // Replace Sanity API URLs with proxy path
      const proxyUrl = originalUrl
        .replace('https://4aoe166b.api.sanity.io', '/api/sanity')
        .replace('https://4aoe166b.apicdn.sanity.io', '/api/sanity');

      console.log('Custom fetch intercepting:', originalUrl, '->', proxyUrl);

      // If it's a Request object, create a new one with the proxy URL
      if (url instanceof Request) {
        return fetch(new Request(proxyUrl, url));
      }

      return fetch(proxyUrl, options);
    }
  : undefined;

// Create Sanity client with modern API (with CDN for faster reads)
export const client = createClient({
  projectId: '4aoe166b',
  dataset: 'production',
  useCdn: true, // `true` for faster, cached reads
  apiVersion: '2025-12-12', // use today's date for latest API
  // Use custom fetch in development to route through proxy
  ...(customFetch ? { fetch: customFetch } : {}),
});

// Client without CDN for real-time data (bypasses cache)
export const clientNoCdn = createClient({
  projectId: '4aoe166b',
  dataset: 'production',
  useCdn: false, // `false` to bypass CDN cache for fresh data
  apiVersion: '2025-12-12',
  // Use custom fetch in development to route through proxy
  ...(customFetch ? { fetch: customFetch } : {}),
});
