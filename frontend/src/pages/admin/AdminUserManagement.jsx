import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  MdPeopleOutline, 
  MdCheckCircle, 
  MdEdit, 
  MdDeleteOutline,
  MdClose,
  MdWarning
} from 'react-icons/md';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);

  // Edit / Delete State
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', roles: [] });
  
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        localStorage.setItem('cachedAdminUsers', JSON.stringify(data));
      } else {
        toast.error('Failed to load users');
        const cached = localStorage.getItem('cachedAdminUsers');
        if (cached) setUsers(JSON.parse(cached));
      }
    } catch (err) {
      toast.error('Network error loading users');
      const cached = localStorage.getItem('cachedAdminUsers');
      if (cached) setUsers(JSON.parse(cached));
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem('cachedAdminUsers');
    if (cached) setUsers(JSON.parse(cached));
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name || '',
      roles: user.roles || []
    });
  };

  const handleRoleToggle = (role) => {
    setEditFormData(prev => ({
      ...prev,
      roles: [role] // Restrict to a single role
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (editFormData.roles.length === 0) {
      toast.error('User must have at least one role');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(editFormData)
      });
      
      if (res.ok) {
        toast.success("User updated successfully");
        setEditingUser(null);
        fetchUsers();
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/admin/users/${deletingUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')}`
        }
      });
      
      if (res.ok) {
        toast.success("User deleted successfully");
        setDeletingUserId(null);
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ALL_ROLES = ['ADMIN', 'TECHNICIAN', 'USER'];

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

      <div className="grid grid-cols-1 gap-8 relative z-0">
        {/* User Table Section */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white">System Users Index</h2>
              <span className="text-xs font-semibold px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full border border-primary-500/30">
                {users.length} Users Found
              </span>
            </div>
            <div className="overflow-x-auto min-h-[300px]">
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
                      <th className="px-6 py-4 font-semibold">System Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-slate-400 text-sm py-12">
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
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded w-fit shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                              <MdCheckCircle size={14} /> Active
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEditClick(user)}
                                className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg border border-blue-500/20 transition-colors"
                title="Edit User"
                              >
                                <MdEdit size={16} />
                              </button>
                              <button 
                                onClick={() => setDeletingUserId(user.id)}
                                className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg border border-rose-500/20 transition-colors"
                title="Delete User"
                              >
                                <MdDeleteOutline size={16} />
                              </button>
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

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h3 className="text-lg font-bold text-white">Edit User Information</h3>
              <button 
                onClick={() => setEditingUser(null)} 
                className="text-slate-400 hover:text-white transition"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-5 flex flex-col">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                  placeholder="Enter user's name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                  Role Assignments
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_ROLES.map(role => {
                    const isSelected = editFormData.roles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => handleRoleToggle(role)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          isSelected 
                            ? 'bg-primary-500/20 text-primary-300 border-primary-500/50 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                            : 'bg-dark-bg text-slate-400 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition shadow-lg glow-primary"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass w-full max-w-sm rounded-2xl border border-rose-500/20 shadow-2xl overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                <MdWarning size={32} className="text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete User?</h3>
              <p className="text-slate-400 text-sm mb-6">
                Are you absolutely sure you want to delete this user? This action cannot be undone.
              </p>
              
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setDeletingUserId(null)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                >
                  {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
