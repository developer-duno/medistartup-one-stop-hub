
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';
import { CheckCircle } from 'lucide-react';

interface MobileSelectionBarProps {
  setViewMode: (mode: string) => void;
  viewMode: string;
}

const MobileSelectionBar: React.FC<MobileSelectionBarProps> = ({ 
  setViewMode,
  viewMode
}) => {
  const { selectedExperts, openConsultation } = useConsultation();
  
  if (selectedExperts.length === 0) return null;

  const isCompare = viewMode === "compare";
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-primary text-white p-4 shadow-lg border-t border-primary-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{selectedExperts.length}명의 전문가 선택됨</span>
        </div>
        <div className="grid grid-cols-2 gap-2 w-auto min-w-[160px]">
          <CustomButton 
            variant="outline"
            size="sm"
            onClick={() => setViewMode(isCompare ? "grid" : "compare")}
            disabled={!isCompare && selectedExperts.length < 2}
            className={`text-xs py-1.5 px-2 ${isCompare ? 'bg-white text-foreground border-white hover:bg-muted' : 'bg-green-600 text-white border-green-600 hover:bg-green-700'}`}
          >
            {isCompare ? "그리드보기" : "비교하기"}
          </CustomButton>
          <CustomButton 
            variant="accent" 
            size="sm"
            onClick={openConsultation}
            className="text-xs py-1.5 px-2 bg-[hsl(var(--cta))] hover:bg-[hsl(24,95%,45%)] text-[hsl(var(--cta-foreground))]"
          >
            상담신청
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MobileSelectionBar;
