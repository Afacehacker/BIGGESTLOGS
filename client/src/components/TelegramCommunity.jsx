import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, ArrowRight, Zap } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const TelegramCommunity = () => {
    const { settings } = useContext(SettingsContext);
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-600/5 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-500/30 p-6 sm:p-12 md:p-16 shadow-2xl shadow-emerald-500/10"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/30">
                                <Zap size={14} fill="currentColor" /> Live Feed & Support
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                                Join Our Elite <br />
                                <span className="text-emerald-600 dark:text-emerald-400 italic underline decoration-emerald-500/30">Telegram</span> Channel
                            </h2>

                            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-8 max-w-lg leading-relaxed font-medium">
                                Get instant alerts on new premium logs, bulk discounts, and professional
                                trading tips. For any complaints or support, reach out directly via our channel.
                                Join <span className="text-slate-900 dark:text-white font-bold">5,000+</span> active traders.
                            </p>

                            <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                                <a
                                    href={settings?.telegramLink || "https://t.me/boostnaija1"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 sm:py-5 px-8 sm:px-10 rounded-2xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-600/30 group text-sm sm:text-base"
                                >
                                    <Send size={22} className="group-hover:rotate-12 transition-transform" fill="currentColor" /> JOIN CHANNEL <ArrowRight size={18} />
                                </a>

                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-600 flex items-center justify-center text-[10px] font-extrabold text-white">
                                        +5k
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <CommunityFeature
                                icon={<Users className="text-emerald-600 dark:text-emerald-400" size={26} />}
                                title="Admin Support"
                                desc="Direct support for all complaints"
                            />
                            <CommunityFeature
                                icon={<Zap className="text-amber-500" size={26} />}
                                title="Flash Sales"
                                desc="Up to 60% OFF bulk orders"
                            />
                            <CommunityFeature
                                icon={<Send className="text-emerald-500" size={26} />}
                                title="Live Proofs"
                                desc="Success feed of all trades"
                            />
                            <CommunityFeature
                                icon={<ArrowRight className="text-teal-500" size={26} />}
                                title="Daily Drops"
                                desc="Fresh logs every 6 hours"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const CommunityFeature = ({ icon, title, desc }) => (
    <div className="glass p-5 sm:p-7 rounded-3xl border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-emerald-500/40 transition-all shadow-sm">
        <div className="mb-4">{icon}</div>
        <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
);

export default TelegramCommunity;

