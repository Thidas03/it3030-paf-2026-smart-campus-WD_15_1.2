import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { 
    MdNotifications, 
    MdNotificationsNone, 
    MdCheckCircle, 
    MdInfo, 
    MdWarning,
    MdEmail,
    MdPhone,
    MdPublic,
    MdPersonOutline,
    MdCalendarToday,
    MdConfirmationNumber,
    MdChatBubble
} from 'react-icons/md';

import { useNotifications } from '../context/NotificationContext.jsx';

const NotificationPage = () => {
    const { user, logout, hasRole } = useAuth();
    const { refreshUnreadCount } = useNotifications();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8081/api/notifications', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8081/api/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
            refreshUnreadCount();
        } catch (error) {
            console.error("Error marking as read", error);
        }
    };

    const markAllRead = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8081/api/notifications/read-all`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            refreshUnreadCount();
        } catch (error) {
            console.error("Error marking all as read", error);
        }
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    const getIcon = (type) => {
        switch (type) {
            case 'BOOKING': return <MdCalendarToday className="text-blue-500" size={24} />;
            case 'TICKET': return <MdConfirmationNumber className="text-orange-500" size={24} />;
            case 'COMMENT': return <MdChatBubble className="text-green-500" size={24} />;
            default: return <MdInfo className="text-blue-500" size={24} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            <span className="block font-bold text-[#002B5C] text-lg leading-tight uppercase tracking-wider font-serif">SLIIT</span>
                            <span className="block font-bold text-[#002B5C] text-xs leading-tight uppercase font-sans">Faculty of Computing</span>
                        </div>
                    </div>
                </div>
                
                {/* Center Links */}
                <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
                    <Link to="/" className="text-gray-700 hover:text-[#004282] transition">Home</Link>
                    <Link to="/manage-resources" className="text-gray-700 hover:text-[#004282] transition">Facilities & Assets</Link>
                    <Link to="/my-bookings" className="text-gray-700 hover:text-[#004282] transition">Bookings</Link>
                    <Link to={hasRole('TECHNICIAN') ? "/technician/tickets" : "/all-tickets"} className="text-gray-700 hover:text-[#004282] transition">Ticketing</Link>
                    <Link to="/notifications" className="text-[#004282] border-b-2 border-[#004282] pb-1 -mb-1 flex items-center transition">
                        <MdNotificationsNone size={20} className="mr-1" /> Notifications
                    </Link>
                    {hasRole('ADMIN') && (
                        <Link to="/admin" className="text-red-600 hover:text-red-700 transition">Admin Panel</Link>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-full text-[#004282]">
                        <MdPersonOutline size={20} />
                    </div>
                    <div className="text-sm">
                        <div className="font-bold text-gray-800">Profile</div>
                        <button className="text-gray-500 text-xs cursor-pointer hover:underline" onClick={logout}>
                            {user?.name?.charAt(0) || 'A'}. User (Logout)
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#111827] flex items-center">
                            <MdNotifications className="mr-3 text-[#E6A023]" size={32} />
                            Notifications
                        </h1>
                        <p className="text-gray-500 mt-2">Stay updated with your bookings and tickets.</p>
                    </div>
                    {notifications.some(n => !n.read) && (
                        <button 
                            onClick={markAllRead}
                            className="text-sm font-semibold text-[#004282] hover:underline flex items-center mb-1"
                        >
                            <MdCheckCircle size={18} className="mr-1" /> Mark all as read
                        </button>
                    )}
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-400">Loading notifications...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-16 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MdNotificationsNone size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
                            <p className="text-gray-500">You don't have any notifications right now.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {notifications.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`p-6 flex items-start space-x-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}
                                    onClick={() => !notification.read && markAsRead(notification.id)}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className={`text-[15px] ${!notification.read ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                                {notification.message}
                                            </p>
                                            {!notification.read && (
                                                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-1.5 ml-2"></span>
                                            )}
                                        </div>
                                        <div className="flex items-center mt-2 text-xs text-gray-400 space-x-3">
                                            <span>{new Date(notification.createdAt).toLocaleString()}</span>
                                            {notification.type && (
                                                <span className="bg-gray-100 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                                                    {notification.type}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-white py-10 border-t border-gray-100 mt-auto">
                <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
                    <div>
                        <strong className="block text-gray-800 mb-3 font-semibold">Contact</strong>
                        <div className="flex items-center text-[13px] mb-2 text-gray-500">
                            <MdEmail size={16} className="mr-2 text-gray-400" /> Faculty of Computing
                        </div>
                        <div className="flex items-center text-[13px] mb-2 text-gray-500">
                            <MdPhone size={16} className="mr-2 text-gray-400" /> 031-567-8319
                        </div>
                        <div className="flex items-center text-[13px] text-gray-500">
                            <MdPublic size={16} className="mr-2 text-gray-400" /> www.sliit_ofcomputing.com
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center space-x-3 text-2xl font-bold text-[#002B5C] mb-2 font-serif">
                            <span>SLIIT</span>
                        </div>
                        <div className="text-[11px] text-gray-400">Copyright of Computing, SLIIT</div>
                    </div>
                    <div className="hidden md:block"></div>
                </div>
            </footer>
        </div>
    );
};

export default NotificationPage;
