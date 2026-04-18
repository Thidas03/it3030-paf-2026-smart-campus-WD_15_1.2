import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    MdNotifications, 
    MdNotificationsNone, 
    MdConfirmationNumber,
    MdBusiness,
    MdInfo
} from 'react-icons/md';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cached = localStorage.getItem('cachedAdminNotifications');
        if (cached) setNotifications(JSON.parse(cached));
        fetchAdminNotifications();
    }, []);

    const fetchAdminNotifications = async () => {
        try {
            const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
            const response = await axios.get('/api/notifications/admin/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data || []);
            localStorage.setItem('cachedAdminNotifications', JSON.stringify(response.data || []));
        } catch (error) {
            console.error("Error fetching admin notifications", error);
            const cached = localStorage.getItem('cachedAdminNotifications');
            if (cached) setNotifications(JSON.parse(cached));
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (type) => {
        switch (type?.toUpperCase()) {
            case 'RESOURCE': return <MdBusiness className="text-emerald-400" size={24} />;
            case 'TICKET': return <MdConfirmationNumber className="text-amber-400" size={24} />;
            default: return <MdInfo className="text-blue-400" size={24} />;
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] p-6 md:p-8">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                        <MdNotifications size={28} className="text-primary-300" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">System Events Log</h1>
                        <p className="text-dark-muted mt-1 text-sm">Monitor all critical triggers and actions across the Smart Campus.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="bg-dark-bg border border-white/10 px-4 py-2 rounded-lg text-sm text-slate-300 shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
                        Live Capture
                    </span>
                    <button onClick={fetchAdminNotifications} className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 font-semibold shadow-lg glow-primary">
                        Refresh Sync
                    </button>
                </div>
            </div>

            <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-full blur-[60px] pointer-events-none"></div>

                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                    <h2 className="text-lg font-semibold text-white">Event Streams</h2>
                    <span className="text-xs font-semibold px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30">
                        {loading ? '...' : notifications.length} Global Logs
                    </span>
                </div>

                <div className="relative z-10 p-2 md:p-6 min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p>Syncing Global Activity...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="bg-white/5 p-6 rounded-full mb-4 border border-white/10">
                                <MdNotificationsNone size={48} className="text-slate-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">No Events Triggered</h3>
                            <p className="text-slate-400 text-sm">System event logs will stream here continuously.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className="bg-dark-bg/40 border border-white/5 hover:border-white/20 p-5 rounded-xl transition-all duration-300 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/5 shadow-sm group"
                                >
                                    <div className="flex-shrink-0 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:border-primary-500/30 transition-colors">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                            <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${
                                                notification.type === 'RESOURCE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                                notification.type === 'TICKET' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                                'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                            }`}>
                                                {notification.type || 'SYSTEM'}
                                            </span>
                                            <span className="text-xs font-mono text-slate-500 flex items-center gap-1 group-hover:text-primary-300 transition-colors">
                                                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                                                <span className="mx-1">•</span>
                                                <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
                                            </span>
                                        </div>
                                        <h3 className="text-slate-200 font-semibold text-sm leading-relaxed mt-1">
                                            {notification.message}
                                        </h3>
                                        {notification.relatedId && (
                                            <div className="mt-3">
                                                 <span className="text-[10px] text-slate-500 border border-slate-700 bg-slate-800/50 px-2 py-1 rounded">
                                                     Trace ID: {notification.relatedId}
                                                 </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminNotifications;
