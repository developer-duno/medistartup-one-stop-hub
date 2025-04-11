
import React from 'react';
import { MapPin, BarChart3, Building2, FileCheck, Users, Briefcase } from 'lucide-react';
import CustomButton from './ui/CustomButton';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: '입지 분석',
      description: '유동인구, 경쟁 의료기관, 임대료 등을 고려한 최적 입지 선정',
      color: 'from-primary-100 to-primary-50'
    },
    {
      id: 2,
      icon: <BarChart3 className="h-8 w-8 text-secondary" />,
      title: '재무 컨설팅',
      description: '초기 투자비용 산정부터 손익분기점 예측까지 맞춤형 재무 계획',
      color: 'from-secondary-100 to-secondary-50'
    },
    {
      id: 3,
      icon: <Building2 className="h-8 w-8 text-accent" />,
      title: '설계 및 인테리어',
      description: '진료과목별 최적 동선 설계 및 브랜드 아이덴티티를 반영한 인테리어',
      color: 'from-accent-100 to-accent-50'
    },
    {
      id: 4,
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      title: '인허가 대행',
      description: '복잡한 행정 절차를 원스톱으로 처리하는 인허가 대행 서비스',
      color: 'from-primary-100 to-primary-50'
    },
    {
      id: 5,
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: '인력 채용',
      description: '전문 의료인력 채용 및 교육 프로그램 지원',
      color: 'from-secondary-100 to-secondary-50'
    },
    {
      id: 6,
      icon: <Briefcase className="h-8 w-8 text-accent" />,
      title: '마케팅 전략',
      description: '개원 초기 인지도 확보부터 지속 가능한 환자 유치 전략 수립',
      color: 'from-accent-100 to-accent-50'
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            병원창업을 위한 <span className="text-primary">원스탑</span> 솔루션
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            의료기관 설립의 모든 과정을 함께합니다. 각 분야 전문가들이 개원 단계별로 필요한 모든 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className={`p-6 bg-gradient-to-br ${service.color}`}>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm mb-4">
                  {service.icon}
                </div>
                <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="font-noto text-neutral-600">
                  {service.description}
                </p>
              </div>
              <div className="p-4 border-t border-neutral-100">
                <a href="#" className="font-pretendard font-medium text-primary inline-flex items-center group-hover:underline">
                  자세히 알아보기
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CustomButton variant="outline">
            모든 서비스 살펴보기
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
