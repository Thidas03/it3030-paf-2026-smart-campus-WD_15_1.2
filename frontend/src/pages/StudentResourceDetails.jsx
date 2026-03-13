import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Clock, Box, Info, Shield, Layers, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResourceDetails();
  }, [id]);

  const fetchResourceDetails = async () => {
    try {
      setLoading(true);
      const response = await resourceService.getResourceById(id);
      setResource(response.data);
    } catch (error) {
      console.error('API Error:', error);
      toast.error('Failed to load resource details.');
      navigate('/student/resources');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Currently Available
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
            Under Maintenance
          </span>
        );
      case 'OUT_OF_SERVICE':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
            Currently Unavailable
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
            {status}
          </span>
        );
    }
  };

  const formatType = (type) => {
    if (!type) return '';
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) return <div className="min-h-screen bg-slate-900 pt-20"><LoadingSpinner message="Accessing nodal data..." /></div>;
  if (!resource) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-4"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Catalogue</span>
        </button>

        {/* Hero Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl relative overflow-hidden">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="h-64 w-64" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600/10 p-3 rounded-xl border border-blue-500/20 text-blue-500">
                            <Box className="h-8 w-8" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">
                                Resource Profile
                            </div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                {resource.name}
                            </h1>
                        </div>
                    </div>
                </div>
                <div>
                    {getStatusBadge(resource.status)}
                </div>
            </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Info Card */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        Technical Specifications
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Facility Category</div>
                            <div className="text-slate-200 font-semibold flex items-center gap-2">
                                <Layers className="h-4 w-4 text-slate-500" />
                                {formatType(resource.type)}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Max Capacity</div>
                            <div className="text-slate-200 font-semibold flex items-center gap-2">
                                <Users className="h-4 w-4 text-slate-500" />
                                {resource.capacity} People (PAX)
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Physical Location</div>
                            <div className="text-slate-200 font-semibold flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-slate-500" />
                                {resource.location}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Status ID</div>
                            <div className="text-slate-200 font-mono text-[11px] bg-slate-900 px-2 py-1 rounded border border-slate-700 inline-block">
                                NODE_{resource.id?.substring(0, 8).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Placeholder / Additional Info */}
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        Usage Protocol
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        This facility is a part of the Smart Campus Infrastructure Lattice. Access is granted based on current operational status and institutional policy. Please ensure you follow all campus guidelines when utilizing these resources.
                    </p>
                </div>
            </div>

            {/* Sidebar / Operational Info */}
            <div className="space-y-6">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Operational Hours
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700/50">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Start Time</span>
                            <span className="text-blue-400 font-mono font-bold">{resource.availabilityStartTime}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700/50">
                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">End Time</span>
                            <span className="text-blue-400 font-mono font-bold">{resource.availabilityEndTime}</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                             <Calendar className="h-3.5 w-3.5" />
                             Available Monday — Friday
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                             <Shield className="h-3.5 w-3.5" />
                             Subject to dynamic allocation
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-blue-600 rounded-2xl p-6 shadow-lg shadow-blue-900/20">
                    <h3 className="text-white font-bold mb-2">Need to Book?</h3>
                    <p className="text-blue-100 text-xs mb-4 leading-relaxed">
                        Reservation services for this facility are managed through the centralized booking hub.
                    </p>
                    <button 
                      onClick={() => toast.success('Redirecting to Booking Hub...')}
                      className="w-full py-2.5 bg-white text-blue-600 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-colors shadow-inner"
                    >
                        Go to Reservations
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResourceDetails;
