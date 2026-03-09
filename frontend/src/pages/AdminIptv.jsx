import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { Server, Plus, Upload, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminIptv() {
    const { user } = useContext(AuthContext);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [importLoading, setImportLoading] = useState(false);
    const [file, setFile] = useState(null);

    // New Account Form
    const [newAccount, setNewAccount] = useState({ username: '', password: '', server_url: '', category: 'Basic' });

    const fetchAccounts = async () => {
        try {
            const res = await api.get('/admin/iptv-accounts');
            setAccounts(res.data);
        } catch (error) {
            console.error(error);
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
            await api.post('/admin/iptv-accounts', newAccount);
            setNewAccount({ username: '', password: '', server_url: '', category: 'Basic' });
            fetchAccounts();
        } catch (error) {
            alert('Failed to add account. Ensure fields are unique/correct.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this account?')) return;
        try {
            await api.delete(`/admin/iptv-accounts/${id}`);
            fetchAccounts();
        } catch (error) {
            alert('Failed to delete account.');
        }
    };

    const handleImport = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('csv_file', file);

        setImportLoading(true);
        try {
            const res = await api.post('/admin/iptv-accounts/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(`Import successful: ${res.data.imported} accounts added.`);
            setFile(null);
            fetchAccounts();
        } catch (error) {
            alert('Import failed. Please check the CSV format.');
        } finally {
            setImportLoading(false);
        }
    };

    if (loading) return <Loader text="Loading IPTV Accounts..." />;
    if (!user || user.role !== 'admin') return <Navigate to="/" />;

    return (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white flex items-center">
                        <Server className="w-10 h-10 mr-4 text-indigo-500" /> IPTV Accounts Management
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">Manage, import, and review server credentials.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Single Account Addition */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl lg:col-span-2">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <Plus className="w-6 h-6 mr-2 text-green-400" /> Add Single Account
                    </h2>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            required
                            placeholder="Server URL"
                            value={newAccount.server_url}
                            onChange={(e) => setNewAccount({ ...newAccount, server_url: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            value={newAccount.username}
                            onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Password"
                            value={newAccount.password}
                            onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex gap-2">
                            <select
                                value={newAccount.category}
                                onChange={(e) => setNewAccount({ ...newAccount, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                            >
                                <option value="Basic">Basic</option>
                                <option value="Premium">Premium</option>
                                <option value="VIP">VIP</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center font-bold px-6"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>

                {/* CSV Import */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <Upload className="w-6 h-6 mr-2 text-blue-400" /> Bulk CSV Import
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 font-mono">Format: username,password,url,category</p>
                    <form onSubmit={handleImport} className="flex flex-col gap-4">
                        <input
                            type="file"
                            accept=".csv"
                            required
                            onChange={(e) => setFile(e.target.files[0])}
                            className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 w-full"
                        />
                        <button
                            type="submit"
                            disabled={!file || importLoading}
                            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-2 rounded-xl transition-colors font-bold flex justify-center items-center"
                        >
                            {importLoading ? 'Uploading...' : 'Import Accounts'}
                        </button>
                    </form>
                </div>
            </div>

            {/* List of Accounts */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800 text-sm">
                        <thead className="bg-gray-800/50 text-gray-400">
                            <tr>
                                <th className="px-4 py-3 text-left">Server URL</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Username</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Assigned User</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-gray-300">
                            {accounts.map(acc => (
                                <tr key={acc.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-4 py-3 font-mono text-xs">{acc.server_url}</td>
                                    <td className="px-4 py-3 text-xs">
                                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded inline-block">{acc.category || 'Basic'}</span>
                                    </td>
                                    <td className="px-4 py-3 font-mono text-xs">{acc.username}</td>
                                    <td className="px-4 py-3">
                                        {acc.status === 'available' ? (
                                            <span className="text-green-400 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Available</span>
                                        ) : (
                                            <span className="text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Sold</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{acc.user ? acc.user.name : '-'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => handleDelete(acc.id)}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-5 h-5 inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {accounts.length === 0 && (
                                <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-500">No accounts in the system.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
