import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
    MdDashboard, 
    MdCalendarToday, 
    MdConfirmationNumber, 
    MdNotifications, 
    MdSettings, 
    MdLogout,
    MdPeople,
    MdAssignment,
    MdBuild
} from 'react-icons/md';

const Sidebar = () => {
    const { user, logout, hasRole } = useAuth();
    const location = useLocation();

    const menuItems = [
        { 
            title: 'Dashboard', 
            path: '/', 
            icon: <MdDashboard size={20} />, 
            roles: ['USER', 'ADMIN', 'TECHNICIAN'] 
        },
        { 
            title: 'My Bookings', 
            path: '/my-bookings', 
            icon: <MdCalendarToday size={20} />, 
            roles: ['USER'] 
        },
        { 
            title: 'My Tickets', 
            path: '/my-tickets', 
            icon: <MdConfirmationNumber size={20} />, 
            roles: ['USER'] 
        },
        { 
            title: 'Manage Resources', 
            path: '/manage-resources', 
            icon: <MdSettings size={20} />, 
            roles: ['ADMIN'] 
        },
        { 
            title: 'Approve Bookings', 
            path: '/approve-bookings', 
            icon: <MdAssignment size={20} />, 
            roles: ['ADMIN'] 
        },
        { 
            title: 'All Tickets', 
            path: '/all-tickets', 
            icon: <MdConfirmationNumber size={20} />, 
            roles: ['ADMIN'] 
        },
        { 
            title: 'Assigned Tickets', 
            path: '/assigned-tickets', 
            icon: <MdBuild size={20} />, 
            roles: ['TECHNICIAN'] 
        },
        { 
            title: 'All Tickets (Filtered)', 
            path: '/tickets-filtered', 
            icon: <MdConfirmationNumber size={20} />, 
            roles: ['TECHNICIAN'] 
        },
        { 
            title: 'Notifications', 
            path: '/notifications', 
            icon: <MdNotifications size={20} />, 
            roles: ['USER', 'ADMIN', 'TECHNICIAN'] 
        },
    ];

    const filteredMenu = menuItems.filter(item => 
        item.roles.some(role => user?.roles?.includes(role))
    );

    return (
        <aside className="w-64 bg-white h-screen border-r border-gray-100 flex flex-col shadow-sm sticky top-0">
            <div className="p-6 border-b border-gray-50">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Smart Campus
                </h2>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                    Operations Hub
                </p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredMenu.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <span className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.title}</span>
                            {isActive && <div className="absolute right-0 w-1 h-6 bg-blue-600 rounded-l-full" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-50">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 mb-4">
                    <img 
                        src={user?.picture || 'https://via.placeholder.com/40'} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate capitalize">{user?.roles?.[0]?.toLowerCase()}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium"
                >
                    <MdLogout size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
