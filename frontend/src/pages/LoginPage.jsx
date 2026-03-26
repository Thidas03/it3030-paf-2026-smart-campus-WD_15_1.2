import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center p-6">
      <div className="w-full max-w-lg relative z-10">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 shadow-sm relative overflow-hidden group">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-700 border border-slate-600 text-slate-300 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-inner">
               <ShieldCheck className="h-3.5 w-3.5" /> Authentication Protocol
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-white">
              Access Unified Node
            </h1>
            <p className="text-slate-400 text-sm">
              Initialize your secure session via the central identity provider.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-5 shadow-inner">
                <div className="h-12 w-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <Zap className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-tight">Enterprise SSO</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Automated synchronization enabled</p>
                </div>
            </div>

            <button
              onClick={loginWithGoogle}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm transition duration-200 flex items-center justify-center gap-3 shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <LogIn className="h-5 w-5" />
              Sign In with Google
            </button>
            
            <div className="pt-4 text-center">
                <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
                    <Sparkles className="h-3 w-3" /> Secure Gateway Managed by IT Services
                </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-slate-500 text-xs text-slate-500">
            Smart Campus Operations Platform v2.0.4
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
