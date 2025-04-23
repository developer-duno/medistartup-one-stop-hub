
import { Expert } from '@/types/expert';

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
