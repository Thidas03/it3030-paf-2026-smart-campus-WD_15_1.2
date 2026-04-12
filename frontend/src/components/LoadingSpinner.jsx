import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ message = "Fetching data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
      <p className="text-sm text-slate-400 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
