import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageSearch, RefreshCw, Layers, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import ResourceCard from '../components/ResourceCard';
import ResourceFilter from '../components/ResourceFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ReportIssueModal from '../components/ReportIssueModal';

const StudentResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [minCapacity, setMinCapacity] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [resourceForReport, setResourceForReport] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await resourceService.getAllResources();
      setResources(response.data || []);
    } catch (error) {
       console.error('API Error:', error);
       toast.error('Failed to load resources. Please try again later.', {
         style: { background: '#020617', color: '#f8fafc', border: '1px solid #1e293b' }
       });
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterStatus('');
    setMinCapacity('');
  };

  const handleReportIssue = (resource) => {
    navigate(`/raise-ticket?name=${encodeURIComponent(resource.name)}&type=${encodeURIComponent(resource.type)}&location=${encodeURIComponent(resource.location || '')}`);
  };

  const handleReportIssueSuccess = (resourceId) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resourceId ? { ...r, status: 'MAINTENANCE' } : r))
    );
  };

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const name = res.name || '';
      const location = res.location || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !filterType || res.type === filterType;
      const matchesStatus = !filterStatus || res.status === filterStatus;
      const matchesCapacity = !minCapacity || res.capacity >= (parseInt(minCapacity) || 0);
      
      return matchesSearch && matchesType && matchesStatus && matchesCapacity;
    });
  }, [resources, searchTerm, filterType, filterStatus, minCapacity]);

  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] relative pb-12">
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-accent-500/20 to-primary-500/10 p-3 rounded-xl border border-accent-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Layers className="h-7 w-7 text-accent-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Campus Resources</h1>
              <p className="text-sm text-dark-muted mt-1">Browse and explore available campus facilities.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/student/tickets')}
            className="bg-accent-600 hover:bg-accent-500 text-white px-5 py-2.5 rounded-xl text-sm transition-all duration-300 flex items-center gap-2 shadow-lg glow-accent font-semibold"
          >
            My Support Tickets
          </button>
        </div>

        {/* Filter Section */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-accent-500/10 transition-colors duration-700"></div>
          <div className="flex items-center gap-2 mb-5 text-slate-200 relative z-10">
            <Filter className="h-4 w-4 text-accent-400" />
            <h2 className="text-sm font-semibold tracking-wide uppercase text-accent-400">Search & Filter</h2>
          </div>
          <div className="relative z-10">
            <ResourceFilter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              minCapacity={minCapacity}
              setMinCapacity={setMinCapacity}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative min-h-[400px]">
            {loading ? (
              <LoadingSpinner message="Discovering facilities..." />
            ) : filteredResources.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredResources.map((res) => (
                    <ResourceCard
                      key={res.id}
                      resource={res}
                      isAdmin={false}
                      onReportIssue={handleReportIssue}
                    />
                  ))}
                </div>
                
                {/* Stats Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 glass-card rounded-xl border border-white/5 text-xs text-dark-muted mt-8">
                  <div className="flex items-center gap-6 mb-3 sm:mb-0">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-accent-500/50 border border-accent-500 glow-accent"></span> 
                       Available Resources: <span className="text-white font-semibold">{filteredResources.length}</span>
                    </span>
                  </div>
                  <div className="tracking-widest uppercase font-semibold text-[10px]">Campus Operations Hub</div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-16 flex flex-col items-center text-center shadow-lg border border-white/10">
                <div className="bg-dark-bg/50 p-6 rounded-full mb-8 border border-white/5 shadow-inner">
                  <PackageSearch className="h-12 w-12 text-accent-500/50" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">No resources found</h3>
                <p className="text-sm text-dark-muted max-w-sm mb-8 leading-relaxed">
                  Adjust your search or filters to discover campus facilities.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="bg-dark-bg hover:bg-white/5 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 border border-white/10"
                >
                  Reset all filters
                </button>
              </div>
            )}
        </div>

        <ReportIssueModal
          isOpen={isReportModalOpen}
          resource={resourceForReport}
          onClose={() => {
            setIsReportModalOpen(false);
            setResourceForReport(null);
          }}
          onSuccess={handleReportIssueSuccess}
        />
      </div>
    </div>
  );
};

export default StudentResourcesPage;
