import React, { useState } from 'react';
import { Tv, Smartphone, MonitorPlay, ChevronDown, ChevronUp } from 'lucide-react';

const guides = [
    {
        id: 'smart-tv',
        title: 'Smart TV (Samsung/LG)',
        icon: <Tv className="w-6 h-6 text-indigo-400" />,
        content: `
1. Go to your TV's App Store and search for 'IPTV Smarters Pro' or 'IBO Player'.
2. Download and install the app.
3. Open the app and select 'Login with Xtream Codes API'.
4. Enter any name in the first box.
5. In the remaining boxes, enter the Username, Password, and Server URL provided in your Dashboard.
6. Click 'Add User' and enjoy!
        `
    },
    {
        id: 'android',
        title: 'Android TV & Firestick',
        icon: <MonitorPlay className="w-6 h-6 text-indigo-400" />,
        content: `
1. Go to the Google Play Store (or use Downloader app on Firestick).
2. Search for 'TiviMate' or 'IPTV Smarters Pro'.
3. Download and install the app.
4. Select 'Add Playlist' -> 'Xtream Codes'.
5. Enter the Server URL, Username, and Password from your Dashboard.
6. Check 'Include VOD' if available, and save.
        `
    },
    {
        id: 'mobile',
        title: 'Smartphones (iOS / Android)',
        icon: <Smartphone className="w-6 h-6 text-indigo-400" />,
        content: `
1. Open the App Store or Google Play Store.
2. Search for 'IPTV Smarters Pro' or 'GSE Smart IPTV'.
3. Download and open the app.
4. Accept the Terms and Conditions.
5. Choose 'Login with Xtream Codes API'.
6. Enter the credentials from your dashboard and log in.
        `
    }
];

export default function SetupGuide() {
    const [openGuide, setOpenGuide] = useState('smart-tv');

    return (
        <div className="py-20 relative min-h-screen">
            <div className="absolute top-0 right-1/4 w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[150px] -z-10 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Device Setup Guides</h2>
                    <p className="text-xl text-gray-400">Follow these simple steps to start streaming on your favorite device.</p>
                </div>

                <div className="space-y-4">
                    {guides.map((guide) => (
                        <div key={guide.id} className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setOpenGuide(openGuide === guide.id ? null : guide.id)}
                                className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-800 rounded-xl">
                                        {guide.icon}
                                    </div>
                                    <span className="text-xl font-bold text-white">{guide.title}</span>
                                </div>
                                {openGuide === guide.id ? (
                                    <ChevronUp className="w-6 h-6 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-400" />
                                )}
                            </button>

                            {openGuide === guide.id && (
                                <div className="px-6 pb-6 pt-2 text-gray-300 whitespace-pre-line leading-relaxed">
                                    {guide.content.trim()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
