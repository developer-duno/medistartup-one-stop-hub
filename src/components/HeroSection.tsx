
import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, TrendingUp, Users, Clock, Sparkles } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { RunwareService } from '../services/RunwareService';
import { toast } from 'sonner';

const HeroSection = () => {
  const [selectedRegion, setSelectedRegion] = useState('대전/충남');
  const [hospitalImage, setHospitalImage] = useState('');
  const regions = ['대전/충남', '서울/경기', '부산/경남', '대구/경북', '광주/전라', '강원', '제주'];
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Sample consultation video URL - replace with your actual hospital consulting video
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  useEffect(() => {
    const generateHospitalImage = async () => {
      try {
        const runwareService = new RunwareService('6PtVhh4UUUKazd3Uv8K0l7njZsxeaOxQ');
        const result = await runwareService.generateImage({
          positivePrompt: "Modern hospital interior, clean and professional medical clinic, soft lighting, medical equipment, white walls, healthcare design",
          width: 1024,
          height: 1024,
          numberResults: 1
        });
        setHospitalImage(result.imageURL);
      } catch (error) {
        console.error('Failed to generate hospital image:', error);
        setHospitalImage('https://images.unsplash.com/photo-1666214280168-a461f9398c35?q=80&w=3270&auto=format&fit=crop');
      }
    };

    generateHospitalImage();
  }, []);

  const handleFeasibilityAnalysis = () => {
    if (!selectedRegion) {
      toast.error('지역을 선택해 주세요');
      return;
    }

    // Scroll to simulator section
    const simulatorSection = document.getElementById('simulators');
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Store the selected region in sessionStorage for the simulator to use
    sessionStorage.setItem('selectedRegion', selectedRegion);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-100 via-white to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 rounded-full bg-secondary blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-noto text-sm animate-pulse-light">
              2025년 병원창업 트렌드 업데이트
            </div>
            
            <h1 className="font-pretendard font-bold text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-tight">
              병원창업 <span className="text-primary">원스탑</span> 컨설팅<br />
              <span className="relative">
                데이터 기반 의사결정
                <svg className="absolute h-3 md:h-4 -bottom-1 left-0 w-full text-accent" viewBox="0 0 100 15" preserveAspectRatio="none">
                  <path d="M0,5 Q40,15 80,5 T160,5" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="font-noto text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0">
              의원급 개원부터 종합병원 설립까지, 지역 특화 네트워크와 데이터 분석을 활용한 맞춤형 컨설팅 서비스를 제공합니다.
            </p>

            <div className="relative inline-block">
              <div className="flex">
                <div className="relative z-10 w-fit">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 font-noto bg-white border border-neutral-200 rounded-l-md shadow-sm"
                    onClick={() => {
                      const dropdown = document.getElementById('regionDropdown');
                      if (dropdown) {
                        dropdown.classList.toggle('hidden');
                      }
                    }}
                  >
                    <MapPin size={18} className="text-primary" />
                    <span>{selectedRegion}</span>
                    <ChevronDown size={16} className="text-neutral-400" />
                  </button>
                  <div 
                    id="regionDropdown"
                    className="absolute left-0 top-full mt-1 w-full bg-white border border-neutral-200 rounded-md shadow-md hidden z-20"
                  >
                    {regions.map((region) => (
                      <div 
                        key={region}
                        className="px-4 py-2 cursor-pointer hover:bg-neutral-100 font-noto"
                        onClick={() => {
                          setSelectedRegion(region);
                          const dropdown = document.getElementById('regionDropdown');
                          if (dropdown) {
                            dropdown.classList.add('hidden');
                          }
                        }}
                      >
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
                <CustomButton 
                  variant="accent" 
                  size="lg"
                  className="rounded-l-none"
                  onClick={handleFeasibilityAnalysis}
                  disabled={isLoading}
                >
                  {isLoading ? '분석 중...' : '무료 타당성 분석 받기'}
                </CustomButton>
              </div>
            </div>
            
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <TrendingUp size={24} className="text-primary" />
                </div>
                <p className="text-neutral-900 font-pretendard font-bold text-2xl">98%</p>
                <p className="text-neutral-500 font-noto text-sm">수익성 증대</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Users size={24} className="text-primary" />
                </div>
                <p className="text-neutral-900 font-pretendard font-bold text-2xl">1,420+</p>
                <p className="text-neutral-500 font-noto text-sm">고객 성공사례</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Clock size={24} className="text-primary" />
                </div>
                <p className="text-neutral-900 font-pretendard font-bold text-2xl">32일</p>
                <p className="text-neutral-500 font-noto text-sm">개원기간 단축</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Sparkles size={24} className="text-primary" />
                </div>
                <p className="text-neutral-900 font-pretendard font-bold text-2xl">97%</p>
                <p className="text-neutral-500 font-noto text-sm">고객 만족도</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative" aria-hidden="true">
            <div className="aspect-[5/4] relative z-10">
              <video 
                className="w-full h-full object-cover rounded-2xl shadow-xl"
                autoPlay
                muted
                loop
                controls={isVideoPlaying}
                onClick={handleVideoPlay}
                src={videoUrl}
              />
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handleVideoPlay}>
                  <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center animate-pulse-light">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-100 rounded-full z-0"></div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-accent-100 rounded-full z-0"></div>
            
            <div className="absolute bottom-5 right-10 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-pulse-light">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-pretendard font-medium text-sm text-neutral-900">입지 분석 완료</p>
                  <p className="font-noto text-xs text-neutral-500">대전 서구 둔산동</p>
                </div>
              </div>
              <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[85%]"></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs font-noto text-neutral-400">접근성</span>
                <span className="text-xs font-noto font-medium text-primary">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
