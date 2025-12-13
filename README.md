# FireScore Tennis 🎾

FireScore Tennis is a modern, high-performance web application designed to provide real-time tennis scores, player rankings, and detailed match statistics. Built with React and the latest web technologies, it offers a seamless and responsive user experience.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

-   **Live Rankings**: Real-time ATP/WTA style player rankings with sortable stats.
-   **Player Profiles**: Detailed player biography, career statistics, and recent form analysis.
-   **Live Scores**: (In Progress) Real-time match updates and score tracking.
-   **Dynamic Filtering**: Advanced sorting capabilities for player statistics (Wins, Slams, etc.).
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
-   **Dark Mode**: Built-in dark mode support for better visibility in low-light environments.

## 🛠️ Technology Stack

-   **Frontend Framework**: [React](https://reactjs.org/) (v18+) with [Vite](https://vitejs.dev/) for lightning-fast build times.
-   **State Management & Data Fetching**: [Tanstack Query (React Query)](https://tanstack.com/query/latest) for robust server-state management, caching, and synchronization.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design system.
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions and micro-interactions.
-   **Icons**: [Lucide React](https://lucide.dev/) for consistent and lightweight scalable vector icons.
-   **HTTP Client**: [Axios](https://axios-http.com/) for streamlined API requests.

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── rankings/       # Rankings-specific components (RankingsTable, etc.)
│   └── ui/             # Generic UI elements (FlagIcon, Buttons, etc.)
├── context/            # Global context providers (ThemeContext)
├── data/               # Static data fallbacks and constants
├── layouts/            # Page layouts (RootLayout, Sidebar)
├── pages/              # Main application views (RankingsPage, PlayerProfilePage)
├── services/           # API integration and service layers
├── utils/              # Helper functions (countryMapper, formatting)
├── App.jsx             # Main application router and entry point
└── main.jsx            # Application bootstrap and provider configuration
```

## ⚙️ Key Implementation Details

### 1. Data Fetching & Caching
We utilize **Tanstack Query** to handle all server data. This ensures:
-   **Automatic Caching**: Data is cached and reused, minimizing network requests.
-   **Background Updates**: Data remains fresh with customizable stale times.
-   **Loading/Error States**: Robust handling of loading skeletons and error UI.

**Example (`useQuery` in `RankingsTable.jsx`):**
```javascript
const { data: players, isLoading } = useQuery({
    queryKey: ['players', 'rankings'],
    queryFn: fetchPlayers,
    staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### 2. Intelligent Sorting Logic
The `RankingsTable` implements a sophisticated sorting mechanism:
-   **Smart Defaults**: Numeric columns (Wins, Slams) sort **High-to-Low** (Descending) by default.
-   **Quick Toggle**: Clicking a column sorts it; clicking again **resets** the filter to the default Ranking view. This provides a fast "inspect and dismiss" workflow.

### 3. API Integration
The application consumes a RESTful API with endpoints mapped in `src/services/apiService.js`:
-   `GET /api/players/`: Fetches the full list of players for the leaderboard.
-   `GET /api/players/:id`: Retrieves detailed profile data including history.

### 4. Utility Logic
-   **Country Mapping**: `src/utils/countryMapper.js` intelligently maps numeric country codes (e.g., `381`) to ISO alpha-2 codes (e.g., `rs`) to render accurate flags via the `FlagIcon` component.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/firescore-tennis.git
    cd firescore-tennis
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    VITE_API_BASE_URL=http://your-api-url:port
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the app.

## 🧪 Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist` folder ready for deployment to Vercel, Netlify, or your preferred hosting provider.

## 🤝 Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

*Built with ❤️ for Tennis Fans*
