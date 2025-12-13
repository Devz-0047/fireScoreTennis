import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import FlagIcon from '../ui/FlagIcon';
import { ArrowLeft, Trophy, Activity, Zap, Target, Shield, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { getCountryCode } from '../../utils/countryMapper';
import MatchDetailsSkeleton from '../skeletons/MatchDetailsSkeleton';

export default function LiveMatchDetails({ match: initialMatch }) {
    const navigate = useNavigate();
    const [match, setMatch] = useState(initialMatch);
    const socketRef = useRef(null);
    // Use initialMatch status or match status
    const matchId = match?.matchId;

    // --------------------------
    // Initial Load (ONCE)
    // --------------------------
    useEffect(() => {
        if (!matchId) return;

        const loadMatch = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
                const res = await axios.get(
                    `${baseUrl}/api/matches/${matchId}`
                );
                setMatch(res.data);
            } catch (err) {
                console.error("Failed to load match data", err);
            }
        };
        // If we don't have initial data, fetch it. If we do, we might skip or re-fetch to be safe.
        // User pattern suggests fetching.
        loadMatch();
    }, [matchId]);

    // --------------------------
    // Socket Listener (READ ONLY)
    // --------------------------
    useEffect(() => {
        if (!matchId) return;

        const socketUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

        socketRef.current = io(socketUrl, {
            transports: ["websocket"]
        });

        console.log(`🔌 Connecting to Socket.IO: ${socketUrl}`);
        socketRef.current.emit("joinMatch", matchId);

        socketRef.current.on("scoreUpdated", (score) => {
            console.log("⚡ Socket Update (Score):", score);
            setMatch(prev => ({
                ...prev,
                // Assuming 'score' is relevant part of match or we merge it
                // If the backend sends { currentScore: '...' } etc
                ...score
            }));
        });

        socketRef.current.on("matchUpdated", (updatedData) => {
            console.log("⚡ Match Update:", updatedData);
            setMatch(prev => ({ ...prev, ...updatedData }));
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [matchId]);

    if (!match) return <MatchDetailsSkeleton />;

    const { playerA, playerB, statistics, matchInfo, status } = match;

    // Map API stats to component format
    const stats = statistics || {
        aces: { playerA: 0, playerB: 0 },
        doubleFaults: { playerA: 0, playerB: 0 },
        firstServePercentage: { playerA: 0, playerB: 0 },
        winOnFirstServe: { playerA: 0, playerB: 0 },
        breakPointsSaved: { playerA: 0, playerB: 0 },
        winners: { playerA: 0, playerB: 0 },
        unforcedErrors: { playerA: 0, playerB: 0 },
    };

    // Extract Score Info (Adapting to potential data structure variants)
    const sets = match.sets || [];
    // Normalize current score: try playerA/B, fallback to p1/p2, fallback to 0
    const scoreA = match.currentScore?.playerA || match.currentScore?.p1 || '0';
    const scoreB = match.currentScore?.playerB || match.currentScore?.p2 || '0';

    const renderHeaderContent = () => {
        return (
            <div className="flex flex-col items-center w-full px-4">
                {/* Tournament info remains above in common header, but we keep round here if desired or generic "VS" replaced by score */}

                {/* Scoreboard Container */}
                <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 w-full max-w-sm">
                    {/* Live Indicator */}
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Live Score</span>
                    </div>

                    {/* Sets Display */}
                    <div className="flex w-full justify-between items-center mb-4 text-sm font-mono text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700/50 pb-2">
                        <span>Sets</span>
                        <div className="flex space-x-6">
                            {sets.map((set, index) => (
                                <div key={index} className="flex flex-col items-center space-y-1">
                                    <span className="text-xs uppercase">Set {index + 1}</span>
                                    <div className="flex space-x-2 text-slate-800 dark:text-slate-200 font-bold">
                                        <span>{set.playerA || set.p1 || 0}</span>
                                        <span className="text-slate-400">-</span>
                                        <span>{set.playerB || set.p2 || 0}</span>
                                    </div>
                                </div>
                            ))}
                            {sets.length === 0 && <span className="text-xs">Match Starting...</span>}
                        </div>
                    </div>

                    {/* Points / Current Game */}
                    <div className="flex items-center justify-between w-full">
                        {/* Player A Points */}
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white">
                                {scoreA}
                            </span>
                        </div>

                        <div className="px-4 text-slate-300 dark:text-slate-600 font-light text-2xl">
                            -
                        </div>

                        {/* Player B Points */}
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white">
                                {scoreB}
                            </span>
                        </div>
                    </div>

                    <div className="mt-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Current Game
                    </div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl mx-auto"
        >
            {/* Header / Back Button */}
            <button
                onClick={() => navigate('/score')}
                className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scores
            </button>

            {/* Scoreboard Header */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700/50">
                {/* Match Info Bar */}
                <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 flex justify-between items-center text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4" />
                        <span>{matchInfo?.tournament || 'Tournament'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span>LIVE</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 relative">
                        {/* Player 1 */}
                        <PlayerDisplay player={playerA} isWinner={false} isServer={false} />

                        {/* Vs / Score / Time */}
                        <div className="flex flex-col items-center z-10 w-full md:w-auto">
                            {renderHeaderContent()}
                        </div>

                        {/* Player 2 */}
                        <PlayerDisplay player={playerB} isWinner={false} isServer={false} />
                    </div>
                </div>
            </div>

            {/* Statistics / Comparison Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Momentum / Key Stats */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-500" />
                            Match Statistics
                        </h3>

                        <div className="space-y-6">
                            <StatBar label="Aces" p1={stats.aces.playerA} p2={stats.aces.playerB} icon={<Zap size={14} />} />
                            <StatBar label="Double Faults" p1={stats.doubleFaults.playerA} p2={stats.doubleFaults.playerB} reverse />
                            <StatBar label="1st Serve %" p1={stats.firstServePercentage.playerA} p2={stats.firstServePercentage.playerB} suffix="%" />
                            <StatBar label="Win % on 1st Serve" p1={stats.winOnFirstServe.playerA} p2={stats.winOnFirstServe.playerB} suffix="%" />
                            <StatBar label="Winners" p1={stats.winners.playerA} p2={stats.winners.playerB} icon={<Target size={14} />} />
                            <StatBar label="Unforced Errors" p1={stats.unforcedErrors.playerA} p2={stats.unforcedErrors.playerB} reverse />
                            <StatBar label="Break Points Saved" p1={stats.breakPointsSaved.playerA} p2={stats.breakPointsSaved.playerB} icon={<Shield size={14} />} />
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Match Info</h3>
                        <div className="space-y-4">
                            <InfoRow label="Tournament" value={matchInfo?.tournament} />
                            <InfoRow label="Round" value={matchInfo?.round} />
                            <InfoRow label="Surface" value={matchInfo?.surface} />
                            <InfoRow label="Court" value={matchInfo?.court} />
                            <InfoRow label="Umpire" value={matchInfo?.umpire} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ----------------------------------------------------------------------
// Reusable sub-components
// ----------------------------------------------------------------------

function PlayerDisplay({ player, isWinner, isServer, alignRight }) {
    if (!player) return null;

    return (
        <div className={clsx("flex flex-col items-center space-y-4 flex-1", alignRight && "md:flex-col-reverse")}>
            <div className="relative">
                <div className={clsx(
                    "w-24 h-24 rounded-full p-1 border-2",
                    isWinner ? "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]" : "border-slate-200 dark:border-slate-700"
                )}>
                    <img
                        src={`https://i.pravatar.cc/300?u=${player._id}`}
                        alt={player.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                {isServer && (
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 p-1.5 rounded-full shadow-lg border-2 border-slate-900">
                        <Zap size={12} fill="currentColor" />
                    </div>
                )}
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                    <FlagIcon code={getCountryCode(player.counrty_code)} className="w-4 h-3" />
                    <span>{player.counrty_code}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {player.name}
                </h2>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Rank #{player.ranking}</div>
            </div>
        </div>
    );
}

function StatBar({ label, p1, p2, suffix = '', reverse = false, icon }) {
    const total = p1 + p2;
    const p1Percent = total === 0 ? 50 : (p1 / total) * 100;

    const p1Better = reverse ? p1 < p2 : p1 > p2;
    const p2Better = reverse ? p2 < p1 : p2 > p1;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end text-sm">
                <div className={clsx("font-bold flex items-center gap-2", p1Better ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>
                    {icon} {p1}{suffix}
                </div>
                <div className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mb-0.5">{label}</div>
                <div className={clsx("font-bold", p2Better ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>
                    {p2}{suffix}
                </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden flex">
                <div
                    className={clsx("h-full transition-all duration-1000", p1Better ? "bg-blue-500" : "bg-slate-400 dark:bg-slate-600")}
                    style={{ width: `${p1Percent}%` }}
                />
                <div className="h-full w-0.5 bg-white dark:bg-slate-800" />
                <div
                    className={clsx("h-full flex-1 transition-all duration-1000", p2Better ? "bg-blue-500" : "bg-slate-400 dark:bg-slate-600")}
                />
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700/50 pb-3 last:border-0 last:pb-0">
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-medium text-slate-900 dark:text-white">{value}</span>
        </div>
    );
}
