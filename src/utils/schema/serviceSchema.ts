
// Generate service schema
export interface ServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  provider?: string;
  areaServed?: string;
}

export const generateServiceSchema = ({
  serviceName,
  serviceDescription,
  serviceUrl,
  provider = '메디스타트업',
  areaServed = 'KR'
}: ServiceSchemaProps) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://medistartup.co.kr'
    },
    areaServed
  };
};
