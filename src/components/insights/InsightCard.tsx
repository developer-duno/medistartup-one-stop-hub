
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

// Add useThemeStyles prop to optionally use themed styles
const InsightCard = ({ insight, getCategoryDisplayName, onClick, useThemeStyles = false }) => {
  const categoryName = getCategoryDisplayName(insight.category);
  
  // Add validation to handle invalid dates
  let formattedDate = '';
  if (insight.publishedAt) {
    const dateObj = new Date(insight.publishedAt);
    if (isValid(dateObj)) {
      formattedDate = format(dateObj, 'yyyy년 MM월 dd일', { locale: ko });
    } else {
      formattedDate = '날짜 없음';
    }
  } else {
    formattedDate = '날짜 없음';
  }
  
  // Use theme styles if the prop is true
  const cardClass = useThemeStyles 
    ? 'cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-md'
    : 'cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-md';
  
  const badgeClass = useThemeStyles
    ? 'theme-bg-light theme-text'
    : 'bg-primary-100 text-primary';
  
  return (
    <Card className={cardClass} onClick={onClick}>
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={insight.imageUrl || '/placeholder.svg'} 
            alt={insight.title}
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-3 left-3 ${badgeClass}`}>
            {categoryName}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="font-pretendard font-bold text-lg mb-2 line-clamp-2">
            {insight.title}
          </h3>
          
          <p className="font-noto text-neutral-600 text-sm mb-3 line-clamp-2">
            {insight.summary}
          </p>
          
          <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-1 mr-4">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            
            {insight.tags && insight.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                <span className="truncate max-w-[150px]">
                  {insight.tags.slice(0, 2).join(', ')}
                  {insight.tags.length > 2 ? ` +${insight.tags.length - 2}` : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
