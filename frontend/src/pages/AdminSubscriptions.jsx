import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Users, Receipt, Tv, ArrowLeft, CheckCircle, Clock, DollarSign, Activity, AlertCircle, X, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function AdminSubscriptions() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const [ordersRes, statsRes] = await Promise.all([
                api.get('/admin/orders'),
                api.get('/admin/stats')
            ]);
            setOrders(ordersRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error(error);
            showToast('Failed to load transaction data.', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user, fetchData]);

    const handleViewLogs = (userData) => {
        setSelectedUser(userData);
        setIsModalOpen(true);
    };

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied!`, 'success');
    };

    const handleApprove = async (orderId) => {
        try {
            await api.post(`/admin/orders/${orderId}/approve`);
            showToast('Order approved and account provisioned!', 'success');
            fetchData();
        } catch (error) {
            showToast(error.response?.data?.message || 'Approval failed.', 'error');
        }
    };

    const handleReject = async (orderId) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) return;
        try {
            await api.post(`/admin/orders/${orderId}/reject`);
            showToast('Order rejected.', 'info');
            fetchData();
        } catch (error) {
            showToast('Rejection failed.', 'error');
        }
    };

    if (loading) return <Loader text="Syncing Ledger..." />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <a href="/dashboard" className="text-gray-400 hover:text-white flex items-center mb-4 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Executive Analytics
                    </a>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Receipt className="w-10 h-10 mr-4 text-purple-500" /> Revenue & Subscriptions
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Comprehensive audit log of all system transactions.</p>
                </div>
            </div>

            {/* Transaction KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-green-500">
                        <DollarSign className="w-16 h-16" />
                    </div>
                    <p className="text-indigo-400 font-bold mb-1 text-sm tracking-wider uppercase">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-white">${Number(stats?.total_revenue || 0).toLocaleString()}</h3>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-blue-500">
                        <CheckCircle className="w-16 h-16" />
                    </div>
                    <p className="text-gray-400 font-medium mb-1 text-sm">Paid Orders</p>
                    <h3 className="text-2xl font-bold text-white">{stats?.paid_orders || 0}</h3>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-yellow-500">
                        <Clock className="w-16 h-16" />
                    </div>
                    <p className="text-gray-400 font-medium mb-1 text-sm">Pending</p>
                    <h3 className="text-2xl font-bold text-white">{stats?.pending_orders || 0}</h3>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-red-500">
                        <AlertCircle className="w-16 h-16" />
                    </div>
                    <p className="text-gray-400 font-medium mb-1 text-sm">Failed</p>
                    <h3 className="text-2xl font-bold text-white">{stats?.failed_orders || 0}</h3>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800 text-sm">
                        <thead className="bg-gray-800/50 text-gray-400">
                            <tr>
                                <th className="px-4 py-3 text-left">Order ID</th>
                                <th className="px-4 py-3 text-left">Customer</th>
                                <th className="px-4 py-3 text-left">Package</th>
                                <th className="px-4 py-3 text-left">Amount ($)</th>
                                <th className="px-4 py-3 text-left">Gateway</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Provisioning</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-gray-300">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order.id}</td>
                                    <td className="px-4 py-3 font-medium text-white">{order.user?.name || `User ID ${order.user_id}`}</td>
                                    <td className="px-4 py-3 text-gray-400">{order.package?.name || '-'}</td>
                                    <td className="px-4 py-3 font-bold text-green-400">${order.amount}</td>
                                    <td className="px-4 py-3 uppercase text-[10px] text-gray-600 font-black tracking-widest">{order.payment_method}</td>
                                    <td className="px-4 py-3">
                                        {order.status === 'completed' ? (
                                            <span className="text-green-400 flex items-center font-bold text-xs"><CheckCircle className="w-4 h-4 mr-1" /> PAID</span>
                                        ) : order.status === 'failed' ? (
                                            <span className="text-red-400 flex items-center font-bold text-xs"><AlertCircle className="w-4 h-4 mr-1" /> REJECTED</span>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <span className="text-yellow-400 flex items-center font-bold text-xs animate-pulse"><Clock className="w-4 h-4 mr-1" /> PENDING</span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApprove(order.id)}
                                                        className="bg-green-500/10 text-green-400 px-3 py-1 rounded text-[10px] font-black hover:bg-green-500/20 transition-all border border-green-500/20"
                                                    >
                                                        APPROVE
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(order.id)}
                                                        className="bg-red-500/10 text-red-400 px-3 py-1 rounded text-[10px] font-black hover:bg-red-500/20 transition-all border border-red-500/20"
                                                    >
                                                        REJECT
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {order.status === 'completed' && (
                                            <button
                                                onClick={() => handleViewLogs(order.user)}
                                                className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded text-[10px] font-black hover:bg-indigo-500/20 transition-all border border-indigo-500/20"
                                            >
                                                REVEAL KEYS
                                            </button>
                                        )}
                                        {order.status === 'pending' && <span className="text-[10px] text-gray-600 font-bold italic tracking-wider">AWAITING ADM</span>}
                                        {order.status === 'failed' && <span className="text-[10px] text-red-900 font-bold tracking-widest line-through">REVOKED</span>}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-500 italic">No transactions recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* IPTV Access Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <Lock className="w-6 h-6 mr-3 text-indigo-400" /> Administrative Key Access
                                </h2>
                                <p className="text-gray-400 mt-1 text-sm font-medium">Provisioned credentials for <span className="text-indigo-400 font-bold">{selectedUser.name}</span></p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-white font-black text-xl bg-gray-800 p-2 rounded-xl transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {selectedUser.iptv_accounts && selectedUser.iptv_accounts.length > 0 ? (
                                selectedUser.iptv_accounts.map((acc, i) => {
                                    const m3u = `${acc.server_url}/get.php?username=${acc.username}&password=${acc.password}&type=m3u_plus&output=ts`;
                                    return (
                                        <div key={i} className="bg-black/40 rounded-2xl border border-gray-800 p-6 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest pl-1">Server Host</span>
                                                    <div className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 mt-1">
                                                        <span className="text-xs font-mono text-gray-400 truncate">{acc.server_url}</span>
                                                        <button onClick={() => handleCopy(acc.server_url, 'Host')} className="text-gray-500 hover:text-indigo-400 ml-2"><Activity className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest pl-1">Category</span>
                                                    <div className="flex items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 mt-1">
                                                        <Tv className="w-4 h-4 mr-2 text-indigo-400" />
                                                        <span className="text-xs font-bold text-gray-300">{acc.category}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest pl-1">Username</span>
                                                    <div className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 mt-1">
                                                        <span className="text-xs font-mono text-white">{acc.username}</span>
                                                        <button onClick={() => handleCopy(acc.username, 'Username')} className="text-gray-500 hover:text-indigo-400 ml-2"><Activity className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest pl-1">Password</span>
                                                    <div className="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 mt-1">
                                                        <span className="text-xs font-mono text-white">{acc.password}</span>
                                                        <button onClick={() => handleCopy(acc.password, 'Password')} className="text-gray-500 hover:text-indigo-400 ml-2"><Activity className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-2 border-t border-gray-800">
                                                <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest pl-1">Dynamic M3U Link</span>
                                                <div className="flex justify-between items-center bg-indigo-500/5 border border-indigo-500/10 rounded-xl px-4 py-2 mt-1">
                                                    <span className="text-[10px] font-mono text-indigo-400/60 truncate italic">{m3u}</span>
                                                    <button onClick={() => handleCopy(m3u, 'M3U Link')} className="text-indigo-500/40 hover:text-indigo-400 ml-2"><Activity className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12 bg-black/20 rounded-2xl border border-dashed border-gray-800">
                                    <AlertCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                                    <p className="text-gray-500 font-medium">No IPTV accounts are currently assigned to this user.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                            >
                                Close Audit View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
