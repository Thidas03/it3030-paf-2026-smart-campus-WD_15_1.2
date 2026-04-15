import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { Link, Navigate } from 'react-router-dom';
import { 
    MdOutlineConfirmationNumber,
    MdNotificationsNone,
    MdPersonOutline,
    MdSearch,
    MdFilterList,
    MdMoreVert,
    MdEmail,
    MdPhone,
    MdPublic
} from 'react-icons/md';

const TechnicianTickets = () => {
    const { user, logout, hasRole } = useAuth();
    const { unreadCount } = useNotifications();
    const [tickets, setTickets] = useState([
        { id: '#456', user: 'nami', issue: 'AC not working in Lab 1', status: 'Pending', priority: 'High', date: '2024-08-17' },
        { id: '#457', user: 'thidas', issue: 'Projector flickering in BH-02', status: 'In Progress', priority: 'Medium', date: '2024-08-17' },
        { id: '#458', user: 'janith', issue: 'Light bulb fused in corridor', status: 'Resolved', priority: 'Low', date: '2024-08-16' },
        { id: '#459', user: 'chamika', issue: 'WiFi disconnection in Library', status: 'Pending', priority: 'High', date: '2024-08-16' },
        { id: '#460', user: 'kavishka', issue: 'Power outlet not working in C-302', status: 'Pending', priority: 'Medium', date: '2024-08-15' },
    ]);

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
                    <Link to="/technician/tickets" className="text-[#004282] border-b-2 border-[#004282] pb-1 -mb-1">Ticketing</Link>
                    <Link to="/technician/status" className="text-gray-700 hover:text-[#004282] transition">Ticket Status</Link>
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
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <MdOutlineConfirmationNumber className="mr-2 text-[#004282]" size={28} />
                            All Maintenance Tickets
                        </h1>
                        <p className="text-gray-500 mt-1">Review and manage support requests from campus users.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search tickets..." 
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition-colors">
                            <MdFilterList size={20} />
                        </button>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Issue Description</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-[#004282]">{ticket.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 capitalize">{ticket.user}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{ticket.issue}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                ticket.priority === 'High' ? 'bg-red-50 text-red-600' : 
                                                ticket.priority === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                                    ticket.status === 'Pending' ? 'bg-yellow-400' : 
                                                    ticket.status === 'In Progress' ? 'bg-blue-400' : 'bg-green-400'
                                                }`}></div>
                                                <span className="text-sm text-gray-700">{ticket.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ticket.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                                <MdMoreVert size={20} className="text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default TechnicianTickets;
