import React from 'react';
import { Edit, Trash2, Users, MapPin, Clock, Zap } from 'lucide-react';

const ResourceTable = ({ resources, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const isActive = status === 'ACTIVE';
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        isActive 
        ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20 glow-accent' 
        : 'bg-dark-muted/10 text-dark-muted border border-dark-muted/20'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${isActive ? 'bg-accent-500' : 'bg-dark-muted'}`}></span>
        {isActive ? 'ACTIVE' : 'OFFLINE'}
      </span>
    );
  };

  const formatType = (type) => {
    return type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.01]">
            <th className="px-8 py-6 text-left text-[10px] font-black text-dark-muted uppercase tracking-[0.25em]">Global Identification</th>
            <th className="px-8 py-6 text-left text-[10px] font-black text-dark-muted uppercase tracking-[0.25em]">Technical Meta</th>
            <th className="px-8 py-6 text-left text-[10px] font-black text-dark-muted uppercase tracking-[0.25em]">Uptime Window</th>
            <th className="px-8 py-6 text-left text-[10px] font-black text-dark-muted uppercase tracking-[0.25em]">Node Status</th>
            <th className="px-8 py-6 text-right text-[10px] font-black text-dark-muted uppercase tracking-[0.25em]">Operations</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.02]">
          {resources.map((resource) => (
            <tr key={resource.id} className="hover:bg-primary-500/[0.03] transition-colors group">
              <td className="px-8 py-7 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-11 w-11 rounded-1.5xl bg-dark-bg border border-white/5 flex items-center justify-center text-primary-400 mr-4 group-hover:scale-110 transition-all duration-500 shadow-inner ring-1 ring-white/5">
                        <Zap className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                    </div>
                    <div>
                        <div className="text-sm font-black text-white group-hover:text-primary-100 transition-colors uppercase tracking-tight">{resource.name}</div>
                        <div className="text-[10px] font-black text-primary-500/60 uppercase mt-0.5 tracking-wider">{formatType(resource.type)}</div>
                    </div>
                </div>
              </td>
              <td className="px-8 py-7 whitespace-nowrap">
                <div className="space-y-2">
                    <div className="flex items-center text-xs font-semibold text-dark-text/80">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-primary-500 opacity-60" />
                        {resource.location}
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-dark-muted">
                        <Users className="h-3.5 w-3.5 mr-2 text-accent-500 opacity-60" />
                        Limit: <span className="text-dark-text ml-1.5 font-black">{resource.capacity} PAX</span>
                    </div>
                </div>
              </td>
              <td className="px-8 py-7 whitespace-nowrap">
                <div className="flex items-center gap-3 bg-dark-bg/60 w-fit px-4 py-2.5 rounded-xl border border-white/5 shadow-inner">
                  <Clock className="h-3.5 w-3.5 text-amber-500/70" />
                  <span className="text-xs font-black text-dark-text tracking-tighter">
                    {resource.availabilityStartTime} — {resource.availabilityEndTime}
                  </span>
                </div>
              </td>
              <td className="px-8 py-7 whitespace-nowrap">
                {getStatusBadge(resource.status)}
              </td>
              <td className="px-8 py-7 whitespace-nowrap text-right">
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={() => onEdit(resource)}
                    className="p-3 bg-dark-card hover:bg-primary-600/20 text-dark-muted hover:text-primary-400 rounded-xl transition-all border border-white/5 shadow-xl ring-1 ring-white/5"
                    title="Access Node"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(resource.id)}
                    className="p-3 bg-rose-500/10 hover:bg-rose-500/20 text-dark-muted hover:text-rose-500 rounded-xl transition-all border border-rose-500/20"
                    title="Terminate Sync"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
