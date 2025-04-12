
import React from 'react';
import { MessageSquare, Calendar, Award, ArrowRight } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';

const ExpertsSection = () => {
  const experts = [
    {
      id: 1,
      name: '김태호',
      role: '재무 컨설턴트',
      specialty: '병원 재무설계 및 투자계획 전문',
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
      experience: '15년+',
      projects: '320+',
      description: '서울대 의대 출신으로 병원 경영 컨설팅 15년 경력. 특히 개원의를 위한 맞춤형 재무설계와 수익성 분석에 강점이 있습니다.',
      services: ['재무 컨설팅']
    },
    {
      id: 2,
      name: '박지연',
      role: '입지 분석가',
      specialty: '의료기관 최적 입지선정 및 상권분석',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
      experience: '12년+',
      projects: '280+',
      description: '빅데이터 기반 상권분석 전문가로 의료기관 특화 입지분석 모델을 개발했습니다. 대전/충남 지역 의료상권에 대한 깊은 이해를 갖고 있습니다.',
      services: ['입지 분석']
    },
    {
      id: 3,
      name: '이준호',
      role: '의료 인테리어 디자이너',
      specialty: '진료과목별 최적화 공간설계',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
      experience: '10년+',
      projects: '170+',
      description: '의료공간 특화 인테리어 디자이너로 환자 경험과 의료진 효율성을 모두 고려한 최적의 공간설계를 제안합니다. 다양한 진료과목별 맞춤 설계 경험이 풍부합니다.',
      services: ['설계 및 인테리어']
    },
    {
      id: 4,
      name: '최민서',
      role: '인허가 전문가',
      specialty: '의료기관 인허가 및 행정절차 대행',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
      experience: '14년+',
      projects: '250+',
      description: '복잡한 의료기관 인허가 절차를 신속하고 정확하게 처리합니다. 각종 규제와 법률 변화에 즉각 대응하여 개원 지연 리스크를 최소화합니다.',
      services: ['인허가 대행']
    },
    {
      id: 5,
      name: '정서연',
      role: '의료인력 채용 전문가',
      specialty: '병원 맞춤형 인력 구성 및 채용',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
      experience: '9년+',
      projects: '210+',
      description: '의료기관별 최적의 인력 구조를 설계하고 적합한 인재를 매칭합니다. 장기적인 인력 안정성과 팀워크를 고려한 채용 솔루션을 제공합니다.',
      services: ['인력 채용']
    },
    {
      id: 6,
      name: '강현우',
      role: '의료 마케팅 전문가',
      specialty: '디지털 마케팅 및 환자 유치 전략',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
      experience: '11년+',
      projects: '190+',
      description: '의료기관 특화 디지털 마케팅 전략 수립 및 실행 전문가입니다. 지역 타겟팅과 진료과목별 특성을 고려한 효과적인 환자 유치 방안을 제시합니다.',
      services: ['마케팅 전략']
    },
    {
      id: 7,
      name: '윤재호',
      role: '의료기기 컨설턴트',
      specialty: '진료과목별 최적 장비 구성 및 설치',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      experience: '13년+',
      projects: '230+',
      description: '의료기관별 최적의 의료장비 구성과 효율적인 도입 방안을 제시합니다. 비용 대비 성능을 고려한 장비 선정과 공간 효율적 배치 설계를 전문으로 합니다.',
      services: ['의료기기 구입 및 설치']
    },
    {
      id: 8,
      name: '한지민',
      role: '의료폐기물 관리 전문가',
      specialty: '의료폐기물 처리 및 수납 시스템 구축',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
      experience: '8년+',
      projects: '160+',
      description: '의료기관의 효율적인 수납 시스템 구축 및 의료폐기물 관리 솔루션을 제공합니다. 비용 절감과 환경 규제 준수를 모두 고려한 최적의 방안을 제시합니다.',
      services: ['수납 및 의료폐기물 처리']
    }
  ];

  return (
    <section id="experts" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            <span className="text-primary">전문가</span> 프로필
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            병원창업 각 분야 최고의 전문가들이 여러분의 성공적인 창업을 함께합니다.
            풍부한 경험과 전문성으로 최적의 솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-noto text-sm text-white/80">
                    {expert.specialty}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-pretendard font-bold text-xl text-neutral-900">
                      {expert.name}
                    </h3>
                    <p className="font-noto text-neutral-600">
                      {expert.role}
                    </p>
                  </div>
                  <Award className="h-5 w-5 text-secondary" />
                </div>
                
                <div className="flex gap-4 mb-4">
                  <div className="bg-primary-50 rounded-lg px-3 py-2 flex flex-col items-center">
                    <span className="font-pretendard font-bold text-primary text-lg">
                      {expert.experience}
                    </span>
                    <span className="font-noto text-xs text-neutral-500">경력</span>
                  </div>
                  <div className="bg-primary-50 rounded-lg px-3 py-2 flex flex-col items-center">
                    <span className="font-pretendard font-bold text-primary text-lg">
                      {expert.projects}
                    </span>
                    <span className="font-noto text-xs text-neutral-500">프로젝트</span>
                  </div>
                </div>
                
                <p className="font-noto text-sm text-neutral-600 mb-6 line-clamp-3">
                  {expert.description}
                </p>
                
                <div className="flex gap-2">
                  <CustomButton 
                    variant="outline" 
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1"
                    asChild
                  >
                    <Link to="/contact">
                      <MessageSquare className="h-4 w-4" />
                      상담하기
                    </Link>
                  </CustomButton>
                  <CustomButton 
                    variant="primary" 
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1"
                    asChild
                  >
                    <Link to={`/expert/${expert.id}`}>
                      <Calendar className="h-4 w-4" />
                      프로필 보기
                    </Link>
                  </CustomButton>
                </div>
              </div>
            </div>
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
