
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { generateSeoData } from '@/utils/seoUtils';
import { generateSuccessStorySchema } from '@/utils/schemaUtils';

const SuccessStoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { successStories } = useSuccessStories();
  const navigate = useNavigate();
  
  const story = successStories.find(s => s.id === Number(id) && s.visible);
  
  if (!story) {
    return (
      <div className="theme-success min-h-screen bg-white">
        <Helmet
          {...generateSeoData({
            title: '존재하지 않는 성공 사례',
            description: '요청하신 성공 사례를 찾을 수 없습니다.',
            pathname: '/success-stories'
          })}
        />
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-pretendard font-bold text-2xl mb-6">존재하지 않는 성공 사례입니다</h1>
          <Button onClick={() => navigate('/success-stories')}>
            모든 성공 사례 보기
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const seoData = generateSeoData({
    title: story.title,
    description: story.summary,
    ogImage: story.imageUrl,
    type: 'article',
    pathname: `/success-stories/${story.id}`
  });

  const schemaData = generateSuccessStorySchema(
    story,
    `https://medistartup.co.kr/success-stories/${story.id}`
  );
  
  return (
    <div className="theme-success min-h-screen bg-white">
      <Helmet {...seoData}>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <Navbar />
      
      <div className="pt-28 pb-16 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/success-stories" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            성공 사례 목록으로 돌아가기
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              {story.title}
            </h1>
            
            <div className="flex flex-wrap gap-y-3 text-sm text-neutral-600 mb-8">
              <div className="flex items-center mr-6">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center mr-6">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{story.location}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span>{story.hospital}</span>
              </div>
            </div>
          </div>
          
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-8">
            <img 
              src={story.imageUrl} 
              alt={`${story.title} - ${story.hospital}`} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h3 className="font-pretendard font-bold text-xl mb-3 theme-text">서비스 영역</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {story.services.map((service, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-md bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-pretendard font-bold text-xl mb-3 theme-text">성공 사례 내용</h3>
              <p className="whitespace-pre-line">{story.content}</p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <h3 className="font-pretendard font-bold text-xl mb-6">다른 성공 사례 보기</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {successStories
                .filter(s => s.visible && s.id !== story.id)
                .slice(0, 3)
                .map(relatedStory => (
                  <Link 
                    key={relatedStory.id}
                    to={`/success-stories/${relatedStory.id}`}
                    className="block group"
                  >
                    <div className="aspect-video rounded-md overflow-hidden mb-2">
                      <img 
                        src={relatedStory.imageUrl} 
                        alt={relatedStory.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      />
                    </div>
                    <h4 className="font-medium text-neutral-900 group-hover:theme-text transition-colors">
                      {relatedStory.title}
                    </h4>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStoryDetail;
