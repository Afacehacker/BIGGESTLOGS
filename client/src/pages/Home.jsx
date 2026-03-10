import { motion } from 'framer-motion';
import { ShieldCheck, Zap, ArrowRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustBadges from '../components/TrustBadges';
import LivePurchaseNotification from '../components/LivePurchaseNotification';
import DeliveryFeed from '../components/DeliveryFeed';
import TelegramCommunity from '../components/TelegramCommunity';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';

const Home = () => {
    return (
        <div className="relative overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-300">
            <LivePurchaseNotification />

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 px-6 max-w-7xl mx-auto overflow-visible">
                {/* Glow Effects */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-0" />
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-accent-glow/20 rounded-full blur-[100px] -z-0" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full py-1.5 px-4 mb-8">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary-light text-xs font-bold uppercase tracking-widest">v2.0 LIVE STATUS: STABLE</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold leading-[1.0] mb-8 tracking-tighter text-gray-900 dark:text-white">
                            THE <span className="text-primary-light neon-text underline decoration-primary/30">BIGGEST</span><br />
                            SOURCE <span className="text-gray-400 dark:text-gray-500 italic font-light">&</span> HUB
                        </h1>

                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
                            Premium social media assets, aged accounts, and high-follower profiles.
                            Backed by <span className="text-primary dark:text-white font-bold">100% Escrow Protection</span> and automatic delivery.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/shop" className="btn-primary group flex items-center justify-center gap-3 px-12 py-5 text-lg">
                                ENTER MARKET <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <a
                                href="https://t.me/everythinglogs1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline flex items-center justify-center gap-3 px-12 py-5 text-lg border-gray-300 dark:border-primary text-gray-700 dark:text-primary hover:bg-primary hover:text-white transition-all"
                            >
                                <Send size={20} className="text-[#0088cc]" /> TELEGRAM FEED
                            </a>
                        </div>
                    </motion.div>

                    {/* Featured Feed */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <DeliveryFeed />

                        {/* Status Badge */}
                        <div className="absolute -bottom-8 -right-8 glass p-8 rounded-[2rem] border-primary/30 shadow-2xl animate-float bg-white/10 backdrop-blur-xl">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="bg-green-500 w-4 h-4 rounded-full shadow-[0_0_15px_#22c55e]" />
                                    <div className="absolute inset-x-0 inset-y-0 bg-green-500/50 rounded-full animate-ping" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">5,124</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">TRADERS ONLINE</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Meter */}
            <section className="px-6 max-w-7xl mx-auto pb-32">
                <TrustBadges />
            </section>

            {/* Detail Section: How It Works */}
            <HowItWorks />

            {/* Detail Section: Why Choose Us */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureBox
                            icon={<ShieldCheck size={48} />}
                            title="Escrow Security"
                            desc="Your payment is only released to the vendor after you've successfully logged in and secured the credentials."
                        />
                        <FeatureBox
                            icon={<Zap size={48} />}
                            title="Instant Delivery"
                            desc="No waiting for emails. Credentials appear in your private vault immediately upon payment clearance."
                        />
                        <FeatureBox
                            icon={<Send size={48} className="text-[#0088cc]" />}
                            title="Support Channel"
                            desc="Got issues? Our Telegram community and support team are available 24/7 for any complaints."
                        />
                    </div>
                </div>
            </section>

            {/* Detailed Community Section */}
            <TelegramCommunity />

            {/* Detailed FAQ */}
            <FAQ />

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto glass rounded-[3rem] p-16 text-center border-primary/20 bg-gradient-to-t from-primary/5 to-transparent">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 italic tracking-tighter text-gray-900 dark:text-white">READY TO <span className="text-primary-light">SCALE?</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join the thousand traders who rely on BIGGESTLOGS for their digital infrastructure.
                        For any inquiries or complaints, contact us on Telegram.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/register" className="btn-primary px-16 py-6 text-xl rounded-2xl">
                            CREATE AN ACCOUNT
                        </Link>
                        <a href="https://t.me/everythinglogs1" target="_blank" rel="noopener noreferrer" className="glass px-16 py-6 text-xl rounded-2xl flex items-center justify-center gap-3 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                            <Send size={24} className="text-[#0088cc]" /> SUPPORT / FEED
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureBox = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="glass-card !p-12 border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 group hover:bg-primary/5 transition-all"
    >
        <div className="mb-8 text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
            {desc}
        </p>
    </motion.div>
);

export default Home;
