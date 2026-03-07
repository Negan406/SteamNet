import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ text = "Loading..." }) {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-900 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-indigo-400 font-medium animate-pulse">{text}</p>
        </div>
    );
}
