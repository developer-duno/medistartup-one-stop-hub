
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import CustomButton from '@/components/ui/CustomButton';
import { Expert } from '@/types/expert';

interface ExpertSidebarProps {
  expert: Expert;
  isExpertSelected: boolean;
  onSelectExpert: () => void;
}

const ExpertSidebar: React.FC<ExpertSidebarProps> = ({ 
  expert,
  isExpertSelected,
  onSelectExpert,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 sticky top-24">
      <div className="flex items-center gap-4 mb-6">
        <div className="md:hidden w-16 h-16 rounded-full overflow-hidden border-2 border-primary-50">
          <img 
            src={expert.image || "/placeholder.svg"} 
            alt={expert.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-pretendard font-bold text-xl text-neutral-900 md:hidden">
            {expert.name}
          </h3>
          <p className="text-neutral-500 md:text-lg">
            전문가 정보
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {expert.contact && (
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-md">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">{expert.contact}</span>
          </div>
        )}
        
        {expert.email && (
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-md">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">{expert.email}</span>
          </div>
        )}
        
        {expert.regions && expert.regions.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="bg-primary-50 p-2 rounded-md">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-medium block mb-1">활동 지역</span>
              <div className="flex flex-wrap gap-1">
                {expert.regions.map((region: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="bg-neutral-50">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <CustomButton 
          variant={isExpertSelected ? "secondary" : "primary"} 
          className="w-full"
          onClick={onSelectExpert}
        >
          {isExpertSelected ? '전문가 선택 취소' : '전문가 선택하기'}
        </CustomButton>
        
        <CustomButton variant="outline" className="w-full" asChild>
          <Link to="/experts">
            다른 전문가 보기
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default ExpertSidebar;
