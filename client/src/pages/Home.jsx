import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductPreviewModal from '../components/ProductPreviewModal';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import WelcomePopup from '../components/WelcomePopup';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { 
    Send, ShieldCheck, Zap, RefreshCw, 
    Search, Sparkles, ShoppingCart, ArrowRight,
    Star, Award, CheckCircle2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { settings } = useContext(SettingsContext);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [previewAccount, setPreviewAccount] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const { data } = await API.get('/accounts', { params: { platform: 'all', type: 'all' } });
                setAccounts(data);
            } catch (error) {
                console.error("Failed to load accounts:", error);
            }
            setLoading(false);
        };
        fetchAccounts();
    }, []);

    // Filter accounts by search query and category pill
    const filteredAccounts = Array.isArray(accounts) ? accounts.filter(acc => {
        const matchesCategory = selectedCategory === 'ALL' || (acc.platform?.toUpperCase() === selectedCategory);
        const matchesSearch = !searchQuery || 
            acc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.platform?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    }) : [];

    // Group filtered accounts by platform
    const groupedAccounts = filteredAccounts.reduce((acc, current) => {
        const group = current.platform?.toUpperCase() || 'OTHER';
        if (!acc[group]) acc[group] = [];
        acc[group].push(current);
        return acc;
    }, {});

    // All available platform categories for pill filter
    const categoriesList = ['ALL', ...Array.from(new Set(accounts.map(a => a.platform?.toUpperCase()).filter(Boolean)))];

    // Generate live orders stream
    useEffect(() => {
        if (accounts.length > 0 && recentOrders.length === 0) {
            const fakeNames = ['alex..', 'mary..', 'john..', 'sarah..', 'mike..', 'emmy..', 'david..', 'paul..', 'lucy..', 'tobi..'];
            const initialOrders = Array.from({ length: 4 }).map((_, i) => {
                const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
                return {
                    id: Date.now() + i,
                    name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
                    item: (randomAccount?.title || 'Account').substring(0, 24) + '...',
                    price: `₦${randomAccount?.price?.toLocaleString() || '0'}`,
                    time: `${(i + 1) * 2} mins ago`
                };
            });
            setRecentOrders(initialOrders);
        }
    }, [accounts]);

    // Interval to push live order notifications
    useEffect(() => {
        if (accounts.length === 0) return;
        
        const fakeNames = ['chris..', 'kemi..', 'tunde..', 'susan..', 'femi..', 'ayo..', 'lisa..', 'peter..', 'chuks..', 'zainab..'];

        const intervalId = setInterval(() => {
            const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
            const newName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
            const newItemTitle = (randomAccount?.title || 'Account').substring(0, 24) + '...';
            
            const newOrder = {
                id: Date.now(),
                name: newName,
                item: newItemTitle,
                price: `₦${randomAccount.price.toLocaleString()}`,
                time: 'Just now'
            };

            setRecentOrders(prev => [newOrder, ...prev].slice(0, 5));

            toast.custom((t) => (
                <div className={`${t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-300 max-w-sm w-full bg-white dark:bg-slate-900 shadow-2xl rounded-2xl pointer-events-auto flex p-4 border border-emerald-100 dark:border-slate-800`}>
                    <div className="flex-1 w-0 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-900/50">
                            <span className="text-xl">🛒</span>
                        </div>
                        <div className="ml-1 flex-1">
                            <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                                {newName.replace('..', '')} <span className="text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest ml-1">Bought Log!</span>
                            </p>
                            <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-400 font-bold truncate">
                                {randomAccount.title}
                            </p>
                        </div>
                    </div>
                </div>
            ), { duration: 5000, position: 'bottom-left' });

        }, 35000);

        return () => clearInterval(intervalId);
    }, [accounts]);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-28">
            <WelcomePopup />

            {/* Product Quick Preview Modal */}
            {previewAccount && (
                <ProductPreviewModal 
                    account={previewAccount} 
                    onClose={() => setPreviewAccount(null)} 
                />
            )}

            {/* HERO SECTION - High Impact Landing Header */}
            <section className="relative overflow-hidden pt-10 md:pt-16 pb-12 px-4 border-b border-gray-200 dark:border-slate-800/80 bg-gradient-to-b from-white via-emerald-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-6 shadow-xs border border-emerald-200/60 dark:border-emerald-800/50">
                        <Sparkles size={14} className="animate-pulse" /> #1 Verified Logs & Accounts Marketplace
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
                        Buy High-Quality <br className="hidden sm:inline" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400">
                            Verified Accounts & Logs
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm md:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
                        Instant automated delivery for Facebook, Instagram, Twitter (X), Telegram, Google, TikTok, and Premium Digital Tools. Backed by our <span className="font-extrabold text-emerald-700 dark:text-emerald-300">24-Hour Replacement Guarantee</span>.
                    </p>

                    {/* CTA Action Buttons */}
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10">
                        <Link 
                            to="/shop" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-600/20 flex items-center gap-2 transform active:scale-95 transition-all"
                        >
                            <ShoppingCart size={18} /> Explore Store <ArrowRight size={18} />
                        </Link>

                        <Link 
                            to="/wallet" 
                            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-sm md:text-base px-7 py-4 rounded-2xl border border-emerald-600/30 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700 shadow-sm flex items-center gap-2 transition-all"
                        >
                            💳 Fund Wallet Now
                        </Link>
                    </div>

                    {/* Trust Metrics Counter Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 border-t border-gray-200 dark:border-slate-800">
                        <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-100 dark:border-slate-800 shadow-xs">
                            <span className="block font-black text-xl md:text-2xl text-emerald-600 dark:text-emerald-400">50,000+</span>
                            <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Orders Delivered</span>
                        </div>
                        <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-100 dark:border-slate-800 shadow-xs">
                            <span className="block font-black text-xl md:text-2xl text-emerald-600 dark:text-emerald-400">99.9%</span>
                            <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Success Rate</span>
                        </div>
                        <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-100 dark:border-slate-800 shadow-xs">
                            <span className="block font-black text-xl md:text-2xl text-emerald-600 dark:text-emerald-400">⚡ 1 Min</span>
                            <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Instant Auto-Delivery</span>
                        </div>
                        <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-gray-100 dark:border-slate-800 shadow-xs">
                            <span className="block font-black text-xl md:text-2xl text-teal-600 dark:text-teal-400">24/7</span>
                            <span className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Telegram Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <div className="px-4 pt-8 max-w-4xl mx-auto">
                
                {/* Greeting banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        <span className="text-emerald-600 dark:text-emerald-400">WELCOME </span>
                        {user ? user.name : 'GUEST'} 👋
                    </h2>
                    <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                        Balance: ₦{(user?.balance || 0).toLocaleString()}
                    </span>
                </div>

                {/* Live Search Input Bar */}
                <div className="relative mb-4">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={18} />
                    </div>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Facebook, Instagram, Twitter, Telegram, Aged Logs..."
                        className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-extrabold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                    />
                </div>

                {/* Horizontal Category Filter Pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
                    {categoriesList.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase whitespace-nowrap transition-all ${
                                selectedCategory === cat
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105'
                                    : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-400'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Recent Orders Stream Section */}
                <div className="mb-10">
                    <div className="bg-emerald-700 dark:bg-emerald-900 rounded-xl text-center py-2.5 text-white font-extrabold tracking-widest text-xs uppercase shadow-md flex items-center justify-center gap-2">
                        <Zap size={14} className="animate-bounce" /> LIVE PURCHASE STREAM
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm mt-2 overflow-hidden">
                        <div className="flex justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800 font-extrabold text-slate-900 dark:text-white text-xs">
                            <span>Item Bought</span>
                            <span>Time</span>
                        </div>
                        <div className="max-h-48 overflow-hidden relative">
                            {Array.isArray(recentOrders) && recentOrders.map((order, index) => (
                                <div key={order.id || index} className="flex justify-between items-center px-4 py-2.5 border-b border-gray-50 dark:border-slate-800/60 last:border-0 hover:bg-emerald-50/40 dark:hover:bg-slate-800/50 transition-colors">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-[12px] font-bold">
                                            {order.name}, <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">just purchased</span>
                                        </p>
                                        <p className="text-slate-900 dark:text-white text-[12px] font-black uppercase">
                                            {order.item} <span className="text-emerald-600 dark:text-emerald-400 font-black ml-1">{order.price}</span>
                                        </p>
                                    </div>
                                    <span className="text-slate-400 text-[11px] font-bold whitespace-nowrap pl-4">{order.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Listings Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight border-l-4 border-emerald-500 pl-3">
                            Available Accounts & Products 🛍️
                        </h2>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                            {filteredAccounts.length} Products Found
                        </span>
                    </div>

                    {loading ? (
                        <div className="py-16 text-center text-emerald-600 dark:text-emerald-400 font-extrabold animate-pulse">
                            Loading verified market logs...
                        </div>
                    ) : Object.keys(groupedAccounts).length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 text-center">
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">No products matched your filter.</p>
                            <button 
                                onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }} 
                                className="mt-3 text-xs font-black text-emerald-600 dark:text-emerald-400 underline"
                            >
                                Reset Search Filters
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.keys(groupedAccounts).map((groupName, idx) => (
                                <div key={idx}>
                                    {/* Group Header */}
                                    <div className="bg-emerald-700 dark:bg-slate-800 text-white rounded-xl px-4 py-3 font-black text-xs md:text-sm mb-3 uppercase tracking-wider shadow-sm flex items-center justify-between">
                                        <span>{groupName} LOGS / TOOLS</span>
                                        <span className="text-[11px] bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold">
                                            {groupedAccounts[groupName].length} items
                                        </span>
                                    </div>
                                    
                                    {/* Product Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {groupedAccounts[groupName].map(acc => (
                                            <ProductCard 
                                                key={acc._id} 
                                                account={acc} 
                                                onPreview={(item) => setPreviewAccount(item)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* WHY CHOOSE BIGGESTLOGS - Value Proposition Cards */}
                <section className="py-10 border-t border-gray-200 dark:border-slate-800">
                    <div className="text-center mb-8">
                        <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider block mb-1">
                            GUARANTEED EXCELLENCE
                        </span>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                            Why Marketers Choose BIGGESTLOGS
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 font-black border border-emerald-100 dark:border-emerald-800">
                                <Zap size={24} />
                            </div>
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">Instant Auto-Delivery</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                Account credentials appear on your orders screen immediately upon wallet checkout.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 font-black border border-emerald-100 dark:border-emerald-800">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">24-Hr Replacement Warranty</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                Pre-checked credentials. Any invalid login within 24 hours is swapped automatically.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm text-center">
                            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-3 font-black border border-teal-100 dark:border-teal-800">
                                <RefreshCw size={24} />
                            </div>
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">Automated Wallet Deposit</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                Fund your wallet with Bank Transfer, Debit Card, or Crypto anytime 24/7.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Verified Customer Reviews Section */}
                <Testimonials />

                {/* Frequently Asked Questions Section */}
                <FAQ />
            </div>

            {/* Floating Telegram Support Button */}
            <a 
                href={settings?.telegramLink || "https://t.me/boostnaija1"} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Telegram Support"
                className="fixed bottom-20 md:bottom-10 right-4 sm:right-8 bg-emerald-600 hover:bg-emerald-700 transition-all p-3.5 sm:p-4 rounded-full shadow-2xl z-40 flex items-center justify-center border-2 border-white dark:border-slate-800 transform hover:scale-110 active:scale-95 shadow-emerald-600/30"
            >
                <Send size={22} className="text-white -ml-0.5 mt-0.5" fill="currentColor" />
            </a>
        </div>
    );
};

export default Home;
