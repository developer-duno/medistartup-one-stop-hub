
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronRight, ChevronLeft } from 'lucide-react';

// Dummy insights data - in a real application, this would come from an API
const latestInsights = [
  {
    id: 1,
    title: "2025년 병원창업 트렌드 보고서 - 의료정책 변화와 대응방안",
    category: "트렌드 리포트",
    date: "2025.03.15",
    image: "https://images.unsplash.com/photo-1576091160550-bdfa8387f952?q=80&w=2070&auto=format&fit=crop",
    excerpt: "2025년 1월부터 시행된 '의료기관 개설 허가 간소화법'의 핵심 내용과 개원의가 알아야 할 대응 방안을 소개합니다."
  },
  {
    id: 2,
    title: "디지털 헬스케어 시대의 병원 공간 설계 - 효율과 환자경험의 균형",
    category: "설계 & 인테리어",
    date: "2025.02.28",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    excerpt: "디지털 장비와 전통적 의료공간의 조화로운 설계로 환자 만족도와 진료 효율성을 모두 높이는 방법을 알아봅니다."
  },
  {
    id: 3,
    title: "빅데이터로 보는 2025년 입지 분석 - 지역별 의료수요 예측",
    category: "입지 분석",
    date: "2025.02.10",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    excerpt: "최신 인구통계와 의료이용 패턴 데이터를 기반으로 2025년 지역별 의료수요 변화를 예측하고 분석합니다."
  }
];

const NewsInsightsSection = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            뉴스 & <span className="text-primary">인사이트</span>
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            병원 창업과 운영에 관한 최신 의료법 개정 소식과 트렌드 리포트를 확인하세요.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex gap-6 min-w-max px-4">
              {latestInsights.map((insight) => (
                <div 
                  key={insight.id}
                  className="w-[320px] md:w-[380px] bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/insights/${insight.id}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={insight.image} 
                        alt={insight.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md">
                          {insight.category}
                        </span>
                        <div className="flex items-center text-neutral-500 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {insight.date}
                        </div>
                      </div>
                      <h3 className="font-pretendard font-bold text-lg mb-2 line-clamp-2">
                        {insight.title}
                      </h3>
                      <p className="font-noto text-neutral-600 text-sm line-clamp-3">
                        {insight.excerpt}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons for larger screens */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hidden md:block hover:bg-white">
            <ChevronLeft className="h-5 w-5 text-neutral-700" />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hidden md:block hover:bg-white">
            <ChevronRight className="h-5 w-5 text-neutral-700" />
          </button>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/insights" className="inline-flex items-center bg-white px-6 py-3 rounded-md shadow-sm border border-neutral-200 hover:shadow-md transition-shadow font-pretendard font-medium">
            모든 인사이트 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsInsightsSection;
