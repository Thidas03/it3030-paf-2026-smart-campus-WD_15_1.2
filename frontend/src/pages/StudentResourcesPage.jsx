import React, { useState, useEffect, useMemo } from 'react';
import { PackageSearch, RefreshCw, Layers, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import ResourceCard from '../components/ResourceCard';
import ResourceFilter from '../components/ResourceFilter';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

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
       toast.error('Failed to load resources. Please try again later.', {
         style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' }
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
    <div className="min-h-screen bg-slate-900">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/10 p-2.5 rounded-lg border border-blue-500/20">
              <Layers className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Campus Resources</h1>
              <p className="text-sm text-slate-400">Browse and explore available campus facilities.</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200">
          <div className="flex items-center gap-2 mb-4 text-slate-300">
            <Filter className="h-4 w-4" />
            <h2 className="text-sm font-medium">Search & Filter</h2>
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
              <LoadingSpinner message="Discovering facilities..." />
            ) : filteredResources.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((res) => (
                    <ResourceCard 
                      key={res.id} 
                      resource={res} 
                      isAdmin={false} // Student view
                    />
                  ))}
                </div>
                
                {/* Stats Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 rounded-lg border border-slate-700 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span>Available Resources: <span className="text-slate-200 font-medium">{filteredResources.length}</span></span>
                  </div>
                  <div>Campus Operations Hub</div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 flex flex-col items-center text-center shadow-sm">
                <div className="bg-slate-900 p-6 rounded-full mb-6 border border-slate-700">
                  <PackageSearch className="h-12 w-12 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No resources found</h3>
                <p className="text-sm text-slate-400 max-w-sm mb-8">
                  Adjust your search or filters to discover campus facilities.
                </p>
                <button 
                  onClick={handleResetFilters}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
                >
                  Reset all filters
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default StudentResourcesPage;
