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
    const { user, hasRole, logout } = useAuth();
    const { unreadCount } = useNotifications();
    const isAdmin = hasRole && hasRole('ADMIN');
    const isTechnician = hasRole && hasRole('TECHNICIAN');

    return (
        <div className="min-h-screen bg-[#0A0F1E] text-white font-sans relative">
            
            {/* Full-Screen Background Cover & Gradient Mask */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center" 
                style={{ backgroundImage: 'url(/campus-interior.png)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] via-[#0A0F1E]/90 to-transparent"></div>
                {/* Secondary gradient to ensure bottom fade matches background for scrolling */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Top Navbar */}
            <nav className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl">
                {/* Left Side */}
                <div className="flex-1 flex items-center justify-start gap-3">
                    <img src="/logo.png" alt="SmartCampus Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
                    <span className="block font-bold text-primary-300 text-lg leading-tight tracking-wider font-serif">SmartCampus Hub</span>
                </div>
                
                {/* Center Links - Structurally centered */}
                <div className="flex-1 hidden lg:flex items-center justify-center space-x-8 text-sm font-semibold">
                    <Link to="/" className="text-primary-300 border-b-2 border-primary-400 pb-1 -mb-1">Home</Link>
                    <Link to="/student/resources" className="text-slate-300 hover:text-primary-300 transition">Facilities & Assets</Link>
                    <Link to="/about" className="text-slate-300 hover:text-primary-300 transition">About Us</Link>
                </div>

                {/* Right Side: Auth */}
                <div className="flex-1 flex items-center justify-end space-x-3 md:space-x-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-300 hidden md:block">
                                {user.name || 'Student'}
                            </span>
                            <button 
                                onClick={logout} 
                                className="text-sm font-semibold text-slate-400 hover:text-rose-400 transition"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition">
                                Sign In
                            </Link>
                            <Link to="/signup" className="text-sm font-semibold bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-[#7C3AED]/20">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Full-Screen Hero Viewport */}
            <div className="relative z-10 w-full min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12 lg:px-24">
                <div className="max-w-3xl transform -translate-y-8">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                        Smart Campus <br />
                        Operations <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Hub</span>
                    </h1>
                    
                    <p className="text-slate-300 text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed font-light">
                        Experience real-time data architecture merging facility tracking with intelligent campus logistics. Total control directly at your fingertips.
                    </p>

                    <div>
                        <Link to="/login" className="inline-flex items-center bg-[#7C3AED] text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-[#6D28D9] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                            Get Started <MdArrowForward className="ml-3" size={24} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 w-full pb-8 flex justify-center items-center text-sm font-medium text-slate-500 tracking-wide mt-12">
                &copy; 2026 Smart Campus Operations Hub. All rights reserved.
            </footer>
        </div>
    );
};

export default Dashboard;
