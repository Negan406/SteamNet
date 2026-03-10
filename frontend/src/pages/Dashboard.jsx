import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import {
    Tv, Receipt, Clock, CheckCircle, Copy, Lock, Server,
    Link as LinkIcon, Activity, TrendingUp, Users, Package as PkgIcon,
    Database, DollarSign, Settings
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
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

export default function Dashboard() {
    const { user, fetchUser } = useContext(AuthContext);
    const { showToast } = useToast();
    const [subscriptions, setSubscriptions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [adminStats, setAdminStats] = useState(null);
    const [adminPackages, setAdminPackages] = useState([]);
    const [adminOrders, setAdminOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard!`, 'success');
    };

    const fetchData = useCallback(async () => {
        if (!user || !localStorage.getItem('token')) return;

        try {
            const promises = [
                api.get('/subscriptions'),
                api.get('/orders')
            ];

            if (user.role === 'admin') {
                promises.push(api.get('/admin/stats'));
                promises.push(api.get('/admin/packages'));
                promises.push(api.get('/admin/orders'));
            }

            const results = await Promise.all(promises);

            setSubscriptions(results[0].data);
            setOrders(results[1].data);

            if (user.role === 'admin' && results.length >= 5) {
                setAdminStats(results[2].data);
                setAdminPackages(results[3].data);
                setAdminOrders(results[4].data);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
            // Only show toast if user is still logged in to avoid error on logout
            if (localStorage.getItem('token')) {
                showToast('Failed to load dashboard statistics.', 'error');
            }
        } finally {
            setLoading(false);
        }
    }, [user, showToast]);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, fetchData]);

    if (loading) return <Loader text="Synchronizing Intelligence..." />;

    const isAdmin = user?.role === 'admin';
    const pieData = adminStats?.category_distribution?.map(item => ({
        name: `${item.category} (${item.status})`,
        value: item.count
    })) || [];

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center">
                        Welcome back, <span className="text-indigo-400 ml-3">{user?.name}</span>
                        {isAdmin && <span className="ml-4 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs rounded-full uppercase tracking-widest font-bold">Systems Admin</span>}
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg font-light max-w-2xl">
                        {isAdmin
                            ? "Your global business intelligence hub. Monitor revenue, growth, and infrastructure in real-time."
                            : "Manage your premium subscriptions and access your secure IPTV credentials below."}
                    </p>
                </div>
                {isAdmin && (
                    <div className="flex gap-3">
                        <a href="/admin/iptv" className="px-5 py-2.5 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all flex items-center shadow-lg text-sm font-semibold">
                            <Database className="w-4 h-4 mr-2 text-indigo-400" /> Inventory
                        </a>
                        <a href="/admin/subscriptions" className="px-5 py-2.5 bg-gray-900 border border-gray-800 text-gray-300 hover:text-white rounded-xl transition-all flex items-center shadow-lg text-sm font-semibold">
                            <Receipt className="w-4 h-4 mr-2 text-purple-400" /> Sales Feed
                        </a>
                    </div>
                )}
            </div>

            {isAdmin && (
                <div className="space-y-12 mb-16">
                    {/* Admin KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { label: 'Total Revenue', value: `$${Number(adminStats?.total_revenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
                            { label: 'Total Users', value: adminStats?.total_users || 0, icon: Users, color: 'text-blue-500' },
                            { label: 'Active Subs', value: adminStats?.active_subscriptions || 0, icon: Activity, color: 'text-purple-500' },
                            { label: 'Stock Levels', value: adminStats?.available_accounts || 0, icon: Database, color: 'text-indigo-500' },
                            { label: 'Accounts Sold', value: adminStats?.sold_accounts || 0, icon: Server, color: 'text-red-500' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group backdrop-blur-sm">
                                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${item.color}`}>
                                    <item.icon className="w-16 h-16" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-gray-500 font-bold mb-1 text-[10px] uppercase tracking-widest">{item.label}</p>
                                    <h3 className="text-2xl font-bold text-white">{item.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Admin Charts Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="text-lg font-semibold text-white mb-8 flex items-center justify-between">
                                <span className="flex items-center"><TrendingUp className="w-5 h-5 mr-3 text-indigo-400" /> Performance Analysis</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">6 Month Outlook</span>
                            </h2>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={adminStats?.revenue_chart}>
                                        <defs>
                                            <linearGradient id="colorRevDash" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                        <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevDash)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="text-lg font-semibold text-white mb-8 flex items-center justify-between">
                                <span className="flex items-center"><Receipt className="w-5 h-5 mr-3 text-purple-400" /> Sales Dynamics</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Monthly Units</span>
                            </h2>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={adminStats?.sales_chart}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                        <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <Tooltip content={<CustomTooltip prefix="" />} />
                                        <Bar dataKey="sales" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Admin Charts Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="text-lg font-semibold text-white mb-8 flex items-center justify-between">
                                <span className="flex items-center"><Users className="w-5 h-5 mr-3 text-blue-400" /> Customer Growth</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">New Registrations</span>
                            </h2>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={adminStats?.user_growth_chart}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                        <XAxis dataKey="name" stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#4b5563" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <Tooltip content={<CustomTooltip prefix="" />} />
                                        <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 shadow-xl backdrop-blur-sm">
                            <h2 className="text-lg font-semibold text-white mb-8 flex items-center justify-between">
                                <span className="flex items-center"><Database className="w-5 h-5 mr-3 text-green-400" /> Infrastructure Health</span>
                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Stock Allocation</span>
                            </h2>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} innerRadius={60} outerRadius={100} paddingAngle={8} dataKey="value">
                                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Admin Global Feed */}
                    <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 shadow-xl backdrop-blur-sm self-stretch max-w-3xl">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <PkgIcon className="w-5 h-5 mr-3 text-indigo-400" /> Global Order Feed
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-800 text-xs text-left">
                                <thead className="bg-gray-800/30">
                                    <tr>
                                        <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest">Client</th>
                                        <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest">Plan</th>
                                        <th className="px-4 py-3 font-bold text-gray-500 uppercase tracking-widest">Rev</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {adminOrders.slice(0, 5).map(order => (
                                        <tr key={order.id} className="hover:bg-gray-800/20 transition-colors">
                                            <td className="px-4 py-3 text-gray-300 font-medium">{order.user?.name || `ID:${order.user_id}`}</td>
                                            <td className="px-4 py-3 text-gray-400">{order.package?.name}</td>
                                            <td className="px-4 py-3 font-bold text-white">${order.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Subscriptions */}
                <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm self-start shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center">
                        <Tv className="w-6 h-6 mr-3 text-indigo-400" />
                        {isAdmin ? "Admin Test Subscriptions" : "Active Subscriptions"}
                    </h2>
                    {subscriptions.length === 0 ? (
                        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 text-center">
                            <p className="text-gray-400">No active subscriptions found for this account.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {subscriptions.map(sub => (
                                <div key={sub.id} className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-2xl p-6 border border-indigo-500/20 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${sub.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                            {sub.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{sub.package?.name || 'Unknown Package'}</h3>
                                    <p className="text-gray-400 text-xs mb-6 flex items-center font-medium">
                                        <Clock className="w-3.5 h-3.5 mr-2 text-indigo-400" /> EXPIRES: {new Date(sub.end_date).toLocaleDateString()}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-black/40 rounded-xl p-4 border border-gray-800/50">
                                            <span className="block text-[10px] text-gray-600 uppercase tracking-widest font-black mb-1">PROVISIONED</span>
                                            <span className="text-white font-bold text-xs">{new Date(sub.start_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="bg-black/40 rounded-xl p-4 border border-gray-800/50">
                                            <span className="block text-[10px] text-gray-600 uppercase tracking-widest font-black mb-1">REMAINING</span>
                                            <span className="text-indigo-400 font-black text-xs">
                                                {Math.max(0, Math.ceil((new Date(sub.end_date) - new Date()) / (1000 * 60 * 60 * 24)))} DAYS
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Orders */}
                <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 backdrop-blur-sm self-start shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center">
                        <Receipt className="w-6 h-6 mr-3 text-purple-400" />
                        {isAdmin ? "Account Billing Logs" : "Order History"}
                    </h2>
                    {orders.length === 0 ? (
                        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 text-center">
                            <p className="text-gray-400">No transaction records found.</p>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-gray-800/50 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-800">
                                <thead className="bg-gray-800/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">ID</th>
                                        <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">PLAN</th>
                                        <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">VALUE</th>
                                        <th scope="col" className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">RESULT</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800 bg-black/20">
                                    {orders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-800/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500 group-hover:text-gray-300">#{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-300 group-hover:text-white font-bold">{order.package?.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-white font-black group-hover:text-indigo-400 transition-colors">${order.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-bold">
                                                {order.status === 'completed' ? (
                                                    <span className="text-green-500/80 flex items-center uppercase tracking-tighter"><CheckCircle className="w-3 h-3 mr-1" /> OK</span>
                                                ) : (
                                                    <span className="text-yellow-500/80 flex items-center uppercase tracking-tighter"><Clock className="w-3 h-3 mr-1" /> WAIT</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* IPTV Credentials */}
                <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                        <Lock className="w-64 h-64 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-8 flex items-center relative z-10">
                        <Lock className="w-6 h-6 mr-3 text-indigo-400" /> Provisioned Access Keys
                    </h2>
                    {user?.iptv_accounts && user.iptv_accounts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                            {user.iptv_accounts.filter(acc => acc.status === 'sold').map(account => {
                                const m3uUrl = `${account.server_url}/get.php?username=${account.username}&password=${account.password}&type=m3u_plus&output=ts`;
                                return (
                                    <div key={account.id} className="bg-black/40 rounded-3xl border border-gray-700/50 p-6 flex flex-col space-y-6 hover:border-indigo-500/30 transition-all duration-500 group relative">
                                        <div className="flex items-center justify-between border-b border-gray-700/50 pb-4">
                                            <span className="text-white font-black flex items-center text-[10px] uppercase tracking-widest">
                                                <Server className="w-4 h-4 mr-2 text-indigo-400" /> XTREAM ENGINE
                                            </span>
                                        </div>
                                        <div className="space-y-5">
                                            {[
                                                { label: 'HOST ENDPOINT', val: account.server_url },
                                                { label: 'ID ENTITY', val: account.username },
                                                { label: 'SECRET KEY', val: account.password }
                                            ].map((field, i) => (
                                                <div key={i}>
                                                    <span className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em]">{field.label}</span>
                                                    <div className="flex justify-between items-center bg-black/60 border border-gray-800 rounded-xl px-4 py-3 mt-1.5 group/field hover:border-indigo-500/30 transition-all duration-300 shadow-inner">
                                                        <span className="text-xs font-mono text-gray-400 truncate pr-2 group-hover/field:text-gray-200">{field.val}</span>
                                                        <button
                                                            onClick={() => handleCopy(field.val, field.label)}
                                                            className="text-gray-600 hover:text-indigo-400 transition-all transform hover:scale-125 active:scale-90"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-gray-700/50 pt-6 mt-4">
                                            <span className="text-white font-black flex items-center mb-4 text-[10px] uppercase tracking-widest">
                                                <LinkIcon className="w-4 h-4 mr-2 text-purple-400" /> RAW M3U PLAYLIST
                                            </span>
                                            <div className="flex justify-between items-center bg-indigo-500/5 border border-indigo-500/10 rounded-xl px-4 py-3.5 hover:bg-indigo-500/10 transition-all duration-300 group/m3u cursor-default">
                                                <span className="text-[10px] font-mono text-indigo-300/60 truncate italic">{m3uUrl}</span>
                                                <button
                                                    onClick={() => handleCopy(m3uUrl, 'M3U Link')}
                                                    className="text-indigo-500/40 hover:text-indigo-400 transition-all ml-4 shrink-0 transform hover:scale-125 active:scale-90"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-gray-800/30 rounded-2xl p-16 border border-gray-700/50 text-center relative z-10">
                            <Activity className="w-16 h-16 text-gray-700 mx-auto mb-6 animate-pulse" />
                            <h3 className="text-white font-bold mb-2">No Active Keys Detected</h3>
                            <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed font-medium">Provisioning requires an active premium subscription. Please upgrade your tier in the packages section to unlock access.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
