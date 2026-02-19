
import React from 'react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';

interface ExpertPageHeaderProps {
  filteredExperts: any[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  selectedExperts: number[];
}

const ExpertPageHeader: React.FC<ExpertPageHeaderProps> = ({ 
  filteredExperts,
  viewMode,
  setViewMode,
  selectedExperts
}) => {
  const { clearSelectedExperts } = useConsultation();
  const isCompare = viewMode === "compare";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="font-pretendard font-bold text-2xl text-neutral-900">
          전문가 목록
        </h2>
        <p className="text-neutral-600">
          총 {filteredExperts.length}명의 전문가
        </p>
      </div>
      
      {selectedExperts.length >= 2 && (
        <div className="hidden md:flex items-center gap-2">
          <CustomButton
            variant="outline"
            size="sm"
            onClick={clearSelectedExperts}
          >
            초기화
          </CustomButton>
          <CustomButton
            variant="outline"
            size="sm"
            onClick={() => setViewMode(isCompare ? "grid" : "compare")}
            className={isCompare 
              ? 'bg-white text-foreground border-border hover:bg-muted' 
              : 'bg-green-600 text-white border-green-600 hover:bg-green-700'}
          >
            {isCompare ? `그리드보기` : `비교보기 (${selectedExperts.length}/3)`}
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default ExpertPageHeader;
