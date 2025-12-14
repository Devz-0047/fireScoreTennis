import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import FlagIcon from '../ui/FlagIcon';
import { useState, useMemo } from 'react';
import { ArrowUpDown, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { fetchPlayers } from '../../services/apiService';
import { getCountryCode } from '../../utils/countryMapper';
import { RankingTableSkeleton } from '../skeletons';

// Variants removed for separate animation performance

export default function RankingsTable() {
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: 'ranking', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: players, isLoading, isError, error } = useQuery({
        queryKey: ['players', 'rankings'],
        queryFn: fetchPlayers,
    });

    const sortedPlayers = useMemo(() => {
        if (!players) return [];
        return [...players].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [players, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';

        // Smart defaults: Numeric stats (Wins, Slams, Losses) start High-to-Low (Descending)
        // This means the "best" (or highest count) is shown first.
        if (['wins', 'losses', 'grandSlams'].includes(key) && sortConfig.key !== key) {
            direction = 'desc';
        } else if (sortConfig.key === key) {
            // Toggle direction if clicking the same header
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }

        setSortConfig({ key, direction });
        setCurrentPage(1); // Reset to first page on sort
    };

    // Calculate Pagination Slices
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = useMemo(() => {
        return sortedPlayers.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortedPlayers, indexOfFirstItem, indexOfLastItem]);

    const totalPages = players ? Math.ceil(players.length / itemsPerPage) : 0;

    if (isLoading) {
        return <RankingTableSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 text-red-500 p-6">
                <AlertCircle className="w-12 h-12 mb-4 opacity-80" />
                <p className="text-lg font-medium">Error loading rankings</p>
                <p className="text-sm opacity-75 mt-2">{error.message || 'Unable to fetch data'}</p>
            </div>
        );
    }

    const HeaderCell = ({ label, sortKey, className = "w-32" }) => {
        const isActive = sortConfig.key === sortKey;
        return (
            <th
                className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-700/30 ${isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-slate-500 dark:text-slate-400'
                    } ${className}`}
                onClick={() => handleSort(sortKey)}
            >
                <div className="flex items-center space-x-1 group">
                    <span>{label}</span>
                    <div className="flex flex-col">
                        {/* Show specific arrow if active, or opacity reduced double arrow if inactive */}
                        {isActive ? (
                            sortConfig.direction === 'asc' ? (
                                <ChevronUp className="w-4 h-4" />
                            ) : (
                                <ChevronDown className="w-4 h-4" />
                            )
                        ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                        )}
                    </div>
                </div>
            </th>
        );
    };

    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                <div className="overflow-x-hidden">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
                        <thead className="bg-slate-50 dark:bg-slate-900/50">
                            <tr>
                                <HeaderCell label="Rank" sortKey="ranking" className="w-24" />
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-full">Player</th>
                                <HeaderCell label="Wins" sortKey="wins" />
                                <HeaderCell label="Losses" sortKey="losses" />
                                <HeaderCell label="Slams" sortKey="grandSlams" />
                            </tr>
                        </thead>
                        <motion.tbody
                            className="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-slate-800"
                        >
                            {currentItems.map((player) => (
                                <motion.tr
                                    layout
                                    key={player._id}
                                    onClick={() => navigate(`/rankings/${player._id}`)}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group"
                                    whileHover={{ scale: 1.01, zIndex: 10, position: 'relative' }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">#{player.ranking}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FlagIcon code={getCountryCode(player.country_code)} className="mr-3 w-5 h-3.5" />
                                            <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{player.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{player.wins}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{player.losses}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 font-mono">{player.grandSlams}</td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center px-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
