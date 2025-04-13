
import React from 'react';
import { useConsultation } from '@/contexts/ConsultationContext';
import CustomButton from '../ui/CustomButton';

const ExpertCTA: React.FC = () => {
  const { openConsultation } = useConsultation();
  
  return (
    <div className="bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
            아직 어떤 전문가가 필요한지 모르시나요?
          </h2>
          <p className="font-noto text-neutral-600 mb-8">
            무료 상담 신청을 통해 병원 창업 전문가의 맞춤형 조언을 받아보세요.
            개원 계획에 맞는 최적의 전문가 팀을 구성해 드립니다.
          </p>
          <CustomButton 
            variant="accent" 
            size="lg"
            onClick={openConsultation}
          >
            무료 상담 신청하기
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ExpertCTA;
