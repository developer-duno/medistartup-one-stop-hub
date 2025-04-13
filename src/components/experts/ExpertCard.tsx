
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Clock, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import CustomButton from '../ui/CustomButton';
import { Expert } from '@/types/expert';
import { useConsultation } from '@/contexts/ConsultationContext';

interface ExpertCardProps {
  expert: Expert;
  selectedExperts?: number[];
  onSelectExpert?: (expertId: number) => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ 
  expert, 
  selectedExperts: propSelectedExperts, 
  onSelectExpert: propOnSelectExpert 
}) => {
  const { selectedExperts: contextSelectedExperts, selectExpert: contextSelectExpert } = useConsultation();
  
  // Use props if provided (for backward compatibility), otherwise use context
  const selectedExperts = propSelectedExperts || contextSelectedExperts;
  const onSelectExpert = propOnSelectExpert || contextSelectExpert;
  
  const isSelected = selectedExperts.includes(expert.id);

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border overflow-hidden group ${
        isSelected 
          ? 'border-primary ring-2 ring-primary-300' 
          : 'border-neutral-200 hover:shadow-md'
      }`}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={expert.image} 
            alt={expert.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onSelectExpert(expert.id)}
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isSelected
                ? 'bg-primary text-white'
                : 'bg-white/80 text-neutral-500 hover:bg-primary/10'
            }`}
          >
            {isSelected ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <div className="w-3 h-3 border-2 border-neutral-400 rounded-full"></div>
            )}
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-pretendard font-bold text-lg text-neutral-900">
              {expert.name}
            </h3>
            <p className="font-noto text-neutral-600 text-sm">
              {expert.role}
            </p>
          </div>
          <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
            {expert.services[0]}
          </Badge>
        </div>
        
        <p className="font-noto text-neutral-700 text-sm mb-4 line-clamp-2">
          {expert.specialty}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Award className="h-4 w-4" />
            <span>{expert.experience}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <Clock className="h-4 w-4" />
            <span>{expert.projects}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <MapPin className="h-4 w-4" />
            <span>{expert.regions.join(', ')}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <CustomButton 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={() => onSelectExpert(expert.id)}
          >
            {isSelected ? '선택 취소' : '전문가 선택'}
          </CustomButton>
          
          <CustomButton 
            variant="primary" 
            size="sm"
            className="flex-1"
            asChild
          >
            <Link to={`/expert/${expert.id}`}>
              상세 프로필
            </Link>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
