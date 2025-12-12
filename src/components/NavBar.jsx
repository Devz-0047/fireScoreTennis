import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react';

const tabs = [
    { path: '/', label: 'Home', exact: true },
    { path: '/score', label: 'Score' },
    { path: '/rankings', label: 'Rankings' },
    { path: '/about', label: 'About' },
];

export default function NavBar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const activePath = location.pathname;
    const isHome = activePath === '/';

    return (
        <nav className={clsx(
            "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
            isHome && !isOpen ? "bg-transparent border-transparent" : "bg-slate-950 border-b border-slate-800 shadow-lg"
        )}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0 font-bold text-3xl md:text-4xl tracking-tight text-blue-400 z-50 relative">
                        FireScore
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-12 text-2xl">
                        {tabs.map((tab) => {
                            const isActive = tab.exact
                                ? activePath === tab.path
                                : activePath.startsWith(tab.path);

                            return (
                                <li key={tab.path} className="relative">
                                    <Link
                                        to={tab.path}
                                        className={clsx(
                                            "block py-2 font-bold transition-colors hover:text-blue-300 focus:outline-none",
                                            isActive ? "text-white" : "text-slate-400"
                                        )}
                                    >
                                        {tab.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white z-50 relative focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
                    >
                        <ul className="px-6 pb-8 pt-2 space-y-4">
                            {tabs.map((tab) => {
                                const isActive = tab.exact
                                    ? activePath === tab.path
                                    : activePath.startsWith(tab.path);

                                return (
                                    <motion.li
                                        key={tab.path}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            to={tab.path}
                                            onClick={() => setIsOpen(false)}
                                            className={clsx(
                                                "block text-2xl font-bold transition-colors",
                                                isActive ? "text-blue-400" : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            {tab.label}
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
