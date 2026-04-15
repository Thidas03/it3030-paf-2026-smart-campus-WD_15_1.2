import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
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

    if (!user || !hasRole('ADMIN')) {
        return <Navigate to="/" />;
    }

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
                    <div className="flex items-center space-x-3 px-4 py-3 bg-[#EBF0F6] text-[#1E3A8A] rounded-lg cursor-pointer">
                        <MdDashboard size={20} />
                        <span>System Overview Dashboard</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors">
                        <MdPeople size={20} />
                        <span className="leading-tight">User Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors">
                        <MdCalendarToday size={20} />
                        <span className="leading-tight">Booking Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors">
                        <MdBusiness size={20} />
                        <span className="leading-tight">Facilities Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors">
                        <MdConfirmationNumber size={20} />
                        <span className="leading-tight">Ticket Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors relative">
                        <MdNotifications size={20} />
                        <span className="leading-tight">Notifications</span>
                        <span className="absolute left-[26px] top-2 bg-[#E6A023] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-sm font-bold">7</span>
                    </div>
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
            <main className="flex-1 overflow-auto p-10 h-full">
                <header className="mb-6">
                    <h1 className="text-2xl font-extrabold text-[#111827] uppercase tracking-wide">Admin Panel: System Overview</h1>
                </header>

                {/* Top Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Active Bookings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">Active Bookings</h3>
                        <div className="text-4xl font-semibold text-gray-900 mb-6">100</div>
                        {/* Mini Sparkline (CSS simulation) */}
                        <div className="flex items-end h-16 w-full space-x-1 mt-auto">
                            <div className="w-[8%] bg-blue-300 h-1/4"></div>
                            <div className="w-[8%] bg-blue-300 h-1/5"></div>
                            <div className="w-[8%] bg-blue-300 h-2/5"></div>
                            <div className="w-[8%] bg-blue-300 h-3/5"></div>
                            <div className="w-[8%] bg-blue-300 h-1/2"></div>
                            <div className="w-[8%] bg-blue-300 h-1/4"></div>
                            <div className="w-[8%] bg-blue-300 h-[10%]"></div>
                            <div className="w-[8%] bg-blue-300 h-1/3"></div>
                            <div className="w-[8%] bg-blue-300 h-[80%]"></div>
                            <div className="w-[8%] bg-blue-300 h-2/3"></div>
                            <div className="w-[8%] bg-blue-300 h-1/2"></div>
                            <div className="w-[8%] bg-blue-300 h-[15%]"></div>
                        </div>
                    </div>

                    {/* Pending Tickets */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">Pending Tickets</h3>
                            <div className="text-4xl font-semibold text-gray-900 mb-8">33</div>
                        </div>
                        <div className="space-y-2 mt-auto text-sm text-gray-800">
                            <div className="flex justify-between items-center bg-gray-50/50 py-1 px-2 rounded">
                                <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF] mr-2"></span>Open</div>
                                <span>10</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50/50 py-1 px-2 rounded">
                                <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] mr-2"></span>In Progress</div>
                                <span>6</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50/50 py-1 px-2 rounded">
                                <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] mr-2"></span>Resolved</div>
                                <span>3</span>
                            </div>
                        </div>
                    </div>

                    {/* Utilization Rate */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between items-center relative">
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider self-start mb-6 w-full text-center">Utilization Rate</h3>
                        
                        <div className="relative w-40 h-20 overflow-hidden flex justify-center mb-4">
                            <div className="absolute w-40 h-40 border-[20px] border-[#CBD5E1] rounded-full top-0"></div>
                            <div className="absolute w-40 h-40 border-[20px] border-[#1D4ED8] rounded-full top-0 border-b-transparent border-r-transparent border-t-[#1D4ED8] border-l-[#1D4ED8] rotate-45 transform"></div>
                        </div>
                        <div className="absolute top-[85px] text-3xl font-bold text-gray-900">70%</div>
                        <p className="text-xs text-gray-600 mb-2">Percentage of key assets</p>
                    </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Booking Requests Bar Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-72 flex flex-col">
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-6">Booking Requests (Last 30 Days)</h3>
                        <div className="flex-1 flex items-end justify-between px-2 pb-6 border-b border-l border-gray-200 relative pt-4 ml-6">
                            {/* Y axis labels */}
                            <div className="absolute -left-7 top-0 text-[10px] text-gray-400">100</div>
                            <div className="absolute -left-7 top-1/4 text-[10px] text-gray-400">75</div>
                            <div className="absolute -left-7 top-2/4 text-[10px] text-gray-400">50</div>
                            <div className="absolute -left-7 top-3/4 text-[10px] text-gray-400">25</div>
                            <div className="absolute -left-5 bottom-5 text-[10px] text-gray-400">0</div>

                            {/* Faint Horizontal lines */}
                            <div className="absolute left-0 right-0 top-0 border-t border-gray-100 w-full"></div>
                            <div className="absolute left-0 right-0 top-1/4 border-t border-gray-100 w-full"></div>
                            <div className="absolute left-0 right-0 top-2/4 border-t border-gray-100 w-full"></div>
                            <div className="absolute left-0 right-0 top-3/4 border-t border-gray-100 w-full"></div>

                            {[
                                {a: 40, r: 20}, {a: 60, r: 30}, {a: 45, r: 85}, {a: 85, r: 30},
                                {a: 50, r: 40}, {a: 50, r: 30}, {a: 75, r: 20}, {a: 80, r: 40},
                                {a: 75, r: 30}, {a: 45, r: 40}, {a: 65, r: 20}, {a: 60, r: 25}, {a: 60, r: 15}
                            ].map((val, idx) => (
                                <div key={idx} className="flex space-x-0.5 items-end h-full z-10 w-full justify-center">
                                    <div className="bg-[#1E40AF] w-2 lg:w-3" style={{height: `${val.a}%`}}></div>
                                    <div className="bg-[#F59E0B] w-2 lg:w-3" style={{height: `${val.r}%`}}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-4 mt-2 text-[10px] text-gray-500 ml-6">
                            <span>1</span><span>3</span><span>7</span><span>11</span><span>13</span><span>15</span><span>16</span><span>19</span><span>21</span><span>23</span><span>25</span><span>27</span><span>30</span>
                        </div>
                        <div className="flex justify-center space-x-6 mt-4 text-xs font-medium text-gray-700">
                            <div className="flex items-center"><span className="w-3 h-3 bg-[#1E40AF] rounded-sm mr-2"></span>Approved</div>
                            <div className="flex items-center"><span className="w-3 h-3 bg-[#F59E0B] rounded-sm mr-2"></span>Rejected</div>
                        </div>
                    </div>

                    {/* Ticket Status Distribution Donut Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative">
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider absolute top-6 left-6">Ticket Status Distribution</h3>
                        
                        <div className="w-48 h-48 rounded-full border-[35px] border-[#1D4ED8] relative border-b-[#f59e0b] border-l-[#3b82f6] transform rotate-45 mt-8 border-t-[#1D4ED8] border-r-[#1D4ED8]"></div>
                        
                        <div className="absolute bottom-6 flex justify-center space-x-4 text-xs font-medium text-gray-700 mt-8 w-full">
                            <div className="flex items-center"><span className="w-2.5 h-2.5 bg-[#1D4ED8] rounded-full mr-2"></span>Open</div>
                            <div className="flex items-center"><span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full mr-2"></span>In Progress</div>
                            <div className="flex items-center"><span className="w-2.5 h-2.5 bg-[#3B82F6] rounded-full mr-2"></span>Resolved</div>
                        </div>
                    </div>
                </div>

                {/* System Log */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-[#111827]">System Log</h3>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-3 bg-[#F4F7FB] p-3 text-[11px] font-bold text-gray-900 w-full border-b border-gray-100">
                            <div>Event</div>
                            <div>Status</div>
                            <div>Last modified</div>
                        </div>
                        <div className="divide-y divide-gray-100">
                            <div className="grid grid-cols-3 p-3 text-xs text-gray-800">
                                <div>User [nami] created a booking.</div>
                                <div>User created a admins</div>
                                <div>2024-08-17 17:27:21</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs text-gray-800 bg-gray-50/50">
                                <div>New Facility [lab Nami] added</div>
                                <div>New Facility Lab 1</div>
                                <div>2024-08-17 17:27:30</div>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs text-gray-800">
                                <div>New Facility [lab Name] added</div>
                                <div>New Facility Lab 1</div>
                                <div>2024-08-17 12:27:03</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
