import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Settings, Users, Package as PkgIcon, Receipt } from 'lucide-react';

export default function AdminPanel() {
    const { user } = useContext(AuthContext);
    const [packages, setPackages] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'admin') {
            Promise.all([
                api.get('/admin/packages'),
                api.get('/admin/orders')
            ]).then(([pkgRes, ordRes]) => {
                setPackages(pkgRes.data);
                setOrders(ordRes.data);
            }).catch(console.error).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <Loader />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        <Settings className="w-8 h-8 mr-3 text-indigo-500" /> Admin Dashboard
                    </h1>
                    <p className="text-gray-400 mt-2">Manage all system parameters, users, and orders.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Packages Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
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
                                        <td className="px-4 py-3"><span className="text-green-400">{pkg.is_active ? 'Active' : 'Offline'}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <Receipt className="w-6 h-6 mr-2 text-purple-400" /> Global Order Feed
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-800 text-sm">
                            <thead className="bg-gray-800/50 text-gray-400">
                                <tr>
                                    <th className="px-4 py-3 text-left">User</th>
                                    <th className="px-4 py-3 text-left">Package</th>
                                    <th className="px-4 py-3 text-left">Gateway</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 text-gray-300">
                                {orders.slice(0, 8).map(order => (
                                    <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-4 py-3">{order.user?.name || `User #${order.user_id}`}</td>
                                        <td className="px-4 py-3">{order.package?.name}</td>
                                        <td className="px-4 py-3 uppercase text-xs">{order.payment_method}</td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr><td colSpan="3" className="px-4 py-4 text-center text-gray-500">No orders placed yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
