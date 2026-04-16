import React from 'react';
import { Edit, Trash2, MapPin, Users, Clock, Box, LayoutPanelLeft, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ resource, onEdit, onDelete, onReportIssue, isAdmin = true }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md text-xs shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            Active
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md text-xs shadow-[0_0_10px_rgba(245,158,11,0.1)]">
            Maintenance
          </span>
        );
      case 'OUT_OF_SERVICE':
        return (
          <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-md text-xs shadow-[0_0_10px_rgba(244,63,94,0.1)]">
            Offline
          </span>
        );
      default:
        return (
          <span className="text-slate-300 bg-slate-700 px-2 py-1 rounded-md text-xs border border-slate-600">
            {status}
          </span>
        );
    }
  };

  const formatType = (type) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? isoString : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? isoString : date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-card rounded-2xl p-5 shadow-sm hover:glow-primary transition-all duration-300 group flex flex-col h-full bg-dark-card border border-dark-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-[40px] -mt-10 -mr-10 pointer-events-none group-hover:bg-primary-500/10 transition-colors duration-500"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex flex-col gap-3">
          <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-2.5 rounded-xl border border-primary-500/20 text-primary-400 w-fit group-hover:scale-110 transition-transform duration-300">
            <Box className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-[17px] font-semibold text-white tracking-tight leading-tight group-hover:text-primary-300 transition-colors line-clamp-1">
              {resource.name}
            </h3>
            <p className="text-[10px] text-accent-400 uppercase tracking-widest font-semibold mt-1">
              {formatType(resource.type)}
            </p>
          </div>
        </div>
        <div>
          {getStatusBadge(resource.status)}
        </div>
      </div>

      <div className="space-y-4 mb-6 relative z-10 flex-grow">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <div className="p-1.5 rounded-lg bg-dark-bg/50 border border-white/5">
            <MapPin className="h-3.5 w-3.5 text-accent-400" />
          </div>
          <span className="font-medium">{resource.location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
           <div className="p-1.5 rounded-lg bg-dark-bg/50 border border-white/5">
             <Users className="h-3.5 w-3.5 text-accent-400" />
           </div>
          <span className="font-medium">{resource.capacity} PAX</span>
        </div>
        
        <div className="flex flex-col gap-2.5 text-sm text-slate-300 bg-dark-bg/60 p-3.5 rounded-xl border border-white/5 shadow-inner mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-primary-400" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-dark-muted">Date</span>
            </div>
            <span className="text-xs font-medium text-slate-200">
              {formatDate(resource.availabilityStartTime)}
            </span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary-400" />
               <span className="text-[11px] uppercase tracking-wider font-semibold text-dark-muted">Time</span>
            </div>
            <span className="text-xs uppercase font-semibold tabular-nums tracking-tighter text-slate-200">
              {formatTime(resource.availabilityStartTime)} — {formatTime(resource.availabilityEndTime)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 relative z-10 mt-auto pt-4 border-t border-white/5">
        {isAdmin ? (
          <>
            <button
              onClick={() => onEdit(resource)}
              className="flex-1 flex items-center justify-center gap-2 bg-dark-bg hover:bg-primary-500/10 text-white px-4 py-2.5 rounded-xl text-sm transition-all duration-300 border border-white/10 hover:border-primary-500/50 hover:text-primary-400 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Edit className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => onDelete(resource.id)}
              className="flex items-center justify-center bg-dark-bg hover:bg-rose-500/10 text-white px-4 py-2.5 rounded-xl text-xs transition duration-200 border border-white/10 hover:border-rose-500/50 hover:text-rose-400"
              title="Delete Default Danger"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3 w-full">
            <button
              type="button"
              onClick={() => navigate(`/student/resources/${resource.id}`)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-cyber hover:glow-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95 shadow-lg border border-white/10"
            >
              <LayoutPanelLeft className="h-4 w-4" /> View Details
            </button>
            <span
              className="w-full"
              title={
                resource.status === 'OUT_OF_SERVICE'
                  ? 'Cannot report while resource is out of service'
                  : 'Report maintenance issue'
              }
            >
              <button
                type="button"
                onClick={() => onReportIssue?.(resource)}
                disabled={resource.status === 'OUT_OF_SERVICE'}
                className="w-full inline-flex items-center justify-center gap-2 text-xs px-2 py-2 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white border border-amber-500/20 hover:border-amber-500 transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="font-semibold uppercase tracking-wider">Report Issue</span>
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;

