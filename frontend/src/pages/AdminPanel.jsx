import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Settings, Users, Package as PkgIcon, Receipt, TrendingUp, Activity, DollarSign, Database, Server } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { useToast } from '../context/ToastContext';

// Colors for Pie Chart
const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f97316', '#eab308', '#22c55e'];

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label, prefix = '$' }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-xl">
                <p className="text-gray-300 mb-1">{label}</p>
                <p className="text-indigo-400 font-bold text-lg">
                    {prefix}{Number(payload[0].value).toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

export default function AdminPanel() {
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();
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
            }).catch(err => {
                console.error(err);
                showToast('Failed to load admin metrics.', 'error');
            }).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, showToast]);

    if (loading) return <Loader text="Loading metrics..." />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    // Prepare Category Distribution Data for Pie Chart
    const pieData = stats?.category_distribution?.map(item => ({
        name: `${item.category} (${item.status})`,
        value: item.count
    })) || [];

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Settings className="w-10 h-10 mr-4 text-indigo-500" /> Executive Analytics
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Real-time business performance and resource tracking.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <a href="/admin/iptv" className="px-5 py-2.5 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-xl transition-all font-semibold flex items-center shadow-lg">
                        <Database className="w-4 h-4 mr-2" /> IPTV Inventory
                    </a>
                    <a href="/admin/subscriptions" className="px-5 py-2.5 bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 border border-purple-500/20 rounded-xl transition-all font-semibold flex items-center shadow-lg">
                        <Receipt className="w-4 h-4 mr-2" /> Subscriptions
                    </a>
                    <div className="px-5 py-2.5 bg-gray-800/50 text-gray-500 border border-gray-700 rounded-xl font-semibold flex items-center cursor-not-allowed opacity-60">
                        <Users className="w-4 h-4 mr-2" /> User Manager
                    </div>
                </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                {[
                    { label: 'Total Revenue', value: `$${Number(stats?.total_revenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { label: 'Total Users', value: stats?.total_users || 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Active Subs', value: stats?.active_subscriptions || 0, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Stock (Stock)', value: stats?.available_accounts || 0, icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    { label: 'Sold Today', value: stats?.sold_accounts || 0, icon: Server, color: 'text-red-500', bg: 'bg-red-500/10' },
                ].map((item, idx) => (
                    <div key={idx} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${item.color}`}>
                            <item.icon className="w-16 h-16" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-gray-400 font-medium mb-1 text-sm">{item.label}</p>
                            <h3 className="text-2xl font-bold text-white">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Revenue & User Growth Chart */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center justify-between">
                        <span className="flex items-center"><TrendingUp className="w-6 h-6 mr-3 text-indigo-400" /> Revenue vs User Growth</span>
                        <span className="text-xs text-gray-500 font-normal">Last 6 Months</span>
                    </h2>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.revenue_chart} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Volume (Bar Chart) */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center justify-between">
                        <span className="flex items-center"><Receipt className="w-6 h-6 mr-3 text-purple-400" /> Sales Volume</span>
                        <span className="text-xs text-gray-500 font-normal">Monthly Conversions</span>
                    </h2>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.sales_chart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip prefix="" />} />
                                <Bar dataKey="sales" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Account Status Distribution (Pie Chart) */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center justify-between">
                        <span className="flex items-center"><Database className="w-6 h-6 mr-3 text-green-400" /> Inventory Status</span>
                        <span className="text-xs text-gray-500 font-normal">ByCategory Breakdown</span>
                    </h2>
                    <div className="h-[350px] w-full flex flex-col md:flex-row items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Registrations Chart */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center justify-between">
                        <span className="flex items-center"><Users className="w-6 h-6 mr-3 text-blue-400" /> New Registrations</span>
                        <span className="text-xs text-gray-500 font-normal">Customer Growth</span>
                    </h2>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.user_growth_chart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip prefix="" />} />
                                <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
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
