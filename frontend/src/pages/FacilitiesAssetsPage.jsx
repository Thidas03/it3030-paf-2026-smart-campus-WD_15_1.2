import React, { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, Plus, PackageSearch, RefreshCw, Layers, Filter, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import ResourceTable from '../components/ResourceTable';
import ResourceCard from '../components/ResourceCard';
import ResourceFormModal from '../components/ResourceFormModal';
import ResourceFilter from '../components/ResourceFilter';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import ReportIssueModal from '../components/ReportIssueModal';
import LoadingSpinner from '../components/LoadingSpinner';

const FacilitiesAssetsPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [resourceForReport, setResourceForReport] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [minCapacity, setMinCapacity] = useState('');

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
       toast.error('Failed to sync resources from the server.', {
         duration: 4000,
         style: { background: '#020617', color: '#f8fafc', border: '1px solid #1e293b' }
       });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    const resource = resources.find(r => r.id === id);
    setResourceToDelete(resource);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!resourceToDelete) return;
    try {
      await resourceService.deleteResource(resourceToDelete.id);
      toast.success('Resource deleted successfully', {
        style: { background: '#020617', color: '#f8fafc', border: '1px solid #1e293b' }
      });
      setIsDeleteModalOpen(false);
      setResourceToDelete(null);
      fetchResources();
    } catch (error) {
      toast.error('Failed to delete resource');
    }
  };

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedResource(null);
    setIsModalOpen(true);
  };

  const handleReportIssue = (resource) => {
    setResourceForReport(resource);
    setIsReportModalOpen(true);
  };

  const handleReportIssueSuccess = (resourceId) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resourceId ? { ...r, status: 'MAINTENANCE' } : r))
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterStatus('');
    setMinCapacity('');
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
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] relative pb-12">
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Layers className="h-7 w-7 text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Facilities & Assets</h1>
              <p className="text-sm text-dark-muted mt-1">Manage campus infrastructure and resource allocation.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-dark-bg/50 backdrop-blur-md rounded-xl p-1 border border-white/5 flex shadow-sm">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'table' ? 'bg-primary-500/20 text-primary-400 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === 'card' ? 'bg-primary-500/20 text-primary-400 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                title="Card View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={() => window.location.href = '/admin/resource-calendar'}
              className="bg-dark-bg hover:bg-emerald-500/10 text-white px-5 py-2.5 rounded-xl text-sm transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-400 shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Calendar className="h-4 w-4" /> View Calendar
            </button>

            <button
              onClick={handleAdd}
              className="bg-gradient-cyber hover:glow-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] border border-white/10"
            >
              <Plus className="h-4 w-4" /> Create Resource
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary-500/10 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-accent-500/10 transition-colors duration-700"></div>
          
          <div className="flex items-center gap-2 mb-5 text-slate-200 relative z-10">
            <Filter className="h-4 w-4 text-primary-400" />
            <h2 className="text-sm font-semibold tracking-wide uppercase text-primary-400">Filter Resources</h2>
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
              <LoadingSpinner message="Fetching campus resources..." />
            ) : filteredResources.length > 0 ? (
              <div className="space-y-6">
                {viewMode === 'table' ? (
                  <div className="glass rounded-2xl overflow-hidden shadow-lg border border-white/10">
                    <ResourceTable
                      resources={filteredResources}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      onReportIssue={handleReportIssue}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredResources.map((res) => (
                      <ResourceCard key={res.id} resource={res} onEdit={handleEdit} onDelete={handleDeleteClick} />
                    ))}
                  </div>
                )}
                
                {/* Stats Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 glass-card rounded-xl border border-white/5 text-xs text-dark-muted mt-8">
                  <div className="flex items-center gap-6 mb-3 sm:mb-0">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-primary-500/50 border border-primary-500"></span> 
                       Total: <span className="text-white font-semibold">{filteredResources.length}</span>
                    </span>
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50 border border-emerald-500 glow-accent"></span> 
                       Active: <span className="text-emerald-400 font-semibold">{filteredResources.filter(r => r.status === 'ACTIVE').length}</span>
                    </span>
                  </div>
                  <div className="tracking-widest uppercase font-semibold text-[10px]">Showing processed resource nodes</div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-16 flex flex-col items-center text-center shadow-lg border border-white/10">
                <div className="bg-dark-bg/50 p-6 rounded-full mb-8 border border-white/5 shadow-inner">
                  <PackageSearch className="h-12 w-12 text-primary-500/50" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">No resources found</h3>
                <p className="text-sm text-dark-muted max-w-sm mb-8 leading-relaxed">
                  Create a new resource to get started or adjust your filters to find what you're looking for.
                </p>
                <button 
                  onClick={handleAdd}
                  className="bg-gradient-cyber hover:glow-primary text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  <Plus className="h-5 w-5" /> Create First Resource
                </button>
              </div>
            )}
        </div>

        {/* Modal: Create/Edit */}
        <ResourceFormModal 
          isOpen={isModalOpen}
          resource={selectedResource}
          resources={resources}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchResources}
        />

        {/* Modal: Delete Confirmation */}
        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen}
          itemName={resourceToDelete?.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />

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

export default FacilitiesAssetsPage;
