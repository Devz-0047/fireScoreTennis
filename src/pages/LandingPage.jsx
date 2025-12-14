import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Trophy, Activity, Globe, BarChart3, Zap } from 'lucide-react';
import { useRef } from 'react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-slate-50 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-900 z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="https://videos.pexels.com/video-files/5739213/5739213-hd_1920_1080_25fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm md:text-base font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg mt-4 lg:mt-36">
                            Live Tennis Intelligence
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6 drop-shadow-2xl">
                            GAME.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">SET.</span>
                            <br />MATCH.
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
                    >
                        The most advanced real-time tracking system for professional tennis.
                        Live scores, deep analytics, and global rankings in one stunning interface.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <button
                            onClick={() => navigate('/score')}
                            className="group relative px-10 py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-full font-bold text-xl hover:bg-blue-600 dark:hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl dark:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                        >
                            <span className="flex items-center mt-[-20]">
                                Live Scores <ArrowRight className="mt-[-8] ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-white/50 z-20"
                >
                    <div className="w-6 h-10 border-2 border-slate-400 dark:border-white/30 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-slate-400 dark:bg-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Feature Section 1: Immersive Analytics */}
            <Section className="bg-slate-50 dark:bg-slate-900 py-32">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center space-x-3 text-blue-400 mb-4">
                                <BarChart3 className="w-8 h-8" />
                                <span className="text-xl font-bold uppercase tracking-widest">Analytics</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                                Deep Dive into <br />Every Point.
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                Go beyond the basic score. Visualize momentum shifts, serve percentages, and unforced errors in real-time.
                                Our advanced metrics help you understand the story behind the match.
                            </p>
                            <ul className="space-y-4">
                                {['Momentum Swing Graphs', 'Serve Heatmaps', 'Player Comparison Radar'].map((item, i) => (
                                    <li key={i} className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-40 animate-pulse" />
                            <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xl">
                                {/* Mock Graph UI */}
                                <div className="h-64 flex items-end justify-between space-x-2">
                                    {[30, 45, 60, 40, 70, 50, 80, 65].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="w-full bg-blue-500/20 rounded-t-sm hover:bg-blue-500 transition-colors"
                                        />
                                    ))}
                                </div>
                                <div className="mt-4 flex justify-between text-slate-500 text-sm font-mono">
                                    <span>SET 1</span>
                                    <span>SET 2</span>
                                    <span>SET 3</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Feature Section 2: Global Coverage */}
            <Section className="bg-white dark:bg-slate-950/50 py-32 border-y border-slate-200 dark:border-slate-800/50">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto mb-20"
                    >
                        <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-6">
                            <Globe className="w-8 h-8 text-purple-400" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">Global Coverage</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            From Gran Slams to ATP 250s. If there's a match, we're tracking it.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
                    >
                        {/* Simulated Country Grid */}
                        {['US', 'ES', 'GB', 'FR', 'AU', 'IT', 'RS', 'IN', 'DE', 'JP', 'BR', 'CA'].map((code, i) => (
                            <motion.div
                                key={code}
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.1, translateY: -5 }}
                                className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-500/50 transition-all shadow-sm dark:shadow-none"
                            >
                                <img
                                    src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
                                    alt={code}
                                    className="w-16 h-10 object-cover rounded shadow-lg mx-auto transition-all"
                                />
                                <div className="mt-4 font-mono text-slate-500 font-bold">{code}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* Feature Section 3: Pro Insights */}
            <Section className="py-32 bg-slate-50 dark:bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotateY: 20 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 md:order-1 perspective-1000"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-yellow-500/20 rounded-2xl blur-3xl group-hover:bg-yellow-500/30 transition-all duration-500" />
                                <img
                                    src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2662&auto=format&fit=crop"
                                    alt="Tennis Player"
                                    className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 transform transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-slate-200 dark:border-slate-700/50">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-yellow-600 dark:text-yellow-400 font-bold mb-1">PLAYER SPOTLIGHT</div>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white">Carlos Alcaraz</div>
                                        </div>
                                        <div className="text-4xl font-black text-slate-900 dark:text-white">#2</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 md:order-2"
                        >
                            <div className="flex items-center space-x-3 text-yellow-400 mb-4">
                                <Zap className="w-8 h-8" />
                                <span className="text-xl font-bold uppercase tracking-widest">Pro Insights</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                                Follow the <br />Future Stars.
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                Get detailed breakdowns of player performance. Track career trajectories, head-to-head records, and recent form with our comprehensive database.
                            </p>
                            <button
                                onClick={() => navigate('/rankings')}
                                className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors border border-slate-300 dark:border-slate-700 hover:border-yellow-500/50 flex items-center"
                            >
                                View Rankings <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </Section>

        </div>
    );
}

function Section({ children, className }) {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            {children}
        </section>
    )
}
