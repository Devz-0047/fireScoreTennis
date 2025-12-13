import { useParams, useNavigate } from 'react-router-dom';
import { matches } from '../data/matches';
import { rankings } from '../data/rankings';
import FlagIcon from '../components/ui/FlagIcon';
import { ArrowLeft, Clock, MapPin, Trophy, Activity, Zap, Target, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

export default function MatchDetailsPage() {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const match = matches.find(m => m.matchId === matchId);

    if (!match) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Match not found</h2>
                <button
                    onClick={() => navigate('/score')}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Back to Live Scores
                </button>
            </div>
        );
    }

    const { player1, player2, sets, status, currentScore, server } = match;
    const isLive = status === 'LIVE';

    // Mock detailed stats since they aren't in the data model
    const stats = {
        aces: { p1: Math.floor(Math.random() * 15) + 5, p2: Math.floor(Math.random() * 15) + 5 },
        doubleFaults: { p1: Math.floor(Math.random() * 5), p2: Math.floor(Math.random() * 5) },
        firstServeIn: { p1: Math.floor(Math.random() * 20) + 55, p2: Math.floor(Math.random() * 20) + 55 }, // Percentage
        winOnFirstServe: { p1: Math.floor(Math.random() * 20) + 65, p2: Math.floor(Math.random() * 20) + 65 }, // Percentage
        breakPointsSaved: { p1: Math.floor(Math.random() * 5), p2: Math.floor(Math.random() * 5) },
        winners: { p1: Math.floor(Math.random() * 30) + 15, p2: Math.floor(Math.random() * 30) + 15 },
        unforcedErrors: { p1: Math.floor(Math.random() * 25) + 10, p2: Math.floor(Math.random() * 25) + 10 },
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
                className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                        <span>ATP World Tour Finals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isLive && <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                        <span>{status}</span>
                        {!isLive && match.startTime && <span> • {new Date(match.startTime).toLocaleDateString()}</span>}
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 relative">
                        {/* Player 1 */}
                        <PlayerDisplay player={player1} isWinner={match.winner === 'p1'} isServer={server === 'p1'} />

                        {/* Vs / Score */}
                        <div className="flex flex-col items-center z-10 w-full md:w-auto">
                            {!match.startTime ? (
                                <div className="space-y-4 text-center">
                                    <div className="flex items-center space-x-1 md:space-x-4">
                                        {sets.map((set, i) => (
                                            <div key={i} className="flex flex-col items-center space-y-2">
                                                <span className="text-2xl md:text-3xl font-bold text-slate-300 dark:text-slate-600">{i + 1}</span>
                                                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-2 md:p-3 shadow-inner min-w-[3rem] text-center border border-slate-200 dark:border-slate-800">
                                                    <div className={clsx("text-lg font-bold mb-1", set.p1 > set.p2 ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>{set.p1}</div>
                                                    <div className={clsx("text-lg font-bold", set.p2 > set.p1 ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>{set.p2}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {isLive && currentScore && (
                                            <div className="flex flex-col items-center space-y-2 ml-4">
                                                <span className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-400 animate-pulse">pts</span>
                                                <div className="bg-blue-50 dark:bg-slate-900 rounded-lg p-2 md:p-3 shadow-inner min-w-[3rem] text-center border border-blue-200 dark:border-blue-900/30 ring-2 ring-blue-500/20">
                                                    <div className={clsx("text-lg font-bold mb-1 text-blue-600 dark:text-blue-400")}>{currentScore.p1}</div>
                                                    <div className={clsx("text-lg font-bold text-blue-600 dark:text-blue-400")}>{currentScore.p2}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">MATCH DURATION: 2h 14m</div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-slate-300 dark:text-slate-600 mb-2">VS</div>
                                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Player 2 */}
                        <PlayerDisplay player={player2} isWinner={match.winner === 'p2'} isServer={server === 'p2'} alignRight />
                    </div>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Momentum / Key Stats */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-blue-500" />
                            Match Statistics
                        </h3>
                        <div className="space-y-6">
                            <StatBar label="Aces" p1={stats.aces.p1} p2={stats.aces.p2} icon={<Zap size={14} />} />
                            <StatBar label="Double Faults" p1={stats.doubleFaults.p1} p2={stats.doubleFaults.p2} reverse />
                            <StatBar label="1st Serve %" p1={stats.firstServeIn.p1} p2={stats.firstServeIn.p2} suffix="%" />
                            <StatBar label="Win % on 1st Serve" p1={stats.winOnFirstServe.p1} p2={stats.winOnFirstServe.p2} suffix="%" />
                            <StatBar label="Winners" p1={stats.winners.p1} p2={stats.winners.p2} icon={<Target size={14} />} />
                            <StatBar label="Unforced Errors" p1={stats.unforcedErrors.p1} p2={stats.unforcedErrors.p2} reverse />
                            <StatBar label="Break Points Saved" p1={stats.breakPointsSaved.p1} p2={stats.breakPointsSaved.p2} icon={<Shield size={14} />} />
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Match Info</h3>
                        <div className="space-y-4">
                            <InfoRow label="Tournament" value="World Tour Finals" />
                            <InfoRow label="Round" value="Semi-Final" />
                            <InfoRow label="Surface" value="Hard (Indoor)" />
                            <InfoRow label="Court" value="Center Court" />
                            <InfoRow label="Umpire" value="Mohamed Lahyani" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function PlayerDisplay({ player, isWinner, isServer, alignRight }) {
    const profile = rankings.find(r => r.name === player.name);

    return (
        <div className={clsx("flex flex-col items-center space-y-4 flex-1", alignRight && "md:flex-col-reverse")}>
            <div className="relative">
                <div className={clsx(
                    "w-24 h-24 rounded-full p-1 border-2",
                    isWinner ? "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]" : "border-slate-200 dark:border-slate-700"
                )}>
                    <img
                        src={profile ? `https://i.pravatar.cc/300?u=${profile.id}` : `https://ui-avatars.com/api/?name=${player.name}&background=random`}
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
                    <FlagIcon code={player.countryCode} className="w-4 h-3" />
                    <span>{player.countryCode}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {player.name}
                </h2>
                {profile && <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Rank #{profile.rank}</div>}
            </div>
        </div>
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

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-700/50 pb-3 last:border-0 last:pb-0">
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="font-medium text-slate-900 dark:text-white">{value}</span>
        </div>
    );
}
