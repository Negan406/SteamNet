import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Settings, Users, Package as PkgIcon, Receipt, TrendingUp, Activity, DollarSign, Database, Server } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-xl">
                <p className="text-gray-300 mb-1">{label}</p>
                <p className="text-indigo-400 font-bold text-lg">${payload[0].value.toFixed(2)}</p>
            </div>
        );
    }
    return null;
};

export default function AdminPanel() {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [packages, setPackages] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'admin') {
            Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/packages'),
                api.get('/admin/orders')
            ]).then(([statsRes, pkgRes, ordRes]) => {
                setStats(statsRes.data);
                setPackages(pkgRes.data);
                setOrders(ordRes.data);
            }).catch(console.error).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <Loader text="Loading metrics..." />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Settings className="w-10 h-10 mr-4 text-indigo-500" /> Admin Dashboard
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">System Overview & Analytics</p>
                </div>
                <div className="flex space-x-4">
                    <a href="/admin/iptv" className="px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 rounded-lg transition-colors font-medium">IPTV Manager</a>
                    <a href="/admin/subscriptions" className="px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 rounded-lg transition-colors font-medium">Subscriptions</a>
                </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-24 h-24 text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-medium mb-1 flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Total Revenue</p>
                        <h3 className="text-4xl font-bold text-white">${Number(stats?.total_revenue || 0).toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-24 h-24 text-blue-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-medium mb-1">Total Users</p>
                        <h3 className="text-4xl font-bold text-white">{stats?.total_users || 0}</h3>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-24 h-24 text-purple-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-medium mb-1">Active Subscriptions</p>
                        <h3 className="text-4xl font-bold text-white">{stats?.active_subscriptions || 0}</h3>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Database className="w-24 h-24 text-indigo-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-medium mb-1">Available Accounts</p>
                        <h3 className="text-4xl font-bold text-white">{stats?.available_accounts || 0}</h3>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Server className="w-24 h-24 text-red-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-gray-400 font-medium mb-1">Sold Accounts</p>
                        <h3 className="text-4xl font-bold text-white">{stats?.sold_accounts || 0}</h3>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl mb-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-indigo-400" /> Revenue Timeline (Last 6 Months)
                </h2>
                <div className="h-[300px] w-full">
                    {stats?.revenue_chart && stats.revenue_chart.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.revenue_chart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="total" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-2xl">
                            Not enough data to generate chart yet.
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Packages Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                            <PkgIcon className="w-6 h-6 mr-2 text-indigo-400" /> Package Configurations
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-800 text-sm">
                            <thead className="bg-gray-800/50 text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 text-left">Plan</th>
                                    <th className="px-4 py-3 text-left">Price</th>
                                    <th className="px-4 py-3 text-left">Duration</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 text-gray-300">
                                {packages.map(pkg => (
                                    <tr key={pkg.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-white">{pkg.name}</td>
                                        <td className="px-4 py-3">${pkg.price}</td>
                                        <td className="px-4 py-3">{pkg.duration_days}d</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${pkg.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {pkg.is_active ? 'Active' : 'Offline'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <Receipt className="w-6 h-6 mr-2 text-purple-400" /> Global Order Feed
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-800 text-sm">
                            <thead className="bg-gray-800/50 text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 text-left">User</th>
                                    <th className="px-4 py-3 text-left">Package</th>
                                    <th className="px-4 py-3 text-left">Amount</th>
                                    <th className="px-4 py-3 text-left">Gateway</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 text-gray-300">
                                {orders.slice(0, 8).map(order => (
                                    <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-4 py-3">{order.user?.name || `User #${order.user_id}`}</td>
                                        <td className="px-4 py-3">{order.package?.name}</td>
                                        <td className="px-4 py-3 font-bold text-white">${order.amount}</td>
                                        <td className="px-4 py-3 uppercase text-xs text-gray-400">{order.payment_method}</td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan="4" className="px-4 py-4 text-center text-gray-500">No orders placed yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
