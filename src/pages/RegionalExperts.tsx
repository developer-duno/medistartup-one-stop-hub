
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, User, Briefcase } from 'lucide-react';
import { useRegions } from '@/contexts/RegionsContext';
import { useExperts } from '@/contexts/ExpertsContext';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
    getRegionalManager,
    getRegionalExpertCount,
    adminRegions
  } = useRegions();
  const { experts } = useExperts();
  
  const [searchParams] = useSearchParams();
  const [displayRegions, setDisplayRegions] = useState(regions);
  const navigate = useNavigate();
  
  useEffect(() => {
    const activeRegions = regions.filter(region => region.active !== false);
    setDisplayRegions(activeRegions);
    
    const regionParam = searchParams.get('region');
    if (regionParam) {
      const regionExists = activeRegions.some(r => r.name === regionParam);
      if (regionExists) {
        setActiveRegion(regionParam);
      } else if (activeRegions.length > 0) {
        setActiveRegion(activeRegions[0].name);
      }
    }
  }, [searchParams, setActiveRegion, regions]);
  
  const activeRegionInfo = getActiveRegionInfo();

  // Get manager for a region by checking experts
  const getManagerForRegion = (regionName: string) => {
    return experts.find(expert => 
      expert.isRegionalManager && 
      expert.regions.includes(regionName)
    );
  };

  // Get expert count for individual region
  const getExpertCountForRegion = (regionName: string) => {
    return experts.filter(expert => 
      expert.regions.includes(regionName)
    ).length;
  };

  // Experts filtered by active region
  const regionExperts = useMemo(() => {
    if (!activeRegion) return [];
    return experts.filter(expert => expert.regions.includes(activeRegion));
  }, [activeRegion, experts]);

  return (
    <div className="theme-regions min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-28 pb-16 theme-page-header">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-foreground mb-4">
              지역별 <span className="theme-text">전문가 네트워크</span>
            </h1>
            <p className="font-noto text-muted-foreground mb-8">
              각 지역 특성과 의료 환경을 고려한 맞춤형 전문가 네트워크를 구축했습니다.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regionGroups.map((group: RegionGroup) => (
                <Card key={group.name} className="overflow-hidden">
                  <div className="bg-muted px-4 py-2">
                    <h2 className="font-bold text-sm">{group.name}</h2>
                  </div>
                  <CardContent className="p-3 space-y-1.5">
                    {group.regions.map((regionName) => {
                      const manager = getManagerForRegion(regionName);
                      const count = getExpertCountForRegion(regionName);
                      return (
                        <div 
                          key={regionName}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${activeRegion === regionName ? 'bg-primary/10 ring-1 ring-primary/30' : ''}`}
                          onClick={() => setActiveRegion(regionName)}
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span className="text-sm font-medium">{regionName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {manager && (
                              <Badge variant="secondary" className="text-xs hidden sm:flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {manager.name}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {count}명
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <Card className="sticky top-24">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-t-lg">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {activeRegion} 전문가
                </h3>
                <p className="text-sm opacity-90 mt-1">{regionExperts.length}명의 전문가</p>
              </div>
              <CardContent className="p-3 max-h-[60vh] overflow-y-auto">
                {regionExperts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">해당 지역에 등록된 전문가가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {regionExperts.map(expert => (
                      <Link 
                        key={expert.id} 
                        to={`/experts/${expert.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                      >
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage src={expert.image} alt={expert.name} />
                          <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-sm truncate">{expert.name}</span>
                            {expert.isRegionalManager && (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0">총괄</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{expert.specialty}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {expert.services.slice(0, 2).map((s, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
                                {s}
                              </Badge>
                            ))}
                            {expert.services.length > 2 && (
                              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                +{expert.services.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {regionExperts.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link to={`/experts?region=${encodeURIComponent(activeRegion)}`}>
                        전체 전문가 보기
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RegionalExperts;
