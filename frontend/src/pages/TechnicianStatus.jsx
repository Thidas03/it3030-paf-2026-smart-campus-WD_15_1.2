import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { Link, Navigate } from 'react-router-dom';
import { 
    MdOutlinePieChart,
    MdNotificationsNone,
    MdPersonOutline,
    MdEmail,
    MdPhone,
    MdPublic,
    MdAssignmentTurnedIn,
    MdHourglassEmpty,
    MdErrorOutline
} from 'react-icons/md';

const TechnicianStatus = () => {
    const { user, logout, hasRole } = useAuth();
    const { unreadCount } = useNotifications();

    if (!user || !hasRole('TECHNICIAN')) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 transition-all duration-300">
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
                    <Link to="/" className="text-gray-700 hover:text-[#004282] transition pb-1">Home</Link>
                    <Link to="/manage-resources" className="text-gray-700 hover:text-[#004282] transition">Facilities & Assets</Link>
                    <Link to="/my-bookings" className="text-gray-700 hover:text-[#004282] transition">Bookings</Link>
                    <Link to="/technician/tickets" className="text-gray-700 hover:text-[#004282] transition">Ticketing</Link>
                    <Link to="/technician/status" className="text-[#004282] border-b-2 border-[#004282] pb-1 -mb-1">Ticket Status</Link>
                    <Link to="/notifications" className="text-gray-700 hover:text-[#004282] transition flex items-center">
                        <MdNotificationsNone size={20} className="mr-1" /> Notifications
                        {unreadCount > 0 && (
                            <span className="bg-[#E6A023] text-white text-[10px] px-1.5 py-0.5 rounded-md ml-1 font-bold">{unreadCount}</span>
                        )}
                    </Link>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                    <div className="bg-[#EBF0F6] p-2 rounded-full text-[#1E3A8A]">
                        <MdPersonOutline size={20} />
                    </div>
                    <div className="text-sm">
                        <div className="font-bold text-gray-800">Technician</div>
                        <button className="text-gray-500 text-xs cursor-pointer hover:underline text-left block" onClick={logout}>
                            {user?.name?.charAt(0) || 'T'}. User (Logout)
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <MdOutlinePieChart className="mr-2 text-[#004282]" size={28} />
                        Ticket Status Dashboard
                    </h1>
                    <p className="text-gray-500 mt-1">Overview of maintenance request statuses and performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                                <MdHourglassEmpty size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">12</p>
                        <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full w-[40%]"></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <MdErrorOutline size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">In Progress</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">08</p>
                        <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-400 h-full w-[25%]"></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <MdAssignmentTurnedIn size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Resolved</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-1">45</p>
                        <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-400 h-full w-[75%]"></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif uppercase tracking-tight">Weekly Performance Status</h3>
                    <div className="h-64 flex items-end justify-between px-10 gap-4 border-b border-gray-100">
                        {[40, 65, 30, 85, 50, 75, 60].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                                <div className="w-full max-w-[40px] bg-[#004282] rounded-t-lg transition-all duration-500 hover:bg-blue-700 cursor-pointer" style={{height: `${h}%`}}></div>
                                <span className="text-[10px] text-gray-400 mt-2 font-bold uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                            </div>
                        ))}
                    </div>
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

export default TechnicianStatus;
