import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react'; // Fallback icon
import FlagIcon from '../ui/FlagIcon';

// Tennis Ball Icon Component
const TennisBall = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 0 0 20M2 12h20" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" fill="none" />
        <path d="M12 2c-3 3-5 7-5 10s2 7 5 10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" fill="none" />
    </svg>
);

export default function LiveMatchCard({ match }) {
    const { player1, player2, sets, currentScore, server, matchId } = match;

    return (
        <div className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700/50 mb-4">
            <div className="space-y-4">
                {/* Player 1 Row */}
                <PlayerRow
                    player={player1}
                    isServing={server === 'p1'}
                    score={currentScore?.p1}
                    sets={sets.map(s => s.p1)}
                    matchId={matchId}
                    playerId="p1"
                />

                {/* Divider */}
                <div className="h-px bg-slate-700/50" />

                {/* Player 2 Row */}
                <PlayerRow
                    player={player2}
                    isServing={server === 'p2'}
                    score={currentScore?.p2}
                    sets={sets.map(s => s.p2)}
                    matchId={matchId}
                    playerId="p2"
                />
            </div>

            <div className="mt-3 flex justify-between items-center text-xs text-slate-400 uppercase tracking-widest font-semibold px-2">
                <span>Round of 16</span>
                <span className="text-red-400 animate-pulse">● Live</span>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
import { rankings } from '../../data/rankings';

// ... (code)

function PlayerRow({ player, isServing, score, sets, matchId, playerId }) {
    // Find player ID from rankings
    const profile = rankings.find(r => r.name === player.name);

    return (
        <div className="flex items-center justify-between">
            {/* Name and Info */}
            <div className="flex items-center space-x-3 flex-1">
                {/* Server Indicator Placeholder - Fixed width to prevent jumping */}
                <div className="w-5 flex justify-center">
                    {isServing && (
                        <motion.div
                            layoutId={`server-ball-${matchId}`}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <TennisBall />
                        </motion.div>
                    )}
                </div>

                <FlagIcon code={player.countryCode} />
                {profile ? (
                    <Link to={`/rankings/${profile.id}`} className="font-semibold text-lg text-white tracking-tight hover:text-blue-400 hover:underline decoration-blue-500/50 underline-offset-4 transition-colors">
                        {player.name}
                    </Link>
                ) : (
                    <span className="font-semibold text-lg text-white tracking-tight">{player.name}</span>
                )}
            </div>

            {/* Scores */}
            <div className="flex items-center space-x-6">
                {/* Set Scores */}
                <div className="flex space-x-4 text-slate-400 font-mono text-sm">
                    {sets.map((s, i) => (
                        <span key={i}>{s}</span>
                    ))}
                </div>

                {/* Current Game Score (Prominent) */}
                <div className="w-12 text-right">
                    <AnimatePresence mode='popLayout'>
                        <motion.span
                            key={score}
                            initial={{ scale: 1.5, color: '#60a5fa' }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="inline-block font-bold text-xl text-yellow-400 font-mono"
                        >
                            {score}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
