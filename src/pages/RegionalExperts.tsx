
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, Users } from 'lucide-react';
import { useRegions } from '@/contexts/RegionsContext';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import RegionCard from '@/components/map/RegionCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegionalExperts = () => {
  const { 
    regions, 
    activeRegion, 
    setActiveRegion, 
    getActiveRegionInfo, 
    getFilteredUrl,
    adminRegions
  } = useRegions();
  
  const [searchTerm, setSearchTerm] = useState('');
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
  
  // Filter regions based on search term
  const filteredRegions = searchTerm
    ? displayRegions.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (r.mainCities && r.mainCities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        r.includesRegions.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : displayRegions;

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
            <div className="mb-6">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="지역 또는 도시 검색..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {filteredRegions.map((region) => (
                <Card 
                  key={region.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${activeRegion === region.name ? 'ring-2 theme-border' : ''}`}
                  onClick={() => setActiveRegion(region.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold flex items-center gap-2">
                        <MapPin className="h-4 w-4 theme-text" />
                        {region.name}
                      </h3>
                      <Badge variant="outline" className="theme-bg-light theme-text">
                        <Users className="h-3 w-3 mr-1" />
                        {region.expertCount || 0}명
                      </Badge>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">주요 도시:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.mainCities && region.mainCities.length > 0 ? (
                          <>
                            {region.mainCities.slice(0, 3).map((city, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {city}
                              </Badge>
                            ))}
                            {region.mainCities.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{region.mainCities.length - 3}
                              </Badge>
                            )}
                          </>
                        ) : (
                          region.includesRegions.slice(0, 3).map((city, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {city}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredRegions.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-xl mb-2">검색 결과 없음</h3>
                  <p className="text-muted-foreground">
                    다른 지역 이름이나 도시를 검색해보세요.
                  </p>
                </div>
              )}
            </div>
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
