import React from 'react';
import { Search, Filter, Users, Tag, ShieldCheck } from 'lucide-react';

const ResourceFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  filterStatus, 
  setFilterStatus,
  minCapacity,
  setMinCapacity,
  onReset 
}) => {
  const hasFilters = searchTerm || filterType || filterStatus || minCapacity;

  return (
    <div className="relative group">
      {/* Decorative background glow for the filter area */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/10 via-dark-card to-accent-500/10 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-dark-card/60 backdrop-blur-xl border border-white/5 p-5 lg:p-6 rounded-[2rem] shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {/* Enhanced Search */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-primary-400 group-focus-within/input:text-primary-300 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search assets or locations..."
              className="block w-full pl-11 pr-4 py-3.5 border border-white/5 rounded-2xl bg-dark-bg/60 text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all font-semibold text-sm group-hover/input:bg-dark-bg/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Type Filter */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-accent-400" />
            </div>
            <select
              className="block w-full pl-11 pr-4 py-3.5 border border-white/5 rounded-2xl bg-dark-bg/60 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all font-semibold text-sm group-hover/input:bg-dark-bg/80 appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="LECTURE_HALL">Lecture Theatres</option>
              <option value="LAB">Research Labs</option>
              <option value="MEETING_ROOM">Executive Meeting</option>
              <option value="EQUIPMENT">Field Equipment</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ShieldCheck className="h-4 w-4 text-primary-400" />
            </div>
            <select
              className="block w-full pl-11 pr-4 py-3.5 border border-white/5 rounded-2xl bg-dark-bg/60 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all font-semibold text-sm group-hover/input:bg-dark-bg/80 appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Operational Status</option>
              <option value="ACTIVE">System Active</option>
              <option value="OUT_OF_SERVICE">Under Maintenance</option>
            </select>
          </div>

          {/* Capacity Filter */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Users className="h-4 w-4 text-accent-400" />
            </div>
            <input
              type="number"
              placeholder="Min Capacity"
              className="block w-full pl-11 pr-4 py-3.5 border border-white/5 rounded-2xl bg-dark-bg/60 text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/50 transition-all font-semibold text-sm group-hover/input:bg-dark-bg/80"
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={onReset}
            disabled={!hasFilters}
            className={`flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl transition-all duration-500 font-extrabold text-xs tracking-[0.2em] uppercase overflow-hidden relative group/btn ${
              hasFilters 
              ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-xl shadow-primary-600/20' 
              : 'bg-dark-bg/40 text-dark-muted border border-white/5'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
            <Filter className={`h-4 w-4 ${hasFilters ? 'animate-pulse' : ''}`} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceFilter;
