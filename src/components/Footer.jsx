import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="text-2xl font-bold text-blue-400">FireScore</div>
                        <p className="text-sm leading-relaxed">
                            The ultimate destination for real-time tennis scores, advanced analytics, and global rankings.
                            Stay ahead of the game with FireScore.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <SocialLink href="#" icon={<Twitter size={20} />} />
                            <SocialLink href="#" icon={<Facebook size={20} />} />
                            <SocialLink href="#" icon={<Instagram size={20} />} />
                            <SocialLink href="https://github.com/Devz-0047/fireScoreTennis" icon={<Github size={20} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/" label="Home" />
                            <FooterLink to="/score" label="Live Scores" />
                            <FooterLink to="/rankings" label="Rankings" />
                            <FooterLink to="/about" label="About Us" />
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm">Resources</h3>
                        <ul className="space-y-2">
                            <FooterLink to="https://fire-score-docs-cqsb.vercel.app/" label="Documentation" />
                            <FooterLink to="#" label="Terms of Service" />
                            <FooterLink to="#" label="Privacy Policy" />
                            <FooterLink to="#" label="Contact Support" />
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm">Stay Updated</h3>
                        <p className="text-sm mb-4">Subscribe to our newsletter for the latest tennis insights.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} FireScore Tennis. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }) {
    return (
        <a
            href={href}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110 transform duration-200"
        >
            {icon}
        </a>
    )
}

function FooterLink({ to, label }) {
    return (
        <li>
            <Link to={to} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm block">
                {label}
            </Link>
        </li>
    )
}
