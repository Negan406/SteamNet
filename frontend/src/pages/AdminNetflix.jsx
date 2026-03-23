import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Tv, Plus, Upload, Trash2, CheckCircle, AlertCircle, Mail, Lock, User as UserIcon, Shield } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AdminNetflix() {
    const { user } = useContext(AuthContext);
    const { showToast, confirm } = useToast();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Account Form
    const [newAccount, setNewAccount] = useState({
        email: '',
        password: '',
        profile_name: '',
        pin: '',
        category: 'Basic'
    });

    const fetchAccounts = async () => {
        try {
            const res = await api.get('/admin/netflix-accounts');
            setAccounts(res.data);
        } catch (error) {
            console.error(error);
            showToast('Failed to fetch Netflix accounts.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchAccounts();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/netflix-accounts', newAccount);
            setNewAccount({
                email: '',
                password: '',
                profile_name: '',
                pin: '',
                category: 'Basic'
            });
            showToast('Netflix account added successfully!', 'success');
            fetchAccounts();
        } catch (error) {
            showToast('Failed to add Netflix account.', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await confirm('Are you sure you want to delete this Netflix account?', 'Delete Account');
        if (!confirmed) return;
        try {
            await api.delete(`/admin/netflix-accounts/${id}`);
            showToast('Netflix account deleted successfully.', 'success');
            fetchAccounts();
        } catch (error) {
            showToast('Failed to delete account.', 'error');
        }
    };

    if (loading) return <Loader text="Loading Netflix Accounts..." />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Tv className="w-10 h-10 mr-4 text-red-500" /> Netflix Accounts Management
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Manage premium Netflix subscriptions and profile assignments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8">
                {/* Single Account Addition */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center">
                        <Plus className="w-6 h-6 mr-3 text-green-400" /> Provision New Account
                    </h2>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Login Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder="email@example.com"
                                    value={newAccount.email}
                                    onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Access password"
                                    value={newAccount.password}
                                    onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Profile Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="e.g. Profile 1"
                                    value={newAccount.profile_name}
                                    onChange={(e) => setNewAccount({ ...newAccount, profile_name: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Profile PIN</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    maxLength="4"
                                    placeholder="4-digit PIN"
                                    value={newAccount.pin}
                                    onChange={(e) => setNewAccount({ ...newAccount, pin: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-mono text-sm tracking-[0.5em]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Category</label>
                            <select
                                value={newAccount.category}
                                onChange={(e) => setNewAccount({ ...newAccount, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none font-bold text-sm"
                            >
                                <option value="Basic">Basic</option>
                                <option value="Standard">Standard</option>
                                <option value="Premium">Premium</option>
                                <option value="4K / HDR">4K / HDR</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl transition-all shadow-xl shadow-red-600/20 font-bold flex items-center justify-center space-x-2"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Account</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* List of Accounts */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800 text-sm">
                        <thead className="bg-gray-800/30 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 text-left uppercase tracking-widest text-[10px] font-black">Email / Login</th>
                                <th className="px-6 py-4 text-left uppercase tracking-widest text-[10px] font-black">Profile / PIN</th>
                                <th className="px-6 py-4 text-left uppercase tracking-widest text-[10px] font-black">Category</th>
                                <th className="px-6 py-4 text-left uppercase tracking-widest text-[10px] font-black">Status</th>
                                <th className="px-6 py-4 text-left uppercase tracking-widest text-[10px] font-black">Assigned To</th>
                                <th className="px-6 py-4 text-right uppercase tracking-widest text-[10px] font-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-gray-300">
                            {accounts.map(acc => (
                                <tr key={acc.id} className="hover:bg-gray-800/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{acc.email}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">{acc.profile_name || 'N/A'}</span>
                                            {acc.pin && <span className="text-red-400 text-[10px] font-mono tracking-widest">PIN: {acc.pin}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${acc.category === 'Premium' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                acc.category === '4K / HDR' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-gray-800 text-gray-400 border-gray-700'
                                            }`}>
                                            {acc.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {acc.status === 'available' ? (
                                            <span className="text-green-400 flex items-center font-bold text-xs"><CheckCircle className="w-4 h-4 mr-2" /> AVAILABLE</span>
                                        ) : (
                                            <span className="text-red-500 flex items-center font-bold text-xs"><Shield className="w-4 h-4 mr-2" /> SOLD</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {acc.user ? (
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-xs underline underline-offset-4 decoration-indigo-500/50">{acc.user.name}</span>
                                                <span className="text-gray-500 text-[9px] uppercase tracking-tighter">{acc.user.email}</span>
                                            </div>
                                        ) : <span className="text-gray-600 font-black">-</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(acc.id)}
                                            className="bg-gray-800/50 hover:bg-red-600/20 text-gray-500 hover:text-red-500 p-2.5 rounded-xl transition-all border border-gray-700 hover:border-red-500/30"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {accounts.length === 0 && (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500 font-light italic">Universal inventory empty. Provision accounts to begin allocation.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
