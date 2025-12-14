import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { fetchMatch } from '../services/apiService';
import FlagIcon from '../components/ui/FlagIcon';
import { ArrowLeft, Trophy, Activity, Zap, Target, Shield, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';
import { getCountryCode } from '../utils/countryMapper';
import MatchDetailsSkeleton from '../components/skeletons/MatchDetailsSkeleton';
import LiveMatchDetails from '../components/score/LiveMatchDetails';

const POINT_MAP = [0, 15, 30, 40];

export default function MatchDetailsPage() {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [showWinnerOverlay, setShowWinnerOverlay] = useState(true);

    const { data: match, isLoading, isError, error } = useQuery({
        queryKey: ['match', matchId],
        queryFn: () => fetchMatch(matchId),
    });

    if (isLoading) {
        return <MatchDetailsSkeleton />;
    }

    if (isError || !match) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Error loading match</h2>
                <p className="text-slate-500 mb-4">{error?.message || 'Match not found'}</p>
                <button
                    onClick={() => navigate('/score')}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Back to Live Scores
                </button>
            </div>
        );
    }

    const { playerA, playerB, statistics, matchInfo, status } = match;
    const isLive = status === 'live' || status === 'LIVE';

    if (isLive) {
        return <LiveMatchDetails match={match} />;
    }

    // Map API stats to component format
    // Handle cases where stats might be incomplete or zero
    const stats = statistics || {
        aces: { playerA: 0, playerB: 0 },
        doubleFaults: { playerA: 0, playerB: 0 },
        firstServePercentage: { playerA: 0, playerB: 0 },
        winOnFirstServe: { playerA: 0, playerB: 0 },
        breakPointsSaved: { playerA: 0, playerB: 0 },
        winners: { playerA: 0, playerB: 0 },
        unforcedErrors: { playerA: 0, playerB: 0 },
    };

    const isUpcoming = status === 'upcoming' || status === 'scheduled';

    const checkWinner = (playerId, side) => {
        if (!match.winner) return false;
        if (match.winner === side) return true;
        if (match.winner === playerId) return true;
        if (match.winner?._id === playerId) return true;
        return false;
    };

    const renderHeaderContent = () => {
        if (isUpcoming) {
            return (
                <div className="text-center">
                    <div className="text-sm font-bold text-blue-500 dark:text-blue-400 mb-2 uppercase tracking-wide">
                        Scheduled Start
                    </div>
                    <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-mono">
                        {/* Mocking a time if missing, ideally matches should have startTime */}
                        {match.startTime ? new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "20:00"}
                    </div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {match.startTime ? new Date(match.startTime).toLocaleDateString() : "Today"}
                    </div>
                </div>
            )
        }

        if (status === 'completed' || status === 'finished') {
            // Extract Score Info (Safe access)
            const sets = match.score?.sets || [];

            const displayPoint = (side) => {
                // For completed matches, we might just show final sets, but if user wants points:
                if (match.score?.advantage === side) return "AD";
                const p = match.score?.points?.[side] ?? 0;
                return POINT_MAP[p] ?? "40";
            };

            return (
                <div className="flex flex-col items-center bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 w-full max-w-sm">
                    {/* Final Indicator */}
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Final Score</span>
                    </div>

                    {/* Sets Display */}
                    {/* Sets Display */}
                    <div className="w-full mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700/50">
                        <div className="flex justify-between items-center">
                            {/* <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sets Summary</span> */}
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
                            </div>
                        </div>
                    </div>

                    {/* Set Score Display (Big Numbers) */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white">
                                {match.score?.setScore?.playerA ?? 0}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sets</span>
                        </div>
                        <div className="px-4 text-slate-300 dark:text-slate-600 font-light text-2xl">
                            -
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white">
                                {match.score?.setScore?.playerB ?? 0}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sets</span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center">
                <div className="text-4xl font-bold text-slate-300 dark:text-slate-600 mb-2">VS</div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    {matchInfo?.round}
                </div>
            </div>
        );
    };

    // Determine Winner Object
    let winnerObject = null;
    if (status === 'completed' || status === 'finished') {
        if (checkWinner(playerA._id, 'playerA')) winnerObject = playerA;
        else if (checkWinner(playerB._id, 'playerB')) winnerObject = playerB;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl mx-auto"
        >
            {/* Winner Overlay */}
            {(status === 'completed' || status === 'finished') && showWinnerOverlay && winnerObject && (
                <WinnerOverlay winner={winnerObject} onClose={() => setShowWinnerOverlay(false)} />
            )}

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
                        {isLive && <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                        <span>{status}</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 relative">
                        {/* Player 1 */}
                        <PlayerDisplay player={playerA} isWinner={checkWinner(playerA._id, 'playerA')} isServer={false} />

                        {/* Vs / Score / Time */}
                        <div className="flex flex-col items-center z-10 w-full md:w-auto">
                            {renderHeaderContent()}
                        </div>

                        {/* Player 2 */}
                        <PlayerDisplay player={playerB} isWinner={checkWinner(playerB._id, 'playerB')} isServer={false} />
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
                            {isUpcoming ? "Head-to-Head Comparison" : "Match Statistics"}
                        </h3>

                        {isUpcoming ? (
                            <div className="space-y-6">
                                <StatBar label="Rank" p1={playerA.ranking} p2={playerB.ranking} reverse />
                                <StatBar label="Age" p1={playerA.age} p2={playerB.age} />
                                {/* Parse strings to numbers if needed for comparisons, or just display text */}
                                <TextStatBar label="Height" p1={playerA.height} p2={playerB.height} />
                                <TextStatBar label="Weight" p1={playerA.weight} p2={playerB.weight} />
                                <StatBar label="Career Wins" p1={playerA.wins} p2={playerB.wins} icon={<Trophy size={14} />} />
                                <StatBar label="Grand Slams" p1={playerA.grandSlams} p2={playerB.grandSlams} icon={<Trophy size={14} />} />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <StatBar label="Aces" p1={stats.aces.playerA} p2={stats.aces.playerB} icon={<Zap size={14} />} />
                                <StatBar label="Double Faults" p1={stats.doubleFaults.playerA} p2={stats.doubleFaults.playerB} reverse />
                                <StatBar label="1st Serve %" p1={stats.firstServePercentage.playerA} p2={stats.firstServePercentage.playerB} suffix="%" />
                                <StatBar label="Win % on 1st Serve" p1={stats.winOnFirstServe.playerA} p2={stats.winOnFirstServe.playerB} suffix="%" />
                                <StatBar label="Winners" p1={stats.winners.playerA} p2={stats.winners.playerB} icon={<Target size={14} />} />
                                <StatBar label="Unforced Errors" p1={stats.unforcedErrors.playerA} p2={stats.unforcedErrors.playerB} reverse />
                                <StatBar label="Break Points Saved" p1={stats.breakPointsSaved.playerA} p2={stats.breakPointsSaved.playerB} icon={<Shield size={14} />} />
                            </div>
                        )}
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

function PlayerDisplay({ player, isWinner, isServer, alignRight }) {
    if (!player) return null;

    return (
        <Link
            to={`/rankings/${player._id}`}
            className={clsx(
                "flex flex-col items-center space-y-4 flex-1 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer group",
                alignRight && "md:flex-col-reverse",
                isWinner && "bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30"
            )}
        >
            <div className="relative">
                <div className={clsx(
                    "w-24 h-24 rounded-full p-1 border-2",
                    isWinner ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "border-slate-200 dark:border-slate-700"
                )}>
                    <img
                        src={`https://i.pravatar.cc/300?u=${player._id}`} // Use API ID for consistent avatars
                        alt={player.name}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                {isServer && (
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 p-1.5 rounded-full shadow-lg border-2 border-slate-900">
                        <Zap size={12} fill="currentColor" />
                    </div>
                )}
                {isWinner && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg uppercase tracking-wider border-2 border-white dark:border-slate-900">
                        Winner
                    </div>
                )}
            </div>
            <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                    <FlagIcon code={getCountryCode(player.country_code)} className="w-4 h-3" />
                    <span>{player.country_code}</span> {/* API uses 'country_code', mapper handles numbers if needed or we show code */}
                </div>
                <h2 className={clsx(
                    "text-xl md:text-2xl font-bold leading-tight",
                    isWinner ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"
                )}>
                    {player.name}
                </h2>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Rank #{player.ranking}</div>
            </div>
        </Link>
    );
}

function StatBar({ label, p1, p2, suffix = '', reverse = false, icon }) {
    const total = p1 + p2;
    const p1Percent = total === 0 ? 50 : (p1 / total) * 100;

    // Determine color based on "better" stats
    // If reverse is true (e.g. errors), lower is better
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
                <div className="h-full w-0.5 bg-white dark:bg-slate-800" /> {/* Divider */}
                <div
                    className={clsx("h-full flex-1 transition-all duration-1000", p2Better ? "bg-blue-500" : "bg-slate-400 dark:bg-slate-600")}
                />
            </div>
        </div>
    );
}

function TextStatBar({ label, p1, p2 }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end text-sm">
                <div className="font-bold text-slate-900 dark:text-white">
                    {p1}
                </div>
                <div className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mb-0.5">{label}</div>
                <div className="font-bold text-slate-900 dark:text-white">
                    {p2}
                </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden flex">
                <div className="h-full w-1/2 bg-slate-100 dark:bg-slate-800" />
                <div className="h-full w-0.5 bg-white dark:bg-slate-800" />
                <div className="h-full w-1/2 bg-slate-100 dark:bg-slate-800" />
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

function WinnerOverlay({ winner, onClose }) {
    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#22c55e', '#fbbf24', '#ffffff'] // Green, Gold, White
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#22c55e', '#fbbf24', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    if (!winner) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.5, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full relative border border-slate-700/50 overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/20 rounded-full blur-[50px] pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col items-center relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="mb-6 relative"
                    >
                        <div className="w-32 h-32 rounded-full p-1.5 border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)] bg-white dark:bg-slate-800">
                            <img
                                src={`https://i.pravatar.cc/300?u=${winner._id}`}
                                alt={winner.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest border-4 border-white dark:border-slate-800 whitespace-nowrap">
                            Winner
                        </div>
                    </motion.div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
                        {winner.name}
                    </h2>

                    <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm mb-6">
                        <FlagIcon code={getCountryCode(winner.country_code)} />
                        <span>{winner.country_code}</span>
                    </div>

                    <p className="text-center text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        Congratulations on a spectacular performance!
                    </p>

                    <div className="flex w-full">
                        <Link
                            to={`/rankings/${winner._id}`}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-500/30 transition-all text-center"
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
