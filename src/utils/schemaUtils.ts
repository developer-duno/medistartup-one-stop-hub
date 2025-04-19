
import { Expert } from '@/types/expert';
import { SuccessStory } from '@/contexts/SuccessStoriesContext';
import { InsightType } from '@/components/admin/insights/types';

// Generate organization schema
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '메디스타트업',
    url: 'https://medistartup.co.kr',
    logo: 'https://medistartup.co.kr/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-123-4567',
      contactType: 'customer service',
      areaServed: 'KR',
      availableLanguage: 'Korean'
    },
    sameAs: [
      'https://www.facebook.com/medistartup',
      'https://www.instagram.com/medistartup'
    ]
  };
};

// Generate expert schema
export const generateExpertSchema = (expert: Expert, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: expert.name,
    jobTitle: expert.role,
    description: expert.description,
    image: expert.image,
    url: url,
    worksFor: {
      '@type': 'Organization',
      name: '메디스타트업'
    },
    knowsAbout: expert.services || [],
    areaServed: expert.regions || ['대한민국'],
  };
};

// Generate success story schema
export const generateSuccessStorySchema = (story: SuccessStory, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.summary,
    image: story.imageUrl,
    datePublished: story.date,
    author: {
      '@type': 'Organization',
      name: '메디스타트업'
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
    mainEntityOfPage: url
  };
};

// Generate insight schema
export const generateInsightSchema = (insight: InsightType, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: insight.title,
    description: insight.excerpt || insight.summary,
    image: insight.image || insight.imageUrl,
    datePublished: insight.date || insight.publishedAt,
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
    keywords: insight.tags ? insight.tags.join(', ') : null
  };
};
