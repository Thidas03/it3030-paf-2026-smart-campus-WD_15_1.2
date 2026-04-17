import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { Navigate, Link, NavLink, Outlet } from 'react-router-dom';
import { 
    MdDashboard,
    MdPeople,
    MdCalendarToday,
    MdBusiness,
    MdConfirmationNumber,
    MdNotifications,
    MdPersonOutline
} from 'react-icons/md';

const AdminPanel = () => {
    const { user, logout, hasRole } = useAuth();
    const { unreadCount } = useNotifications();

    if (!user || !hasRole('ADMIN')) {
        return <Navigate to="/" />;
    }

    const navLinkClass = ({ isActive }) => 
        `flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
            isActive ? 'bg-[#EBF0F6] text-[#1E3A8A]' : 'text-gray-600 hover:bg-gray-50'
        }`;

    return (
        <div className="flex h-screen bg-[#F4F7FB] font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col pt-6 pb-4 shadow-sm z-10 flex-shrink-0">
                {/* Logo */}
                <div className="px-6 mb-8 flex items-center space-x-3">
                    <div>
                        <span className="block font-bold text-[#002B5C] text-[15px] leading-tight uppercase font-serif tracking-wider">SLIIT</span>
                        <span className="block font-bold text-[#002B5C] text-[9px] leading-tight uppercase font-sans tracking-wide">Faculty of Computing</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 text-[13px] font-medium text-[#4B5563]">
                    <NavLink to="/admin/dashboard" className={navLinkClass}>
                        <MdDashboard size={20} />
                        <span>System Overview Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/users" className={navLinkClass}>
                        <MdPeople size={20} />
                        <span className="leading-tight">User Management</span>
                    </NavLink>
                    <NavLink to="/admin-bookings" className={navLinkClass}>
                        <MdCalendarToday size={20} />
                        <span className="leading-tight">Booking Management</span>
                    </NavLink>
                    <NavLink to="/admin/resource-calendar" className={navLinkClass}>
                        <MdBusiness size={20} />
                        <span className="leading-tight">Facilities Management</span>
                    </NavLink>
                    <NavLink to="/admin/tickets" className={navLinkClass}>
                        <MdConfirmationNumber size={20} />
                        <span className="leading-tight">Ticket Management</span>
                    </NavLink>
                    <Link to="/notifications" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors relative">
                        <MdNotifications size={20} />
                        <span className="leading-tight">Notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute left-[26px] top-2 bg-[#E6A023] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-sm font-bold">{unreadCount}</span>
                        )}
                    </Link>
                </nav>

                {/* Profile Footer */}
                <div className="px-6 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#EBF0F6] p-2 rounded-full text-[#1E3A8A]">
                            <MdPersonOutline size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-900 border-b border-gray-300 pb-0.5 inline-block self-start font-mono tracking-widest">{user?.roles?.[0]}</span>
                            <button onClick={logout} className="text-xs text-gray-500 hover:text-gray-700 mt-1 cursor-pointer">
                                {user?.name?.charAt(0) || 'A'}. User (Logout)
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto h-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
