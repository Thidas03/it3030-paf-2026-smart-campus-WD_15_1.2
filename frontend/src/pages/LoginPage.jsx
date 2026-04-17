import { useAuth } from '../context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineBusiness, MdShield, MdPersonOutline } from 'react-icons/md';

const LoginPage = () => {
    const { loginWithGoogle, login, signup } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const isSignupRoute = location.pathname === '/signup';
    
    const [isLogin, setIsLogin] = useState(!isSignupRoute);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const normalizeSingleRole = (role) => {
        if (typeof role === 'string') return role;
        if (role && typeof role === 'object') {
            return role.authority || role.role || role.name || '';
        }
        return '';
    };

    const normalizeRoles = (roles) => {
        const roleList = Array.isArray(roles) ? roles : [roles];
        return roleList
            .map((role) => normalizeSingleRole(role))
            .map((role) => String(role || '').trim().replace('ROLE_', '').toUpperCase())
            .filter(Boolean);
    };

    const getRedirectPathByRole = (userData) => {
        const roles = normalizeRoles(userData?.roles);
        if (roles.includes('ADMIN')) return '/resources';
        if (roles.includes('TECHNICIAN')) return '/technician/tickets';
        return '/student/resources';
    };

    useEffect(() => {
        setIsLogin(!isSignupRoute);
        setError('');
        setRole('STUDENT');
    }, [isSignupRoute]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let result;
            if (isLogin) {
                result = await login(email, password);
            } else {
                result = await signup(name, email, password, role);
            }

            if (result.success) {
                toast.success(isLogin ? 'Login successful' : 'Registered successfully');
                navigate(getRedirectPathByRole(result.user));
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
        <div className="min-h-screen bg-dark-bg font-sans p-4 relative overflow-hidden flex items-center justify-center">
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: "url('/campus-interior.png')" }}
            />
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.2),rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/15 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

            <div className="glass w-full max-w-md rounded-3xl border border-white/10 p-8 relative z-10 shadow-2xl">
                <header className="mb-7 text-center">
                    <div className="w-16 h-16 bg-gradient-cyber rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg glow-primary">
                        <MdOutlineBusiness className="text-white" size={30} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart Campus Hub</h1>
                    <p className="text-dark-muted mt-2 text-sm font-medium">
                        {isLogin ? 'Sign in to continue' : 'Create your account to get started'}
                    </p>
                </header>

                <div className="space-y-4 mb-7">
                    <button
                        onClick={loginWithGoogle}
                        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl text-slate-100 font-semibold hover:bg-white/10 hover:border-primary-500/40 active:scale-[0.99] transition-all"
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

                <div className="relative mb-7 text-center after:content-[''] after:absolute after:top-1/2 after:left-0 after:right-0 after:h-px after:bg-white/10 after:z-[-1]">
                    <span className="bg-dark-bg px-4 text-[11px] font-bold text-dark-muted uppercase tracking-widest">
                        Or use email
                    </span>
                </div>

                {error && (
                    <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-sm font-semibold text-red-300">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <label className="block text-xs font-semibold text-dark-muted uppercase tracking-wider mb-1.5">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-slate-100 placeholder:text-slate-500"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    {!isLogin && (
                        <div className="relative">
                            <label className="block text-xs font-semibold text-dark-muted uppercase tracking-wider mb-1.5">Role</label>
                            <div className="relative">
                                <MdShield className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <select
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-slate-100"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option className="bg-slate-900 text-slate-100" value="STUDENT">Student</option>
                                    <option className="bg-slate-900 text-slate-100" value="ADMIN">Admin</option>
                                    <option className="bg-slate-900 text-slate-100" value="TECHNICIAN">Technician</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <label className="block text-xs font-semibold text-dark-muted uppercase tracking-wider mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-slate-100 placeholder:text-slate-500"
                            placeholder="name@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-semibold text-dark-muted uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-slate-100 placeholder:text-slate-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded text-primary-500 focus:ring-primary-500 border-white/20 bg-white/5"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="text-sm font-medium text-dark-muted group-hover:text-slate-300 transition-colors">Remember</span>
                        </label>
                        {isLogin && (
                            <a href="#" className="text-sm text-primary-300 hover:text-primary-200 font-semibold transition-colors">
                                Forgot?
                            </a>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-cyber text-white py-3.5 rounded-xl font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-lg glow-primary flex items-center justify-center disabled:opacity-70 mt-2"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            isLogin ? 'Sign In' : 'Create Account'
                        )}
                    </button>
                </form>

                <footer className="mt-7 text-center pt-5 border-t border-white/10">
                    <button
                        onClick={() => navigate(isLogin ? '/signup' : '/login')}
                        className="text-dark-muted font-semibold"
                    >
                        {isLogin ? 'New here? ' : 'Joined already? '}
                        <span className="text-primary-300 font-extrabold hover:underline transition-all">
                            {isLogin ? 'Sign Up Free' : 'Log In Now'}
                        </span>
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
                        <MdPersonOutline size={14} />
                        <span>Protected campus access</span>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LoginPage;
