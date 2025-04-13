
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CustomButton from '../ui/CustomButton';

const SuccessStoriesSection = () => {
  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            병원창업 <span className="text-secondary">성공 스토리</span>
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            다양한 진료과목과 지역에서 메디스타트업과 함께 개원에 성공한 고객들의 실제 사례를 소개합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1631217868264-e6641e711e45?q=80&w=2091&auto=format&fit=crop" 
              alt="서울 강남 퍼스트의원" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="inline-block px-2 py-1 bg-secondary text-white text-xs font-medium rounded-md mb-2">
                내과
              </span>
              <h3 className="font-pretendard font-bold text-xl md:text-2xl mb-2">
                서울 강남 퍼스트의원 - 내과 특화 개원
              </h3>
              <p className="font-noto text-white/80 text-sm md:text-base mb-4 max-w-lg">
                개원 후 6개월 만에 월 매출 1억 달성, 목표 환자수 130% 달성
              </p>
              <Link 
                to="/success-stories" 
                className="inline-flex items-center text-white hover:text-secondary-100 font-medium"
              >
                사례 자세히 보기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              <Link to="/success-stories" className="block">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
                    alt="부산 해운대 미소플러스치과" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-md mb-2">
                    치과
                  </span>
                  <h3 className="font-pretendard font-medium text-base mb-1 line-clamp-2">
                    부산 해운대 미소플러스치과
                  </h3>
                  <p className="font-noto text-neutral-600 text-xs line-clamp-2">
                    디지털 장비 도입으로 진료 효율성 30% 향상
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              <Link to="/success-stories" className="block">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2072&auto=format&fit=crop" 
                    alt="대전 둔산동 미래피부과" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-md mb-2">
                    피부과
                  </span>
                  <h3 className="font-pretendard font-medium text-base mb-1 line-clamp-2">
                    대전 둔산동 미래피부과
                  </h3>
                  <p className="font-noto text-neutral-600 text-xs line-clamp-2">
                    리모델링 후 매출 120% 증가, 신규 고객층 확보
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              <Link to="/success-stories" className="block">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop" 
                    alt="경기 분당 연세정형외과" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-md mb-2">
                    정형외과
                  </span>
                  <h3 className="font-pretendard font-medium text-base mb-1 line-clamp-2">
                    경기 분당 연세정형외과
                  </h3>
                  <p className="font-noto text-neutral-600 text-xs line-clamp-2">
                    600평 규모 센터 조기 개원 성공, 목표 환자수 150% 달성
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
              <Link to="/success-stories" className="block">
                <div className="h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop" 
                    alt="서울 광진구 행복한의원" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-md mb-2">
                    한의원
                  </span>
                  <h3 className="font-pretendard font-medium text-base mb-1 line-clamp-2">
                    서울 광진구 행복한의원
                  </h3>
                  <p className="font-noto text-neutral-600 text-xs line-clamp-2">
                    여성 특화 한의원으로 차별화, 예약 2주 대기 상태 유지
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <CustomButton 
            variant="secondary"
            asChild
          >
            <Link to="/success-stories" className="inline-flex items-center">
              모든 성공 사례 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
