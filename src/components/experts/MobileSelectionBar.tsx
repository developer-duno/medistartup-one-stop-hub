
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';
import { CheckCircle } from 'lucide-react';

interface MobileSelectionBarProps {
  setViewMode: (mode: string) => void;
}

const MobileSelectionBar: React.FC<MobileSelectionBarProps> = ({ 
  setViewMode 
}) => {
  const { selectedExperts, openConsultation } = useConsultation();
  
  if (selectedExperts.length === 0) return null;
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-primary text-white p-4 shadow-lg border-t border-primary-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{selectedExperts.length}명의 전문가 선택됨</span>
        </div>
        <div className="flex gap-2">
          <CustomButton 
            variant="secondary" 
            size="sm"
            onClick={() => setViewMode("compare")}
            disabled={selectedExperts.length < 2}
            className="text-xs py-1.5 px-2"
          >
            비교하기
          </CustomButton>
          <CustomButton 
            variant="accent" 
            size="sm"
            onClick={openConsultation}
            className="text-xs py-1.5 px-2"
          >
            상담 신청
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MobileSelectionBar;
