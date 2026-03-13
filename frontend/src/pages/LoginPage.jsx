import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-glow-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] animate-glow-pulse delay-700"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="glass border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-600/10 rounded-full blur-3xl group-hover:bg-primary-600/20 transition-all duration-1000"></div>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-inner">
               <ShieldCheck className="h-3.5 w-3.5" /> Authentication Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
              Access <span className="text-gradient-cyber">Unified Node</span>
            </h1>
            <p className="text-dark-muted font-medium text-lg">
              Initialize your secure session via the central identity provider.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-dark-bg/60 border border-white/5 rounded-3xl p-6 flex items-center gap-5 ring-1 ring-white/5 shadow-inner">
                <div className="h-12 w-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 border border-primary-500/20">
                    <Zap className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Enterprise SSO</h4>
                    <p className="text-xs text-dark-muted font-bold mt-0.5">Automated synchronization enabled</p>
                </div>
            </div>

            <button
              onClick={loginWithGoogle}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-primary-600/30 transform hover:scale-[1.02] active:scale-95 group/btn overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <LogIn className="h-5 w-5" />
              Sign In with Google
            </button>
            
            <div className="pt-4 text-center">
                <p className="text-[10px] font-black text-dark-muted uppercase tracking-[0.2em] flex items-center justify-center gap-2 opacity-60">
                    <Sparkles className="h-3 w-3" /> Secure Gateway Managed by IT Services
                </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center text-dark-muted/40 font-black text-[9px] uppercase tracking-[0.4em]">
            Smart Campus Operations Platform v2.0.4
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
