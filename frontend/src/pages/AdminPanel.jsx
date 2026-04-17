import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
    MdDashboard,
    MdPeople,
    MdCalendarToday,
    MdBusiness,
    MdConfirmationNumber,
    MdNotifications,
    MdPersonOutline,
    MdCached,
    MdSearch,
    MdFilterList
} from 'react-icons/md';

const AdminPanel = () => {
    const { user, logout, hasRole } = useAuth();
    const { unreadCount } = useNotifications();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (activeTab === 'users' && users.length === 0) {
            fetchUsers();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('http://localhost:8081/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('accessToken');
            const roles = [newRole];
            await axios.put(`http://localhost:8081/api/admin/users/${userId}/role`, roles, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(u => u.id === userId ? { ...u, roles: roles } : u));
        } catch (error) {
            console.error("Error updating role", error);
            alert("Failed to update role");
        }
    };

    if (!user || !hasRole('ADMIN')) {
        return <Navigate to="/" />;
    }

    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <div 
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'dashboard' ? 'bg-[#EBF0F6] text-[#1E3A8A]' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        <MdDashboard size={20} />
                        <span>System Overview Dashboard</span>
                    </div>
                    <div 
                        onClick={() => setActiveTab('users')}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'users' ? 'bg-[#EBF0F6] text-[#1E3A8A]' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        <MdPeople size={20} />
                        <span className="leading-tight">User Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors opacity-50">
                        <MdCalendarToday size={20} />
                        <span className="leading-tight">Booking Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors opacity-50">
                        <MdBusiness size={20} />
                        <span className="leading-tight">Facilities Management</span>
                    </div>
                    <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors opacity-50">
                        <MdConfirmationNumber size={20} />
                        <span className="leading-tight">Ticket Management</span>
                    </div>
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
                            <span className="text-[11px] font-bold text-gray-900 border-b border-gray-300 pb-0.5 inline-block self-start font-mono tracking-widest uppercase">{user?.roles?.[0]}</span>
                            <button onClick={logout} className="text-xs text-gray-500 hover:text-gray-700 mt-1 cursor-pointer text-left">
                                {user?.name?.split(' ')[0] || 'User'} (Logout)
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-10 h-full">
                {activeTab === 'dashboard' && (
                    <>
                        <header className="mb-6">
                            <h1 className="text-2xl font-extrabold text-[#111827] uppercase tracking-wide">Admin Panel: System Overview</h1>
                        </header>

                        {/* Top Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Active Bookings */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-2">Active Bookings</h3>
                                <div className="text-4xl font-semibold text-gray-900 mb-6">100</div>
                                <div className="flex items-end h-16 w-full space-x-1 mt-auto">
                                    {[25, 20, 40, 60, 50, 25, 10, 33, 80, 66, 50, 15].map((h, i) => (
                                        <div key={i} className="w-[8%] bg-blue-300" style={{ height: `${h}%` }}></div>
                                    ))}
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
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-72 flex flex-col">
                                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-6">Booking Requests (Last 30 Days)</h3>
                                <div className="flex-1 flex items-end justify-between px-2 pb-6 border-b border-l border-gray-200 relative pt-4 ml-6">
                                    <div className="absolute -left-7 top-0 text-[10px] text-gray-400">100</div>
                                    <div className="absolute -left-7 top-2/4 text-[10px] text-gray-400">50</div>
                                    <div className="absolute -left-5 bottom-5 text-[10px] text-gray-400">0</div>
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
                                <div className="flex justify-center space-x-6 mt-4 text-xs font-medium text-gray-700">
                                    <div className="flex items-center"><span className="w-3 h-3 bg-[#1E40AF] rounded-sm mr-2"></span>Approved</div>
                                    <div className="flex items-center"><span className="w-3 h-3 bg-[#F59E0B] rounded-sm mr-2"></span>Rejected</div>
                                </div>
                            </div>

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

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="text-sm font-bold text-[#111827]">Recent Activity</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                <div className="grid grid-cols-3 p-3 text-xs text-gray-800">
                                    <div>User [nami] created a booking.</div>
                                    <div>Approved</div>
                                    <div>2024-04-17 17:27:21</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'users' && (
                    <div className="space-y-6">
                        <header className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-extrabold text-[#111827] uppercase tracking-wide flex items-center">
                                    <MdPeople size={28} className="mr-3 text-[#1E3A8A]" />
                                    User Management
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Manage user roles and permissions across the campus system.</p>
                            </div>
                            <button 
                                onClick={fetchUsers}
                                className="bg-white p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-[#1E3A8A] transition-colors shadow-sm"
                                title="Refresh Users"
                            >
                                <MdCached size={20} className={loadingUsers ? "animate-spin" : ""} />
                            </button>
                        </header>

                        {/* Search and Filters */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="relative flex-1">
                                <MdSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or email..." 
                                    className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 px-4 py-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
                                <MdFilterList size={18} />
                                <span>Filter</span>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Current Role</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loadingUsers ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400">Loading users...</td>
                                        </tr>
                                    ) : filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400">No users found matching your search.</td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-full bg-[#EBF0F6] flex items-center justify-center text-[#1E3A8A] font-bold overflow-hidden shadow-sm">
                                                            {u.picture ? (
                                                                <img src={u.picture} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                u.name?.charAt(0) || 'U'
                                                            )}
                                                        </div>
                                                        <div className="font-semibold text-gray-900">{u.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600 font-mono">{u.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest ${
                                                        u.roles?.includes('ADMIN') ? 'bg-red-50 text-red-600 border border-red-100' :
                                                        u.roles?.includes('TECHNICIAN') ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        'bg-blue-50 text-blue-600 border border-blue-100'
                                                    }`}>
                                                        {u.roles?.[0] || 'USER'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select 
                                                        className="bg-white border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 cursor-pointer shadow-sm"
                                                        value={u.roles?.[0] || 'USER'}
                                                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                    >
                                                        <option value="USER">USER</option>
                                                        <option value="TECHNICIAN">TECHNICIAN</option>
                                                        <option value="ADMIN">ADMIN</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;

