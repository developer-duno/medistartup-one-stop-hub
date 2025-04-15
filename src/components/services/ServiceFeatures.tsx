
import React from 'react';
import ServiceCard from './ServiceCard';

interface FeatureProps {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  features: FeatureProps[];
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features }) => {
  return (
    <section className="mb-10 md:mb-16">
      <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-4 md:mb-6">
        주요 기능
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <ServiceCard key={index}>
            <h3 className="font-pretendard font-bold text-lg md:text-xl text-neutral-900 mb-2 md:mb-3">
              {feature.title}
            </h3>
            <p className="font-noto text-sm md:text-base text-neutral-600">
              {feature.description}
            </p>
          </ServiceCard>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
