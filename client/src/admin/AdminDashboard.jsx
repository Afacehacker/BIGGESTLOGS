import { useState, useEffect } from 'react';
import API from '../services/api';
import {
    Users, ShoppingCart, Tag, BarChart3,
    Settings, Check, X, Edit, Trash2,
    Plus, ExternalLink, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import AddListingModal from './AddListingModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [orders, setOrders] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: oData } = await API.get('/orders');
            const { data: aData } = await API.get('/accounts');
            setOrders(oData);
            setAccounts(aData);
        } catch (error) {
            toast.error('Failed to fetch admin data');
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status`, { status });
            toast.success('Order updated successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to update order');
        }
    };

    const handleDeleteAccount = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await API.delete(`/accounts/${id}`);
                toast.success('Listing deleted');
                fetchData();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    return (
        <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
            <div className="mb-12 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-white/60 bg-clip-text text-transparent">Management Hub</h1>
                    <p className="text-gray-600 dark:text-gray-400">Total control over orders and assets.</p>
                </div>
                <button onClick={fetchData} className="glass p-3 rounded-xl hover:text-primary border-primary/20">
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <TabButton id="overview" active={activeTab} set={setActiveTab} icon={<BarChart3 size={18} />} label="Overview" />
                    <TabButton id="orders" active={activeTab} set={setActiveTab} icon={<ShoppingCart size={18} />} label="Orders" count={orders.filter(o => o.status === 'pending').length} />
                    <TabButton id="accounts" active={activeTab} set={setActiveTab} icon={<Tag size={18} />} label="Inventory" />
                    <TabButton id="users" active={activeTab} set={setActiveTab} icon={<Users size={18} />} label="User Base" />
                </div>

                {/* Content */}
                <div className="lg:col-span-4 glass-card min-h-[600px]">
                    {activeTab === 'overview' && <OverviewTab orders={orders} accounts={accounts} />}
                    {activeTab === 'orders' && <OrdersTab orders={orders} onUpdate={handleStatusUpdate} />}
                    {activeTab === 'accounts' && <AccountsTab accounts={accounts} onDelete={handleDeleteAccount} onAdd={() => setIsAddModalOpen(true)} />}
                </div>
            </div>
            <AddListingModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={fetchData} />
        </div>
    );
};

const TabButton = ({ id, active, set, icon, label, count }) => (
    <button
        onClick={() => set(id)}
        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${active === id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-bold">{label}</span>
        </div>
        {count > 0 && <span className="bg-red-500 text-[10px] text-white px-2 py-0.5 rounded-full font-bold">{count}</span>}
    </button>
);

const OverviewTab = ({ orders, accounts }) => {
    const revenue = orders.filter(o => o.status === 'completed').reduce((acc, curr) => acc + (curr.account?.price || 0), 0);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-8">Performance Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard label="Total Revenue" value={`₦${revenue}`} color="text-green-400" />
                <StatCard label="Pending Orders" value={orders.filter(o => o.status === 'pending').length} color="text-yellow-400" />
                <StatCard label="Active Listings" value={accounts.length} color="text-primary-light" />
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</p>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
);

const OrdersTab = ({ orders, onUpdate }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Asset</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Proof</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {orders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm">{order.orderId}</td>
                        <td className="px-6 py-4">
                            <p className="text-sm font-bold">{order.account?.title}</p>
                            <p className="text-[10px] text-gray-500">{order.user?.name}</p>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                                }`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-primary underline">
                            {order.paymentProof ? <a href={order.paymentProof} target="_blank"><ExternalLink size={16} /></a> : 'None'}
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                            {order.status === 'pending' && (
                                <>
                                    <button onClick={() => onUpdate(order._id, 'completed')} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 transition-colors hover:text-white"><Check size={16} /></button>
                                    <button onClick={() => onUpdate(order._id, 'cancelled')} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 transition-colors hover:text-white"><X size={16} /></button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const AccountsTab = ({ accounts, onDelete, onAdd }) => (
    <div className="p-6">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Inventory List</h2>
            <button onClick={onAdd} className="btn-primary flex items-center gap-2 py-2 px-6 text-sm"><Plus size={16} /> ADD LISTING</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map(acc => (
                <div key={acc._id} className="p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src={acc.image} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">{acc.title}</p>
                            <p className="text-xs text-gray-500">₦{acc.price} • Stock: {acc.stock}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"><Edit size={16} /></button>
                        <button onClick={() => onDelete(acc._id)} className="p-2 text-red-500 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default AdminDashboard;
