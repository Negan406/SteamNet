import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PackageCard from '../components/PackageCard';
import Loader from '../components/Loader';

export default function Packages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get('/packages');
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (loading) return <Loader text="Loading amazing plans..." />;

    return (
        <div className="py-20 relative">
            <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[150px] -z-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Choose Your Perfect Plan</h2>
                    <p className="text-xl text-gray-400">All plans include complete access to our global network, 4K quality, and VOD library.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {packages.map((pkg, index) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            isPopular={index === 1 || pkg.name.toLowerCase().includes('pro')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
