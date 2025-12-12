import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ScorePage from './pages/ScorePage';
import RankingsPage from './pages/RankingsPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import AboutPage from './pages/AboutPage';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="score" element={<ScorePage />} />
          <Route path="rankings" element={<RankingsPage />} />
          <Route path="rankings/:playerId" element={<PlayerProfilePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/score" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
