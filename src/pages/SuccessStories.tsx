
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';
import { LoadingState } from '@/components/ui/loading-state';

const SuccessStories = () => {
  const { getVisibleStories, loading } = useSuccessStories();
  const visibleStories = getVisibleStories();
  
  return (
    <div className="theme-success min-h-screen bg-white">
      <Navbar />
      
      <div className="theme-page-header">
        <div className="container mx-auto px-3 md:px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-3 md:mb-4 text-xs md:text-sm">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900 mb-1 md:mb-2">
              성공 <span className="theme-text">스토리</span>
            </h1>
            <p className="font-noto text-neutral-600 text-xs md:text-sm">
              MediStartup과 함께한 의료기관들의 성공 사례를 확인하세요.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12">
        {loading ? (
          <LoadingState className="py-12" />
        ) : visibleStories.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {visibleStories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title} 
                    className="w-full h-full object-cover"
                  />
                  {story.featured && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-medium">
                      추천 사례
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-pretendard font-bold text-base md:text-lg mb-1 md:mb-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center mb-2 md:mb-3 text-[10px] md:text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">{story.hospital}</span>
                    <span className="mx-1 md:mx-2">•</span>
                    <span>{story.location}</span>
                  </div>
                  <p className="text-neutral-600 text-xs md:text-sm mb-2 md:mb-4">
                    {story.summary}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {story.services.map((service, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Link to={`/success-stories/${story.id}`} className="theme-text font-medium text-sm">
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">등록된 성공 사례가 없습니다.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
