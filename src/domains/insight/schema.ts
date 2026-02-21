
import { InsightType } from '@/components/admin/insights/types';

// Generate insight schema
export const generateInsightSchema = (insight: InsightType, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: insight.title,
    description: insight.excerpt || insight.content.substring(0, 160),
    image: insight.image || 'https://medistartup.co.kr/og-image.jpg',
    datePublished: insight.date,
    author: {
      '@type': 'Person',
      name: insight.author
    },
    publisher: {
      '@type': 'Organization',
      name: '메디스타트업',
      logo: {
        '@type': 'ImageObject',
        url: 'https://medistartup.co.kr/logo.png'
      }
    },
    url: url,
    mainEntityOfPage: url,
    keywords: Array.isArray(insight.category) ? insight.category.join(', ') : insight.category
  };
};
