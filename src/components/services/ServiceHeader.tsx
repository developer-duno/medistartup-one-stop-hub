
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
    <div className={`bg-gradient-to-r ${color} py-12 md:py-24`}>
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          홈으로 돌아가기
        </Link>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-md">
            {icon}
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="font-pretendard font-bold text-2xl md:text-5xl text-neutral-900 mb-2 md:mb-4">
              {title}
            </h1>
            <p className="font-noto text-base md:text-lg text-neutral-700 max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;
