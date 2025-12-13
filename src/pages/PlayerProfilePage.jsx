import { useParams, useNavigate } from 'react-router-dom';
import { rankings } from '../data/rankings';
import FlagIcon from '../components/ui/FlagIcon';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Crown, TrendingUp } from 'lucide-react';

export default function PlayerProfilePage() {
    const { playerId } = useParams();
    const navigate = useNavigate();
    const player = rankings.find(p => p.id === playerId);

    if (!player) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl text-slate-500 dark:text-slate-400">Player not found</h2>
                <button onClick={() => navigate('/rankings')} className="mt-4 text-blue-500 dark:text-blue-400 hover:underline">Back to Rankings</button>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <button
                onClick={() => navigate('/rankings')}
                className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Rankings
            </button>

            {/* Main Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700/50">
                <div className="md:flex items-start md:space-x-8">
                    {/* Photo & Basic Info */}
                    <div className="flex-shrink-0 text-center md:text-left mb-6 md:mb-0">
                        <motion.div
                            className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-slate-200 dark:border-slate-600 overflow-hidden shadow-2xl relative"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                        >
                            <img
                                src={`https://i.pravatar.cc/300?u=${player.id}`}
                                alt={player.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    <div className="flex-grow space-y-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{player.name}</h1>
                            <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 dark:text-slate-400">
                                <div className="flex items-center space-x-2">
                                    <FlagIcon code={player.countryCode} />
                                    <span>{player.countryCode}</span>
                                </div>
                                <span>•</span>
                                <span>{player.age} years old</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <StatBox label="Current Rank" value={`#${player.rank}`} icon={<Crown className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />} />
                            <StatBox label="Best Rank" value={`#${player.bestRank}`} icon={<TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />} />
                            <StatBox label="Career Titles" value={player.careerTitles} icon={<Trophy className="w-5 h-5 text-green-500 dark:text-green-400" />} />
                            <StatBox label="Win Rate" value={`${Math.round((player.mw / (player.mw + 12)) * 100)}%`} subtext={`${player.mw} Wins`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent History */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Form</h3>
                    <div className="flex space-x-2">
                        {player.history.map((result, i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${result === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                            >
                                {result}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Last 5 matches</p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Season Stats</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Sets Won/Lost</span>
                            <span className="text-slate-900 dark:text-white font-mono">{player.sw} / 24</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full" style={{ width: `${(player.sw / (player.sw + 24)) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center text-sm pt-2">
                            <span className="text-slate-500 dark:text-slate-400">Game Difference</span>
                            <span className="text-green-500 dark:text-green-400 font-mono">+{player.gd}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatBox({ label, value, subtext, icon }) {
    return (
        <div className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</span>
                {icon}
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>
            {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
        </div>
    )
}
