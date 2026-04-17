import { Shield, Zap, Globe, Users, ArrowRight, Target, Eye, Cpu, Layers } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AboutUs = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    
    return (
        <div className="min-h-screen bg-[#0A0F1E] font-sans relative overflow-hidden pb-20">
            
            {/* Ambient Background Nodes */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-primary-400 shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse opacity-50"></div>
            <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-accent-400 shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-50"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(255,255,255,0.2)] opacity-50 pointer-events-none"></div>

            {/* Top Navbar */}
            <nav className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl relative">
                {/* Left Side: Logo */}
                <div className="flex-1 flex items-center">
                    <span className="block font-bold text-primary-300 text-lg leading-tight tracking-wider font-serif">SmartCampus Hub</span>
                </div>
                
                {/* Center Links - Absolutely Positioned for perfect centering */}
                <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link to="/" className={`${location.pathname === '/' ? 'text-primary-300 border-b-2 border-primary-400 pb-1 -mb-1' : 'text-slate-300 hover:text-primary-300 transition'}`}>Home</Link>
                    <Link to="/student/resources" className="text-slate-300 hover:text-primary-300 transition">Facilities & Assets</Link>
                    <Link to="/about" className={`${location.pathname === '/about' ? 'text-primary-300 border-b-2 border-primary-400 pb-1 -mb-1' : 'text-slate-300 hover:text-primary-300 transition'}`}>About Us</Link>
                </div>
                
                {/* Right Side: Auth */}
                <div className="flex-1 flex justify-end items-center space-x-3 md:space-x-4">
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

            <div className="max-w-6xl mx-auto px-6 pt-24 relative z-10 space-y-24">
                
                {/* Hero & Intro */}
                <section className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-white/5 backdrop-blur-md text-primary-300 text-sm font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.1)] mb-8">
                        <Cpu className="w-4 h-4" /> The Future of Campus Operations
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                        Transforming the <br className="hidden md:block" /> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Academic Infrastructure</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-light">
                        SmartCampus Hub is a revolutionary, centralized platform engineered to streamline facility management, accelerate IT troubleshooting, and empower students to optimize their educational environment.
                    </p>
                </section>

                {/* Mission & Vision Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    <div className="bg-white/5 backdrop-blur-xl p-10 lg:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
                        <div className="flex items-center gap-4 mb-5">
                            <div className="bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                <Target size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                        </div>
                        <p className="text-slate-300 text-base leading-relaxed font-light">
                            To bridge the gap between students, educators, and campus administrators by providing a deeply integrated, highly responsive digital ecosystem that turns logistical friction into invisible operational harmony.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl p-10 lg:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent pointer-events-none"></div>
                        <div className="flex items-center gap-4 mb-5">
                            <div className="bg-accent-500/20 w-14 h-14 rounded-2xl flex items-center justify-center text-accent-400 border border-accent-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                <Eye size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
                        </div>
                        <p className="text-slate-300 text-base leading-relaxed font-light">
                            A fully interconnected university experience where cutting-edge technology handles the campus infrastructure—freeing students and faculty to focus completely on innovation, learning, and human connection.
                        </p>
                    </div>
                </section>

                {/* Final Call to Action */}
                <section className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden relative p-12 lg:p-20 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0F1E]/80 pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-3xl mb-8">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                            Experience the campus of tomorrow.
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl font-light">
                            Join thousands of unified students and staff taking complete control over their educational facilities.
                        </p>
                    </div>
                    
                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-3 bg-white text-[#0A0F1E] px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-200 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            Enter the Hub <ArrowRight size={24} />
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutUs;
