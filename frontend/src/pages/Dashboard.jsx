import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import { 
    MdOutlineBusiness,
    MdOutlineCalendarToday,
    MdOutlineConfirmationNumber,
    MdNotificationsNone,
    MdPersonOutline,
    MdEmail,
    MdPhone,
    MdPublic
} from 'react-icons/md';

const Dashboard = () => {
    const { user, logout, hasRole } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
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
                    <Link to="/" className="text-[#004282] border-b-2 border-[#004282] pb-1 -mb-1">Home</Link>
                    <Link to="/manage-resources" className="text-gray-700 hover:text-[#004282] transition">Facilities & Assets</Link>
                    <Link to="/my-bookings" className="text-gray-700 hover:text-[#004282] transition">Bookings</Link>
                    <Link 
                        to={hasRole && hasRole('TECHNICIAN') ? "/technician/tickets" : "/all-tickets"} 
                        className="text-gray-700 hover:text-[#004282] transition"
                    >
                        Ticketing
                    </Link>
                    {hasRole && hasRole('TECHNICIAN') && (
                        <Link to="/technician/status" className="text-gray-700 hover:text-[#004282] transition">
                            Ticket Status
                        </Link>
                    )}
                    <Link to="/notifications" className="text-gray-700 hover:text-[#004282] transition flex items-center">
                        <MdNotificationsNone size={20} className="mr-1" /> Notifications
                        <span className="bg-[#E6A023] text-white text-[10px] px-1.5 py-0.5 rounded-md ml-1 font-bold">3</span>
                    </Link>
                    {hasRole && hasRole('ADMIN') && (
                        <Link to="/admin" className="text-red-600 hover:text-red-700 transition flex items-center">
                            Admin Panel
                        </Link>
                    )}
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-full text-[#004282]">
                        <MdPersonOutline size={20} />
                    </div>
                    <div className="text-sm">
                        <div className="font-bold text-gray-800">Profile</div>
                        <button className="text-gray-500 text-xs cursor-pointer hover:underline text-left block" onClick={logout}>
                            {user?.name?.charAt(0) || 'A'}. User (Logout)
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col items-center">
                
                {/* Hero Section */}
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row mb-8">
                    <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4 leading-tight tracking-tight">
                            Welcome to Smart<br/>Campus Operations Hub
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-md">
                            Manage your campus resources and report incidents easily.
                        </p>
                        <div>
                            <button className="bg-[#004282] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-900 transition-colors shadow-md shadow-blue-900/20">
                                Get Started
                            </button>
                        </div>
                    </div>
                    <div className="md:w-[50%] lg:w-[45%] bg-gray-100 min-h-[300px]">
                        <img 
                            src="/campus-interior.png" 
                            alt="Smart Campus Hub" 
                            className="w-full h-full object-cover md:rounded-l-3xl rounded-none md:scale-105"
                        />
                    </div>
                </div>

                {/* Cards Section */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    
                    {/* Facilities Catalogue */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <div className="w-12 h-12 bg-[#F0F4FA] text-[#004282] rounded-xl flex items-center justify-center mb-4">
                                <MdOutlineBusiness size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-2">Facilities Catalogue</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Browse and find available lecture halls, labs, meeting rooms, and equipment.
                            </p>
                        </div>
                        <button className="w-full py-2 bg-white border border-[#004282] text-[#004282] rounded-lg font-medium hover:bg-[#F0F4FA] transition-colors">
                            View Catalogue
                        </button>
                    </div>

                    {/* My Bookings */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <div className="w-12 h-12 bg-[#F0F4FA] text-[#004282] rounded-xl flex items-center justify-center mb-4">
                                <MdOutlineCalendarToday size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-2">My Bookings</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Request new resource bookings, track approval status, and manage reservations.
                            </p>
                        </div>
                        <button className="w-full py-2 bg-white border border-[#004282] text-[#004282] rounded-lg font-medium hover:bg-[#F0F4FA] transition-colors">
                            Book a Resource
                        </button>
                    </div>

                    {/* Report Incident */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <div className="w-12 h-12 bg-[#FFF4EE] text-[#F38C4A] rounded-xl flex items-center justify-center mb-4">
                                <MdOutlineConfirmationNumber size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-[#111827] mb-2">Report Incident</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                Submit and track maintenance and incident fault reports for facilities.
                            </p>
                        </div>
                        <button className="w-full py-2 bg-white border border-[#004282] text-[#004282] rounded-lg font-medium hover:bg-[#F0F4FA] transition-colors">
                            Create a Ticket
                        </button>
                    </div>

                    {/* Notifications Widget */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="text-lg font-bold text-[#111827] mb-4">Notifications</h3>
                        <p className="text-sm font-bold text-gray-800 mb-3">Recent Alerts</p>
                        <div className="space-y-4 text-[13px] mt-2 flex-1">
                            <div className="text-gray-700 py-1">Booking #123 Approved</div>
                            <div className="border-t border-gray-100 pt-3 text-gray-700">Comment on Ticket #456</div>
                            <div className="border-t border-gray-100 pt-3 text-gray-700">Comment on Ticket #456</div>
                        </div>
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

export default Dashboard;

