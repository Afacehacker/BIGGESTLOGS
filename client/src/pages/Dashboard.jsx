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
        <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:row justify-between items-end gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Hello, {user.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">Track your orders and access your digital vault.</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                        <Package className="text-primary" size={20} />
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Orders</p>
                            <p className="font-bold text-xl">{orders.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Clock className="text-primary" /> Order History
                </h2>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="glass-card h-24 animate-pulse" />)}
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card relative border-l-4 border-l-primary"
                            >
                                <div className="flex flex-col md:row justify-between items-start md:items-center gap-6">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary-dark dark:text-primary-light border border-gray-200 dark:border-white/5">
                                            {order.account?.platform[0] || 'L'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{order.account?.title || 'Account Removed'}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                                Order ID: <span className="text-gray-900 dark:text-white font-mono">{order.orderId}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg ${order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {order.status === 'completed' && order.account && (
                                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2 opacity-10 dark:opacity-5">
                                            <ShieldCheck size={100} />
                                        </div>
                                        <p className="text-xs font-bold text-primary-dark dark:text-primary-light uppercase tracking-widest mb-4">Digital Vault Unlocked</p>
                                        <div className="flex items-center justify-between gap-4 bg-white dark:bg-dark-bg/50 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                                            <code className="text-gray-900 dark:text-accent-neon font-mono truncate mr-4">
                                                {order.account.credentials}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(order.account.credentials, order._id)}
                                                className="flex-shrink-0 bg-primary/20 hover:bg-primary p-2 rounded-lg transition-all"
                                            >
                                                {copiedId === order._id ? <Check size={16} /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-gray-500 mt-4 flex items-center gap-1">
                                            <ShieldCheck size={12} /> Securely delivered to your private dashboard.
                                        </p>
                                    </div>
                                )}

                                {order.status === 'pending' && (
                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/5 flex items-center gap-2 text-yellow-600 dark:text-yellow-500 text-xs font-bold">
                                        <Clock size={16} /> Payment verification in progress. Please wait up to 30 mins.
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl">
                        <Package size={48} className="mx-auto mb-4 text-gray-700" />
                        <p className="text-gray-400">You haven't made any purchases yet.</p>
                        <Link to="/shop" className="text-primary-light underline mt-2 inline-block">Visit Marketplace</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
