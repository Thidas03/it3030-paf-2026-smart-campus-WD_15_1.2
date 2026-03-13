import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, Plus, PackageSearch, Sparkles, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import ResourceTable from '../components/ResourceTable';
import ResourceCard from '../components/ResourceCard';
import ResourceFormModal from '../components/ResourceFormModal';
import ResourceFilter from '../components/ResourceFilter';

const FacilitiesAssetsPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

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
      setResources(response.data);
    } catch (error) {
       console.error('API Error:', error);
       toast.error('Unable to connect to the smart campus node. Please ensure the backend is running on port 8081.', {
         duration: 5000,
         icon: '⚡'
       });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Initialize permanent deletion of this asset record?')) {
      try {
        await resourceService.deleteResource(id);
        toast.success('Asset decentralized successfully');
        fetchResources();
      } catch (error) {
        toast.error('De-linking failed');
      }
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

  const filteredResources = resources.filter(res => {
    const name = res.name || '';
    const location = res.location || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || res.type === filterType;
    const matchesStatus = !filterStatus || res.status === filterStatus;
    const matchesCapacity = !minCapacity || res.capacity >= (parseInt(minCapacity) || 0);
    
    return matchesSearch && matchesType && matchesStatus && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px] animate-glow-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[130px] animate-glow-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto p-6 lg:p-10 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent-400 font-extrabold text-[10px] uppercase tracking-[0.4em]">
              <Zap className="h-4 w-4 fill-accent-400/20" /> Unified Operations Node
            </div>
            <h1 className="text-4xl lg:text-6xl font-[900] tracking-tight text-gradient-cyber">
              Facilities <span className="text-primary-500">&</span> Assets
            </h1>
            <p className="text-dark-muted text-lg max-w-xl font-medium">
              Real-time synchronization and management of the university's physical infrastructure.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass rounded-[1.25rem] p-1.5 flex shadow-2xl ring-1 ring-white/5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'table' ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'text-dark-muted hover:text-white'}`}
                title="Grid Statistics"
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'card' ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' : 'text-dark-muted hover:text-white'}`}
                title="Terminal View"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
            
            <button
              onClick={handleAdd}
              className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-[1.25rem] font-bold transition-all shadow-2xl shadow-primary-600/20 flex items-center gap-3 transform hover:scale-[1.02] active:scale-[0.98] ring-1 ring-primary-400/30"
            >
              <Plus className="h-6 w-6 stroke-[3]" /> Create Asset
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
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
              <div className="flex flex-col items-center justify-center py-32 space-y-8">
                <div className="relative">
                    <div className="h-24 w-24 border-4 border-primary-500/10 border-t-accent-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-primary-500">
                        <Sparkles className="h-8 w-8 animate-pulse" />
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-dark-text font-black tracking-[0.3em] uppercase text-xs mb-2">Downloading Assets...</p>
                    <p className="text-dark-muted text-[10px] font-bold uppercase tracking-widest">Secure Connection Active</p>
                </div>
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                {viewMode === 'table' ? (
                  <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                    <ResourceTable resources={filteredResources} onEdit={handleEdit} onDelete={handleDelete} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((res, idx) => (
                      <div key={res.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500" style={{ animationDelay: `${idx * 40}ms` }}>
                        <ResourceCard resource={res} onEdit={handleEdit} onDelete={handleDelete} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="glass border-2 border-dashed border-white/5 rounded-[3.5rem] p-24 flex flex-col items-center text-center group hover:border-primary-500/20 transition-all duration-700">
                <div className="bg-dark-card border border-white/5 p-10 rounded-[2.5rem] mb-8 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-700 glow-primary">
                  <PackageSearch className="h-20 w-20 text-dark-muted group-hover:text-accent-400 transition-colors" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Zero Assets Synchronized</h3>
                <p className="text-dark-muted max-w-md mb-12 text-lg font-medium leading-relaxed">
                  No records found in the current node. Adjust your data filters or initialize a new asset record.
                </p>
                <button 
                  onClick={handleAdd}
                  className="bg-primary-600/10 hover:bg-primary-600 text-primary-400 hover:text-white px-10 py-5 rounded-2xl transition-all font-bold flex items-center gap-3 border border-primary-500/30 shadow-2xl hover:shadow-primary-600/20"
                >
                  <Plus className="h-6 w-6" /> Initialize First Asset
                </button>
              </div>
            )}
        </div>

        {/* Modal */}
        <ResourceFormModal 
          isOpen={isModalOpen}
          resource={selectedResource}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchResources}
        />
      </div>
    </div>
  );
};

export default FacilitiesAssetsPage;
