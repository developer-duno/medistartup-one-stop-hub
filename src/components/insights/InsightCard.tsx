
import React from 'react';
import LazyImage from '@/components/LazyImage';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

// Add useThemeStyles prop to optionally use themed styles
const InsightCard = ({ insight, getCategoryDisplayName, onClick, useThemeStyles = false }) => {
  const categoryName = getCategoryDisplayName(insight.category);
  
  // Format the date properly
  let formattedDate = '';
  if (insight.publishedAt) {
    const dateObj = new Date(insight.publishedAt);
    if (isValid(dateObj)) {
      formattedDate = format(dateObj, 'yyyy년 MM월 dd일', { locale: ko });
    } else {
      formattedDate = '날짜 없음';
    }
  } else if (insight.date) {
    // Fall back to insight.date if publishedAt is not available
    const dateObj = new Date(insight.date);
    if (isValid(dateObj)) {
      formattedDate = format(dateObj, 'yyyy년 MM월 dd일', { locale: ko });
    } else {
      formattedDate = insight.date; // Use as string if not a valid date
    }
  } else {
    formattedDate = '날짜 없음';
  }
  
  // Use theme styles if the prop is true
  const cardClass = useThemeStyles 
    ? 'cursor-pointer transform transition-all duration-150 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] active:shadow-inner touch-manipulation select-none'
    : 'cursor-pointer transform transition-all duration-150 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] active:shadow-inner touch-manipulation select-none';
  
  const badgeClass = useThemeStyles
    ? 'theme-bg-light theme-text'
    : 'bg-primary-100 text-primary';
  
  return (
    <Card className={cardClass} onClick={onClick}>
      <CardContent className="p-0">
        <div className="aspect-video relative overflow-hidden">
          <LazyImage 
            src={insight.imageUrl || insight.image || '/placeholder.svg'} 
            alt={insight.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        
        <div className="p-2 md:p-4">
          <h3 className="font-pretendard font-bold text-xs md:text-lg mb-1 md:mb-2 line-clamp-2">
            {insight.title}
          </h3>
          
          <p className="font-noto text-neutral-600 text-[10px] md:text-sm mb-1.5 md:mb-3 line-clamp-2 hidden md:block">
            {insight.summary || insight.excerpt || "설명이 없습니다."}
          </p>
          
          <div className="flex flex-wrap items-center justify-between text-[9px] md:text-xs text-neutral-500">
            <div className="flex items-center gap-1 mr-4">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
