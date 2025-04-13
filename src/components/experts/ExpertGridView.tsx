
import React from 'react';
import { Search } from 'lucide-react';
import ExpertCard from './ExpertCard';
import CustomButton from '../ui/CustomButton';
import { Expert } from '@/types/expert';

interface ExpertGridViewProps {
  filteredExperts: Expert[];
  selectedExperts: number[];
  handleExpertSelect: (expertId: number) => void;
  resetFilters: () => void;
}

const ExpertGridView: React.FC<ExpertGridViewProps> = ({ 
  filteredExperts, 
  selectedExperts, 
  handleExpertSelect,
  resetFilters 
}) => {
  if (filteredExperts.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-neutral-400" />
        </div>
        <h3 className="font-pretendard font-medium text-xl mb-2">검색 결과가 없습니다</h3>
        <p className="text-neutral-600 text-center max-w-md">
          다른 검색어나 필터 조건을 사용해보세요. 또는 모든 필터를 초기화하여 전체 전문가를 확인하세요.
        </p>
        <CustomButton 
          variant="outline"
          className="mt-4"
          onClick={resetFilters}
        >
          필터 초기화
        </CustomButton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredExperts.map((expert) => (
        <ExpertCard
          key={expert.id} 
          expert={expert}
          selectedExperts={selectedExperts}
          onSelectExpert={handleExpertSelect}
        />
      ))}
    </div>
  );
};

export default ExpertGridView;
