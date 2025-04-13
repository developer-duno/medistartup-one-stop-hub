
import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { useConsultation } from '@/contexts/ConsultationContext';

const ExpertCTA: React.FC = () => {
  const { openConsultation } = useConsultation();
  
  return (
    <>
      <div className="flex justify-center mt-12">
        <CustomButton variant="outline">
          <Download className="h-5 w-5 mr-2" />
          전문가 종합 안내서 다운로드
        </CustomButton>
      </div>

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
    </>
  );
};

export default ExpertCTA;
