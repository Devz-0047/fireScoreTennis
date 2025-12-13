---
sidebar_position: 2
---

# Data Flow (TanStack Query)

We use **TanStack Query (React Query)** to manage server state, eliminating the need for complex global state libraries like Redux for data fetching.

## How it Works

1.  **Query Keys**: Each data point is identified by a unique key (e.g., `['match', '123']`).
2.  **Stale Time**: We configure `staleTime` to prevent excessive network requests. Data is considered "fresh" for a set period.
3.  **Caching**: If a user navigates away and comes back, the data is served instantly from the cache while a background refetch occurs.

## Code Example

```javascript
// Example from ScorePage.jsx
const { data: matches, isLoading, isError } = useQuery({
    queryKey: ['matches'], // Unique key for caching
    queryFn: fetchMatches, // The fetcher function from apiService
    staleTime: 1000 * 60,  // Data is fresh for 1 minute
});
```

## Handling States

-   **isLoading**: Triggers the `MatchCardSkeleton` or `RankingsTableSkeleton`.
-   **isError**: Displays a user-friendly error message, often with a "Retry" option.
-   **Success**: Renders the live components.
