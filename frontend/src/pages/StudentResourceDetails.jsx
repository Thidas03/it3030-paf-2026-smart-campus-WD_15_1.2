import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Clock, Box, Info, Shield, Layers, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext.jsx';

const StudentResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? isoString : date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? isoString : date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="min-h-screen bg-dark-bg pt-20 relative"><LoadingSpinner message="Accessing nodal data..." /></div>;
  if (!resource) return null;

  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] relative">
      <div className="p-6 space-y-6 max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-dark-muted hover:text-white transition-colors group mb-4"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Catalogue</span>
        </button>

        {/* Hero Section */}
        <div className="glass rounded-2xl p-8 relative overflow-hidden group">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="h-64 w-64" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] text-primary-400">
                            <Box className="h-8 w-8" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em] mb-1">
                                Resource Profile
                            </div>
                            <h1 className="text-xl font-semibold text-white">
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
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-primary-500/30 transition-all duration-300">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary-400" />
                        Technical Specifications
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <div className="text-xs text-dark-muted font-medium">Facility Category</div>
                            <div className="text-white font-semibold flex items-center gap-2">
                                <Layers className="h-4 w-4 text-dark-muted" />
                                {formatType(resource.type)}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-dark-muted font-medium">Max Capacity</div>
                            <div className="text-white font-semibold flex items-center gap-2">
                                <Users className="h-4 w-4 text-dark-muted" />
                                {resource.capacity} People (PAX)
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-dark-muted font-medium">Physical Location</div>
                            <div className="text-white font-semibold flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-dark-muted" />
                                {resource.location}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs text-dark-muted font-medium">Status ID</div>
                            <div className="text-white font-mono text-[11px] bg-dark-bg/80 px-2 py-1 rounded border border-white/10 inline-block">
                                NODE_{resource.id?.substring(0, 8).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Placeholder / Additional Info */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-primary-500/30 transition-all duration-300">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary-400" />
                        Usage Protocol
                    </h2>
                    <p className="text-sm text-slate-300">
                        This facility is a part of the Smart Campus Infrastructure Lattice. Access is granted based on current operational status and institutional policy. Please ensure you follow all campus guidelines when utilizing these resources.
                    </p>
                </div>
            </div>

            {/* Sidebar / Operational Info */}
            <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-primary-500/30 transition-all duration-300">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary-400" />
                        Operational Hours
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1 p-3 bg-dark-bg/50 rounded-xl border border-white/5 hover:border-primary-500/30 transition-colors">
                            <span className="text-[10px] text-dark-muted font-bold uppercase tracking-widest">Start Time</span>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">{formatDate(resource.availabilityStartTime)}</span>
                                <span className="text-primary-400 font-mono font-bold tracking-tight">{formatTime(resource.availabilityStartTime)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-dark-bg/50 rounded-xl border border-white/5 hover:border-primary-500/30 transition-colors">
                            <span className="text-[10px] text-dark-muted font-bold uppercase tracking-widest">End Time</span>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">{formatDate(resource.availabilityEndTime)}</span>
                                <span className="text-primary-400 font-mono font-bold tracking-tight">{formatTime(resource.availabilityEndTime)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                        <div className="flex items-center gap-3 text-[11px] text-dark-muted">
                             <Calendar className="h-3.5 w-3.5" />
                             Available Monday — Friday
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-dark-muted">
                             <Shield className="h-3.5 w-3.5" />
                             Subject to dynamic allocation
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-primary-500/30 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-2">Need to Book?</h3>
                    <p className="text-sm text-slate-300 mb-4">
                        Reservation services for this facility are managed through the centralized booking hub.
                    </p>
                    <button 
                      onClick={() => {
                        if (!user) {
                          navigate('/signup');
                          return;
                        }
                        
                        let queryParams = `?resourceId=${encodeURIComponent(resource.id)}&resourceName=${encodeURIComponent(resource.name)}`;
                        if (resource.availabilityStartTime) {
                          try {
                             const d = new Date(resource.availabilityStartTime);
                             if (!isNaN(d.getTime())) {
                                const dStr = d.toISOString().split('T')[0];
                                const tStr = d.toTimeString().substring(0, 5); // HH:mm
                                queryParams += `&bookingDate=${encodeURIComponent(dStr)}&startTime=${encodeURIComponent(tStr)}`;
                             }
                          } catch (e) {}
                        }
                        if (resource.availabilityEndTime) {
                          try {
                             const d = new Date(resource.availabilityEndTime);
                             if (!isNaN(d.getTime())) {
                                const tStr = d.toTimeString().substring(0, 5); // HH:mm
                                queryParams += `&endTime=${encodeURIComponent(tStr)}`;
                             }
                          } catch (e) {}
                        }
                        navigate(`/bookings${queryParams}`);
                      }}
                      className="w-full bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg glow-primary transition-all duration-300 font-semibold"
                    >
                        Go to Reservations
                    </button>
                </div>

                {/* Report Issue Action */}
                <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-rose-500/30 transition-all duration-300 mt-6">
                    <h3 className="text-lg font-semibold text-rose-400 mb-2 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Found an Issue?
                    </h3>
                    <p className="text-sm text-slate-300 mb-4">
                        Help us maintain our facilities by reporting any broken equipment or maintenance needs.
                    </p>
                    <button 
                      onClick={() => navigate(`/raise-ticket?name=${encodeURIComponent(resource.name)}&type=${encodeURIComponent(resource.type)}&location=${encodeURIComponent(resource.location || '')}`)}
                      className="w-full bg-dark-bg hover:bg-rose-500/10 text-rose-400 border border-white/10 hover:border-rose-500/50 px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-sm"
                    >
                        Report an Issue
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResourceDetails;
