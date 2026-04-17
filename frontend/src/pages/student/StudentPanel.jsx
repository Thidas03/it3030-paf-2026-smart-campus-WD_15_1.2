import { useAuth } from '../../context/AuthContext.jsx';
import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { 
    MdBusiness,
    MdCalendarToday,
    MdConfirmationNumber,
    MdPersonOutline,
    MdNotifications
} from 'react-icons/md';
import { useNotifications } from '../../context/NotificationContext.jsx';

const StudentPanel = () => {
    const { user, logout, hasRole } = useAuth();
    const { unreadCount } = useNotifications();

    // To prevent forcing student-role only if they haven't set up perfectly yet, we'll just check if they are logged in 
    // or loosely enforce STUDENT role.
    if (!user) {
        return <Navigate to="/" />;
    }

    const navLinkClass = ({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
            isActive
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                : 'text-slate-300 hover:bg-white/5 border border-transparent'
        }`;

    return (
        <div className="flex h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] font-sans text-white">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-white/10 h-full flex flex-col pt-6 pb-4 shadow-2xl z-10 flex-shrink-0">
                {/* Logo */}
                <div className="px-6 mb-8 flex items-center space-x-3">
                    <div>
                        <span className="block font-bold text-primary-300 text-[15px] leading-tight uppercase font-serif tracking-wider">SMART CAMPUS</span>
                        <span className="block font-bold text-dark-muted text-[9px] leading-tight uppercase font-sans tracking-wide">STUDENT PORTAL</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 text-[13px] font-medium">
                    <NavLink to="/student/resources" className={navLinkClass}>
                        <MdBusiness size={20} />
                        <span className="leading-tight">Available Resources</span>
                    </NavLink>
                    <NavLink to="/student/bookings" className={navLinkClass}>
                        <MdCalendarToday size={20} />
                        <span className="leading-tight">My Booked Sessions</span>
                    </NavLink>
                    <NavLink to="/student/tickets" className={navLinkClass}>
                        <MdConfirmationNumber size={20} />
                        <span className="leading-tight">Support Tickets</span>
                    </NavLink>
                    <NavLink to="/student/notifications" className={navLinkClass}>
                        <div className="relative flex items-center justify-center">
                            <MdNotifications size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <span className="leading-tight">Notifications</span>
                    </NavLink>
                </nav>

                {/* Profile Footer */}
                <div className="px-6 pt-4 border-t border-white/10 mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary-500/20 p-2 rounded-full text-primary-300">
                                <MdPersonOutline size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">{user?.name || 'Student'}</span>
                                <span className="text-[9px] text-primary-400 font-mono mt-0.5">{user?.roles?.[0] || 'STUDENT'}</span>
                            </div>
                        </div>
                        <button 
                            onClick={logout} 
                            className="text-xs bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-colors tracking-wide font-semibold ml-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-full relative">
                <Outlet />
            </main>
        </div>
    );
};

export default StudentPanel;
