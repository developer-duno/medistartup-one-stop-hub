
import React from 'react';
import { Calendar } from 'lucide-react';
import { DialogContent } from '@/components/ui/dialog';
import { InsightType } from '@/components/admin/insights/types';
import { getInsightSEOData } from '@/utils/seoUtils';
import { Helmet } from 'react-helmet';

interface InsightDetailProps {
  insight: InsightType;
  getCategoryDisplayName: (category: string) => string;
}

const InsightDetail: React.FC<InsightDetailProps> = ({ 
  insight, 
  getCategoryDisplayName 
}) => {
  // Get SEO data for this insight
  const seoData = getInsightSEOData(insight);
  
  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={seoData.ogImage} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImage} />
        
        {/* Article specific meta tags */}
        <meta property="article:published_time" content={insight.date} />
        <meta property="article:author" content={insight.author} />
        <meta property="article:section" content={getCategoryDisplayName(insight.category)} />
        <meta property="article:tag" content={insight.category} />
      </Helmet>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
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
    </>
  );
};

export default InsightDetail;
