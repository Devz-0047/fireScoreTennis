import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import FlagIcon from '../ui/FlagIcon';
import { useState } from 'react';
import { ArrowUpDown, AlertCircle } from 'lucide-react';
import { fetchPlayers } from '../../services/apiService';
import { getCountryCode } from '../../utils/countryMapper';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function RankingsTable() {
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: 'ranking', direction: 'asc' });

    const { data: players, isLoading, isError, error } = useQuery({
        queryKey: ['players', 'rankings'],
        queryFn: fetchPlayers,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center placeholder:blur-sm"
                >
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                </motion.div>
            </div>
        );
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

    const sortedPlayers = [...players].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';

        // Smart defaults: Numeric stats (Wins, Slams) generally start High-to-Low
        if ((key === 'wins' || key === 'grandSlams') && sortConfig.key !== key) {
            direction = 'desc';
        }

        if (sortConfig.key === key) {
            // Standard toggle: Asc <-> Desc
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }

        setSortConfig({ key, direction });
    };

    const HeaderCell = ({ label, sortKey }) => {
        const isActive = sortConfig.key === sortKey;
        return (
            <th
                className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                onClick={() => handleSort(sortKey)}
            >
                <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    <ArrowUpDown className={`w-3 h-3 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                </div>
            </th>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden">
            <div className="overflow-x-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                            <HeaderCell label="Rank" sortKey="ranking" />
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Player</th>
                            <HeaderCell label="Wins" sortKey="wins" />
                            <HeaderCell label="Losses" sortKey="losses" />
                            <HeaderCell label="Slams" sortKey="grandSlams" />
                        </tr>
                    </thead>
                    <motion.tbody
                        className="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-slate-800"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {sortedPlayers.map((player) => (
                            <motion.tr
                                key={player._id}
                                variants={item}
                                onClick={() => navigate(`/rankings/${player._id}`)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">#{player.ranking}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FlagIcon code={getCountryCode(player.counrty_code)} className="mr-3 w-5 h-3.5" />
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
    );
}
