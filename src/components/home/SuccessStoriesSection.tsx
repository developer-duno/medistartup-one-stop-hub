
import React from 'react';
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="font-pretendard text-3xl md:text-4xl font-bold mb-3">
              성공<span className="text-green-600">스토리</span>
            </h2>
            <p className="text-neutral-600 max-w-xl">
              MediStartup과 함께한 의료기관들의 성공 사례를 확인하세요. 
              다양한 전문가와 함께 최적의 솔루션을 찾아드립니다.
            </p>
          </div>
          <Link 
            to="/success-stories" 
            className="hidden md:inline-flex items-center mt-4 md:mt-0 text-green-600 hover:text-green-700 font-medium"
          >
            모든 사례 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <Link 
              key={story.id} 
              to={`/success-stories/${story.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-100 h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-pretendard font-bold text-lg mb-2 group-hover:text-green-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
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
