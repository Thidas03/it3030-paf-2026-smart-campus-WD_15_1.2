import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Sparkles, Zap, ExternalLink, Globe, Shield } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans selection:bg-primary-500/30 relative overflow-hidden">
      {/* Dynamic background blurs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[140px] animate-glow-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[140px] animate-glow-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto px-6 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen relative z-10">
        <div className="w-full max-w-4xl relative">
          
          <div className="relative bg-dark-card/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-8 md:p-14 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10">
            {/* Header section - Reduced scale */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[9px] font-black uppercase tracking-[0.4em] mb-8 shadow-inner">
                <Sparkles className="h-3 w-3" /> Intelligence Node 01
              </div>
              <h1 className="text-5xl md:text-7xl font-[900] tracking-tighter mb-8 leading-[0.9]">
                 <span className="text-gradient-cyber">Smart Campus</span><br />
                 <span className="text-white opacity-90">Operations</span> <span className="text-accent-500">Hub</span>
              </h1>
              <p className="text-lg md:text-xl text-dark-muted max-w-xl mx-auto leading-relaxed font-semibold">
                The high-performance operating system for modern academic ecosystems. 
                Synchronize facilities and assets with zero latency.
              </p>
            </div>

            {/* Navigation Cards - Optimized sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link 
                to="/resources" 
                className="group relative p-7 bg-dark-bg/40 hover:bg-dark-bg/80 border border-white/5 hover:border-primary-500/50 rounded-[2.5rem] transition-all duration-700 flex items-center gap-6 shadow-2xl hover:shadow-primary-600/15"
              >
                <div className="p-5 bg-primary-500/10 rounded-2xl group-hover:bg-primary-500 group-hover:text-white text-primary-400 transition-all duration-700 shadow-inner ring-1 ring-primary-500/20">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-xl group-hover:text-white transition-colors tracking-tight">Facilities & Assets</h3>
                  <p className="text-xs text-dark-muted group-hover:text-dark-text leading-snug mt-1 font-medium">Infrastructure node management.</p>
                </div>
                <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-100 group-hover:text-primary-400 transition-all">
                    <ExternalLink className="h-5 w-5" />
                </div>
              </Link>

              <div className="group p-7 bg-white/[0.01] border border-white/5 rounded-[2.5rem] transition-all duration-700 flex items-center gap-6 cursor-not-allowed opacity-30 grayscale">
                <div className="p-5 bg-dark-muted/10 rounded-2xl text-dark-muted shadow-inner border border-dark-muted/20">
                  <Calendar className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-xl text-dark-muted tracking-tight">Smart Bookings</h3>
                  <p className="text-xs text-dark-muted/60 leading-snug mt-1 font-medium">Algorithmic scheduling engine.</p>
                </div>
              </div>
            </div>

            {/* Status indicators - Compact scale */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[9px] font-black text-dark-muted tracking-[0.25em] uppercase">
              <span className="flex items-center gap-2 px-3 py-1 bg-dark-bg/60 rounded-full border border-white/5">
                 <Globe className="h-2.5 w-2.5 text-accent-500" /> Network Active
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-dark-bg/60 rounded-full border border-white/5">
                 <Shield className="h-2.5 w-2.5 text-primary-400" /> Secure v4.2
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-dark-bg/60 rounded-full border border-white/5">
                 <Zap className="h-2.5 w-2.5 text-amber-500 animate-pulse" /> Low Latency
              </span>
            </div>
          </div>
          
          <div className="mt-12 text-center text-dark-muted/20 font-black text-[8px] tracking-[0.4em] uppercase">
            © 2026 Smart Campus Research Division // Node Optimized
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
