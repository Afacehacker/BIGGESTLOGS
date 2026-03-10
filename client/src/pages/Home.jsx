import { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext';
import { Send } from 'lucide-react';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const { data } = await API.get('/accounts', { params: { platform: 'all', type: 'all' } });
                setAccounts(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchAccounts();
    }, []);

    // Group accounts by platform or type
    const groupedAccounts = accounts.reduce((acc, current) => {
        // Group by platform using uppercase to match the blue bars
        const group = current.platform.toUpperCase();
        if (!acc[group]) acc[group] = [];
        acc[group].push(current);
        return acc;
    }, {});


    // Fake recent orders
    const recentOrders = [
        { name: 'onii..', item: 'EXPRESS VPN FOR...', price: '₦1,500', time: '1 minute ago' },
        { name: 'mary..', item: 'PURE UK 🇬🇧 EMPTY...', price: '₦1,500', time: '3 minutes ago' },
        { name: 'Ligh..', item: 'RANDOM FACEBOOK...', price: '₦2,500', time: '6 minutes ago' }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen text-gray-900 pb-32">
            
            {/* Header Content */}
            <div className="px-5 pt-8 max-w-lg mx-auto">
                <h1 className="text-xl font-bold uppercase tracking-tight text-[#4f0c86]">
                    <span className="text-blue-700">HI </span>
                    {user ? user.name : 'GUEST'},
                </h1>

                {/* Categories Dropdown Filter */}
                <div className="mt-3">
                    <select className="w-full bg-[#1b2331] text-white text-[15px] rounded-[12px] px-4 py-4 appearance-none outline-none font-medium">
                        <option>Categories</option>
                        {Object.keys(groupedAccounts).map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Recent Order Status */}
                <div className="mt-6 mb-4">
                    <div className="bg-[#596168] rounded-[10px] text-center py-3 text-white font-bold tracking-widest text-sm shadow-sm">
                        RECENT ORDER
                    </div>
                </div>

                {/* Recent Order List */}
                <div className="bg-white border border-gray-100 rounded-[14px] shadow-sm mb-10 overflow-hidden">
                    <div className="flex justify-between px-5 py-4 border-b border-gray-100 font-bold text-lg">
                        <span>Item</span>
                        <span>Time</span>
                    </div>
                    <div className="max-h-56 overflow-hidden relative p-1">
                        <div className="animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                            {/* Visual effect for scroll list */}
                        </div>
                        {recentOrders.map((order, index) => (
                            <div key={index} className="flex justify-between items-center px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="text-gray-500 text-[13px] mb-1">{order.name}, <span className="text-pink-600 font-semibold text-[13px]">just purchase</span></p>
                                    <p className="text-gray-600 text-[13px] font-bold uppercase">{order.item} <span className="text-black ml-1">{order.price}</span></p>
                                </div>
                                <span className="text-gray-400 text-sm whitespace-nowrap pl-4">{order.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore Product Tag */}
                <h2 className="text-xl font-extrabold text-[#1f2231] tracking-tight mb-4 border-l-4 border-yellow-400 pl-3">
                    Explore Product 👈
                </h2>

                {/* Products Grouped */}
                {loading ? (
                    <div className="py-20 text-center text-gray-500">Loading products...</div>
                ) : (
                    <div className="space-y-8">
                        {Object.keys(groupedAccounts).map((groupName, idx) => (
                            <div key={idx}>
                                {/* Group Header */}
                                <div className="bg-[#3b427b] text-white rounded-[10px] px-4 py-3 font-semibold text-sm mb-4 uppercase tracking-wider shadow-sm">
                                    {groupName} ACCOUNTS/TOOLS
                                </div>
                                
                                {/* Products */}
                                <div className="space-y-4">
                                    {groupedAccounts[groupName].slice(0, 5).map(acc => (
                                        <ProductCard key={acc._id} account={acc} />
                                    ))}
                                </div>

                                {/* View All Button */}
                                {groupedAccounts[groupName].length > 5 && (
                                    <div className="mt-4 mb-8">
                                        <Link to="/shop" className="block w-full text-center bg-[#524df9] hover:bg-blue-600 transition-colors text-white py-4 rounded-[16px] shadow-lg font-bold text-[16px]">
                                            View All {groupName}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                
            </div>

            {/* Floating Telegram Button */}
            <a href="https://t.me/everythinglogs1" target="_blank" rel="noopener noreferrer" 
                className="fixed bottom-[110px] right-6 md:right-10 bg-[#0088cc] p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform flex items-center justify-center border-4 border-blue-50">
                <Send size={28} className="text-white -ml-1 mt-1" fill="currentColor" />
            </a>
            
        </div>
    );
};

export default Home;
