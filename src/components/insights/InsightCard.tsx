
import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { InsightType } from '@/components/admin/insights/types';

interface InsightCardProps {
  article: InsightType;
  getCategoryDisplayName: (category: string) => string;
  onViewInsight: (insight: InsightType) => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  article, 
  getCategoryDisplayName, 
  onViewInsight 
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={article.image || 'https://placehold.co/600x400?text=No+Image'}
        alt={article.title}
        className="w-full h-48 object-cover"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = 'https://placehold.co/600x400?text=Loading+Error';
        }}
      />
      <div className="p-6">
        <div className="flex items-center text-sm text-neutral-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.author}</span>
        </div>
        <h2 className="font-pretendard font-bold text-xl text-neutral-900 mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="font-noto text-neutral-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-800">
            {getCategoryDisplayName(article.category)}
          </span>
        </div>
        <button
          onClick={() => onViewInsight(article)}
          className="font-pretendard font-medium text-primary inline-flex items-center hover:underline"
        >
          자세히 보기
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default InsightCard;
