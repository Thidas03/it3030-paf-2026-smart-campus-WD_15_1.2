import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineArrowLeft, HiOutlineLightningBolt, HiOutlineShieldExclamation, HiOutlineCheckCircle } from 'react-icons/hi';
import { Shield } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';

const StudentTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const fetchTickets = async (showLoading = true) => {
      if (showLoading) setLoading(true);
      try {
        let allTickets = [];

        // Fetch tickets for the authenticated student
        if (user?.id) {
          try {
            const authResponse = await axiosClient.get(`/tickets/user/${user.id}`);
            if (authResponse.data) {
              allTickets = [...authResponse.data];
            }
          } catch (err) {
            console.error('Failed to fetch user tickets', err);
          }
        }

        // Sort by newest first
        allTickets.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (isMounted) {
          setTickets(allTickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        if (isMounted && showLoading) {
          setLoading(false);
        }
      }
    };

    fetchTickets(true);
    intervalId = setInterval(() => fetchTickets(false), 5000);

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [user?.id]);

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

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? isoString : date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative pb-12 w-full">
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Shield className="h-7 w-7 text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">My Support Tickets</h1>
              <p className="text-sm text-dark-muted mt-1">Track the status of the issues you have reported.</p>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/5 p-1 relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px] pointer-events-none transition-colors duration-700"></div>
          
           {loading ? (
             <LoadingSpinner message="Fetching your tickets..." />
           ) : (
             <div className="overflow-x-auto relative z-10 p-4">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="text-[11px] font-semibold tracking-widest uppercase text-dark-muted border-b border-white/10">
                     <th className="px-4 py-4">Resource / Location</th>
                     <th className="px-4 py-4">Issue Description</th>
                     <th className="px-4 py-4">Priority</th>
                     <th className="px-4 py-4">Status</th>
                     <th className="px-4 py-4 text-right">Created</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {tickets.length === 0 ? (
                     <tr>
                       <td colSpan="5" className="text-center text-dark-muted text-sm py-12">
                         You have not reported any issues yet.
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
                         <td className="px-4 py-4 text-right text-xs text-dark-muted whitespace-nowrap tabular-nums">
                           {formatDate(ticket.createdAt)}
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

export default StudentTicketsPage;
