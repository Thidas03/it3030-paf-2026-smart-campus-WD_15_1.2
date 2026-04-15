import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineBolt, HiOutlineChatBubbleLeftEllipsis, HiOutlineCheckCircle, HiOutlineWrench } from 'react-icons/hi2';

const RaiseTicket = () => {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceLocation, setResourceLocation] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [description, setDescription] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    setResourceName(params.get('name') || '');
    setResourceType(params.get('type') || '');
    setResourceLocation(params.get('location') || '');
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const compiledLabName = `${resourceName} (${resourceType}) - ${resourceLocation}`;
      const response = await axios.post('http://localhost:8081/api/tickets', {
        userId: 'demo-user-123',
        labName: compiledLabName,
        description,
        priority
      });
      setTicket(response.data);
    } catch (err) {
      console.error('Error raising ticket:', err);
      alert('Failed to raise ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/api/tickets/${ticket.id}/resolve`);
      setTicket(response.data);
    } catch (err) {
      console.error('Error resolving ticket:', err);
    }
  };

  const handleEscalate = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/api/tickets/${ticket.id}/escalate`);
      setTicket(response.data);
    } catch (err) {
      console.error('Error escalating ticket:', err);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] py-12 px-4 flex flex-col items-center relative">
      <div className="max-w-2xl w-full relative z-10">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
        >
          <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </a>

        <div className="glass rounded-3xl relative overflow-hidden shadow-2xl border border-white/5">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px] pointer-events-none transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-full blur-[60px] pointer-events-none transition-colors duration-700"></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
          
          <div className="p-8 md:p-10 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <HiOutlineBolt className="text-3xl text-primary-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Report an Issue</h1>
            </div>
            
            {!ticket ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-muted mb-2 uppercase tracking-widest">
                      Resource Name
                    </label>
                    <input
                      type="text"
                      value={resourceName}
                      readOnly
                      className="w-full bg-dark-bg/40 border border-white/5 text-slate-300 rounded-xl py-3 px-4 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-muted mb-2 uppercase tracking-widest">
                      Resource Type
                    </label>
                    <input
                      type="text"
                      value={resourceType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                      readOnly
                      className="w-full bg-dark-bg/40 border border-white/5 text-slate-300 rounded-xl py-3 px-4 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark-muted mb-2 uppercase tracking-widest">
                      Lab / Facility Location
                    </label>
                    <input
                      type="text"
                      value={resourceLocation}
                      onChange={(e) => setResourceLocation(e.target.value)}
                      placeholder="e.g. Computer Lab 02, IT Block"
                      className="w-full bg-dark-bg/60 border border-white/10 text-white rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all placeholder:text-slate-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark-muted mb-2 uppercase tracking-widest">
                      Priority Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full bg-dark-bg/60 border border-white/10 text-white rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                    >
                      <option value="LOW" className="bg-dark-bg text-slate-300">LOW</option>
                      <option value="MEDIUM" className="bg-dark-bg text-slate-300">MEDIUM</option>
                      <option value="HIGH" className="bg-dark-bg text-slate-300">HIGH</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-dark-muted mb-2 uppercase tracking-widest">
                    Issue Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what's wrong (e.g. Projector not working, PC won't boot)..."
                    className="w-full bg-dark-bg/60 border border-white/10 text-white rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all placeholder:text-slate-500 min-h-[140px]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-cyber hover:glow-primary disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <HiOutlineBolt className="text-xl group-hover:scale-110 transition-transform" />
                  )}
                  <span>{loading ? 'Analyzing with Gemini AI...' : 'Analyze & Raise Ticket'}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
                <div className="bg-accent-500/10 border border-accent-500/20 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700 text-accent-400">
                    <HiOutlineChatBubbleLeftEllipsis size={80} />
                  </div>
                  <h2 className="text-accent-400 font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <HiOutlineBolt />
                    Gemini AI Suggestion
                  </h2>
                  <p className="text-slate-200 text-lg leading-relaxed italic">
                    "{ticket.aiSuggestion}"
                  </p>
                </div>
                
                {ticket.status === 'OPEN' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleResolve}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg glow-accent flex items-center justify-center gap-2 group"
                    >
                      <HiOutlineCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                      <span>Fixed it myself!</span>
                    </button>
                    <button
                      onClick={handleEscalate}
                      className="bg-dark-bg/60 border border-white/10 hover:border-primary-500/50 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group hover:text-primary-400"
                    >
                      <HiOutlineWrench className="text-xl group-hover:scale-110 transition-transform" />
                      <span>Need Technician</span>
                    </button>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                    ticket?.status === 'RESOLVED' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    Ticket Status: {typeof ticket?.status === 'string' ? ticket.status.replace('_', ' ') : String(ticket?.status || 'UNKNOWN')}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10 flex justify-center">
                  <button
                    onClick={() => {
                      setTicket(null);
                      setResourceName('');
                      setResourceType('');
                      setResourceLocation('');
                      setPriority('MEDIUM');
                      setDescription('');
                    }}
                    className="text-primary-400 hover:text-primary-300 font-bold text-sm transition-colors flex items-center gap-2"
                  >
                    Raise another ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center mt-12 text-slate-500 text-xs uppercase tracking-[0.2em]">
          Smart Campus • Maintenance System • AI Operations
        </p>
      </div>
    </div>
  );
};

export default RaiseTicket;
