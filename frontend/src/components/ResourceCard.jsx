import React from 'react';
import { MapPin, Users, Clock, Edit, Trash2, ArrowRight } from 'lucide-react';

const ResourceCard = ({ resource, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const isActive = status === 'ACTIVE';
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${
        isActive 
        ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20 glow-accent' 
        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${isActive ? 'bg-accent-500 animate-pulse' : 'bg-rose-500'}`}></span>
        {isActive ? 'Active' : 'Offline'}
      </span>
    );
  };

  const formatType = (type) => {
    return type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <div className="group relative bg-dark-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 hover:bg-dark-card/60 hover:border-primary-500/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(139,92,246,0.15)] overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] block">
              {formatType(resource.type)}
            </span>
            <h3 className="text-xl font-black text-white group-hover:text-primary-100 transition-colors leading-tight tracking-tight">
              {resource.name}
            </h3>
          </div>
          {getStatusBadge(resource.status)}
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="flex items-center text-dark-text/70 bg-dark-bg/40 p-3 rounded-2xl border border-white/5">
            <div className="p-2 bg-dark-card rounded-xl mr-3 ring-1 ring-white/5 shadow-inner">
              <MapPin className="h-4 w-4 text-primary-400" />
            </div>
            <span className="text-sm font-semibold">{resource.location}</span>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 flex items-center text-dark-text/70 bg-dark-bg/40 p-3 rounded-2xl border border-white/5">
              <Users className="h-4 w-4 mr-3 text-accent-400" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-dark-muted">Capacity</span>
                <span className="text-sm text-dark-text font-black">{resource.capacity}</span>
              </div>
            </div>
            <div className="flex-1 flex items-center text-dark-text/70 bg-dark-bg/40 p-3 rounded-2xl border border-white/5">
              <Clock className="h-4 w-4 mr-3 text-primary-400" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-dark-muted">Window</span>
                <span className="text-sm text-dark-text font-black text-nowrap">{resource.availabilityStartTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(resource)}
              className="p-3 bg-dark-card hover:bg-primary-600/20 rounded-2xl text-dark-muted hover:text-primary-400 transition-all border border-white/5 hover:border-primary-500/30"
              title="Edit Node"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(resource.id)}
              className="p-3 bg-dark-card hover:bg-rose-500/10 rounded-2xl text-dark-muted hover:text-rose-400 transition-all border border-white/5 hover:border-rose-500/20"
              title="Shutdown Resource"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 text-[10px] font-black text-accent-400 uppercase tracking-[0.2em] hover:text-accent-300 transition-colors group/btn">
            Connect <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
