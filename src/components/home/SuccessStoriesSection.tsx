
import React from 'react';
import LazyImage from '@/components/LazyImage';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';

const SuccessStoriesSection = () => {
  const { getFeaturedStories } = useSuccessStories();
  const featuredStories = getFeaturedStories().slice(0, 3);
  
  if (featuredStories.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-6 md:mb-10">
          <div>
            <h2 className="font-pretendard text-xl md:text-3xl font-bold mb-2 md:mb-3">
              성공<span className="text-green-600">스토리</span>
            </h2>
            <p className="text-neutral-600 max-w-xl mx-auto text-xs md:text-base">
              MediStartup과 함께한 의료기관들의 성공 사례를 확인하세요. 
              다양한 전문가와 함께 최적의 솔루션을 찾아드립니다.
            </p>
          </div>
        </div>
        
        {/* 수정된 부분: 반응형 그리드 설정 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {featuredStories.map((story) => (
            <Link 
              key={story.id} 
              to={`/success-stories/${story.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-100 h-full transition-all duration-150 group-hover:shadow-lg group-hover:-translate-y-1 active:scale-[0.98] active:shadow-inner touch-manipulation select-none">
                <div className="aspect-video relative overflow-hidden">
                  <LazyImage 
                    src={story.imageUrl} 
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-pretendard font-bold text-base md:text-lg mb-1 md:mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-neutral-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                    {story.summary}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-green-600 font-medium text-sm group-hover:underline">
                      자세히 보기
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/success-stories" 
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            모든 사례 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
