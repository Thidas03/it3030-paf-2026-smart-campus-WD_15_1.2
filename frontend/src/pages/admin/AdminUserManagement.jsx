import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdPersonAddAlt1, MdPeopleOutline, MdCheckCircle, MdCancel } from 'react-icons/md';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true);
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error('Failed to load users');
      }
    } catch (err) {
      toast.error('Network error loading users');
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))] p-6 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-gradient-to-br from-primary-500/20 to-accent-500/10 p-3 rounded-xl border border-primary-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <MdPeopleOutline size={28} className="text-primary-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">System Users</h1>
          <p className="text-dark-muted mt-1">View and manage application users across the Smart Campus.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* User Table Section */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white">System Users Index</h2>
              <span className="text-xs font-semibold px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30">
                {users.length} Users Found
              </span>
            </div>
            <div className="overflow-x-auto">
              {fetchingUsers ? (
                <div className="p-12 flex justify-center items-center">
                  <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-primary-500 animate-spin"></div>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-slate-400 bg-black/20 border-b border-slate-700/50">
                      <th className="px-6 py-4 font-semibold">User Details</th>
                      <th className="px-6 py-4 font-semibold">Role Assignments</th>
                      <th className="px-6 py-4 font-semibold text-right">System Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center text-slate-400 text-sm py-12">
                          No users available in the system.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="text-sm hover:bg-slate-800/40 transition duration-200 group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold shadow-inner">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-200">{user.name || 'Unnamed User'}</span>
                                <span className="text-xs text-slate-400">{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {user.roles && user.roles.map(role => (
                                <span 
                                  key={role} 
                                  className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${
                                    role === 'ADMIN' 
                                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                                      : role === 'TECHNICIAN'
                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  }`}
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded w-fit ml-auto shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                              <MdCheckCircle size={14} /> Active
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
