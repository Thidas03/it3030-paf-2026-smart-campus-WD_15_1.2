import React, { useState, useEffect } from 'react';
import { HiOutlineLightningBolt, HiOutlineShieldExclamation, HiOutlineCheckCircle } from 'react-icons/hi';
import { Shield } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ticketService from '../services/ticketService';

const TechnicianDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const fetchTicketsTech = async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        const response = await ticketService.getTechnicianTickets(user.id);
        if (isMounted) {
          setTickets(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        if (isMounted && showLoading) {
           setLoading(false);
        }
      }
    };

    if (user?.id) {
      fetchTicketsTech(true);
      intervalId = setInterval(() => fetchTicketsTech(false), 5000);
    } else {
      setLoading(false);
    }
    
    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [user?.id]);

  const updateTicketStatus = async (id, newStatus) => {
    try {
      await ticketService.updateTicketStatus(id, newStatus);
      setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
      toast.success('Ticket status updated successfully!', {
        style: { background: '#020617', color: '#f8fafc', border: '1px solid #1e293b' }
      });
    } catch (error) {
      console.error('Error updating ticket status:', error);
      toast.error('Failed to update ticket status', {
        style: { background: '#020617', color: '#f8fafc', border: '1px solid #1e293b' }
      });
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">High</span>;
      case 'MEDIUM':
        return <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Medium</span>;
      case 'LOW':
        return <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Low</span>;
      default:
        return <span className="text-slate-400 bg-slate-700/50 border border-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">{priority || 'N/A'}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN':
        return <span className="flex items-center gap-1.5 text-primary-400 bg-primary-500/10 border border-primary-500/20 px-2.5 py-1 rounded-md text-xs font-medium"><HiOutlineLightningBolt className="w-3.5 h-3.5"/> Open</span>;
      case 'IN_PROGRESS':
        return <span className="flex items-center gap-1.5 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md text-xs font-medium"><HiOutlineShieldExclamation className="w-3.5 h-3.5"/> In Progress</span>;
      case 'RESOLVED':
        return <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md text-xs font-medium"><HiOutlineCheckCircle className="w-3.5 h-3.5"/> Resolved</span>;
      default:
        return <span className="text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] relative pb-12">
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/10 p-3 rounded-xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
              <Shield className="h-7 w-7 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Technician Dashboard</h1>
              <p className="text-sm text-dark-muted mt-1">Manage and resolve your assigned tickets.</p>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/5 p-1 relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none transition-colors duration-700"></div>
          
           {loading ? (
             <LoadingSpinner message="Fetching your assigned tickets..." />
           ) : (
             <div className="overflow-x-auto relative z-10 p-4">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="text-[11px] font-semibold tracking-widest uppercase text-dark-muted border-b border-white/10">
                     <th className="px-4 py-4">Resource / Location</th>
                     <th className="px-4 py-4">Issue Description</th>
                     <th className="px-4 py-4">Priority</th>
                     <th className="px-4 py-4">Status</th>
                     <th className="px-4 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {tickets.length === 0 ? (
                     <tr>
                       <td colSpan="5" className="text-center text-dark-muted text-sm py-12">
                         No tickets have been assigned to you yet.
                       </td>
                     </tr>
                   ) : (
                     tickets.map((ticket) => (
                       <tr key={ticket.id} className="text-sm hover:bg-white/5 transition duration-200 group">
                         <td className="px-4 py-4 font-medium text-slate-200 max-w-[200px] truncate">
                           {ticket.labName || 'N/A'}
                         </td>
                         <td className="px-4 py-4 text-slate-400 max-w-xs truncate" title={ticket.description}>
                           {ticket.description}
                         </td>
                         <td className="px-4 py-4 whitespace-nowrap">
                           {getPriorityBadge(ticket.priority)}
                         </td>
                         <td className="px-4 py-4 whitespace-nowrap">
                           {getStatusBadge(ticket.status)}
                         </td>
                         <td className="px-4 py-4 text-right whitespace-nowrap">
                           {ticket.status === 'OPEN' && (
                             <button
                               onClick={() => updateTicketStatus(ticket.id, 'IN_PROGRESS')}
                               className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                             >
                               Start Work
                             </button>
                           )}
                           {ticket.status === 'IN_PROGRESS' && (
                             <button
                               onClick={() => updateTicketStatus(ticket.id, 'RESOLVED')}
                               className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm"
                             >
                               Mark as Resolved
                             </button>
                           )}
                           {ticket.status === 'RESOLVED' && (
                             <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                               Completed
                             </span>
                           )}
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default TechnicianDashboard;
