import React, { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, Plus, PackageSearch, RefreshCw, Layers, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import ResourceTable from '../components/ResourceTable';
import ResourceCard from '../components/ResourceCard';
import ResourceFormModal from '../components/ResourceFormModal';
import ResourceFilter from '../components/ResourceFilter';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';

const FacilitiesAssetsPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);

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
         style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' }
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
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' }
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
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/10 p-2.5 rounded-lg border border-blue-500/20">
              <Layers className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Facilities & Assets</h1>
              <p className="text-sm text-slate-400">Manage campus infrastructure and resource allocation.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 rounded-lg p-1 border border-slate-700 flex shadow-sm">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'card' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Card View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
            
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Create Resource
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-300">
            <Filter className="h-4 w-4" />
            <h2 className="text-sm font-medium">Filter Resources</h2>
          </div>
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

        {/* Main Content Area */}
        <div className="relative min-h-[400px]">
            {loading ? (
              <LoadingSpinner message="Fetching campus resources..." />
            ) : filteredResources.length > 0 ? (
              <div className="space-y-4">
                {viewMode === 'table' ? (
                  <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-sm overflow-hidden">
                    <ResourceTable resources={filteredResources} onEdit={handleEdit} onDelete={handleDeleteClick} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((res) => (
                      <ResourceCard key={res.id} resource={res} onEdit={handleEdit} onDelete={handleDeleteClick} />
                    ))}
                  </div>
                )}
                
                {/* Stats Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-700 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>Total: <span className="text-slate-200 font-medium">{filteredResources.length}</span></span>
                    <span>Active: <span className="text-emerald-400 font-medium">{filteredResources.filter(r => r.status === 'ACTIVE').length}</span></span>
                  </div>
                  <div>Showing processed resource nodes</div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-20 flex flex-col items-center text-center shadow-sm">
                <div className="bg-slate-900 p-6 rounded-full mb-6 border border-slate-700">
                  <PackageSearch className="h-12 w-12 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No resources found</h3>
                <p className="text-sm text-slate-400 max-w-sm mb-8">
                  Create a new resource to get started or adjust your filters to find what you're looking for.
                </p>
                <button 
                  onClick={handleAdd}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-sm font-medium transition-all flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Create First Resource
                </button>
              </div>
            )}
        </div>

        {/* Modal: Create/Edit */}
        <ResourceFormModal 
          isOpen={isModalOpen}
          resource={selectedResource}
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
      </div>
    </div>
  );
};

export default FacilitiesAssetsPage;
