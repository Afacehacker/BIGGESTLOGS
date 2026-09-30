import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        q: "How fast will I receive my accounts after payment?",
        a: "Delivery is 100% automated and instant. As soon as you purchase an item using your wallet balance, the credentials (email, password, 2FA key, cookies/tokens) will instantly appear in your My Orders dashboard."
    },
    {
        q: "What is your 24-Hour Replacement Warranty?",
        a: "We offer a guaranteed 100% replacement if any log or account has invalid credentials or login restrictions upon purchase. Simply submit a quick ticket or reach out on Telegram within 24 hours for an instant replacement."
    },
    {
        q: "How do I fund my BIGGESTLOGS wallet?",
        a: "You can fund your wallet via automatic Bank Transfer, Debit Card, or Cryptocurrency (USDT/BTC/LTC). Once confirmed, your wallet balance updates immediately so you can shop anytime."
    },
    {
        q: "Are the social media accounts pre-checked and aged?",
        a: "Yes! All accounts undergo rigorous quality checks. Our Facebook, Instagram, Twitter/X, and Telegram accounts are aged with real activity history to guarantee high trust scores."
    },
    {
        q: "Can I order custom or bulk accounts?",
        a: "Absolutely! If you require custom accounts in bulk or specialized tools not listed on the store, click our Telegram Support button to speak directly with an account specialist."
    }
];

const FAQ = () => {
    const [selected, setSelected] = useState(0);

    return (
        <section className="py-10 sm:py-12 px-4 max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800">
                    <HelpCircle size={14} /> Got Questions? We Have Answers
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto mt-2">
                    Everything you need to know about purchasing verified digital assets securely.
                </p>
            </div>

            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div 
                        key={i} 
                        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm transition-all"
                    >
                        <button
                            onClick={() => setSelected(selected === i ? null : i)}
                            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-emerald-50/50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white pr-4">
                                {faq.q}
                            </span>
                            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 shrink-0 border border-emerald-100 dark:border-slate-700">
                                {selected === i ? <Minus size={18} /> : <Plus size={18} />}
                            </div>
                        </button>

                        <AnimatePresence>
                            {selected === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 sm:px-5 pb-5 text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed font-medium border-t border-gray-100 dark:border-slate-800/60 pt-4"
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;

