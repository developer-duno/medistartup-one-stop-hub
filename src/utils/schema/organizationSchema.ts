
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
