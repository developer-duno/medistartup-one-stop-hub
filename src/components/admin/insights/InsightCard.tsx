
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { InsightType } from './types';

interface InsightCardProps {
  insight: InsightType;
  onEdit: (insight: InsightType) => void;
  onDelete: (id: number) => void;
  onView: (insight: InsightType) => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, onEdit, onDelete, onView }) => {
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'trend': return '트렌드';
      case 'marketing': return '마케팅';
      case 'licensing': return '인허가';
      case 'finance': return '재무';
      case 'recruitment': return '인력채용';
      case 'equipment': return '의료장비';
      default: return category;
    }
  };

  return (
    <Card>
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={insight.image || 'https://placehold.co/600x400?text=No+Image'} 
          alt={insight.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 h-14 text-lg">
          {insight.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
          {insight.excerpt}
        </p>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>작성자: {insight.author}</span>
          <span>등록일: {insight.date}</span>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{getCategoryDisplayName(insight.category)}</span>
          <span>조회수: {insight.views}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(insight)}>
          <Eye className="h-4 w-4 mr-1" />
          보기
        </Button>
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(insight)}>
          <Edit className="h-4 w-4 mr-1" />
          수정
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(insight.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightCard;
