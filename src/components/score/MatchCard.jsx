import FlagIcon from '../ui/FlagIcon';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { rankings } from '../../data/rankings';

export default function MatchCard({ match }) {
    const isUpcoming = match.status === 'UPCOMING';
    const { player1, player2, sets, matchId } = match;

    // Find profiles
    const p1Profile = rankings.find(r => r.name === player1.name);
    const p2Profile = rankings.find(r => r.name === player2.name);

    return (
        <Link
            to={`/score/${matchId}`}
            className="block bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700/50 mb-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group relative"
        >
            <div className="space-y-3">
                {/* Player 1 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FlagIcon code={player1.countryCode} />
                        {p1Profile ? (
                            <div className="font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors z-10" onClick={(e) => { e.stopPropagation(); }}>
                                <Link to={`/rankings/${p1Profile.id}`} className={clsx(match.winner === 'p1' ? "text-slate-900 dark:text-white font-bold" : "text-slate-600 dark:text-slate-300")}>
                                    {player1.name}
                                </Link>
                            </div>
                        ) : (
                            <span className={clsx("font-medium", match.winner === 'p1' ? "text-slate-900 dark:text-white font-bold" : "text-slate-600 dark:text-slate-300")}>
                                {player1.name}
                            </span>
                        )}
                    </div>
                    {!isUpcoming && (
                        <div className="flex space-x-4 font-mono text-slate-500 dark:text-slate-400">
                            {sets.map((s, i) => <span key={i} className={clsx(s.p1 > s.p2 && "text-slate-900 dark:text-white font-bold")}>{s.p1}</span>)}
                        </div>
                    )}
                </div>

                {/* Player 2 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FlagIcon code={player2.countryCode} />
                        {p2Profile ? (
                            <div className="font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors z-10" onClick={(e) => { e.stopPropagation(); }}>
                                <Link to={`/rankings/${p2Profile.id}`} className={clsx(match.winner === 'p2' ? "text-slate-900 dark:text-white font-bold" : "text-slate-600 dark:text-slate-300")}>
                                    {player2.name}
                                </Link>
                            </div>
                        ) : (
                            <span className={clsx("font-medium", match.winner === 'p2' ? "text-slate-900 dark:text-white font-bold" : "text-slate-600 dark:text-slate-300")}>
                                {player2.name}
                            </span>
                        )}
                    </div>
                    {!isUpcoming && (
                        <div className="flex space-x-4 font-mono text-slate-500 dark:text-slate-400">
                            {sets.map((s, i) => <span key={i} className={clsx(s.p2 > s.p1 && "text-slate-900 dark:text-white font-bold")}>{s.p2}</span>)}
                        </div>
                    )}
                </div>
            </div>

            {isUpcoming && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 md:flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{new Date(match.startTime).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="uppercase tracking-widest font-semibold text-blue-400">Upcoming</span>
                </div>
            )}
            {!isUpcoming && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 md:flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>Final</span>
                    <span className="uppercase tracking-widest font-semibold text-slate-500">Finished</span>
                </div>
            )}
        </Link>
    );
}
