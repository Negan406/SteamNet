import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Pencil, Trash2 } from 'lucide-react';

export default function PackageCard({ pkg, isPopular = false, isAdmin = false, onEdit, onDelete }) {
    return (
        <div className={`relative flex flex-col p-8 bg-gray-900/50 backdrop-blur-md border rounded-3xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl ${isPopular ? 'border-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.15)]' : 'border-gray-800'}`}>
            {isAdmin && (
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                    <button onClick={() => onEdit(pkg)} className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-colors shadow-lg">
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(pkg.id)} className="p-2 bg-red-600 hover:bg-red-500 rounded-full text-white transition-colors shadow-lg">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide flex items-center space-x-1">
                        <Zap className="w-4 h-4" />
                        <span>Most Popular</span>
                    </span>
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400">{pkg.description}</p>
            </div>

            <div className="text-center mb-8">
                <span className="text-5xl font-extrabold text-white">${pkg.price}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <span>{pkg.duration_days} Days Access</span>
                </li>
                <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <span>20,000+ Live Channels</span>
                </li>
                <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <span>VOD (Movies & Series)</span>
                </li>
                <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <span>4K & FHD Quality</span>
                </li>
                <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <span>Anti-Freeze Technology</span>
                </li>
            </ul>

            <Link
                to={`/checkout/${pkg.id}`}
                className={`w-full py-4 rounded-xl font-bold text-lg text-center transition-all duration-300 ${isPopular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
            >
                Get Started
            </Link>
        </div>
    );
}
