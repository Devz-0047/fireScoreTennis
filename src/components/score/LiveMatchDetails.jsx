import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import FlagIcon from '../ui/FlagIcon';
import { ArrowLeft, Trophy, Activity, Zap, Target, Shield, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { getCountryCode } from '../../utils/countryMapper';
import MatchDetailsSkeleton from '../skeletons/MatchDetailsSkeleton';
import WinnerOverlay from './WinnerOverlay';

const POINT_MAP = [0, 15, 30, 40];

export default function LiveMatchDetails() {
    const navigate = useNavigate();
    const [match, setMatch] = useState(null);
    const [showWinnerOverlay, setShowWinnerOverlay] = useState(true);
    const socketRef = useRef(null);
    // Use initialMatch status or match status
    const { matchId } = useParams();

    // --------------------------
    // Initial Load (ONCE)
    // --------------------------


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



    // --------------------------
    // Socket Listener (READ ONLY)
    // --------------------------
    useEffect(() => {
        loadMatch();
        // if (!matchId) return;

        const socketUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

        socketRef.current = io(socketUrl, {
            transports: ["websocket"]
        });

        // console.log(`🔌 Connecting to Socket.IO: ${socketUrl}`);
        socketRef.current.emit("joinMatch", matchId);

        socketRef.current.on("scoreUpdated", (data) => {
            console.log("WebSocket update received:", data);

            setMatch(prev => {
                if (!prev) return prev;

                // Handle case where data might be the full match object, just the score, or have nested stats
                // Assuming standard "scoreUpdated" sends partial or full score object
                const incomingScore = data.score || data;
                const incomingStats = data.statistics;

                return {
                    ...prev,
                    // Merge top-level status/winner if present.
                    // If the socket event is just score, these might be undefined, so fallback to prev.
                    status: data.status || prev.status,
                    winner: data.winner || prev.winner,

                    score: {
                        ...prev.score,
                        ...incomingScore
                    },
                    // Only update statistics if they are present in the update
                    statistics: incomingStats ? incomingStats : prev.statistics
                };
            });
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [matchId]);

    if (!match) return <MatchDetailsSkeleton />;

    const { playerA, playerB, statistics, matchInfo, status } = match;

    // Determine Winner Object for Overlay
    let winnerObject = null;
    if (status === 'completed' || status === 'finished') {
        // Simple check based on winner field or known logic
        if (match.winner === 'playerA' || match.winner?._id === playerA._id) winnerObject = playerA;
        else if (match.winner === 'playerB' || match.winner?._id === playerB._id) winnerObject = playerB;
    }

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
    const sets = match.score?.sets || [];
    const setScore = match.score?.setScore || { playerA: 0, playerB: 0 };

    // Normalize current score: try playerA/B, fallback to p1/p2, fallback to 0
    // const scoreA = match.currentScore?.playerA || match.currentScore?.p1 || '0';
    // const scoreB = match.currentScore?.playerB || match.currentScore?.p2 || '0';

    const displayPoint = (side) => {
        if (match.score?.advantage === side) return "AD";
        const p = match.score?.points?.[side] ?? 0;
        return POINT_MAP[p] ?? "40";
    };

    const renderHeaderContent = () => {
        return (
            <div className="flex flex-col items-center w-full px-4">
                {/* Tournament info remains above in common header, but we keep round here if desired or generic "VS" replaced by score */}

                {/* Scoreboard Container */}
                <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 w-full max-w-sm">
                    {/* Live Indicator or Final */}
                    <div className="flex items-center space-x-2 mb-3">
                        {status === 'completed' || status === 'finished' ? (
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Final Score</span>
                        ) : (
                            <>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                </span>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Live Score</span>
                            </>
                        )}
                    </div>

                    {/* Sets Display */}
                    <div className="w-full mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700/50">
                        <div className="flex justify-between items-center">

                            <div className="flex space-x-2 md:space-x-4">
                                {sets.map((set, index) => (
                                    <div key={index} className="flex flex-col items-center bg-white dark:bg-slate-700/50 px-3 py-1.5 rounded-md border border-slate-100 dark:border-slate-600 shadow-sm">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Set {index + 1}</span>
                                        <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white font-mono">
                                            <span>{set.games?.playerA ?? 0}</span>
                                            <span className="text-slate-300 dark:text-slate-600">-</span>
                                            <span>{set.games?.playerB ?? 0}</span>
                                        </div>
                                    </div>
                                ))}
                                {sets.length === 0 && <span className="text-xs text-slate-400">Match Starting...</span>}
                            </div>
                        </div>
                    </div>

                    {/* Main Score (Set Score) */}
                    <div className="flex items-center justify-between w-full mb-4">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white">
                                {setScore.playerA ?? 0}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sets</span>
                        </div>

                        <div className="px-4 text-slate-300 dark:text-slate-600 font-light text-2xl">
                            -
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white">
                                {setScore.playerB ?? 0}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sets</span>
                        </div>
                    </div>

                    {/* Current Game Points */}
                    <div className="w-full bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-100 dark:border-blue-900/30">
                        <div className="flex justify-center items-center mb-1">
                            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 text-center">Current Game</div>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold font-mono text-slate-900 dark:text-white">
                            <span>{displayPoint("playerA")}</span>
                            <span className="text-slate-300 dark:text-slate-600 font-light text-base">-</span>
                            <span>{displayPoint("playerB")}</span>
                        </div>
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

            {/* Winner Overlay */}
            {(status === 'completed' || status === 'finished') && showWinnerOverlay && winnerObject && (
                <WinnerOverlay winner={winnerObject} onClose={() => setShowWinnerOverlay(false)} />
            )}

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
                        <PlayerDisplay player={playerA} isWinner={false} isServer={match.score?.server === 'playerA'} />

                        {/* Vs / Score / Time */}
                        <div className="flex flex-col items-center z-10 w-full md:w-auto">
                            {renderHeaderContent()}
                        </div>

                        {/* Player 2 */}
                        <PlayerDisplay player={playerB} isWinner={false} isServer={match.score?.server === 'playerB'} />
                    </div>
                </div>
            </div>

            {/* Statistics / Comparison Grid - SIMPLIFIED: Removed Stats, kept Info */}
            <div className="w-full">
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
        <div className={clsx(
            "flex flex-col items-center space-y-4 flex-1 p-4 rounded-xl transition-colors",
            alignRight && "md:flex-col-reverse",
            isServer && "bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30"
        )}>
            <div className="relative">
                <div className={clsx(
                    "w-24 h-24 rounded-full p-1 border-2",
                    isServer ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]" : "border-slate-200 dark:border-slate-700"
                )}>
                    <img
                        src={`https://i.pravatar.cc/300?u=${player._id}`}
                        alt={player.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                {/* {isServer && (
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 p-1.5 rounded-full shadow-lg border-2 border-slate-900">
                        <Zap size={12} fill="currentColor" />
                    </div>
                )} */}
                {isServer && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg uppercase tracking-wider border-2 border-white dark:border-slate-900 flex items-center gap-1">
                        <Zap size={10} fill="currentColor" />
                        Serving
                    </div>
                )}
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                    <FlagIcon code={getCountryCode(player.country_code)} className="w-4 h-3" />
                    <span>{player.country_code}</span>
                </div>
                <h2 className={clsx(
                    "text-xl md:text-2xl font-bold leading-tight",
                    isServer ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"
                )}>
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