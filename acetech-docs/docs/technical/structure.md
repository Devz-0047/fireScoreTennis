---
sidebar_position: 3
---

# Project Structure

## Directory Breakdown (`src/`)

-   **`assets/`**: Static assets like images (logos, placeholders) and global styles (`index.css`).
-   **`components/`**: Reusable UI blocks.
    -   `rankings/`: Code specific to the Rankings Table.
    -   `score/`: Match cards and match lists.
    -   `skeletons/`: Loading state placeholders.
    -   `ui/`: Generic atoms like `FlagIcon`.
-   **`context/`**: React Context providers (e.g., `ThemeContext` for Dark Mode).
-   **`pages/`**: Top-level route components (`ScorePage`, `MatchDetailsPage`, `LandingPage`).
-   **`services/`**: API integration logic.
    -   `apiService.js`: The central Axios instance and fetch methods.
-   **`utils/`**: Helper functions (e.g., `countryMapper.js` for flag codes).

## The Role of `apiService.js`

This file is the **bridge** between the frontend and the backend. It:
1.  Creates a centralized `axios` instance.
2.  Injects the `VITE_API_BASE_URL` from environment variables.
3.  Exports async functions (`fetchMatches`, `fetchPlayers`) that return Promises.
