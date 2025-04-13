
import React from 'react';
import { InsightType } from '@/components/admin/insights/types';
import InsightCard from './InsightCard';

interface InsightsListProps {
  filteredInsights: InsightType[];
  getCategoryDisplayName: (category: string) => string;
  onViewInsight: (insight: InsightType) => void;
}

const InsightsList: React.FC<InsightsListProps> = ({ 
  filteredInsights, 
  getCategoryDisplayName, 
  onViewInsight 
}) => {
  if (filteredInsights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 font-noto">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredInsights.map((article) => (
        <InsightCard 
          key={article.id} 
          article={article}
          getCategoryDisplayName={getCategoryDisplayName}
          onViewInsight={onViewInsight}
        />
      ))}
    </div>
  );
};

export default InsightsList;
