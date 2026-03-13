import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 border border-rose-500/20">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">Confirm Delete</h3>
            <p className="text-sm text-slate-400">
              Are you sure you want to delete <span className="text-rose-400 font-medium">{itemName}</span>? This action cannot be undone and will remove the node from the campus lattice.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-md transition-all shadow-lg active:scale-95"
            >
              Delete Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
