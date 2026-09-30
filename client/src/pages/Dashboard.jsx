import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { Package, ShieldCheck, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders/myorders');
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        toast.success('Credentials copied!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (!user) return <div className="pt-32 text-center text-gray-400">Please login to view dashboard.</div>;

    return (
        <div className="bg-[#f8fafc] min-h-screen text-gray-900 pb-32">
            
            <div className="px-5 pt-8 max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                            Purchased Assets Vault
                        </span>
                        <h1 className="text-2xl font-black text-[#1f2231] tracking-tight mt-1">My Orders</h1>
                        <p className="text-gray-500 text-xs font-medium">Access your purchased accounts & credentials.</p>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-blue-100 shadow-sm">
                        <Package size={18} />
                        <span className="font-extrabold text-sm">{orders.length}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-[20px] h-32 animate-pulse border border-gray-100" />)}
                    </div>
                ) : (Array.isArray(orders) && orders.length > 0) ? (
                    <div className="space-y-3.5">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[22px] p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-3.5 items-center">
                                        <div className="w-12 h-12 bg-[#1b2331] text-white rounded-2xl flex items-center justify-center font-black text-lg uppercase shadow-sm">
                                            {order.account?.platform ? order.account.platform[0] : 'L'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1f2231] text-[15px] leading-snug line-clamp-1">{order.account?.title || 'Account Removed'}</h3>
                                            <p className="text-[10.5px] text-gray-400 font-extrabold uppercase tracking-widest mt-1">
                                                ORDER #{order.orderId?.substring(0, 8) || '......'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                            order.status === 'completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-red-100 text-red-700 border border-red-200'
                                        }`}>
                                            {order.status}
                                        </span>
                                        <p className="text-[11px] text-gray-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {order.status === 'completed' && order.account && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                                <ShieldCheck size={14} className="text-green-500" /> Secure Vault Delivery
                                            </p>
                                            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Ready to use</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-3 bg-[#f8fafc] border border-gray-200 p-3 rounded-xl overflow-hidden shadow-inner">
                                            <code className="text-gray-900 font-mono text-xs truncate font-bold">
                                                {order.account.credentials}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(order.account.credentials, order._id)}
                                                className="shrink-0 bg-white border border-gray-200 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-all duration-200 active:scale-90 shadow-sm"
                                                title="Copy Credentials"
                                            >
                                                {copiedId === order._id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {order.status === 'pending' && (
                                    <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center gap-2 text-yellow-700 bg-yellow-50/50 p-2.5 rounded-xl text-xs font-bold">
                                        <Clock size={16} className="animate-spin" /> Admin delivery verification in progress...
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
                        <Package size={48} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-[#1f2231] font-black text-lg mb-1">No Orders Yet</p>
                        <p className="text-gray-500 text-xs mb-5">Purchased items and credentials will instantly appear in your vault here.</p>
                        <Link to="/shop" className="text-white font-bold text-xs bg-[#1b2331] hover:bg-black px-6 py-3 rounded-xl inline-block transition-all shadow-md active:scale-95">
                            Explore Marketplace
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
