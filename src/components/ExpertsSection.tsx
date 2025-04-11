
import React from 'react';
import { MessageSquare, Calendar, Award } from 'lucide-react';
import CustomButton from './ui/CustomButton';

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
      description: '서울대 의대 출신으로 병원 경영 컨설팅 15년 경력. 특히 개원의를 위한 맞춤형 재무설계와 수익성 분석에 강점이 있습니다.'
    },
    {
      id: 2,
      name: '박지연',
      role: '입지 분석가',
      specialty: '의료기관 최적 입지선정 및 상권분석',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
      experience: '12년+',
      projects: '280+',
      description: '빅데이터 기반 상권분석 전문가로 의료기관 특화 입지분석 모델을 개발했습니다. 대전/충남 지역 의료상권에 대한 깊은 이해를 갖고 있습니다.'
    },
    {
      id: 3,
      name: '이준호',
      role: '의료 인테리어 디자이너',
      specialty: '진료과목별 최적화 공간설계',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
      experience: '10년+',
      projects: '170+',
      description: '의료공간 특화 인테리어 디자이너로 환자 경험과 의료진 효율성을 모두 고려한 최적의 공간설계를 제안합니다. 다양한 진료과목별 맞춤 설계 경험이 풍부합니다.'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  >
                    <MessageSquare className="h-4 w-4" />
                    상담하기
                  </CustomButton>
                  <CustomButton 
                    variant="primary" 
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    예약하기
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <CustomButton variant="outline">
            모든 전문가 보기
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
