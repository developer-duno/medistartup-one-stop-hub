
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';
import { Helmet } from 'react-helmet';
import { getSEOData } from '@/utils/seoUtils';

const SuccessStories = () => {
  const { getVisibleStories } = useSuccessStories();
  const visibleStories = getVisibleStories();
  
  // SEO data for the page
  const seoData = getSEOData('/success-stories', '성공 스토리');
  
  return (
    <div className="theme-success min-h-screen bg-white">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonicalUrl} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-28 pb-16 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              성공 <span className="theme-text">스토리</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              MediStartup과 함께한 의료기관들의 성공 사례를 확인하세요.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {visibleStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleStories.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                <div className="aspect-video bg-neutral-100 relative">
                  <img 
                    src={story.imageUrl} 
                    alt={story.title} 
                    className="w-full h-full object-cover"
                  />
                  {story.featured && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      추천 사례
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-pretendard font-bold text-lg mb-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center mb-3 text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">{story.hospital}</span>
                    <span className="mx-2">•</span>
                    <span>{story.location}</span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-4">
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
            <p className="text-neutral-500">등록된 성공 사례가 없습니다.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
