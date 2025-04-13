
import React from 'react';
import { Service } from '@/types/service';
import ServiceCard from './ServiceCard';
import { getServiceUrlParam } from '@/utils/serviceUtils';

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard 
          key={service.id}
          service={service}
          getServiceUrlParam={getServiceUrlParam}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;
