
import React from 'react';
import InsightCard from './InsightCard';
import { InsightType } from '@/components/admin/insights/types';

interface InsightsListProps {
  filteredInsights: InsightType[];
  getCategoryDisplayName: (category: string) => string;
  onViewInsight: (insight: InsightType) => void;
  useThemeStyles?: boolean;
}

const InsightsList: React.FC<InsightsListProps> = ({ 
  filteredInsights, 
  getCategoryDisplayName, 
  onViewInsight,
  useThemeStyles = false
}) => {
  if (filteredInsights.length === 0) {
    return (
      <div className="col-span-2 text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-muted-foreground mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h3 className="font-medium text-xl mb-2">검색 결과 없음</h3>
        <p className="text-muted-foreground">
          다른 키워드로 검색하거나 필터를 조정해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
      {filteredInsights.map((insight) => (
        <InsightCard
          key={insight.id}
          insight={insight}
          getCategoryDisplayName={getCategoryDisplayName}
          onClick={() => onViewInsight(insight)}
          useThemeStyles={useThemeStyles}
        />
      ))}
    </div>
  );
};

export default InsightsList;
