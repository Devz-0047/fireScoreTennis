import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayer } from '../services/apiService';
import { getCountryCode } from '../utils/countryMapper';
import FlagIcon from '../components/ui/FlagIcon';
import { getPlayerImage, getFallbackImage } from '../utils/playerImageUtils';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Crown, TrendingUp } from 'lucide-react';

export default function PlayerProfilePage() {
    const { playerId } = useParams();
    const navigate = useNavigate();

    // API now returns { player: {...}, last5Matches: [...] }
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['player', playerId],
        queryFn: () => fetchPlayer(playerId),
        enabled: !!playerId,
    });

    const player = data?.player;
    const last5Matches = data?.last5Matches || [];

    // Debugging Image Logic
    if (player) {
        console.log('Player Name:', player.name);
        console.log('Selected Image URL:', getPlayerImage(player.name));
    }

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                {/* Back Button Skeleton */}
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>

                {/* Main Profile Card Skeleton */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700/50">
                    <div className="md:flex items-start md:space-x-8">
                        {/* Photo Skeleton */}
                        <div className="flex-shrink-0 text-center md:text-left mb-6 md:mb-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-600"></div>
                        </div>

                        <div className="flex-grow space-y-4">
                            <div className="text-center md:text-left">
                                {/* Name Skeleton */}
                                <div className="h-10 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-4 mx-auto md:mx-0"></div>
                                {/* Details Line Skeleton */}
                                <div className="flex items-center justify-center md:justify-start space-x-4">
                                    <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                            </div>

                            {/* Stats Grid Skeleton */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg border border-slate-200 dark:border-slate-700 h-24"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Grid Skeleton */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 h-48"></div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 h-48"></div>
                </div>
            </div>
        );
    }

    if (isError || !player) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl text-slate-500 dark:text-slate-400">Player not found</h2>
                <p className="text-sm text-red-400 mt-2">{error?.message}</p>
                <button onClick={() => navigate('/rankings')} className="mt-4 text-blue-500 dark:text-blue-400 hover:underline cursor-pointer">Back to Rankings</button>
            </div>
        )
    }

    // Calculate Win Rate
    const totalMatches = player.wins + player.losses;
    const winRate = totalMatches > 0 ? Math.round((player.wins / totalMatches) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <button
                onClick={() => navigate('/rankings')}
                className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-4 cursor-pointer"
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
                                src={getPlayerImage(player.name)}
                                alt={player.name}
                                onError={(e) => {
                                    console.error('Image failed to load:', e.target.src);
                                    e.target.onerror = null;
                                    e.target.src = getFallbackImage(player.name);
                                }}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    <div className="flex-grow space-y-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{player.name}</h1>
                            <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 dark:text-slate-400">
                                <div className="flex items-center space-x-2">
                                    <FlagIcon code={getCountryCode(player.country_code)} />
                                    <span>{getCountryCode(player.country_code).toUpperCase()}</span>
                                </div>
                                <span>•</span>
                                <span>{player.age} years old</span>
                                <span>•</span>
                                <span>{player.hand}</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                            <StatBox label="Rank" value={`#${player.ranking}`} icon={<Crown className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />} />
                            <StatBox label="Grand Slams" value={player.grandSlams} icon={<Trophy className="w-5 h-5 text-green-500 dark:text-green-400" />} />
                            <StatBox label="Height / Weight" value={`${player.height}`} subtext={player.weight} icon={<div className="text-xs font-bold">PHY</div>} />
                            <StatBox label="Win Rate" value={`${winRate}%`} subtext={`${player.wins} Wins`} icon={<TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Career Stats & Backhand */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Physical / Technical */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Player Details</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                            <span className="text-slate-500">Backhand</span>
                            <span className="font-medium text-slate-900 dark:text-white">{player.backhand}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                            <span className="text-slate-500">Play Style</span>
                            <span className="font-medium text-slate-900 dark:text-white">{player.hand}</span>
                        </div>
                        {/* Recent Form (Restored) */}
                        <div className="pt-4">
                            <span className="text-slate-500 block mb-2 text-sm">Recent Matches</span>
                            <div className="flex space-x-2">
                                {last5Matches && last5Matches.length > 0 ? (
                                    last5Matches.map((match, i) => {
                                        // Robust handling: match could be string 'W' or object { result: 'W' }
                                        const result = typeof match === 'string' ? match : (match.result || '?');
                                        const isWin = result === 'W';
                                        return (
                                            <div
                                                key={i}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isWin
                                                    ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                                                    : 'bg-red-500/20 text-red-600 dark:text-red-400'
                                                    }`}
                                            >
                                                {result}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span className="text-slate-400 italic text-sm">No recent matches</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Career Matches</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Wins / Losses</span>
                            <span className="text-slate-900 dark:text-white font-mono">{player.wins} / {player.losses}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full" style={{ width: `${winRate}%` }}></div>
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
