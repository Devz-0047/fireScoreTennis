import LiveMatchCard from './LiveMatchCard';
import MatchCard from './MatchCard';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function MatchList({ matches, filter }) {
    const filteredMatches = matches.filter(m => {
        if (!filter || filter === 'ALL') return true;

        // Map UI tabs to API status
        const statusMap = {
            'LIVE': 'live',
            'FINISHED': 'completed',
            'UPCOMING': 'upcoming'
        };

        const targetStatus = statusMap[filter] || filter;
        return m.status === targetStatus;
    });

    if (filteredMatches.length === 0) {
        return (
            <div className="text-center py-10 text-slate-500 italic text-xl">
                No matches found for this category.
            </div>
        )
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-2"
        >
            {filteredMatches.map(match => (
                <motion.div key={match.matchId} variants={item}>
                    {match.status === 'LIVE' ? (
                        <LiveMatchCard match={match} />
                    ) : (
                        <MatchCard match={match} />
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
}
