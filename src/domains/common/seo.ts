
interface SeoDataProps {
  title: string;
  description: string;
  pathname: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  canonical?: string;
}

export const generateSeoData = ({
  title,
  description,
  pathname,
  ogImage = 'https://medistartup.co.kr/og-image.jpg',
  type = 'website',
  keywords = ['병원창업', '의료컨설팅', '의료법', '개원 컨설팅'],
  canonical
}: SeoDataProps) => {
  const siteUrl = 'https://medistartup.co.kr';
  const url = `${siteUrl}${pathname}`;
  const defaultCanonical = canonical || url;
  const fullTitle = `${title} | 메디스타트업`;
  
  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: '메디스타트업' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' },
    ],
    link: [
      { rel: 'canonical', href: defaultCanonical },
    ]
  };
};
