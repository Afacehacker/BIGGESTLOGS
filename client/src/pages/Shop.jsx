import { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { Filter, Search, Grid, List, RefreshCw, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Shop = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        platform: 'all',
        type: 'all',
        search: ''
    });

    const platforms = ['all', 'Instagram', 'Twitter (X)', 'Facebook', 'TikTok', 'Snapchat', 'Discord', 'Tools'];
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
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:row justify-between items-end gap-8 mb-16 px-4 py-8 glass rounded-3xl">
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Marketplace</h1>
                    <p className="text-gray-500 dark:text-gray-400">Discover verified accounts and high-quality digital assets.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="input-field pl-12 w-full h-12"
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                    </div>
                    <button onClick={fetchAccounts} className="glass p-3 rounded-xl hover:text-primary transition-colors">
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar Filters */}
                <aside className="lg:col-span-1 space-y-10">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-light mb-6 flex items-center gap-2">
                            <Filter size={16} /> Filter by Platform
                        </h3>
                        <div className="space-y-3">
                            {platforms.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setFilters({ ...filters, platform: p })}
                                    className={`w-full text-left px-4 py-2 rounded-xl transition-all ${filters.platform === p ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 font-medium'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary-light mb-6">Type</h3>
                        <div className="flex flex-wrap gap-2">
                            {types.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setFilters({ ...filters, type: t })}
                                    className={`px-4 py-2 rounded-xl text-sm transition-all ${filters.type === t ? 'bg-primary text-white' : 'glass hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 font-medium'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="glass-card h-80 animate-pulse bg-gray-100 dark:bg-white/5" />
                            ))}
                        </div>
                    ) : accounts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {accounts.map(account => (
                                <ProductCard key={account._id} account={account} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 glass rounded-3xl bg-[#faf9f6]/90 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                            <p className="text-gray-600 dark:text-gray-400 text-lg">No assets found matching your filters.</p>
                            <button
                                onClick={() => setFilters({ platform: 'all', type: 'all', search: '' })}
                                className="mt-4 text-primary underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
