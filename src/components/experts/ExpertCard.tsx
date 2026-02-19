
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Clock, MapPin, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import CustomButton from '../ui/CustomButton';
import { Expert } from '@/types/expert';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  const { selectedExperts, selectExpert } = useConsultation();
  const isMobile = useIsMobile();
  
  const isSelected = selectedExperts.includes(expert.id);

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border overflow-hidden group touch-manipulation select-none transition-all duration-150 active:scale-[0.98] active:shadow-inner ${
        isSelected 
          ? 'border-primary ring-2 ring-primary-300' 
          : 'border-neutral-200 hover:shadow-md'
      }`}
    >
      <div className="relative">
        <div className="h-32 md:h-48 overflow-hidden">
          <img 
            src={expert.image} 
            alt={expert.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        
        <div className="absolute top-3 right-3">
          <button
            onClick={() => selectExpert(expert.id)}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isSelected
                ? 'bg-primary text-white'
                : 'bg-white/80 text-neutral-500 hover:bg-primary/10'
            }`}
            aria-label={isSelected ? "전문가 선택 취소" : "전문가 선택"}
          >
            {isSelected ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <div className="w-3 h-3 border-2 border-neutral-400 rounded-full"></div>
            )}
          </button>
        </div>
      </div>
      
      <div className="p-3 md:p-5">
        <div className="flex justify-between items-start mb-1 md:mb-2">
          <div>
            <h3 className="font-pretendard font-bold text-base md:text-lg text-neutral-900">
              {expert.name}
            </h3>
            <p className="font-noto text-neutral-600 text-xs md:text-sm">
              {expert.role}
            </p>
          </div>
          <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 text-[10px] md:text-xs px-1.5 md:px-2">
            {expert.services[0]}
          </Badge>
        </div>
        
        <p className="font-noto text-neutral-700 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 hidden md:block">
          {expert.specialty}
        </p>
        
        <div className="hidden md:flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-5">
          <div className="flex items-center gap-1 text-xs md:text-sm text-neutral-500">
            <Award className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="truncate">{expert.experience}</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-neutral-500">
            <Clock className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="truncate">{expert.projects}</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-neutral-500">
            <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span className="truncate">{expert.regions.join(', ')}</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm text-neutral-500">
            <Eye className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
            <span>{expert.profileViews ?? 0}회</span>
          </div>
        </div>

        {/* Mobile: compact info */}
        <div className="flex md:hidden items-center gap-1 text-[10px] text-neutral-500 mb-2">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{expert.regions.join(', ')}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 md:gap-2">
          <CustomButton 
            variant={isSelected ? "secondary" : "outline"}
            size="sm"
            onClick={() => selectExpert(expert.id)}
            className="text-[10px] md:text-sm px-1 md:px-3 touch-manipulation select-none active:scale-95 transition-transform duration-150"
          >
            {isSelected ? '취소' : '선택'}
          </CustomButton>
          
          <CustomButton 
            variant="primary" 
            size="sm"
            asChild
            className="text-[10px] md:text-sm px-1 md:px-3 touch-manipulation select-none active:scale-95 transition-transform duration-150"
          >
            <Link to={`/experts/${expert.id}`}>
              프로필
            </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
