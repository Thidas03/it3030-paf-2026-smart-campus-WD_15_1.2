import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save, AlertCircle, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import resourceService from '../services/resourceService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ResourceFormModal = ({ isOpen, resource, resources = [], onClose, onSuccess }) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      type: 'LECTURE_HALL',
      capacity: '',
      location: '',
      availabilityStartTime: new Date().toISOString(),
      availabilityEndTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      status: 'ACTIVE'
    }
  });

  const startTime = watch('availabilityStartTime');
  const endTime = watch('availabilityEndTime');

  const handleDateChange = (newDate, fieldName, currentValue) => {
    if (!newDate) {
      setValue(fieldName, null, { shouldValidate: true });
      return;
    }
    const updated = new Date(newDate);
    if (currentValue) {
      const oldTime = new Date(currentValue);
      updated.setHours(oldTime.getHours());
      updated.setMinutes(oldTime.getMinutes());
    }
    setValue(fieldName, updated.toISOString(), { shouldValidate: true });
  };

  const handleTimeChange = (newTime, fieldName, currentValue) => {
    if (!newTime) return;
    const updated = new Date(currentValue || new Date());
    updated.setHours(newTime.getHours());
    updated.setMinutes(newTime.getMinutes());
    setValue(fieldName, updated.toISOString(), { shouldValidate: true });
  };

  useEffect(() => {
    if (isOpen) {
      if (resource) {
        reset({
          ...resource,
          availabilityStartTime: resource.availabilityStartTime || new Date().toISOString(),
          availabilityEndTime: resource.availabilityEndTime || new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        });
      } else {
        const now = new Date();
        const later = new Date(now.getTime() + 60 * 60 * 1000);
        reset({
          name: '',
          type: 'LECTURE_HALL',
          capacity: '',
          location: '',
          availabilityStartTime: now.toISOString(),
          availabilityEndTime: later.toISOString(),
          status: 'ACTIVE'
        });
      }
    }
  }, [isOpen, resource, reset]);

  const onSubmit = async (data) => {
    try {
      const start = new Date(data.availabilityStartTime);
      const end = new Date(data.availabilityEndTime);
      const now = new Date();
      
      if (start < now) {
        toast.error('Cannot create resource allocation in the past');
        return;
      }
      
      if (end <= start) {
        toast.error('End time must be after start time');
        return;
      }

      // Overlap validation
      const isOverlap = resources.some(r => {
        if (resource && r.id === resource.id) return false;
        
        if (r.location.toLowerCase() !== data.location.toLowerCase()) return false;
        
        const rStart = new Date(r.availabilityStartTime);
        const rEnd = new Date(r.availabilityEndTime);
        
        return (start < rEnd) && (end > rStart);
      });

      if (isOverlap) {
        toast.error('Location is already booked for this time period');
        return;
      }

      const payload = {
        ...data,
        availabilityStartTime: start.toISOString(),
        availabilityEndTime: end.toISOString()
      };

      if (resource) {
        await resourceService.updateResource(resource.id, payload);
        toast.success('Resource updated successfully');
      } else {
        await resourceService.createResource(payload);
        toast.success('Resource created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save resource details');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-md text-blue-500">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {resource ? 'Edit Resource' : 'Create Resource'}
              </h2>
              <p className="text-xs text-slate-400">Configure campus infrastructure parameters</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resource Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                placeholder="e.g. Main Auditorium"
                className={`w-full bg-slate-900 border ${errors.name ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Resource Type</label>
              <div className="relative">
                <select
                  {...register('type', { required: true })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                >
                  <option value="LECTURE_HALL">Lecture Hall</option>
                  <option value="LAB">Laboratory</option>
                  <option value="MEETING_ROOM">Meeting Room</option>
                  <option value="EQUIPMENT">Equipment</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Capacity (PAX)</label>
              <input
                type="number"
                {...register('capacity', { required: 'Capacity is required', min: 1 })}
                placeholder="0"
                className={`w-full bg-slate-900 border ${errors.capacity ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Location</label>
              <input
                {...register('location', { required: 'Location is required' })}
                placeholder="e.g. Building A, Floor 2"
                className={`w-full bg-slate-900 border ${errors.location ? 'border-rose-500' : 'border-slate-700'} rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Time Window */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 calendar-wrapper-style">
              <style jsx>{`
                .calendar-wrapper-style .react-datepicker-wrapper {
                  width: 100%;
                }
              `}</style>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Start Date</label>
                <div className="w-full">
                  <DatePicker
                    selected={startTime ? new Date(startTime) : null}
                    onChange={(date) => handleDateChange(date, 'availabilityStartTime', startTime)}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Start Time</label>
                <div className="w-full">
                  <DatePicker
                    selected={startTime ? new Date(startTime) : null}
                    onChange={(time) => handleTimeChange(time, 'availabilityStartTime', startTime)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="HH:mm"
                    className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">End Date</label>
                <div className="w-full">
                  <DatePicker
                    selected={endTime ? new Date(endTime) : null}
                    onChange={(date) => handleDateChange(date, 'availabilityEndTime', endTime)}
                    minDate={startTime ? new Date(startTime) : new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">End Time</label>
                <div className="w-full">
                  <DatePicker
                    selected={endTime ? new Date(endTime) : null}
                    onChange={(time) => handleTimeChange(time, 'availabilityEndTime', endTime)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="HH:mm"
                    className="w-full p-2 bg-slate-900 text-white border border-slate-700 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status</label>
              <div className="relative">
                <select
                  {...register('status', { required: true })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="OUT_OF_SERVICE">Out of Service</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Saving...' : (resource ? 'Update Resource' : 'Create Resource')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceFormModal;
