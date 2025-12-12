import { useState } from 'react';
import { matches } from '../data/matches';
import MatchList from '../components/score/MatchList';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const tabs = [
    { id: 'LIVE', label: 'Live' },
    { id: 'FINISHED', label: 'Finished' },
    { id: 'UPCOMING', label: 'Upcoming' },
];

export default function ScorePage() {
    const [activeTab, setActiveTab] = useState('LIVE');

    return (
        <div className="space-y-6">
            {/* Sub Navigation */}
            <div className="flex justify-center">
                <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-lg backdrop-blur-sm border border-slate-700/50 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "relative px-6 py-2 rounded-md text-sm font-medium transition-colors outline-none focus:ring-2 focus:ring-blue-500/50",
                                activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                            )}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="score-tab-bg"
                                    className="absolute inset-0 bg-slate-700 rounded-md shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 text-xl font-semibold">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <MatchList key={activeTab} matches={matches} filter={activeTab} />
        </div>
    );
}
