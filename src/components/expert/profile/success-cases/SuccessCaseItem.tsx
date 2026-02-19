
import React from 'react';
import { CheckCircle } from 'lucide-react';
import SuccessCaseResults from './SuccessCaseResults';

interface SuccessCaseItemProps {
  title: string;
  description: string;
  results?: string[];
  image?: string;
}

const SuccessCaseItem: React.FC<SuccessCaseItemProps> = ({
  title,
  description,
  results,
  image
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden animate-fade-in touch-manipulation select-none transition-all duration-150 active:scale-[0.98] active:shadow-inner">
      <div className="p-6">
        <h3 className="font-pretendard font-bold text-xl mb-3">
          {title}
        </h3>
        <p className="text-neutral-700 mb-4">
          {description}
        </p>
        {results && results.length > 0 && (
          <SuccessCaseResults results={results} />
        )}
      </div>
      {image && (
        <div className="h-60 w-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
    </div>
  );
};

export default SuccessCaseItem;
