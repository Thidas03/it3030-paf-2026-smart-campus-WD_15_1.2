import React from 'react';
import { Edit, Trash2, MapPin, Users, Clock, Tag, Calendar, AlertCircle } from 'lucide-react';

const ResourceTable = ({ resources, onEdit, onDelete, onReportIssue }) => {
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
            Out of Service
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
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs uppercase text-slate-400 border-b border-slate-700">
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Capacity</th>
            <th className="px-3 py-2 font-medium">Location</th>
            <th className="px-3 py-2 font-medium">Window</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {resources.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-slate-400 text-sm py-8">
                No resources found
              </td>
            </tr>
          ) : (
            resources.map((resource) => (
              <tr key={resource.id} className="text-sm hover:bg-slate-800 transition duration-200 odd:bg-slate-800/40 group">
                <td className="px-3 py-2 font-medium text-slate-200">
                  {resource.name}
                </td>
                <td className="px-3 py-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-slate-500" />
                    {formatType(resource.type)}
                  </div>
                </td>
                <td className="px-3 py-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-slate-500" />
                    {resource.capacity}
                  </div>
                </td>
                <td className="px-3 py-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    {resource.location}
                  </div>
                </td>
                <td className="px-3 py-2 text-slate-400">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      <span className="text-xs">{formatDate(resource.availabilityStartTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span className="text-xs tabular-nums">
                        {formatTime(resource.availabilityStartTime)} — {formatTime(resource.availabilityEndTime)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {getStatusBadge(resource.status)}
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex items-center justify-end gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {onReportIssue && (
                      <span
                        title={
                          resource.status === 'OUT_OF_SERVICE'
                            ? 'Cannot report while resource is out of service'
                            : 'Report maintenance issue'
                        }
                      >
                        <button
                          type="button"
                          onClick={() => onReportIssue(resource)}
                          disabled={resource.status === 'OUT_OF_SERVICE'}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition duration-200 disabled:opacity-40 disabled:pointer-events-none"
                        >
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          Report Issue
                        </button>
                      </span>
                    )}
                    <button
                      onClick={() => onEdit(resource)}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition duration-200"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(resource.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition duration-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
