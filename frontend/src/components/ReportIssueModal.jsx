import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import ticketService from '../services/ticketService';

const toastStyle = { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' };

const ReportIssueModal = ({ isOpen, onClose, resource, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setSubmitting(false);
    }
  }, [isOpen, resource?.id]);

  if (!isOpen || !resource) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter an issue title', { style: toastStyle });
      return;
    }
    setSubmitting(true);
    try {
      await ticketService.createTicket({
        title: title.trim(),
        description: description.trim(),
        priority,
        resourceId: resource.id
      });
      toast.success('Issue reported successfully', { style: toastStyle });
      onSuccess?.(resource.id);
      onClose();
    } catch (err) {
      console.error('Report issue failed:', err);
      toast.error('Failed to report issue', { style: toastStyle });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-issue-title"
        className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-xl"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 id="report-issue-title" className="text-base font-semibold text-white">
            Report issue
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Resource name</label>
            <input
              type="text"
              readOnly
              value={resource.name || ''}
              className="w-full rounded-lg bg-slate-900/80 border border-slate-600 px-3 py-2 text-sm text-slate-300"
            />
          </div>
          <div>
            <label htmlFor="issue-title" className="block text-sm text-slate-400 mb-1">
              Issue title
            </label>
            <input
              id="issue-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              placeholder="Brief summary"
            />
          </div>
          <div>
            <label htmlFor="issue-desc" className="block text-sm text-slate-400 mb-1">
              Description
            </label>
            <textarea
              id="issue-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-y min-h-[4.5rem]"
              placeholder="What went wrong?"
            />
          </div>
          <div>
            <label htmlFor="issue-priority" className="block text-sm text-slate-400 mb-1">
              Priority
            </label>
            <select
              id="issue-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium px-3 py-2 rounded-lg text-sm transition disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueModal;
