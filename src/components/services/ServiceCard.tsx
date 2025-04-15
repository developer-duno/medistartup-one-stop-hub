
import React from 'react';

interface ServiceCardProps {
  children: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4 md:p-6">
      {children}
    </div>
  );
};

export default ServiceCard;
