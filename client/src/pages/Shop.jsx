import { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductPreviewModal from '../components/ProductPreviewModal';
import { Filter, Search, RefreshCw, ShoppingBag } from 'lucide-react';

const Shop = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewAccount, setPreviewAccount] = useState(null);
    const [filters, setFilters] = useState({
        platform: 'all',
        type: 'all',
        search: ''
    });

    const platforms = ['all', 'Instagram', 'Twitter (X)', 'Facebook', 'TikTok', 'Telegram', 'Google', 'Proxy', 'Tools'];
    const types = ['all', 'Aged', 'Verified', 'High Follower', 'Premium'];

    useEffect(() => {
        fetchAccounts();
    }, [filters]);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/accounts', { params: filters });
            setAccounts(data);
        } catch (error) {
            console.error("Failed to fetch accounts:", error);
        }
        setLoading(false);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-32">
            
            {/* Product Quick Preview Modal */}
            {previewAccount && (
                <ProductPreviewModal 
                    account={previewAccount} 
                    onClose={() => setPreviewAccount(null)} 
                />
            )}

            {/* Header Content */}
            <div className="px-4 pt-6 sm:pt-8 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                            Verified Logs Marketplace
                        </span>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-2 mb-1">
                            Marketplace Hub 🛍️
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm font-medium">
                            Explore verified digital assets, aged logs, and automated tools.
                        </p>
                    </div>
                    <button 
                        onClick={fetchAccounts} 
                        aria-label="Refresh Marketplace"
                        className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-3 rounded-2xl shadow-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors active:scale-95"
                    >
                        <RefreshCw size={20} className={loading ? 'animate-spin text-emerald-600 dark:text-emerald-400' : ''} />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search Facebook logs, Instagram, Twitter, Aged Accounts..."
                        className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-extrabold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                </div>

                {/* Filters - Type Slider (Horizontal Scroll) */}
                <div className="mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar snap-x">
                        {types.map(t => (
                            <button
                                key={t}
                                onClick={() => setFilters({ ...filters, type: t })}
                                className={`shrink-0 snap-start px-4 py-2 rounded-xl text-xs font-extrabold uppercase transition-all shadow-xs active:scale-95 ${
                                    filters.type === t 
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-gray-100 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-800'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters - Platform Chips */}
                <div className="mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-3">
                        <Filter size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Filter Platforms</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {platforms.map(p => (
                            <button
                                key={p}
                                onClick={() => setFilters({ ...filters, platform: p })}
                                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors active:scale-95 ${
                                    filters.platform === p 
                                        ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-black' 
                                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-gray-100 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl h-24 animate-pulse border border-gray-100 dark:border-slate-800" />
                            ))}
                        </div>
                    ) : (Array.isArray(accounts) && accounts.length > 0) ? (
                        <div className="space-y-3">
                            {accounts.map(account => (
                                <ProductCard 
                                    key={account._id} 
                                    account={account} 
                                    onPreview={(item) => setPreviewAccount(item)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
                            <ShoppingBag size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                            <p className="text-slate-900 dark:text-white font-black text-lg mb-1">No Assets Match Filters</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Try clearing your search query or selecting ALL categories.</p>
                            <button
                                onClick={() => setFilters({ platform: 'all', type: 'all', search: '' })}
                                className="text-white font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl inline-block shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;

