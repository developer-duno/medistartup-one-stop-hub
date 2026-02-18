
import React from 'react';
import { Award, ArrowRight, Check } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';
import { useExperts } from '@/contexts/ExpertsContext';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ExpertsSection = () => {
  const { experts } = useExperts();
  const { selectedExperts, selectExpert } = useConsultation();
  const isMobile = useIsMobile();

  // Filter experts to only show those who are approved and marked for main page display
  // and sort them by display order
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

        {/* 수정된 부분: 반응형 그리드 설정 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mainPageExperts.map((expert) => {
            const isSelected = selectedExperts.includes(expert.id);
            
            return (
              <div key={expert.id} className={`bg-white rounded-xl shadow-md overflow-hidden group ${
                isSelected ? 'ring-2 ring-primary border-primary' : ''
              }`}>
                <div className="relative h-40 sm:h-60 overflow-hidden">
                  <img
                    src={expert.image || "/placeholder.svg"} 
                    alt={expert.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-noto text-[10px] md:text-sm text-white/80">
                      {expert.specialty}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-3 md:p-6">
                  <div className="flex justify-between items-start mb-2 md:mb-4">
                    <div>
                      <h3 className="font-pretendard font-bold text-sm md:text-xl text-neutral-900">
                        {expert.name}
                      </h3>
                      <p className="font-noto text-neutral-600 text-xs md:text-base">
                        {expert.role}
                      </p>
                    </div>
                    <Award className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
                  </div>
                  
                  <div className="flex gap-2 md:gap-4 mb-2 md:mb-4">
                    <div className="bg-primary-50 rounded-lg px-2 md:px-3 py-1 md:py-2 flex flex-col items-center">
                      <span className="font-pretendard font-bold text-primary text-xs md:text-lg">
                        {expert.experience}
                      </span>
                      <span className="font-noto text-[9px] md:text-xs text-neutral-500">경력</span>
                    </div>
                    <div className="bg-primary-50 rounded-lg px-2 md:px-3 py-1 md:py-2 flex flex-col items-center">
                      <span className="font-pretendard font-bold text-primary text-xs md:text-lg">
                        {expert.projects}
                      </span>
                      <span className="font-noto text-[9px] md:text-xs text-neutral-500">프로젝트</span>
                    </div>
                  </div>
                  
                  <p className="font-noto text-[10px] md:text-sm text-neutral-600 mb-3 md:mb-6 line-clamp-2 md:line-clamp-3">
                    {expert.description}
                  </p>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-2">
                    <CustomButton 
                      variant="primary" 
                      className="flex-1 flex items-center justify-center gap-1"
                      asChild
                    >
                      <Link to={`/experts/${expert.id}`}>
                        프로필 보기
                      </Link>
                    </CustomButton>
                    <CustomButton
                      variant={isSelected ? "secondary" : "accent"}
                      className="flex-1 flex items-center justify-center gap-1"
                      onClick={() => selectExpert(expert.id)}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-4 w-4" />
                          선택됨
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          선택하기
                        </>
                      )}
                    </CustomButton>
                  </div>
                </div>
              </div>
            );
          })}
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
