import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);
    const notifiedIds = useRef(new Set());

    const fetchNotifications = useCallback(async () => {
        if (!user) return;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/notifications', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const allNotifs = response.data || [];
            const unread = allNotifs.filter(n => !n.read && !n.isRead);
            setUnreadCount(unread.length);

            unread.forEach(n => {
                if (!notifiedIds.current.has(n.id)) {
                    notifiedIds.current.add(n.id);
                    const msg = n.message || '';
                    const type = n.type || '';
                    
                    if (type === 'BOOKING_APPROVED' || (msg.toLowerCase().includes('booking') && msg.toLowerCase().includes('approved'))) {
                        toast.success(`${msg || 'Your booking was approved!'}`, { duration: 5000, position: 'top-right' });
                    } else if (type === 'BOOKING_REJECTED' || (msg.toLowerCase().includes('booking') && msg.toLowerCase().includes('rejected'))) {
                        toast.error(`${msg || 'Your booking was rejected.'}`, { duration: 5000, position: 'top-right' });
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    }, [user]);

    useEffect(() => {
        fetchNotifications();
        // Poll more frequently to ensure snappy dashboard notifications
        const interval = setInterval(fetchNotifications, 15000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    return (
        <NotificationContext.Provider value={{ unreadCount, refreshUnreadCount: fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
