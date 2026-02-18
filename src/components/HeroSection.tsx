
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import HeroHeading from './hero/HeroHeading';
import RegionSelector from './hero/RegionSelector';
import StatsDisplay from './hero/StatsDisplay';
import HeroVideo from './hero/HeroVideo';
import { useRegionSelection } from '../domains/region/useRegionSelection';

// Domain-driven layout component
const HeroSection = () => {
  // Application state
  const [isLoading, setIsLoading] = useState(false);
  
  // Use domain hook for region selection functionality
  const { selectedRegion, setSelectedRegion, regions } = useRegionSelection();
  
  // Sample consultation video URL - replace with your actual hospital consulting video
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  // Domain action - handle feasibility analysis request
  const handleFeasibilityAnalysis = () => {
    // Scroll to simulator section
    const simulatorSection = document.getElementById('simulators');
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 pb-10 md:pt-36 md:pb-24 overflow-hidden relative">
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
            
            <RegionSelector 
              selectedRegion={selectedRegion} 
              setSelectedRegion={setSelectedRegion} 
              regions={regions}
              isLoading={isLoading}
              onAnalysisClick={handleFeasibilityAnalysis}
            />
            
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
