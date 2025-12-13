import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlagIcon from '../ui/FlagIcon';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

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

export default function RankingsTable({ players }) {
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

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
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const HeaderCell = ({ label, sortKey }) => (
        <th
            className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => handleSort(sortKey)}
        >
            <div className="flex items-center space-x-1">
                <span>{label}</span>
                <ArrowUpDown className="w-3 h-3" />
            </div>
        </th>
    );

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                            <HeaderCell label="Rank" sortKey="rank" />
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Player</th>
                            <HeaderCell label="MW" sortKey="mw" />
                            <HeaderCell label="SW" sortKey="sw" />
                            <HeaderCell label="GD" sortKey="gd" />
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
                                key={player.id}
                                variants={item}
                                onClick={() => navigate(`/rankings/${player.id}`)}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-mono">#{player.rank}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FlagIcon code={player.countryCode} className="mr-3 w-5 h-3.5" />
                                        <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{player.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{player.mw}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{player.sw}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 font-mono">{player.gd > 0 ? '+' : ''}{player.gd}</td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
}
