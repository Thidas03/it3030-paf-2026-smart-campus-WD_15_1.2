import React from 'react';
import { Edit, Trash2, MapPin, Users, Clock, Box, LayoutPanelLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ resource, onEdit, onDelete, isAdmin = true }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs">
            Active
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="text-amber-400 bg-amber-500/10 px-2 py-1 rounded text-xs">
            Maintenance
          </span>
        );
      case 'OUT_OF_SERVICE':
        return (
          <span className="text-rose-400 bg-rose-500/10 px-2 py-1 rounded text-xs">
            Offline
          </span>
        );
      default:
        return (
          <span className="text-slate-300 bg-slate-700 px-2 py-1 rounded text-xs">
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
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/10 p-2 rounded-md text-blue-500">
            <Box className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white truncate max-w-[150px]">
              {resource.name}
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              {formatType(resource.type)}
            </p>
          </div>
        </div>
        <div>
          {getStatusBadge(resource.status)}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{resource.location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Users className="h-4 w-4 text-slate-500" />
          <span>{resource.capacity} PAX</span>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-300 bg-slate-900/50 p-3 rounded-md border border-slate-700/50">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-blue-500/70" />
            <span className="text-xs font-medium">
              {formatDate(resource.availabilityStartTime)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-blue-500/70" />
            <span className="text-xs uppercase font-medium tabular-nums tracking-tighter">
              {formatTime(resource.availabilityStartTime)} — {formatTime(resource.availabilityEndTime)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {isAdmin ? (
          <>
            <button
              onClick={() => onEdit(resource)}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
            >
              <Edit className="h-3.5 w-3.5" /> Edit
            </button>
            <button
              onClick={() => onDelete(resource.id)}
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs transition duration-200"
              title="Delete Default Danger"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate(`/student/resources/${resource.id}`)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition duration-200 active:scale-95"
          >
            <LayoutPanelLeft className="h-4 w-4" /> View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
