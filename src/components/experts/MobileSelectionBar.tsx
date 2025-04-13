
import React from 'react';
import CustomButton from '../ui/CustomButton';

interface MobileSelectionBarProps {
  selectedExperts: number[];
  setViewMode: (mode: string) => void;
}

const MobileSelectionBar: React.FC<MobileSelectionBarProps> = ({ 
  selectedExperts, 
  setViewMode 
}) => {
  if (selectedExperts.length === 0) return null;
  
  return (
    <div className="md:hidden sticky top-0 z-10 bg-primary text-white p-4 mb-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span>{selectedExperts.length}명의 전문가 선택됨</span>
        <CustomButton 
          variant="secondary" 
          size="sm"
          onClick={() => setViewMode("compare")}
          disabled={selectedExperts.length < 2}
        >
          비교하기
        </CustomButton>
      </div>
    </div>
  );
};

export default MobileSelectionBar;
