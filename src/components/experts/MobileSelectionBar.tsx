
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';
import { CheckCircle } from 'lucide-react';

interface MobileSelectionBarProps {
  selectedExperts?: number[];
  setViewMode: (mode: string) => void;
}

const MobileSelectionBar: React.FC<MobileSelectionBarProps> = ({ 
  selectedExperts: propSelectedExperts, 
  setViewMode 
}) => {
  const { selectedExperts: contextSelectedExperts, openConsultation } = useConsultation();
  
  // Use props if provided (for backward compatibility), otherwise use context
  const selectedExperts = propSelectedExperts || contextSelectedExperts;
  
  if (selectedExperts.length === 0) return null;
  
  return (
    <div className="md:hidden sticky top-0 z-10 bg-primary text-white p-4 mb-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{selectedExperts.length}명의 전문가 선택됨</span>
        </div>
        <div className="flex gap-2">
          <CustomButton 
            variant="secondary" 
            size="sm"
            onClick={() => setViewMode("compare")}
            disabled={selectedExperts.length < 2}
          >
            비교하기
          </CustomButton>
          <CustomButton 
            variant="accent" 
            size="sm"
            onClick={openConsultation}
          >
            상담 신청
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MobileSelectionBar;
