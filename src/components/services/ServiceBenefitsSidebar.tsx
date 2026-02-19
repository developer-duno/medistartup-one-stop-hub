
import React from 'react';
import { ChevronRight } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';

interface ServiceBenefitsSidebarProps {
  title: string;
  benefits: string[];
  serviceUrlName: string;
  isMobile: boolean;
}

const ServiceBenefitsSidebar: React.FC<ServiceBenefitsSidebarProps> = ({
  title,
  benefits,
  serviceUrlName,
  isMobile
}) => {
  return (
    <div className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-4 md:p-6">
      <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-3">
        서비스 혜택
      </h3>
      
      <div className="grid grid-cols-1 md:block gap-2 mb-4 md:space-y-3 md:mb-6">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="flex items-start font-noto text-sm md:text-base text-neutral-700"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0 mt-0.5 mr-2" />
            <span className="md:line-clamp-none line-clamp-2">{benefit}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-3">
        <CustomButton 
          variant="primary" 
          fullWidth 
          size={isMobile ? "sm" : "md"}
          asChild
        >
          <Link to={`/experts?service=${serviceUrlName}`}>
            {title} 전문가 만나기
          </Link>
        </CustomButton>
        <CustomButton 
          variant="accent" 
          fullWidth 
          size={isMobile ? "sm" : "md"}
          asChild
        >
          <Link to={`/experts?service=${serviceUrlName}&consultation=true`}>
            무료 상담하기
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default ServiceBenefitsSidebar;
