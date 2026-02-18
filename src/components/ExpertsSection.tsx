
import React from 'react';
import { ArrowRight } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';
import { useExperts } from '@/contexts/ExpertsContext';
import ExpertCard from '@/components/experts/ExpertCard';

const ExpertsSection = () => {
  const { experts } = useExperts();

  const mainPageExperts = experts
    .filter(expert => expert.showOnMain && expert.isApproved && expert.applicationStatus === 'approved')
    .sort((a, b) => {
      const orderA = a.displayOrder !== undefined ? a.displayOrder : 999;
      const orderB = b.displayOrder !== undefined ? b.displayOrder : 999;
      return orderA - orderB;
    });

  return (
    <section id="experts" className="py-10 md:py-24">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900 mb-2 md:mb-4">
            <span className="text-primary">전문가</span> 프로필
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto text-xs md:text-base">
            병원창업 각 분야 최고의 전문가들이 여러분의 성공적인 창업을 함께합니다.
            풍부한 경험과 전문성으로 최적의 솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6">
          {mainPageExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <CustomButton 
            variant="outline"
            asChild
          >
            <Link to="/experts" className="flex items-center gap-2">
              모든 전문가 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
