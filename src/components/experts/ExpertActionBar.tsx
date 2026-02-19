
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExpertActionBarProps {
  setViewMode: (mode: string) => void;
  viewMode: string;
}

const ExpertActionBar: React.FC<ExpertActionBarProps> = ({ setViewMode, viewMode }) => {
  const { clearSelectedExperts, openConsultation, selectedExperts } = useConsultation();
  const isMobile = useIsMobile();
  const isCompare = viewMode === "compare";

  if (selectedExperts.length < 2 || isMobile) return null;

  return (
    <div className="flex justify-center gap-4 mt-8">
      <CustomButton 
        variant="outline"
        onClick={clearSelectedExperts}
      >
        초기화
      </CustomButton>
      
      <CustomButton 
        variant="outline"
        onClick={() => setViewMode(isCompare ? "grid" : "compare")}
        className={isCompare 
          ? 'bg-white text-foreground border-border hover:bg-muted' 
          : 'bg-green-600 text-white border-green-600 hover:bg-green-700'}
      >
        {isCompare ? "그리드보기" : `비교보기 (${selectedExperts.length}/3)`}
      </CustomButton>

      <CustomButton 
        variant="primary"
        onClick={openConsultation}
        className="bg-[hsl(var(--cta))] hover:bg-[hsl(24,95%,45%)] text-[hsl(var(--cta-foreground))]"
      >
        상담신청
      </CustomButton>
    </div>
  );
};

export default ExpertActionBar;
