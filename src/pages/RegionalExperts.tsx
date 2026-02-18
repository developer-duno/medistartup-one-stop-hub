
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useRegions } from '@/contexts/RegionsContext';

import { Card, CardContent } from '@/components/ui/card';
import RegionCard from '@/components/map/RegionCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { regionGroups, RegionGroup } from '@/utils/schema/regionSchema';

const RegionalExperts = () => {
  const { 
    regions, 
    activeRegion, 
    setActiveRegion, 
    getActiveRegionInfo, 
    getFilteredUrl,
    adminRegions
  } = useRegions();
  
  const [searchParams] = useSearchParams();
  const [displayRegions, setDisplayRegions] = useState(regions);
  const navigate = useNavigate();
  
  // Get region from query params if available and update display regions whenever regions change
  useEffect(() => {
    // Only show active regions
    const activeRegions = regions.filter(region => region.active !== false);
    setDisplayRegions(activeRegions);
    
    const regionParam = searchParams.get('region');
    if (regionParam) {
      // Check if the region exists and is active
      const regionExists = activeRegions.some(r => r.name === regionParam);
      if (regionExists) {
        setActiveRegion(regionParam);
      } else {
        // If region doesn't exist or is inactive, set the first active region
        if (activeRegions.length > 0) {
          setActiveRegion(activeRegions[0].name);
        }
      }
    }
  }, [searchParams, setActiveRegion, regions]);
  
  // Get active region information
  const activeRegionInfo = getActiveRegionInfo();
  

  // Use regionGroups directly to match filter categories

  return (
    <div className="theme-regions min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-28 pb-16 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              지역별 <span className="theme-text">전문가 네트워크</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              각 지역 특성과 의료 환경을 고려한 맞춤형 전문가 네트워크를 구축했습니다. 지역에 특화된 전문지식을 바탕으로 보다 효과적인 병원창업을 도와드립니다.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-3/5">
            {regionGroups.map((group: RegionGroup) => (
              <div key={group.name} className="mb-6">
                <h2 className="font-bold text-lg mb-3 border-b pb-2">{group.name}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {group.regions.map((regionName) => (
                    <Card 
                      key={regionName} 
                      className={`cursor-pointer hover:shadow-md transition-shadow ${activeRegion === regionName ? 'ring-2 theme-border' : ''}`}
                      onClick={() => setActiveRegion(regionName)}
                    >
                      <CardContent className="p-3">
                        <h3 className="font-bold flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 theme-text" />
                          {regionName}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-2/5">
            {activeRegionInfo && (
              <RegionCard 
                activeRegion={activeRegionInfo} 
                getFilteredUrl={getFilteredUrl} 
              />
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegionalExperts;
