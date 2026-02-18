
import React from 'react';
import { UserPlus } from 'lucide-react';
import ExpertApplicationButton from './ExpertApplicationButton';

const ExpertApplicationCTA: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-primary-50">
      <div className="container mx-auto px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-pretendard font-bold text-lg md:text-3xl text-neutral-900 mb-2 md:mb-4">
            <UserPlus className="inline-block h-5 w-5 md:h-8 md:w-8 mr-1 md:mr-2 text-primary" />
            메디스타트업과 함께할 <span className="text-primary">전문가</span>를 모십니다
          </h3>
          <p className="font-noto text-neutral-600 mb-4 md:mb-8 text-xs md:text-base">
            병원창업 관련 전문성을 갖추신 분들의 많은 지원 바랍니다.
            함께 성장하며 가치 있는 서비스를 제공할 전문가를 찾고 있습니다.
          </p>
          <div className="flex justify-center">
            <ExpertApplicationButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertApplicationCTA;
