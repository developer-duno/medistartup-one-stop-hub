
import { Helmet } from 'react-helmet';

export interface SeoProps {
  title: string;
  description: string;
  ogImage?: string;
  type?: 'website' | 'article';
  pathname: string;
}

export const BASE_URL = 'https://medistartup.co.kr';
export const DEFAULT_IMAGE = 'https://medistartup.co.kr/og-image.jpg';
export const SITE_NAME = '메디스타트업 - 병원창업 원스톱 허브';

export const generateSeoData = ({
  title,
  description,
  ogImage = DEFAULT_IMAGE,
  type = 'website',
  pathname,
}: SeoProps) => ({
  title: `${title} | ${SITE_NAME}`,
  description,
  canonical: `${BASE_URL}${pathname}`,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: `${BASE_URL}${pathname}` },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ],
});
