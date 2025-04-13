
import React, { useState, useEffect } from 'react';
import { useRegions } from '@/contexts/RegionsContext';
import RegionCard from './map/RegionCard';
import { Search, MapPin, Users, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const RegionalMap = () => {
  const { 
    regions, 
    activeRegion, 
    setActiveRegion, 
    getActiveRegionInfo, 
    getFilteredUrl,
    adminRegions // Get the admin regions directly to ensure we're using updated data
  } = useRegions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [displayRegions, setDisplayRegions] = useState(regions);
  
  // Update display regions whenever admin regions change
  useEffect(() => {
    setDisplayRegions(regions);
  }, [regions, adminRegions]);
  
  // Get active region information
  const activeRegionInfo = getActiveRegionInfo();
  
  // Filter regions based on search term
  const filteredRegions = searchTerm
    ? displayRegions.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.includesRegions.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : displayRegions;

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
                  className={`cursor-pointer hover:shadow-md transition-shadow ${activeRegion === region.name ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveRegion(region.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {region.name}
                      </h3>
                      <Badge variant="outline" className="bg-primary-50 text-primary">
                        <Users className="h-3 w-3 mr-1" />
                        {region.expertCount || 0}명
                      </Badge>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">주요 도시:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.includesRegions.slice(0, 3).map((city, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {city}
                          </Badge>
                        ))}
                        {region.includesRegions.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{region.includesRegions.length - 3}
                          </Badge>
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
            
            <div className="flex justify-center mt-4">
              <Link to="/regions" className="inline-flex items-center bg-white px-6 py-3 rounded-md shadow-sm border border-neutral-200 hover:shadow-md transition-shadow font-pretendard font-medium">
                지역 전체 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
    </section>
  );
};

export default RegionalMap;
