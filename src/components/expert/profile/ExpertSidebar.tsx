
import React from 'react';
import { MapPin, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import CustomButton from '@/components/ui/CustomButton';
import { Expert } from '@/types/expert';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 md:p-6 sticky top-24">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <p className="font-pretendard font-bold text-base md:text-lg">
            전문가 정보
          </p>
        </div>
        
        {expert.regions && expert.regions.length > 0 && (
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-primary-50 p-2 rounded-md shrink-0">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <span className="font-medium block mb-1 text-sm">활동 지역</span>
              <div className="flex flex-wrap gap-1">
                {expert.regions.map((region: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="bg-neutral-50 text-xs">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop buttons inside card */}
        <div className="hidden lg:block space-y-2.5">
          <CustomButton 
            variant={isExpertSelected ? "secondary" : "primary"} 
            className="w-full touch-manipulation select-none active:scale-95 transition-transform duration-150"
            onClick={onSelectExpert}
          >
            {isExpertSelected ? '전문가 선택 취소' : '전문가 선택하기'}
          </CustomButton>
          
          <CustomButton variant="outline" className="w-full touch-manipulation select-none active:scale-95 transition-transform duration-150" asChild>
            <Link to="/experts">
              다른 전문가 보기
            </Link>
          </CustomButton>
        </div>
      </div>

      {/* Mobile: fixed bottom bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 px-4 py-3 flex gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <CustomButton 
            variant={isExpertSelected ? "secondary" : "primary"} 
            className="flex-1 touch-manipulation select-none active:scale-95 transition-transform duration-150"
            onClick={onSelectExpert}
          >
            {isExpertSelected ? '선택 취소' : '전문가 선택하기'}
          </CustomButton>
          
          <CustomButton variant="outline" className="flex-1 touch-manipulation select-none active:scale-95 transition-transform duration-150" asChild>
            <Link to="/experts">
              다른 전문가
            </Link>
          </CustomButton>
        </div>
      )}
    </>
  );
};

export default ExpertSidebar;
