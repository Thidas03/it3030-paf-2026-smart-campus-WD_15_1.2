import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Sparkles, Zap, ExternalLink, Globe, Shield, Users, LayoutDashboard, Search } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="p-6 space-y-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] relative z-10">
        <div className="w-full max-w-4xl relative">
          
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:p-14 shadow-sm">
            {/* Header section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-inner">
                <Sparkles className="h-3 w-3" /> System Status: Operational
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-6 leading-tight text-white">
                 Smart Campus <br />
                 <span className="text-blue-500">Operations Hub</span>
              </h1>
              <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                Management and exploration of campus infrastructure. 
                Synchronize facilities and assets with a modern, high-performance interface.
              </p>
            </div>

            {/* Navigation Sections */}
            <div className="space-y-12">
                {/* Facilities & Assets Section */}
                <div>
                   <div className="flex items-center gap-2 mb-6 px-4">
                      <div className="h-px flex-1 bg-slate-800"></div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">Facilities & Assets Module</span>
                      <div className="h-px flex-1 bg-slate-800"></div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Admin Portal */}
                      <Link 
                        to="/resources" 
                        className="group relative p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition duration-200 flex items-center gap-5 shadow-sm"
                      >
                        <div className="p-4 bg-blue-600/10 rounded-xl group-hover:bg-blue-600 group-hover:text-white text-blue-500 transition-all duration-300 border border-blue-500/20">
                          <LayoutDashboard className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">Admin Portal</h3>
                          <p className="text-xs text-slate-400 mt-1">Manage campus nodes and infrastructure.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            <ExternalLink className="h-4 w-4 text-blue-400" />
                        </div>
                      </Link>

                      {/* Student Catalogue */}
                      <Link 
                        to="/student/resources" 
                        className="group relative p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition duration-200 flex items-center gap-5 shadow-sm"
                      >
                        <div className="p-4 bg-indigo-600/10 rounded-xl group-hover:bg-indigo-600 group-hover:text-white text-indigo-500 transition-all duration-300 border border-indigo-500/20">
                          <Search className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">Student Catalogue</h3>
                          <p className="text-xs text-slate-400 mt-1">Explore and view campus facilities.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            <ExternalLink className="h-4 w-4 text-indigo-400" />
                        </div>
                      </Link>
                   </div>
                </div>

                {/* Coming Soon Section */}
                <div>
                    <div className="flex items-center gap-2 mb-6 px-4">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">Scheduling</span>
                        <div className="h-px flex-1 bg-slate-800"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Resource Calendar */}
                      <Link 
                        to="/admin/resource-calendar" 
                        className="group relative p-6 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition duration-200 flex items-center gap-5 shadow-sm"
                      >
                        <div className="p-4 bg-emerald-600/10 rounded-xl group-hover:bg-emerald-600 group-hover:text-white text-emerald-500 transition-all duration-300 border border-emerald-500/20">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">Resource Calendar</h3>
                          <p className="text-xs text-slate-400 mt-1">Visualize facility and asset availability.</p>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            <ExternalLink className="h-4 w-4 text-emerald-400" />
                        </div>
                      </Link>
                    </div>
                </div>
            </div>

            {/* Status indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              <span className="flex items-center gap-2">
                 <Globe className="h-3 w-3 text-emerald-500" /> Network Active
              </span>
              <span className="flex items-center gap-2">
                 <Shield className="h-3 w-3 text-blue-500" /> Data Secure
              </span>
              <span className="flex items-center gap-2">
                 <Zap className="h-3 w-3 text-amber-500 animate-pulse" /> Core Online
              </span>
            </div>
          </div>
          
          <div className="mt-12 text-center text-slate-600 font-medium text-[10px] tracking-[0.3em] uppercase">
            © 2026 Smart Campus Research Division // Node Optimized
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
