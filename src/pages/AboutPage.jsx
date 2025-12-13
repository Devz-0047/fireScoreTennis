import { motion } from 'framer-motion';
import { Activity, Trophy, Users, Zap } from 'lucide-react';

export default function AboutPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {/* Header */}
            <motion.div variants={item} className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                    FireScore
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    The next generation tennis scoreboard experience.
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={item} className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700/50">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                        <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Purpose</h2>
                    <p className="text-slate-400 leading-relaxed">
                        FireScore provides a real-time, immersive way to follow tennis matches.
                        Designed to replace clunky, legacy scoreboards with a modern, animated interface that brings the energy of the court to your screen.
                    </p>
                </motion.div>

                <motion.div variants={item} className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700/50">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                        <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Target Users</h2>
                    <ul className="space-y-3 text-slate-400">
                        <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span>Tennis Enthusiasts tracking live games</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span>Tournament Organizers needing digital displays</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span>Coaches analyzing match history</span>
                        </li>
                    </ul>
                </motion.div>
            </div>

            <motion.div variants={item} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50">
                <div className="flex items-center space-x-4 mb-8">
                    <Zap className="w-8 h-8 text-yellow-400 fill-current" />
                    <h2 className="text-3xl font-bold text-white">Key Features</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        title="Live Animations"
                        desc="Smooth Framer Motion transitions for score updates and server indicators."
                    />
                    <FeatureCard
                        title="Real-time Data"
                        desc="Instant updates for sets, games, and points across multiple matches."
                    />
                    <FeatureCard
                        title="Interactive Rankings"
                        desc="Sortable leaderboards with detailed player profiles and statistics."
                    />
                </div>
            </motion.div>

        </motion.div>
    );
}

function FeatureCard({ title, desc }) {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-slate-400">{desc}</p>
        </div>
    )
}
