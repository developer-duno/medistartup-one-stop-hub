
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { RunwareService } from '../services/RunwareService';
import { toast } from 'sonner';
import HeroHeading from './hero/HeroHeading';
import RegionSelector from './hero/RegionSelector';
import StatsDisplay from './hero/StatsDisplay';
import HeroVideo from './hero/HeroVideo';

const HeroSection = () => {
  const [selectedRegion, setSelectedRegion] = useState('대전/충남');
  const [hospitalImage, setHospitalImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const regions = ['대전/충남', '서울/경기', '부산/경남', '대구/경북', '광주/전라', '강원', '제주'];
  
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
            <HeroHeading />
            
            <div className="relative inline-block">
              <div className="flex">
                <RegionSelector 
                  selectedRegion={selectedRegion} 
                  setSelectedRegion={setSelectedRegion} 
                  regions={regions}
                />
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
            
            <StatsDisplay />
          </div>

          <div className="w-full lg:w-1/2 relative" aria-hidden="true">
            <HeroVideo videoUrl={videoUrl} />
            
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
