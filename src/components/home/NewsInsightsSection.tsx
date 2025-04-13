
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { useInsights } from '@/contexts/InsightsContext';

const NewsInsightsSection = () => {
  const { insights } = useInsights();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get the most recent 3 insights
  const latestInsights = [...insights]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, latestInsights.length - 3);
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : maxIndex));
  };
  
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'trend': return '트렌드';
      case 'marketing': return '마케팅';
      case 'licensing': return '인허가';
      case 'finance': return '재무';
      case 'recruitment': return '인력채용';
      case 'equipment': return '의료장비';
      default: return category;
    }
  };

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
                        src={insight.image || 'https://placehold.co/600x400?text=No+Image'} 
                        alt={insight.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = 'https://placehold.co/600x400?text=Loading+Error';
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md">
                          {getCategoryDisplayName(insight.category)}
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
          <button 
            onClick={handlePrevious} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hidden md:block hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5 text-neutral-700" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hidden md:block hover:bg-white"
          >
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
