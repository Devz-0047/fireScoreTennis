---
sidebar_position: 5
---

# Getting Started

## 1. Prerequisites

-   **Node.js**: v18 or higher recommended.
-   **npm**: Installed with Node.js.
-   **API Server**: Ensure the Team Phoenix API is running.

## 2. Installation

```bash
# Clone the repository
git clone https://github.com/Devz-0047/fireScoreTennis.git

# Navigate to project directory
cd fireScoreTennis

# Install dependencies
npm install
```

## 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Point this to your local or hosted API
VITE_API_BASE_URL=http://192.168.1.107:8000
```

> **Note on API:** The application is hardcoded to expect the backend at `http://192.168.1.107:8000/api/` based on current hackathon network configuration. Change this in `.env.local` if the server IP changes.

## 4. Running the App

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.
