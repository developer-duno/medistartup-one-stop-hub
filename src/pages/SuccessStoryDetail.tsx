
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, MapPin, Tag, User, Share2, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { useKakaoSDK, shareToKakao } from '@/hooks/useKakaoSDK';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';
import { useExperts } from '@/contexts/ExpertsContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { generateSeoData } from '@/utils/seoUtils';
import { generateSuccessStorySchema } from '@/utils/schemaUtils';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SuccessStoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { successStories } = useSuccessStories();
  const { experts } = useExperts();
  const navigate = useNavigate();
  const kakaoReady = useKakaoSDK();
  
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
      
      <div className="theme-page-header">
        <div className="container mx-auto px-3 md:px-4">
          <Link to="/success-stories" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-4 md:mb-6 text-xs md:text-sm">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            성공 사례 목록으로 돌아가기
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 md:mb-6">
            <h1 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900 mb-2 md:mb-4">
              {story.title}
            </h1>
            
            <div className="flex flex-wrap gap-y-2 md:gap-y-3 text-[10px] md:text-sm text-neutral-600 mb-4 md:mb-8">
              <div className="flex items-center mr-3 md:mr-6">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center mr-3 md:mr-6">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" />
                <span>{story.location}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-3 w-3 md:h-4 md:w-4 mr-0.5 md:mr-1" />
                <span>{story.hospital}</span>
              </div>
            </div>
          </div>

          {/* SNS 공유 버튼 */}
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="text-xs md:text-sm text-muted-foreground mr-1">공유하기</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      const url = `https://medistartup.co.kr/success-stories/${story.id}`;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[hsl(220,46%,48%)] text-white hover:opacity-80 transition-opacity"
                    aria-label="Facebook 공유"
                  >
                    <span className="text-xs font-bold">f</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>Facebook</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      const url = `https://medistartup.co.kr/success-stories/${story.id}`;
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(story.title)}`, '_blank', 'width=600,height=400');
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity"
                    aria-label="X(Twitter) 공유"
                  >
                    <span className="text-xs font-bold">𝕏</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>X (Twitter)</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      const url = `https://medistartup.co.kr/success-stories/${story.id}`;
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(story.title + ' ' + url)}`, '_blank');
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[hsl(142,70%,40%)] text-white hover:opacity-80 transition-opacity"
                    aria-label="WhatsApp 공유"
                  >
                    <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>WhatsApp</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      const url = `https://medistartup.co.kr/success-stories/${story.id}`;
                      if (kakaoReady) {
                        const success = shareToKakao({
                          title: story.title,
                          description: story.summary,
                          imageUrl: story.imageUrl,
                          linkUrl: url,
                        });
                        if (!success) {
                          window.open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                        }
                      } else {
                        window.open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                      }
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[hsl(48,97%,52%)] text-[hsl(0,0%,15%)] hover:opacity-80 transition-opacity"
                    aria-label="카카오톡 공유"
                  >
                    <span className="text-xs font-bold">K</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>카카오톡</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      const url = `https://medistartup.co.kr/success-stories/${story.id}`;
                      navigator.clipboard.writeText(url);
                      toast({ title: '링크가 복사되었습니다', description: url });
                    }}
                    className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors"
                    aria-label="링크 복사"
                  >
                    <LinkIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>링크 복사</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 md:mb-8">
            <img 
              src={story.imageUrl} 
              alt={`${story.title} - ${story.hospital}`} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose prose-sm md:prose-lg max-w-none">
            <div className="mb-4 md:mb-8">
              <h3 className="font-pretendard font-bold text-base md:text-xl mb-2 md:mb-3 theme-text">서비스 영역</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-6">
                {story.services.map((service, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-md bg-neutral-100 px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-sm font-medium text-neutral-700"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4 md:mb-8">
              <h3 className="font-pretendard font-bold text-base md:text-xl mb-2 md:mb-3 theme-text">성공 사례 내용</h3>
              <p className="whitespace-pre-line text-xs md:text-base">{story.content}</p>
            </div>
          </div>
          
          {/* 관련 전문가 섹션 */}
          {(() => {
            const relatedExperts = experts.filter(e => 
              e.isApproved !== false && 
              e.services?.some(s => story.services.includes(s))
            ).slice(0, 4);
            if (relatedExperts.length === 0) return null;
            return (
              <div className="mt-8 md:mt-12 border-t border-neutral-200 pt-4 md:pt-8">
                <h3 className="font-pretendard font-bold text-base md:text-xl mb-4 md:mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  관련 전문가
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {relatedExperts.map(expert => (
                    <Link
                      key={expert.id}
                      to={`/experts/${expert.id}`}
                      className="block group text-center"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-neutral-100 group-hover:border-primary transition-colors">
                        <img
                          src={expert.image || '/placeholder.svg'}
                          alt={expert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-sm text-neutral-900 group-hover:text-primary transition-colors">{expert.name}</p>
                      <p className="text-xs text-neutral-500">{expert.specialty}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="mt-8 md:mt-12 border-t border-neutral-200 pt-4 md:pt-8">
            <h3 className="font-pretendard font-bold text-base md:text-xl mb-4 md:mb-6">다른 성공 사례 보기</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
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
                    <h4 className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
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
