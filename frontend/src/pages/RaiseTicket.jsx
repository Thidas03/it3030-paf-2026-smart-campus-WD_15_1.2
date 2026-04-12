import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlineArrowLeft, HiOutlineBolt, HiOutlineChatBubbleLeftEllipsis, HiOutlineCheckCircle, HiOutlineWrench } from 'react-icons/hi2';

const RaiseTicket = () => {
  const [labName, setLabName] = useState('');
  const [description, setDescription] = useState('');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/api/tickets', {
        userId: 'demo-user-123',
        labName,
        description
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
    <div className="min-h-screen bg-slate-900 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
        >
          <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </a>

        <div className="card-glass relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent opacity-50"></div>
          
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-brand-blue-500/20 p-3 rounded-2xl">
                <HiOutlineBolt className="text-3xl text-brand-blue-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">Report an Issue</h1>
            </div>
            
            {!ticket ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    Lab Location
                  </label>
                  <input
                    type="text"
                    value={labName}
                    onChange={(e) => setLabName(e.target.value)}
                    placeholder="e.g. Computer Lab 02, IT Block"
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/40 focus:border-brand-blue-500 transition-all placeholder:text-slate-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    Issue Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what's wrong (e.g. Projector not working, PC won't boot)..."
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl py-4 px-5 focus:outline-none focus:ring-2 focus:ring-brand-blue-500/40 focus:border-brand-blue-500 transition-all placeholder:text-slate-600 min-h-[140px]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue-600 hover:bg-brand-blue-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-brand-blue-600/20 flex items-center justify-center gap-3 group"
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
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-accent-indigo/10 border border-accent-indigo/20 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <HiOutlineChatBubbleLeftEllipsis size={80} />
                  </div>
                  <h2 className="text-accent-indigo font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                    <HiOutlineBolt />
                    Gemini AI Suggestion
                  </h2>
                  <p className="text-slate-200 text-lg leading-relaxed italic">
                    "{ticket.aiSuggestion}"
                  </p>
                </div>
                
                {ticket.status === 'DIY_SUGGESTED' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleResolve}
                      className="bg-status-active hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 group"
                    >
                      <HiOutlineCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                      <span>Fixed it myself!</span>
                    </button>
                    <button
                      onClick={handleEscalate}
                      className="bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group"
                    >
                      <HiOutlineWrench className="text-xl group-hover:scale-110 transition-transform" />
                      <span>Need Technician</span>
                    </button>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border ${
                    ticket?.status === 'RESOLVED' 
                      ? 'bg-status-active/10 border-status-active/30 text-status-active' 
                      : 'bg-status-maintenance/10 border-status-maintenance/30 text-status-maintenance'
                  }`}>
                    Ticket Status: {typeof ticket?.status === 'string' ? ticket.status.replace('_', ' ') : String(ticket?.status || 'UNKNOWN')}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-700/50 flex justify-center">
                  <button
                    onClick={() => {
                      setTicket(null);
                      setLabName('');
                      setDescription('');
                    }}
                    className="text-brand-blue-400 hover:text-brand-blue-300 font-bold text-sm transition-colors flex items-center gap-2"
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
