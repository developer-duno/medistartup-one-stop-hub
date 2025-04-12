
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Insight } from '../types';

interface InsightCardProps {
  insight: Insight;
  onEdit: (insight: Insight) => void;
  onDelete: (id: number) => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <img 
          src={insight.image} 
          alt={insight.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button variant="secondary" size="icon" className="h-8 w-8" 
            onClick={() => onEdit(insight)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" className="h-8 w-8"
            onClick={() => onDelete(insight.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md">
            {insight.category}
          </span>
          <span className="text-xs text-gray-500">{insight.date}</span>
        </div>
        <CardTitle className="text-lg line-clamp-2">
          {insight.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">
          {insight.excerpt}
        </p>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
