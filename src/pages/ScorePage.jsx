import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MatchList from '../components/score/MatchList';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { fetchMatches } from '../services/apiService';

const tabs = [
    { id: 'LIVE', label: 'Live' },
    { id: 'FINISHED', label: 'Finished' },
    { id: 'UPCOMING', label: 'Upcoming' },
];

import MatchCardSkeleton from '../components/skeletons/MatchCardSkeleton';

export default function ScorePage() {
    const [activeTab, setActiveTab] = useState('LIVE');

    const { data: matches, isLoading, isError, error } = useQuery({
        queryKey: ['matches'],
        queryFn: fetchMatches,
    });

    if (isError) {
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                Error loading matches: {error.message}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Sub Navigation */}
            <div className="flex justify-center">
                <div className="flex space-x-2 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm border border-slate-300 dark:border-slate-700/50 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "relative cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500/50",
                                activeTab === tab.id
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="score-tab-bg"
                                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-md shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span
                                className={clsx(
                                    "relative z-10 text-xl font-semibold transition-colors",
                                    activeTab === tab.id
                                        ? "text-slate-900 dark:text-white"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                )}
                            >
                                <div className="flex items-center space-x-2">
                                    {tab.id === 'LIVE' && (
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                        </span>
                                    )}
                                    <span>{tab.label}</span>
                                </div>
                            </span>

                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <MatchCardSkeleton key={i} />
                    ))}
                </div>
            ) : (
                <MatchList key={activeTab} matches={matches || []} filter={activeTab} />
            )}
        </div>
    );
}
