
export const generateExpertSchema = (expert: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: expert.name,
  description: expert.description,
  image: expert.image,
  jobTitle: expert.role,
  areaServed: expert.regions?.join(', '),
  worksFor: {
    '@type': 'Organization',
    name: 'MediStartup',
  },
});

export const generateSuccessStorySchema = (story: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: story.title,
  description: story.summary,
  image: story.imageUrl,
  datePublished: story.date,
  author: {
    '@type': 'Organization',
    name: 'MediStartup',
  },
});

export const generateInsightSchema = (insight: any) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: insight.title,
  description: insight.excerpt,
  image: insight.image,
  datePublished: insight.date,
  author: insight.author,
  publisher: {
    '@type': 'Organization',
    name: 'MediStartup',
  },
});
