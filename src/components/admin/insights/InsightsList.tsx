
import React from 'react';
import { Button } from '@/components/ui/button';
import InsightCard from './InsightCard';
import { InsightType } from './types';

interface InsightsListProps {
  insights: InsightType[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onEdit: (insight: InsightType) => void;
  onDelete: (id: number) => void;
  onView: (insight: InsightType) => void;
}

const InsightsList: React.FC<InsightsListProps> = ({
  insights,
  activeCategory,
  setActiveCategory,
  onEdit,
  onDelete,
  onView
}) => {
  const categories = [
    { id: 'all', label: '전체' },
    { id: 'trend', label: '트렌드' },
    { id: 'marketing', label: '마케팅' },
    { id: 'licensing', label: '인허가' },
    { id: 'finance', label: '재무' },
    { id: 'recruitment', label: '인력채용' },
    { id: 'equipment', label: '의료장비' },
  ];

  return (
    <>
      <div className="flex gap-4 mb-6 flex-wrap">
        {categories.map((category) => (
          <Button 
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"} 
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <InsightCard 
            key={insight.id}
            insight={insight}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </>
  );
};

export default InsightsList;
