import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { loginWithGoogle, login, signup } = useAuth();
    const navigate = useNavigate();
    
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let result;
            if (isLogin) {
                result = await login(email, password);
            } else {
                result = await signup(name, email, password);
            }

            if (result.success) {
                navigate('/');
            } else {
                setError(result.error || 'Authentication failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 font-sans p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50 relative z-10 transition-all duration-500">
                <header className="mb-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                         <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Smart Campus Hub</h1>
                    <p className="text-slate-500 mt-2 text-sm font-medium">Your connected university ecosystem</p>
                </header>

                <div className="space-y-4 mb-8">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full flex items-center justify-center space-x-3 bg-white border border-slate-200 py-3.5 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 active:transform active:scale-[0.99] transition-all shadow-sm group"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>

                <div className="relative mb-8 text-center after:content-[''] after:absolute after:top-1/2 after:left-0 after:right-0 after:h-px after:bg-slate-200 after:z-[-1]">
                    <span className="bg-white/90 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest relative z-10">OR EMAIL LOGIN</span>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl animate-shake">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm font-bold text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                            placeholder="name@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-lg text-blue-600 focus:ring-blue-500 border-slate-300 transition-all cursor-pointer"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">Remember</span>
                        </label>
                        {isLogin && (
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-all underline decoration-blue-200 underline-offset-4 decoration-2 hover:decoration-blue-600">Forgot?</a>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:from-blue-700 hover:to-indigo-700 active:transform active:scale-[0.98] transition-all shadow-xl shadow-blue-200 flex items-center justify-center disabled:opacity-70"
                    >
                        {loading ? (
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            isLogin ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                <footer className="mt-8 text-center pt-6 border-t border-slate-100">
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="text-slate-500 font-semibold"
                    >
                        {isLogin ? "New here? " : "Joined already? "} 
                        <span className="text-blue-600 font-extrabold hover:underline transition-all">
                            {isLogin ? "Sign Up Free" : "Log In Now"}
                        </span>
                    </button>
                    
                    <p className="mt-6 text-slate-400 text-[10px] leading-relaxed uppercase tracking-tighter">
                        By continuing, you agree to our <span className="font-bold underline">Terms</span> and <span className="font-bold underline">Privacy</span>
                    </p>
                </footer>
            </div>
        </div>
    );
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
