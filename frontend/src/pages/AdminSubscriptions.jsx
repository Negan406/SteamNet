import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Users, Receipt, Tv, ArrowLeft, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';

export default function AdminSubscriptions() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/admin/orders');
            setOrders(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader text="Loading Data..." />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <a href="/admin/panel" className="text-gray-400 hover:text-white flex items-center mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </a>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Receipt className="w-10 h-10 mr-4 text-purple-500" /> Subscriptions & Payments
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Detailed view of all user transactions.</p>
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
                                <th className="px-4 py-3 text-left">Assigned IPTV</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-gray-300">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs">#{order.id}</td>
                                    <td className="px-4 py-3 font-medium text-white">{order.user?.name || `User ID ${order.user_id}`}</td>
                                    <td className="px-4 py-3">{order.package?.name || '-'}</td>
                                    <td className="px-4 py-3 font-bold text-green-400">${order.amount}</td>
                                    <td className="px-4 py-3 uppercase text-xs text-gray-500">{order.payment_method}</td>
                                    <td className="px-4 py-3">
                                        {order.status === 'completed' ? (
                                            <span className="text-green-400 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Paid</span>
                                        ) : order.status === 'failed' ? (
                                            <span className="text-red-400 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Failed</span>
                                        ) : (
                                            <span className="text-yellow-400 flex items-center"><Clock className="w-4 h-4 mr-1" /> Pending</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-xs font-mono text-gray-400">
                                        {/* Future improvement: Show linked IPTV credentials */}
                                        <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">View Dashboard Logs</span>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-500">No transactions recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
