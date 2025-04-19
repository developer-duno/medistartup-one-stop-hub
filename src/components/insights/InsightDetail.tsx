
import React from 'react';
import { Calendar } from 'lucide-react';
import { DialogContent } from '@/components/ui/dialog';
import { InsightType } from '@/components/admin/insights/types';
import { Helmet } from 'react-helmet-async';
import { generateSeoData } from '@/utils/seoUtils';
import { generateInsightSchema } from '@/utils/schemaUtils';

interface InsightDetailProps {
  insight: InsightType;
  getCategoryDisplayName: (category: string) => string;
}

const InsightDetail: React.FC<InsightDetailProps> = ({ 
  insight, 
  getCategoryDisplayName 
}) => {
  const seoData = generateSeoData({
    title: insight.title,
    description: insight.excerpt || insight.content.substring(0, 160),
    ogImage: insight.image || undefined,
    type: 'article',
    pathname: `/insights/${insight.id}`
  });

  const schemaData = generateInsightSchema(
    insight,
    `https://medistartup.co.kr/insights/${insight.id}`
  );

  return (
    <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
      <Helmet {...seoData}>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <div className="p-2">
        <div className="aspect-video w-full relative overflow-hidden mb-6">
          <img 
            src={insight.image || 'https://placehold.co/600x400?text=No+Image'} 
            alt={insight.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = 'https://placehold.co/600x400?text=Loading+Error';
            }}
          />
        </div>
        <h2 className="font-pretendard font-bold text-2xl mb-4">{insight.title}</h2>
        <div className="flex items-center text-sm text-neutral-500 mb-6">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{insight.date}</span>
          <span className="mx-2">•</span>
          <span>{insight.author}</span>
          <span className="mx-2">•</span>
          <span>{getCategoryDisplayName(insight.category)}</span>
          <span className="mx-2">•</span>
          <span>조회수 {insight.views}</span>
        </div>
        <div className="font-noto text-neutral-700 leading-relaxed whitespace-pre-line">
          {insight.content}
        </div>
      </div>
    </DialogContent>
  );
};

export default InsightDetail;
