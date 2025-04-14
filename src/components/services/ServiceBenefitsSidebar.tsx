
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
    <div className={`${isMobile ? 'mb-8 ' : ''}bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-${isMobile ? '4' : '6'}`}>
      <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-3">
        서비스 혜택
      </h3>
      
      <div className={`${isMobile ? 'grid grid-cols-2 gap-x-2 gap-y-2 mb-4' : 'space-y-3 mb-6'}`}>
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className={`flex items-start font-noto text-neutral-700 ${isMobile ? 'text-sm' : ''}`}
          >
            <ChevronRight className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary shrink-0 mt-0.5 mr-2`} />
            <span className={isMobile ? "line-clamp-2" : ""}>{benefit}</span>
          </div>
        ))}
      </div>
      
      <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'space-y-3'}`}>
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
            전문 상담 신청하기
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default ServiceBenefitsSidebar;
