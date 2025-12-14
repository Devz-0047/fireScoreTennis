import React from 'react';

export default function RankingsTableSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden">
            <div className="overflow-x-hidden overflow-y-hidden">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">Rank</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-full">Player</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Wins</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Losses</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Slams</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white dark:bg-slate-800">
                        {[...Array(10)].map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-3.5 w-5 bg-slate-200 dark:bg-slate-700 rounded mr-3"></div>
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
