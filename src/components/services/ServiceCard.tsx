import React from 'react';
import { Service } from '@/types/service';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  children?: React.ReactNode;
  service?: Service;
  getServiceUrlParam?: (title: string) => string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ children, service, getServiceUrlParam }) => {
  if (service && getServiceUrlParam) {
    const serviceUrl = `/services/${getServiceUrlParam(service.title)}`;
    
    return (
      <Link to={serviceUrl} className="block">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 md:p-6 h-full transition-all duration-300 hover:shadow-md hover:border-primary-100">
          <div className="flex items-start mb-3">
            <div className="bg-primary-50 p-2 rounded-md mr-3">
              <span className="text-2xl text-primary">{service.icon}</span>
            </div>
            <h3 className="font-pretendard font-bold text-lg text-neutral-900">
              {service.title}
            </h3>
          </div>
          <p className="font-noto text-sm text-neutral-600">
            {service.description}
          </p>
        </div>
      </Link>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 md:p-6">
      {children}
    </div>
  );
};

export default ServiceCard;
