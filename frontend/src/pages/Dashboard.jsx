import { useAuth } from '../context/AuthContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
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
    const { unreadCount } = useNotifications();

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
                        {unreadCount > 0 && (
                            <span className="bg-[#E6A023] text-white text-[10px] px-1.5 py-0.5 rounded-md ml-1 font-bold">{unreadCount}</span>
                        )}
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
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Sparkles, Zap, ExternalLink, Globe, Shield, Users, LayoutDashboard, Search, AlertCircle, Ticket } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/20 blur-[120px] mix-blend-screen animate-glow-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-500/20 blur-[120px] mix-blend-screen animate-glow-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="p-6 space-y-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] relative z-10">
        <div className="w-full max-w-4xl relative">
          
          <div className="glass rounded-2xl p-8 md:p-14">
            {/* Header section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-inner">
                <Sparkles className="h-3 w-3" /> System Status: Operational
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-md">
                 Smart Campus <br />
                 <span className="text-gradient-cyber">Operations Hub</span>
              </h1>
              <p className="text-sm text-dark-muted max-w-xl mx-auto leading-relaxed">
                Management and exploration of campus infrastructure. 
                Synchronize facilities and assets with a modern, high-performance interface.
              </p>
            </div>

            {/* Navigation Sections */}
            <div className="space-y-12">
                {/* Facilities & Assets Section */}
                <div>
                   <div className="flex items-center gap-4 mb-8 px-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                      <span className="text-[10px] font-bold text-accent-500 uppercase tracking-[0.2em] whitespace-nowrap glow-accent px-3 py-1 rounded-full border border-accent-500/20 bg-accent-500/5">Facilities & Assets Module</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                      {/* Admin Portal */}
                      <Link 
                        to="/resources" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-primary-500/10 rounded-xl group-hover:bg-primary-500 group-hover:text-white text-primary-500 transition-all duration-300 border border-primary-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] z-10">
                          <LayoutDashboard className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-primary-400 transition-colors">Admin Portal</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Manage campus nodes and infrastructure.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-primary-400" />
                        </div>
                      </Link>

                      {/* Student Catalogue */}
                      <Link 
                        to="/student/resources" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-accent-500/10 rounded-xl group-hover:bg-accent-500 group-hover:text-white text-accent-500 transition-all duration-300 border border-accent-500/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] z-10">
                          <Search className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-accent-400 transition-colors">Student Catalogue</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Explore and view campus facilities.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-accent-400" />
                        </div>
                      </Link>
                   </div>
                </div>

                {/* Coming Soon Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8 px-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-[0.2em] whitespace-nowrap glow-primary px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5">Scheduling</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                      {/* Resource Calendar */}
                      <Link 
                        to="/admin/resource-calendar" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500 group-hover:text-white text-emerald-500 transition-all duration-300 border border-emerald-500/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] z-10">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">Resource Calendar</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Visualize facility and asset availability.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-emerald-400" />
                        </div>
                      </Link>
                    </div>
                </div>

                {/* Booking Module Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8 px-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                        <span className="text-[10px] font-bold text-violet-500 uppercase tracking-[0.2em] whitespace-nowrap glow-violet px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5">Booking Module</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                      {/* Create Booking */}
                      <Link 
                        to="/bookings" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-violet-500/10 rounded-xl group-hover:bg-violet-500 group-hover:text-white text-violet-500 transition-all duration-300 border border-violet-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] z-10">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-violet-400 transition-colors">Create Booking</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Book campus resources.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-violet-400" />
                        </div>
                      </Link>

                      {/* My Bookings */}
                      <Link 
                        to="/my-bookings" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-violet-500/10 rounded-xl group-hover:bg-violet-500 group-hover:text-white text-violet-500 transition-all duration-300 border border-violet-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] z-10">
                          <Ticket className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-violet-400 transition-colors">My Bookings</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">View your bookings.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-violet-400" />
                        </div>
                      </Link>

                      {/* Admin Bookings */}
                      <Link 
                        to="/admin-bookings" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-violet-500/10 rounded-xl group-hover:bg-violet-500 group-hover:text-white text-violet-500 transition-all duration-300 border border-violet-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] z-10">
                          <Shield className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-violet-400 transition-colors">Admin Bookings</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Manage all bookings.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-violet-400" />
                        </div>
                      </Link>
                    </div>
                </div>

                {/* Support & Maintenance Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8 px-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] whitespace-nowrap glow-amber px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5">Support & Maintenance</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                      {/* Admin Tickets */}
                      <Link 
                        to="/admin/tickets" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-rose-500/10 rounded-xl group-hover:bg-rose-500 group-hover:text-white text-rose-500 transition-all duration-300 border border-rose-500/30 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] z-10">
                          <AlertCircle className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors">Admin Tickets</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Manage user reported issues.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-rose-400" />
                        </div>
                      </Link>

                      {/* Student Tickets */}
                      <Link 
                        to="/student/tickets" 
                        className="group relative p-6 glass-card rounded-2xl flex items-center gap-5 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-amber-500/10 rounded-xl group-hover:bg-amber-500 group-hover:text-white text-amber-500 transition-all duration-300 border border-amber-500/30 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] z-10">
                          <Ticket className="h-6 w-6" />
                        </div>
                        <div className="text-left relative z-10">
                          <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">My Support Tickets</h3>
                          <p className="text-xs text-dark-muted mt-1 group-hover:text-slate-300 transition-colors">Track your reported issues.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                            <ExternalLink className="h-5 w-5 text-amber-400" />
                        </div>
                      </Link>
                    </div>
                </div>
            </div>

            {/* Status indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[10px] font-bold text-dark-muted tracking-widest uppercase bg-dark-bg/30 py-3 rounded-xl border border-white/5">
              <span className="flex items-center gap-2">
                 <Globe className="h-3 w-3 text-accent-500 glow-accent" /> Network Active
              </span>
              <span className="flex items-center gap-2">
                 <Shield className="h-3 w-3 text-primary-500 glow-primary" /> Data Secure
              </span>
              <span className="flex items-center gap-2">
                 <Zap className="h-3 w-3 text-amber-500 animate-pulse drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" /> Core Online
              </span>
            </div>
          </div>
          
          <div className="mt-12 text-center text-dark-muted font-medium text-[10px] tracking-[0.3em] uppercase drop-shadow-sm">
            © 2026 Smart Campus Research Division // Node Optimized
          </div>
        </div>
    );
};

export default Dashboard;
