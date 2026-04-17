import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { Link } from 'react-router-dom';
import { 
    MdOutlineBusiness,
    MdOutlineCalendarToday,
    MdOutlineConfirmationNumber,
    MdNotificationsNone,
    MdArrowForward
} from 'react-icons/md';

const Dashboard = () => {
    const { hasRole } = useAuth();
    const { unreadCount } = useNotifications();
    const isAdmin = hasRole && hasRole('ADMIN');
    const isTechnician = hasRole && hasRole('TECHNICIAN');

    return (
        <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(139,92,246,0.2),rgba(255,255,255,0))] text-white font-sans">
            {/* Top Navbar */}
            <nav className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            <span className="block font-bold text-primary-300 text-lg leading-tight uppercase tracking-wider font-serif">SLIIT</span>
                            <span className="block font-bold text-dark-muted text-xs leading-tight uppercase font-sans">Faculty of Computing</span>
                        </div>
                    </div>
                </div>
                
                {/* Center Links */}
                <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
                    <Link to="/" className="text-primary-300 border-b-2 border-primary-400 pb-1 -mb-1">Home</Link>
                    <Link to="/student/resources" className="text-slate-300 hover:text-primary-300 transition">Facilities & Assets</Link>
                    <Link to="/my-bookings" className="text-slate-300 hover:text-primary-300 transition">Bookings</Link>
                    <Link 
                        to={isTechnician ? "/technician/tickets" : "/student/tickets"} 
                        className="text-slate-300 hover:text-primary-300 transition"
                    >
                        Ticketing
                    </Link>
                    {isTechnician && (
                        <Link to="/technician/status" className="text-slate-300 hover:text-primary-300 transition">
                            Ticket Status
                        </Link>
                    )}
                    <Link to="/notifications" className="text-slate-300 hover:text-primary-300 transition flex items-center">
                        <MdNotificationsNone size={20} className="mr-1" /> Notifications
                        {unreadCount > 0 && (
                            <span className="bg-accent-500 text-white text-[10px] px-1.5 py-0.5 rounded-md ml-1 font-bold">{unreadCount}</span>
                        )}
                    </Link>
                    {isAdmin && (
                        <Link to="/admin" className="text-red-400 hover:text-red-300 transition flex items-center">
                            Admin Panel
                        </Link>
                    )}
                </div>

                <div />
            </nav>

            <main className="max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
                
                {/* Hero Section */}
                <div className="w-full glass rounded-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row">
                    <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                            Welcome to Smart<br/>Campus Operations Hub
                        </h1>
                        <p className="text-dark-muted text-lg md:text-xl mb-8 max-w-md">
                            Manage your campus resources and report incidents easily.
                        </p>
                        <div>
                            <Link to="/login" className="inline-flex items-center bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-500 transition-colors shadow-lg glow-primary">
                                Get Started <MdArrowForward className="ml-1" />
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-[50%] lg:w-[45%] bg-slate-900/40 min-h-[300px]">
                        <img 
                            src="/campus-interior.png" 
                            alt="Smart Campus Hub" 
                            className="w-full h-full object-cover rounded-none opacity-90"
                        />
                    </div>
                </div>

                {/* Cards Section */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Facilities Catalogue */}
                    <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-primary-500/20 text-primary-300 rounded-xl flex items-center justify-center mb-4">
                                <MdOutlineBusiness size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Facilities Catalogue</h3>
                            <p className="text-dark-muted text-sm mb-6 leading-relaxed">
                                Browse and find available lecture halls, labs, meeting rooms, and equipment.
                            </p>
                        </div>
                        <Link to="/student/resources" className="w-full text-center py-2 bg-primary-600/20 border border-primary-500/40 text-primary-200 rounded-lg font-medium hover:bg-primary-600/30 transition-colors block">
                            View Catalogue
                        </Link>
                    </div>

                    {/* My Bookings */}
                    <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-primary-500/20 text-primary-300 rounded-xl flex items-center justify-center mb-4">
                                <MdOutlineCalendarToday size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">My Bookings</h3>
                            <p className="text-dark-muted text-sm mb-6 leading-relaxed">
                                Request new resource bookings, track approval status, and manage reservations.
                            </p>
                        </div>
                        <Link to="/bookings" className="w-full text-center py-2 bg-primary-600/20 border border-primary-500/40 text-primary-200 rounded-lg font-medium hover:bg-primary-600/30 transition-colors block">
                            Book a Resource
                        </Link>
                    </div>

                    {/* Report Incident */}
                    <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-accent-500/20 text-accent-300 rounded-xl flex items-center justify-center mb-4">
                                <MdOutlineConfirmationNumber size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Report Incident</h3>
                            <p className="text-dark-muted text-sm mb-6 leading-relaxed">
                                Submit and track maintenance and incident fault reports for facilities.
                            </p>
                        </div>
                        <Link to="/raise-ticket" className="w-full text-center py-2 bg-primary-600/20 border border-primary-500/40 text-primary-200 rounded-lg font-medium hover:bg-primary-600/30 transition-colors block">
                            Create a Ticket
                        </Link>
                    </div>

                    {/* Notifications Widget */}
                    <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col">
                        <h3 className="text-lg font-bold text-white mb-4">Notifications</h3>
                        <p className="text-sm font-bold text-slate-300 mb-3">Unread Messages</p>
                        <div className="space-y-3 text-[13px] mt-2 flex-1 text-dark-muted">
                            <div className="py-1">Check your latest updates in notifications.</div>
                            <div className="border-t border-white/10 pt-3">Unread count: <span className="text-primary-200 font-semibold">{unreadCount}</span></div>
                        </div>
                        <Link to="/notifications" className="mt-6 w-full text-center py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors block">
                            Open Notifications
                        </Link>
                    </div>
                </div>
                {isAdmin && (
                    <div className="glass rounded-2xl border border-red-500/30 p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        <div>
                            <h3 className="text-red-300 font-semibold">Administrator Access</h3>
                            <p className="text-sm text-dark-muted">Manage users, bookings, and campus operations from your admin workspace.</p>
                        </div>
                        <Link to="/admin" className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            Go to Admin Panel <MdArrowForward className="ml-1" />
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
