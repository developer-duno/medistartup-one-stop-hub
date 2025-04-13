
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useConsultation } from '@/contexts/ConsultationContext';
import { cn } from '@/lib/utils';

const FloatingConsultButton: React.FC = () => {
  const { selectedExperts, openConsultation } = useConsultation();
  
  // Always show the button, but make it more prominent when experts are selected
  const hasSelectedExperts = selectedExperts.length > 0;
  
  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-300 transform",
        hasSelectedExperts ? "scale-110" : "scale-100"
      )}
    >
      <button
        onClick={openConsultation}
        className="relative bg-accent hover:bg-accent-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 group transition-all"
      >
        {hasSelectedExperts && (
          <span className="absolute right-full top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white text-accent text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center opacity-100 transition-opacity">
            {selectedExperts.length}
          </span>
        )}
        <MessageCircle className="h-6 w-6" />
        <span className="font-pretendard font-medium opacity-0 max-w-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 whitespace-nowrap overflow-hidden">
          무료 상담
        </span>
      </button>
    </div>
  );
};

export default FloatingConsultButton;
