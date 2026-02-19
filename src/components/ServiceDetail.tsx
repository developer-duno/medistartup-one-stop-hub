
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getServiceUrlName } from '@/utils/serviceUrlMapping';
import Navbar from './Navbar';
import Footer from './Footer';
import ServiceHeader from './services/ServiceHeader';
import ServiceFeatures from './services/ServiceFeatures';
import ServiceProcess from './services/ServiceProcess';
import ServiceFAQs from './services/ServiceFAQs';
import ServiceBenefitsSidebar from './services/ServiceBenefitsSidebar';
import { Helmet } from 'react-helmet-async';
import { generateServiceSchema } from '@/utils/schemaUtils';

interface ServiceDetailProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  title,
  description,
  icon,
  color,
  features,
  benefits,
  process,
  faqs,
}) => {
  const serviceUrlName = getServiceUrlName(title);
  const isMobile = useIsMobile();
  
  const serviceSchema = generateServiceSchema({
    serviceName: title,
    serviceDescription: description,
    serviceUrl: `https://medistartup.co.kr/services/${serviceUrlName}`
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <ServiceHeader 
        title={title}
        description={description}
        icon={icon}
        color={color}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {isMobile && (
          <ServiceBenefitsSidebar
            title={title}
            benefits={benefits}
            serviceUrlName={serviceUrlName}
            isMobile={isMobile}
          />
        )}

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="w-full md:w-2/3">
            <ServiceFeatures features={features} />
            <ServiceProcess process={process} />
            <ServiceFAQs faqs={faqs} />
          </div>

          {!isMobile && (
            <div className="md:w-1/3">
              <div className="sticky top-8">
                <ServiceBenefitsSidebar
                  title={title}
                  benefits={benefits}
                  serviceUrlName={serviceUrlName}
                  isMobile={isMobile}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
