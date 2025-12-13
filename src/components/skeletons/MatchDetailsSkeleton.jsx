export default function MatchDetailsSkeleton() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
            {/* Back Button Skeleton */}
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6"></div>

            {/* Scoreboard Header Skeleton */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700/50">
                {/* Info Bar */}
                <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 relative">
                        {/* Player 1 Display Skeleton */}
                        <div className="flex flex-col items-center space-y-4 flex-1 w-full">
                            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex flex-col items-center w-full space-y-2">
                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
                                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                            </div>
                        </div>

                        {/* VS / Score Skeleton */}
                        <div className="flex flex-col items-center justify-center w-full md:w-auto px-8">
                            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                        </div>

                        {/* Player 2 Display Skeleton */}
                        <div className="flex flex-col items-center space-y-4 flex-1 w-full">
                            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex flex-col items-center w-full space-y-2">
                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
                                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Grid Skeleton */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Stats Column */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-6"></div>
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8"></div>
                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8"></div>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full w-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Match Info Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50">
                        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0 last:pb-0">
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
