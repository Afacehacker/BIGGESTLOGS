import { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { ShieldCheck, Send, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { settings } = useContext(SettingsContext);

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 1500); // 1.5s delay
        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="bg-white dark:bg-slate-900 rounded-[24px] max-w-sm w-full p-5 sm:p-6 pb-8 relative shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800"
                    >
                        {/* Decorative background portion */}
                        <div className="absolute top-0 left-0 w-full h-28 bg-emerald-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800" />
                        
                        <button 
                            onClick={closePopup}
                            className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-300 hover:text-slate-600 rounded-full transition-colors z-20 shadow-sm border border-gray-100 dark:border-slate-700"
                        >
                            <X size={18} />
                        </button>

                        <div className="relative z-10 text-center mt-2">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-emerald-100 dark:border-slate-700">
                                <ShieldCheck size={32} className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                            </div>
                            
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Buy with Confidence!</h2>
                            
                            <p className="text-slate-500 dark:text-slate-400 text-[13px] mb-6 leading-relaxed font-medium mx-auto max-w-[280px]">
                                BIGGESTLOGS is your trusted marketplace and hub for verified digital assets. 
                                We guarantee safe and instant deliveries.
                            </p>

                            <div className="bg-white dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 shadow-sm rounded-[16px] p-4 mb-6 text-left space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-amber-50 dark:bg-amber-950/40 text-amber-500 p-1.5 rounded-lg shrink-0 border border-amber-100 dark:border-amber-900/50">
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">100% Verified Accounts</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg shrink-0 border border-emerald-100 dark:border-emerald-900/50">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Escrow Protection & Warranty</p>
                                </div>
                            </div>

                            <a 
                                href={settings?.telegramLink || "https://t.me/boostnaija1"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20 active:scale-95"
                                onClick={closePopup}
                            >
                                <Send size={18} fill="currentColor" className="-ml-1 mt-0.5" />
                                Join Telegram Channel
                            </a>
                            
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 font-bold uppercase tracking-widest leading-relaxed">
                                Join for Bulk Deals &<br/>Speedy Complaint Handling
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomePopup;

