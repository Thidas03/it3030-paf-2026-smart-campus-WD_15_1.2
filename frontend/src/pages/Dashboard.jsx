import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Sparkles, Zap, ExternalLink, Globe, Shield } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans selection:bg-primary-500/30 relative overflow-hidden">
      {/* Dynamic background blurs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[140px] animate-glow-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[140px] animate-glow-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-5xl relative">
          
          <div className="relative bg-dark-card/40 backdrop-blur-2xl border border-white/5 rounded-[4rem] p-12 md:p-24 shadow-[0_0_150px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10">
            {/* Header section with brand colors */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-inner">
                <Sparkles className="h-3.5 w-3.5" /> Intelligence Node 01
              </div>
              <h1 className="text-6xl md:text-9xl font-[900] tracking-tighter mb-10 leading-[0.85]">
                 <span className="text-gradient-cyber">Smart Campus</span><br />
                 <span className="text-white opacity-90">Operations</span> <span className="text-accent-500">Hub</span>
              </h1>
              <p className="text-xl md:text-2xl text-dark-muted max-w-2xl mx-auto leading-relaxed font-semibold">
                The high-performance operating system for modern academic ecosystems. 
                Synchronize facilities, assets, and human capital with zero latency.
              </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <Link 
                to="/resources" 
                className="group relative p-10 bg-dark-bg/40 hover:bg-dark-bg/80 border border-white/5 hover:border-primary-500/50 rounded-[3rem] transition-all duration-700 flex items-center gap-8 shadow-2xl hover:shadow-primary-600/15 group"
              >
                <div className="p-6 bg-primary-500/10 rounded-[1.75rem] group-hover:bg-primary-500 group-hover:text-white text-primary-400 transition-all duration-700 shadow-inner ring-1 ring-primary-500/20">
                  <Building2 className="h-10 w-10" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-2xl group-hover:text-white transition-colors tracking-tight">Facilities & Assets</h3>
                  <p className="text-sm text-dark-muted group-hover:text-dark-text leading-snug mt-2 font-medium">Global inventory & infrastructure management.</p>
                </div>
                <div className="absolute top-8 right-10 opacity-40 group-hover:opacity-100 group-hover:text-primary-400 transition-all">
                    <ExternalLink className="h-6 w-6" />
                </div>
              </Link>

              <div className="group p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] transition-all duration-700 flex items-center gap-8 cursor-not-allowed opacity-40 grayscale">
                <div className="p-6 bg-dark-muted/10 rounded-[1.75rem] text-dark-muted shadow-inner border border-dark-muted/20">
                  <Calendar className="h-10 w-10" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-2xl text-dark-muted tracking-tight">Smart Bookings</h3>
                  <p className="text-sm text-dark-muted/60 leading-snug mt-2 font-medium">Advanced algorithmic scheduling engine.</p>
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-[10px] font-black text-dark-muted tracking-[0.3em] uppercase">
              <span className="flex items-center gap-3 px-4 py-1.5 bg-dark-bg/60 rounded-full border border-white/5 shadow-inner">
                 <Globe className="h-3 w-3 text-accent-500" /> Edge Network Active
              </span>
              <span className="flex items-center gap-3 px-4 py-1.5 bg-dark-bg/60 rounded-full border border-white/5 shadow-inner">
                 <Shield className="h-3 w-3 text-primary-400" /> Secure Protocol v4.2
              </span>
              <span className="flex items-center gap-3 px-4 py-1.5 bg-dark-bg/60 rounded-full border border-white/5 shadow-inner">
                 <Zap className="h-3 w-3 text-amber-500 animate-pulse" /> Low Latency Node
              </span>
            </div>
          </div>
          
          <div className="mt-16 text-center text-dark-muted/30 font-black text-[10px] tracking-[0.5em] uppercase">
            © 2026 Smart Campus Research Division // All Systems Optimal
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
