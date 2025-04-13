
import React, { useState } from 'react';
import { useExperts } from '@/contexts/ExpertsContext';
import MapSvg from './map/MapSvg';
import RegionCard from './map/RegionCard';
import { regions } from './map/regionData';
import { getActiveRegionInfo, getFilteredUrl, getRegionalExpertCount } from './map/regionUtils';

const RegionalMap = () => {
  const [activeRegion, setActiveRegion] = useState('서울/경기');
  const { experts } = useExperts();
  
  // Add expert count to regions for display in the SVG
  const regionsWithCounts = regions.map(region => ({
    ...region,
    expertCount: getRegionalExpertCount(region.name, experts)
  }));
  
  // Get active region information
  const activeRegionInfo = getActiveRegionInfo(activeRegion, experts);

  return (
    <section id="regions" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            지역별 <span className="text-primary">전문가 네트워크</span>
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            각 지역 특성과 의료 환경을 고려한 맞춤형 전문가 네트워크를 구축했습니다. 지역에 특화된 전문지식을 바탕으로 보다 효과적인 병원창업을 도와드립니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-3/5">
            <MapSvg 
              regions={regionsWithCounts} 
              activeRegion={activeRegion} 
              setActiveRegion={setActiveRegion} 
            />
          </div>

          <div className="w-full lg:w-2/5">
            {activeRegionInfo && (
              <RegionCard 
                activeRegion={activeRegionInfo} 
                getFilteredUrl={() => getFilteredUrl(activeRegion)} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalMap;
