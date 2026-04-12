import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-4xl w-full">
        <div className="card-glass p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background Highlight Decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-blue-600/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent-indigo/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">
            <p className="text-sm font-bold tracking-widest text-brand-blue-500 uppercase mb-4">
              Welcome to
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Smart Campus <span className="text-brand-blue-500">Operations Hub</span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              A centralized portal to manage campus facilities, bookings, 
              maintenance tickets, and notifications with a modern AI-powered experience.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button className="bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue-600/25">
                Explore Campus Services
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl border border-slate-600 transition-all duration-300">
                View Demo Dashboard
              </button>
            </div>

            {user && (
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-700/50 pt-6 mb-8 text-sm text-slate-400 gap-4">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-active"></div>
                  Signed in as {user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 py-1.5 px-4 rounded-lg transition-all"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl text-left hover:border-brand-blue-500/50 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-blue-400 transition-colors">Support & Tickets</h3>
                    <p className="text-slate-400 text-sm">
                      Need help? Raise a ticket and get AI-powered DIY fixes instantly.
                    </p>
                  </div>
                  <a 
                    href="/raise-ticket" 
                    className="inline-flex items-center justify-center bg-brand-blue-600/10 hover:bg-brand-blue-600 text-brand-blue-400 hover:text-white font-bold py-2 px-6 rounded-lg transition-all"
                  >
                    Report an Issue →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
              <span>Facilities</span>
              <span className="text-slate-700">•</span>
              <span>Bookings</span>
              <span className="text-slate-700">•</span>
              <span>Maintenance</span>
              <span className="text-slate-700">•</span>
              <span>Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
