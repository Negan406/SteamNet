import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import PackageCard from '../components/PackageCard';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { Plus, X } from 'lucide-react';

export default function Packages() {
    const { user } = useContext(AuthContext);
    const isAdmin = user && user.role === 'admin';

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentPkg, setCurrentPkg] = useState({ name: '', description: '', price: '', duration_days: '', is_active: true });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                // Since this page is public, we fetch from public endpoint
                // Admin might fetch from /admin/packages to also see inactive ones, but for now /packages is fine
                const endpoint = isAdmin ? '/admin/packages' : '/packages';
                const response = await api.get(endpoint);
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [isAdmin]);

    const handleAdd = () => {
        setModalMode('add');
        setCurrentPkg({ name: '', description: '', price: '', duration_days: '', is_active: true });
        setIsModalOpen(true);
    };

    const handleEdit = (pkg) => {
        setModalMode('edit');
        setCurrentPkg(pkg);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return;
        try {
            await api.delete(`/admin/packages/${id}`);
            setPackages(packages.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting package', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalMode === 'add') {
                const response = await api.post('/admin/packages', currentPkg);
                setPackages([...packages, response.data]);
            } else {
                const response = await api.put(`/admin/packages/${currentPkg.id}`, currentPkg);
                setPackages(packages.map(p => p.id === currentPkg.id ? response.data : p));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving package', error);
            alert('An error occurred. Make sure all fields are valid.');
        }
    };

    if (loading) return <Loader text="Loading amazing plans..." />;

    return (
        <div className="py-20 relative">
            <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {isAdmin && (
                    <div className="absolute top-0 right-4 sm:right-6 lg:right-8">
                        <button onClick={handleAdd} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-colors font-semibold shadow-lg shadow-indigo-500/30">
                            <Plus className="w-5 h-5" />
                            <span>Add Package</span>
                        </button>
                    </div>
                )}
                <div className="text-center max-w-3xl mx-auto mb-16 pt-12 sm:pt-0">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Choose Your Perfect Plan</h2>
                    <p className="text-xl text-gray-400">All plans include complete access to our global network, 4K quality, and VOD library.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {packages.map((pkg, index) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            isPopular={index === 1 || pkg.name.toLowerCase().includes('pro')}
                            isAdmin={isAdmin}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <h3 className="text-2xl font-bold text-white mb-6">
                            {modalMode === 'add' ? 'Add Package' : 'Edit Package'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentPkg.name}
                                    onChange={(e) => setCurrentPkg({ ...currentPkg, name: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="e.g. Basic Plan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={currentPkg.description || ''}
                                    onChange={(e) => setCurrentPkg({ ...currentPkg, description: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="Brief description..."
                                    rows="3"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={currentPkg.price}
                                        onChange={(e) => setCurrentPkg({ ...currentPkg, price: e.target.value })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Duration (Days)</label>
                                    <input
                                        type="number"
                                        required
                                        value={currentPkg.duration_days}
                                        onChange={(e) => setCurrentPkg({ ...currentPkg, duration_days: e.target.value })}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        placeholder="30"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 pt-2">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={currentPkg.is_active}
                                            onChange={(e) => setCurrentPkg({ ...currentPkg, is_active: e.target.checked })}
                                        />
                                        <div className={`block w-10 h-6 rounded-full transition-colors ${currentPkg.is_active ? 'bg-indigo-600' : 'bg-gray-700'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${currentPkg.is_active ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-gray-300">Active</span>
                                </label>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-indigo-500/30">
                                    {modalMode === 'add' ? 'Create Package' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
