export default function MatchCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700/50 mb-4 animate-pulse">
            <div className="space-y-3">
                {/* Player 1 Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 w-full">
                        <div className="w-5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                    </div>
                </div>

                {/* Player 2 Skeleton */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 w-full">
                        <div className="w-5 h-3.5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                    </div>
                </div>
            </div>

            {/* Footer Skeleton */}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
            </div>
        </div>
    );
}
