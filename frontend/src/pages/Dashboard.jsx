import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Tv, Receipt, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [subscriptions, setSubscriptions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const subRes = await api.get('/subscriptions');
                const ordRes = await api.get('/orders');
                setSubscriptions(subRes.data);
                setOrders(ordRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader text="Loading your dashboard..." />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
                <p className="text-gray-400 mt-2">Manage your subscriptions and view order history below.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Subscriptions */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <Tv className="w-6 h-6 mr-2 text-indigo-400" /> Active Subscriptions
                    </h2>
                    {subscriptions.length === 0 ? (
                        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 text-center">
                            <p className="text-gray-400">You don't have any active subscriptions yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {subscriptions.map(sub => (
                                <div key={sub.id} className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sub.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {sub.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1">{sub.package?.name || 'Unknown Package'}</h3>
                                    <p className="text-gray-400 text-sm mb-4">Valid until: {new Date(sub.end_date).toLocaleDateString()}</p>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="bg-black/30 p-3 rounded-lg text-center">
                                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Start Date</span>
                                            <span className="text-white font-medium">{new Date(sub.start_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="bg-black/30 p-3 rounded-lg text-center">
                                            <span className="block text-xs text-gray-400 uppercase tracking-wider">Days Left</span>
                                            <span className="text-white font-medium">
                                                {Math.max(0, Math.ceil((new Date(sub.end_date) - new Date()) / (1000 * 60 * 60 * 24)))}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Orders */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <Receipt className="w-6 h-6 mr-2 text-purple-400" /> Order History
                    </h2>
                    {orders.length === 0 ? (
                        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 text-center">
                            <p className="text-gray-400">No previous orders found.</p>
                        </div>
                    ) : (
                        <div className="bg-gray-900/40 rounded-2xl border border-gray-800 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-800">
                                <thead className="bg-gray-800/50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Package</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {orders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-800/20 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">#{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.package?.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">${order.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {order.status === 'completed' ? (
                                                    <span className="text-green-400 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Completed</span>
                                                ) : (
                                                    <span className="text-yellow-400 flex items-center"><Clock className="w-4 h-4 mr-1" /> Pending</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
