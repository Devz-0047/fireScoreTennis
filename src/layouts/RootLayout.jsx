import { Outlet, Navigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function RootLayout() {
    const location = useLocation();

    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500/30">
            <NavBar />
            <main className={isHome ? "flex-grow w-full" : "flex-grow w-full max-w-4xl mx-auto px-4 py-8 mt-24"}>
                <Outlet />
            </main>
            {/* Show Footer only on Home and About pages */}
            {(isHome || location.pathname === '/about') && <Footer />}
        </div>
    );
}
