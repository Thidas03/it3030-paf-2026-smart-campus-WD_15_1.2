import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Type, MapPin, Users, Clock, Info, CheckCircle, ShieldAlert, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';

const ResourceFormModal = ({ resource, isOpen, onClose, onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: resource || {
      status: 'ACTIVE',
      type: 'LECTURE_HALL'
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset(resource || {
        status: 'ACTIVE',
        type: 'LECTURE_HALL'
      });
    }
  }, [isOpen, resource, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      if (resource) {
        await resourceService.updateResource(resource.id, data);
        toast.success('Asset record synchronized');
      } else {
        await resourceService.createResource(data);
        toast.success('New node initialized');
      }
      onSuccess();
      onClose();
    } catch (error) {
       console.error('Submission Error:', error);
       toast.error('Data link failed to the operations hub');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-dark-bg/90 backdrop-blur-xl" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-dark-card border border-white/5 rounded-[2.5rem] text-left overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.15)] transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full relative ring-1 ring-white/10">
          {/* Decorative glow inside modal */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]"></div>
          
          <div className="relative px-8 pt-8 pb-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-br from-white/[0.02] to-transparent">
            <div>
                <div className="flex items-center gap-2 text-accent-400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                    <Zap className="h-3.5 w-3.5" /> Intelligence Interface
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                {resource ? 'Modify Node Data' : 'Initialize New Node'}
                </h3>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/5 rounded-2xl text-dark-muted hover:text-white transition-all border border-transparent hover:border-white/5"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative p-8 space-y-6">
            <div className="space-y-6">
              {/* Name */}
              <div className="group/field">
                <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                  Node Designation
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Info className="h-4 w-4 text-primary-500/50" />
                    </div>
                    <input
                        {...register('name', { required: 'Designation is required' })}
                        placeholder="e.g. Quantum Computing Lab 01"
                        className={`w-full bg-dark-bg/60 border ${errors.name ? 'border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'border-white/5'} rounded-2xl pl-11 pr-4 py-4 text-white placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all font-semibold group-hover/field:border-white/10`}
                    />
                </div>
                {errors.name && <p className="mt-2 text-xs font-bold text-rose-500 ml-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Type */}
                <div className="group/field">
                  <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Type className="h-4 w-4 text-accent-500/50" />
                    </div>
                    <select
                        {...register('type', { required: true })}
                        className="w-full bg-dark-bg/60 border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all font-semibold appearance-none group-hover/field:border-white/10"
                    >
                        <option value="LECTURE_HALL">Lecture Hall</option>
                        <option value="LAB">Research Lab</option>
                        <option value="MEETING_ROOM">Meeting Room</option>
                        <option value="EQUIPMENT">Equipment</option>
                    </select>
                  </div>
                </div>

                {/* Capacity */}
                <div className="group/field">
                  <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                    Node Capacity
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Users className="h-4 w-4 text-primary-500/50" />
                    </div>
                    <input
                        type="number"
                        {...register('capacity', { required: 'Required', min: 1 })}
                        className={`w-full bg-dark-bg/60 border ${errors.capacity ? 'border-rose-500/50' : 'border-white/5'} rounded-2xl pl-11 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all font-semibold group-hover/field:border-white/10`}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group/field">
                <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                  Grid Location (Block/Wing)
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-accent-500/50" />
                    </div>
                    <input
                        {...register('location', { required: 'Location is required' })}
                        placeholder="e.g. Innovation Cluster C"
                        className={`w-full bg-dark-bg/60 border ${errors.location ? 'border-rose-500/50' : 'border-white/5'} rounded-2xl pl-11 pr-4 py-4 text-white placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all font-semibold group-hover/field:border-white/10`}
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Start Time */}
                <div className="group/field">
                    <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                        Operational Start
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Clock className="h-4 w-4 text-dark-muted" />
                        </div>
                        <input
                            type="time"
                            {...register('availabilityStartTime', { required: true })}
                            className="w-full bg-dark-bg/60 border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 font-semibold"
                        />
                    </div>
                </div>

                {/* End Time */}
                <div className="group/field">
                    <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                        Operational End
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Clock className="h-4 w-4 text-dark-muted" />
                        </div>
                        <input
                            type="time"
                            {...register('availabilityEndTime', { required: true })}
                            className="w-full bg-dark-bg/60 border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 font-semibold"
                        />
                    </div>
                </div>
              </div>

              {/* Status */}
              <div className="group/field">
                <label className="block text-[11px] font-black text-dark-muted uppercase tracking-[0.2em] mb-3 ml-1">
                  Node Connectivity
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ShieldAlert className="h-4 w-4 text-accent-400" />
                    </div>
                    <select
                        {...register('status', { required: true })}
                        className="w-full bg-dark-bg/60 border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all font-semibold appearance-none group-hover/field:border-white/10"
                    >
                        <option value="ACTIVE">System Active</option>
                        <option value="OUT_OF_SERVICE">Offline / Maintenance</option>
                    </select>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="order-2 sm:order-1 px-8 py-4 border border-white/5 text-dark-muted hover:text-white hover:bg-white/5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.25em]"
              >
                Cancel Protocol
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="order-1 sm:order-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 shadow-2xl shadow-primary-600/30 active:scale-95"
              >
                {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <CheckCircle className="h-4 w-4" />
                )}
                {resource ? 'Sync Update' : 'Initialize Node'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourceFormModal;
