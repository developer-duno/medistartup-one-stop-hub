
import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingState: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <Loader className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
};
