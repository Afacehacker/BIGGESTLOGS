import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { Send, ChevronDown, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import WelcomePopup from '../components/WelcomePopup';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { settings } = useContext(SettingsContext);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);

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
    const groupedAccounts = Array.isArray(accounts) ? accounts.reduce((acc, current) => {
        // Group by platform using uppercase to match the blue bars
        const group = current.platform?.toUpperCase() || 'OTHER';
        if (!acc[group]) acc[group] = [];
        acc[group].push(current);
        return acc;
    }, {}) : {};


    // Generate initial live orders based on actual products
    useEffect(() => {
        if (accounts.length > 0 && recentOrders.length === 0) {
            const fakeNames = ['alex..', 'mary..', 'john..', 'sarah..', 'mike..', 'emmy..', 'david..', 'paul..', 'lucy..', 'tobi..'];
            
            // Randomly pick 3 accounts to form the initial list
            const initialOrders = Array.from({ length: 3 }).map((_, i) => {
                const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
                return {
                    id: Date.now() + i,
                    name: fakeNames[Math.floor(Math.random() * fakeNames.length)],
                    item: (randomAccount?.title || 'Account').substring(0, 20) + '...',
                    price: `₦${randomAccount?.price?.toLocaleString() || '0'}`,
                    time: `${(i + 1) * 3} mins ago`
                };
            });
            setRecentOrders(initialOrders);
        }
    }, [accounts]);

    // Interval to push a new purchase every 40 seconds
    useEffect(() => {
        if (accounts.length === 0) return;
        
        const fakeNames = ['chris..', 'kemi..', 'tunde..', 'susan..', 'femi..', 'ayo..', 'lisa..', 'peter..', 'chuks..', 'zainab..'];

        const intervalId = setInterval(() => {
            const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
            const newName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
            const newItemTitle = (randomAccount?.title || 'Account').substring(0, 20) + '...';
            
            const newOrder = {
                id: Date.now(),
                name: newName,
                item: newItemTitle,
                price: `₦${randomAccount.price.toLocaleString()}`,
                time: 'Just now'
            };

            // Update list, keep only top 5
            setRecentOrders(prev => {
                return [newOrder, ...prev].slice(0, 5); 
            });

            // Fire floating side message notification
            toast.custom((t) => (
                <div className={`${t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-300 max-w-sm w-full bg-white shadow-xl rounded-2xl pointer-events-auto flex p-4 border border-gray-100`}>
                    <div className="flex-1 w-0 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                            <span className="text-xl">🛒</span>
                        </div>
                        <div className="ml-1 flex-1">
                            <p className="text-sm font-bold text-gray-900 leading-tight">
                                {newName.replace('..', '')} <span className="text-blue-600 font-extrabold text-[12px] uppercase tracking-widest ml-1">Bought!</span>
                            </p>
                            <p className="mt-1 text-[13px] text-gray-500 font-medium truncate">
                                {randomAccount.title}
                            </p>
                        </div>
                    </div>
                </div>
            ), { duration: 5000, position: 'bottom-left' });

        }, 40000); // 40 seconds

        return () => clearInterval(intervalId);
    }, [accounts]);

    return (
        <div className="bg-[#f8fafc] min-h-screen text-gray-900 pb-32">
            <WelcomePopup />
            
            {/* Header Content */}
            <div className="px-5 pt-8 max-w-lg mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                            Verified Logs Platform
                        </span>
                        <h1 className="text-2xl font-black uppercase tracking-tight text-[#1f2231] mt-2">
                            <span className="text-blue-600">HI </span>
                            {user ? user.name : 'GUEST'},
                        </h1>
                    </div>
                </div>

                {/* Categories Dropdown Filter */}
                <div className="mt-3 relative shadow-sm">
                    <select className="w-full bg-[#1b2331] hover:bg-black text-white text-[15px] rounded-[14px] px-5 py-4 appearance-none outline-none font-bold cursor-pointer transition-colors border border-gray-800">
                        <option value="">Categories (All Platform Logs)</option>
                        {Object.keys(groupedAccounts).map((cat, i) => (
                            <option key={i} value={cat}>{cat} ({groupedAccounts[cat].length})</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown size={20} />
                    </div>
                </div>

                {/* Recent Order Status */}
                <div className="mt-6 mb-3">
                    <div className="bg-[#596168] rounded-[12px] text-center py-3 text-white font-black tracking-widest text-xs shadow-sm uppercase flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                        Live Recent Purchases Ticker
                    </div>
                </div>

                {/* Recent Order List */}
                <div className="bg-white border border-gray-100 rounded-[18px] shadow-sm mb-8 overflow-hidden">
                    <div className="flex justify-between px-5 py-3.5 border-b border-gray-100 font-bold text-xs uppercase tracking-wider text-gray-400 bg-gray-50/50">
                        <span>Item / Purchaser</span>
                        <span>Time</span>
                    </div>
                    <div className="max-h-56 overflow-hidden relative divide-y divide-gray-50">
                        {Array.isArray(recentOrders) && recentOrders.map((order, index) => (
                            <div key={order.id || index} className="flex justify-between items-center px-4 py-3.5 hover:bg-blue-50/40 transition-colors">
                                <div className="min-w-0 pr-2">
                                    <p className="text-gray-500 text-[12px] mb-0.5 font-medium truncate">
                                        <span className="font-bold text-gray-900">{order.name.replace('..', '')}</span> <span className="text-pink-600 font-extrabold text-[11px] uppercase tracking-wider ml-1">Bought!</span>
                                    </p>
                                    <p className="text-gray-800 text-[13px] font-bold uppercase truncate">
                                        {order.item} <span className="text-blue-600 ml-1.5 font-black">{order.price}</span>
                                    </p>
                                </div>
                                <span className="text-gray-400 text-xs font-semibold whitespace-nowrap bg-gray-100 px-2.5 py-1 rounded-md shrink-0">{order.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore Product Tag */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-extrabold text-[#1f2231] tracking-tight border-l-4 border-yellow-400 pl-3">
                        Explore Available Products 👈
                    </h2>
                </div>

                {/* Products Grouped */}
                {loading ? (
                    <div className="py-20 text-center text-gray-400 font-bold animate-pulse">Loading verified products...</div>
                ) : (
                    <div className="space-y-8">
                        {Object.keys(groupedAccounts).map((groupName, idx) => (
                            <div key={idx}>
                                {/* Group Header */}
                                <div className="bg-[#3b427b] text-white rounded-[12px] px-4 py-3 font-bold text-xs mb-4 uppercase tracking-wider shadow-sm flex items-center justify-between">
                                    <span>{groupName} ACCOUNTS / TOOLS</span>
                                    <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-black">{groupedAccounts[groupName].length} Available</span>
                                </div>
                                
                                {/* Products */}
                                <div className="space-y-3">
                                    {groupedAccounts[groupName].slice(0, 5).map(acc => (
                                        <ProductCard key={acc._id} account={acc} />
                                    ))}
                                </div>

                                {/* View All Button */}
                                {groupedAccounts[groupName].length > 5 && (
                                    <div className="mt-4 mb-8">
                                        <Link to="/shop" className="block w-full text-center bg-[#1b2331] hover:bg-black transition-all duration-200 text-white py-3.5 rounded-xl shadow-md font-black uppercase text-[12px] tracking-widest active:scale-95">
                                            View All {groupName} ({groupedAccounts[groupName].length})
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                
            </div>

            {/* Floating Telegram Button */}
            <a href={settings?.telegramLink || "https://t.me/boostnaija1"} target="_blank" rel="noopener noreferrer" 
                className="fixed bottom-24 left-6 md:left-auto md:right-32 bg-[#0088cc] hover:bg-[#0077b5] transition-all duration-300 p-3.5 rounded-2xl shadow-xl shadow-blue-500/20 z-50 flex items-center justify-center border-2 border-white hover:scale-110 active:scale-95" title="Telegram Support">
                <Send size={24} className="text-white -ml-0.5" fill="currentColor" />
            </a>
            
        </div>
    );
};

export default Home;
