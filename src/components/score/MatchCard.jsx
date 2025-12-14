import FlagIcon from '../ui/FlagIcon';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { getCountryCode } from '../../utils/countryMapper';

export default function MatchCard({ match }) {
    const isUpcoming = match.status === 'scheduled' || match.status === 'upcoming';
    const isLive = match.status === 'live';
    const isFinished = match.status === 'completed' || match.status === 'finished' || (!isUpcoming && !isLive);

    const { playerA, playerB, _id: matchId } = match;

    // Use API-provided IDs directly
    const p1Id = playerA?._id;
    const p2Id = playerB?._id;

    // Winner check
    const checkWinner = (playerId, side) => {
        if (!isFinished || !match.winner) return false;
        if (match.winner === side) return true;
        if (match.winner === playerId) return true;
        if (match.winner?._id === playerId) return true;
        return false;
    };

    const isP1Winner = checkWinner(p1Id, 'playerA');
    const isP2Winner = checkWinner(p2Id, 'playerB');

    return (
        <Link
            to={`/score/${matchId}`}
            className="block bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700/50 mb-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group relative"
        >
            <div className="space-y-3">
                {/* Player 1 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FlagIcon code={getCountryCode(playerA?.country_code)} />
                        {p1Id ? (
                            <div className="font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors z-10" onClick={(e) => { e.stopPropagation(); }}>
                                <Link to={`/rankings/${p1Id}`} className={clsx(
                                    "font-bold",
                                    isP1Winner ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"
                                )}>
                                    {playerA?.name}
                                </Link>
                            </div>
                        ) : (
                            <span className={clsx(
                                "font-medium font-bold",
                                isP1Winner ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"
                            )}>
                                {playerA?.name}
                            </span>
                        )}
                        {isP1Winner && (
                            <span className="text-[10px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded ml-2 shadow-sm">
                                W
                            </span>
                        )}
                    </div>
                </div>

                {/* Player 2 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <FlagIcon code={getCountryCode(playerB?.country_code)} />
                        {p2Id ? (
                            <div className="font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors z-10" onClick={(e) => { e.stopPropagation(); }}>
                                <Link to={`/rankings/${p2Id}`} className={clsx(
                                    "font-bold",
                                    isP2Winner ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"
                                )}>
                                    {playerB?.name}
                                </Link>
                            </div>
                        ) : (
                            <span className={clsx(
                                "font-medium font-bold",
                                isP2Winner ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"
                            )}>
                                {playerB?.name}
                            </span>
                        )}
                        {isP2Winner && (
                            <span className="text-[10px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded ml-2 shadow-sm">
                                W
                            </span>
                        )}
                    </div>
                </div>
            </div>


            {isUpcoming && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 md:flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{match.matchInfo?.tournament} - {match.matchInfo?.round}</span>
                    <span className="uppercase tracking-widest font-semibold text-blue-400">Upcoming</span>
                </div>
            )}

            {isLive && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 md:flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{match.matchInfo?.tournament} - {match.matchInfo?.round}</span>
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="uppercase tracking-widest font-semibold text-red-500">Live</span>
                    </div>
                </div>
            )}

            {isFinished && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 md:flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <span>{match.matchInfo?.tournament} - {match.matchInfo?.round}</span>
                    <span className="uppercase tracking-widest font-semibold text-slate-500">Finished</span>
                </div>
            )}
        </Link>
    );
}
