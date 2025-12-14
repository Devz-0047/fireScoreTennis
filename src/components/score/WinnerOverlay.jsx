import { useEffect } from 'react';
import { motion } from 'framer-motion'; // Assuming framer-motion is available as it was used in MatchDetailsPage
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';
import FlagIcon from '../ui/FlagIcon';
import { getCountryCode } from '../../utils/countryMapper';

export default function WinnerOverlay({ winner, onClose }) {
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
                colors: ['#FF1493', '#00BFFF', '#FFD700', '#32CD32', '#FF4500', '#9370DB'] // Vibrant Rainbow
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FF1493', '#00BFFF', '#FFD700', '#32CD32', '#FF4500', '#9370DB']
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
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
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
