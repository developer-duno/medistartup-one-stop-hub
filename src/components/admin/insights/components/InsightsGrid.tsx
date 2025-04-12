
import React from 'react';
import { Insight } from '../types';
import InsightCard from './InsightCard';

interface InsightsGridProps {
  insights: Insight[];
  onEdit: (insight: Insight) => void;
  onDelete: (id: number) => void;
}

const InsightsGrid: React.FC<InsightsGridProps> = ({ 
  insights, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight) => (
        <InsightCard
          key={insight.id}
          insight={insight}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default InsightsGrid;
