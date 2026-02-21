
import { SuccessStory } from './context';

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
