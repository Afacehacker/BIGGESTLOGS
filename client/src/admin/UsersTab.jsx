import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-hot-toast';
import { Search, Edit, Trash2, ShieldAlert, Save, X } from 'lucide-react';

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ balance: 0, isAdmin: false });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/users');
            setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId, blockIp) => {
        if (!window.confirm(`Are you sure you want to permanently delete this user?${blockIp ? ' Their IP will also be blocked.' : ''}`)) return;
        
        try {
            await API.delete(`/users/${userId}?blockIp=${blockIp}`);
            toast.success(blockIp ? 'User deleted and IP blocked' : 'User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
            toast.error('Failed to delete user');
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user._id);
        setEditForm({ balance: user.balance, isAdmin: user.isAdmin });
    };

    const handleUpdateUser = async (userId) => {
        try {
            await API.put(`/users/${userId}`, editForm);
            toast.success('User updated successfully');
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user');
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) || 
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Balance</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {editingUser === user._id ? (
                                        <select 
                                            value={editForm.isAdmin}
                                            onChange={(e) => setEditForm({...editForm, isAdmin: e.target.value === 'true'})}
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                        >
                                            <option value="false">User</option>
                                            <option value="true">Admin</option>
                                        </select>
                                    ) : (
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${user.isAdmin ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                                            {user.isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {editingUser === user._id ? (
                                        <input 
                                            type="number" 
                                            value={editForm.balance}
                                            onChange={(e) => setEditForm({...editForm, balance: Number(e.target.value)})}
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 w-24 text-sm font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                        />
                                    ) : (
                                        <span className="font-bold text-slate-900 dark:text-white tracking-tight">₦{user.balance?.toLocaleString()}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {editingUser === user._id ? (
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleUpdateUser(user._id)} className="p-1.5 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-600 hover:text-white transition-colors"><Save size={16} /></button>
                                            <button onClick={() => setEditingUser(null)} className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"><X size={16} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleEditClick(user)} className="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors" title="Edit User"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(user._id, false)} className="p-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors" title="Delete User"><Trash2 size={16} /></button>
                                            <button onClick={() => handleDelete(user._id, true)} className="p-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-950 transition-colors" title="Delete & Block IP"><ShieldAlert size={16} /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-slate-500 dark:text-slate-400 font-medium">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTab;
