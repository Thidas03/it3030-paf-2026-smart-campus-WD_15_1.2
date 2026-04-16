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
      </div>
    </div>
  );
};

export default Dashboard;
