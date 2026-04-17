import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { LayoutDashboard, CheckCircle2, Wrench, AlertTriangle, Layers } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api/resources';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/dashboard-stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ['#22c55e', '#facc15', '#ef4444']; // Active, Maintenance, Out of Service

  const getPieData = () => {
    if (!stats) return [];
    return [
      { name: 'Active', value: stats.activeResources },
      { name: 'Maintenance', value: stats.maintenanceResources },
      { name: 'Out of Service', value: stats.outOfServiceResources }
    ];
  };

  const getBarData = () => {
    if (!stats || !stats.resourcesByType) return [];
    
    return Object.entries(stats.resourcesByType).map(([key, value]) => ({
      name: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
      count: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/10 p-2.5 rounded-lg border border-blue-500/20">
            <LayoutDashboard className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">System Analytics</h1>
            <p className="text-sm text-slate-400 mt-1">Real-time overview of campus infrastructure and facilities.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 relative overflow-hidden group flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-500/10 rounded-full w-24 h-24 blur-xl group-hover:bg-blue-500/20 transition-all"></div>
            <Layers className="h-6 w-6 text-blue-400 mb-2" />
            <span className="text-2xl font-bold text-white mb-1">{stats?.totalResources || 0}</span>
            <span className="text-xs text-slate-400">Total Resources</span>
          </div>
          
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 relative overflow-hidden group flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-emerald-500/5 rounded-full w-24 h-24 blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
            <CheckCircle2 className="h-6 w-6 text-emerald-500 mb-2" />
            <span className="text-2xl font-bold text-white mb-1">{stats?.activeResources || 0}</span>
            <span className="text-xs text-slate-400">Active</span>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 relative overflow-hidden group flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-amber-500/5 rounded-full w-24 h-24 blur-xl group-hover:bg-amber-500/20 transition-all"></div>
            <Wrench className="h-6 w-6 text-amber-500 mb-2" />
            <span className="text-2xl font-bold text-white mb-1">{stats?.maintenanceResources || 0}</span>
            <span className="text-xs text-slate-400">Maintenance</span>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 relative overflow-hidden group flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-rose-500/5 rounded-full w-24 h-24 blur-xl group-hover:bg-rose-500/20 transition-all"></div>
            <AlertTriangle className="h-6 w-6 text-rose-500 mb-2" />
            <span className="text-2xl font-bold text-white mb-1">{stats?.outOfServiceResources || 0}</span>
            <span className="text-xs text-slate-400">Out of Service</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Status Distribution Pie Chart */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200">
            <h3 className="text-sm font-semibold text-slate-300 mb-6 uppercase tracking-wider flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500"></div> Overall Health Status
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPieData()}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {getPieData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '13px', color: '#94a3b8' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resources By Type Bar Chart */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200">
            <h3 className="text-sm font-semibold text-slate-300 mb-6 uppercase tracking-wider flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Distribution by Category
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getBarData()}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip 
                    cursor={{fill: '#334155', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40}>
                    {getBarData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        index % 4 === 0 ? '#6366f1' : 
                        index % 4 === 1 ? '#8b5cf6' : 
                        index % 4 === 2 ? '#ec4899' : '#3b82f6'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
