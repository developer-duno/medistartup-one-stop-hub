
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceHeaderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title, 
  description,
  icon,
  color
}) => {
  return (
    <div className="theme-services theme-page-header">
      <div className="container mx-auto px-3 md:px-4">
        <Link to="/services" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-3 md:mb-4 text-xs md:text-sm">
          <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          서비스로 돌아가기
        </Link>
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
            <div className="bg-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-sm">
              {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4 md:h-5 md:w-5 text-primary' })}
            </div>
            <h1 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900">
              {title}
            </h1>
          </div>
          <p className="font-noto text-neutral-600 text-xs md:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;
