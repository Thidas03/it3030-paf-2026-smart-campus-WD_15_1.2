import React from 'react';
import { Edit, Trash2, MapPin, Users, Clock, Tag } from 'lucide-react';

const ResourceTable = ({ resources, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Maintenance
          </span>
        );
      case 'OUT_OF_SERVICE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Out of Service
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-700 text-slate-300">
            {status}
          </span>
        );
    }
  };

  const formatType = (type) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-700 bg-slate-800/50">
            <th className="px-4 py-3 text-sm font-medium text-slate-300">Name</th>
            <th className="px-4 py-3 text-sm font-medium text-slate-300">Type</th>
            <th className="px-4 py-3 text-sm font-medium text-slate-300">Capacity</th>
            <th className="px-4 py-3 text-sm font-medium text-slate-300">Location</th>
            <th className="px-4 py-3 text-sm font-medium text-slate-300">Window</th>
            <th className="px-4 py-3 text-sm font-medium text-slate-300">Status</th>
            <th className="px-4 py-3 text-sm font-medium text-slate-300 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {resources.map((resource) => (
            <tr key={resource.id} className="hover:bg-slate-700/50 transition-colors group">
              <td className="px-4 py-2 text-sm font-medium text-slate-200">
                {resource.name}
              </td>
              <td className="px-4 py-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5 text-slate-500" />
                  {formatType(resource.type)}
                </div>
              </td>
              <td className="px-4 py-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-slate-500" />
                  {resource.capacity}
                </div>
              </td>
              <td className="px-4 py-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {resource.location}
                </div>
              </td>
              <td className="px-4 py-2 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span className="tabular-nums">
                    {resource.availabilityStartTime} — {resource.availabilityEndTime}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {getStatusBadge(resource.status)}
              </td>
              <td className="px-4 py-2 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(resource)}
                    className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(resource.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors"
                    title="Delete"
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
