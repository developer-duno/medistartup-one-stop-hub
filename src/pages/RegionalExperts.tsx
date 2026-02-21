
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, User, Briefcase, X, CheckCircle2 } from 'lucide-react';
import { useRegions } from '@/domains/region/context';
import { useExperts } from '@/domains/expert/context';
import { useConsultation } from '@/domains/consultation/context';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRegionGroups } from '@/hooks/useRegionGroups';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const { selectedExperts, selectExpert } = useConsultation();
  const { regionGroupsCompat, loading: regionsLoading } = useRegionGroups();
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayRegions, setDisplayRegions] = useState(regions);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeGroupRegions, setActiveGroupRegions] = useState<string[]>([]);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Use lg breakpoint (1024px) for panel display logic to match CSS hidden lg:block
  const [isCompact, setIsCompact] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const initializedRef = useRef(false);
  const regionGroupsRef = useRef(regionGroupsCompat);
  regionGroupsRef.current = regionGroupsCompat;

  // Single effect: read URL params on mount only
  useEffect(() => {
    if (initializedRef.current) return;
    
    const activeRegions = regions.filter(region => region.active !== false);
    setDisplayRegions(activeRegions);

    const groupParam = searchParams.get('group');
    const regionParam = searchParams.get('region');

    if (groupParam) {
      const group = regionGroupsRef.current.find(g => g.name === groupParam);
      if (group) {
        setActiveGroup(group.name);
        setActiveGroupRegions(group.regions);
        setActiveRegion('');
        if (isCompact) setShowMobilePanel(true);
      }
    } else if (regionParam) {
      const regionExists = activeRegions.some(r => r.name === regionParam);
      if (regionExists) {
        setActiveRegion(regionParam);
      } else if (activeRegions.length > 0) {
        setActiveRegion(activeRegions[0].name);
      }
      if (isCompact) setShowMobilePanel(true);
    }

    initializedRef.current = true;
  }, [regions, regionsLoading]); // only re-run when regions data loads

  // Keep displayRegions in sync when regions change after init
  useEffect(() => {
    if (!initializedRef.current) return;
    const activeRegions = regions.filter(region => region.active !== false);
    setDisplayRegions(activeRegions);
  }, [regions]);

  const activeRegionInfo = getActiveRegionInfo();

  const getManagerForRegion = (regionName: string) => {
    return experts.find(expert => 
      expert.isRegionalManager && 
      expert.regions.includes(regionName)
    );
  };

  const getExpertCountForRegion = (regionName: string) => {
    return experts.filter(expert => 
      expert.regions.includes(regionName)
    ).length;
  };

  const regionExperts = useMemo(() => {
    if (activeGroup && activeGroupRegions.length > 0) {
      return experts.filter(expert => 
        expert.regions.some(r => activeGroupRegions.includes(r))
      );
    }
    if (!activeRegion) return [];
    return experts.filter(expert => expert.regions.includes(activeRegion));
  }, [activeRegion, activeGroup, activeGroupRegions, experts]);

  const handleGroupClick = (group: { name: string; regions: string[] }) => {
    setActiveGroup(group.name);
    setActiveGroupRegions(group.regions);
    setActiveRegion('');
    setSearchParams({ group: group.name }, { replace: true });
    if (isCompact) setShowMobilePanel(true);
  };

  const handleRegionClick = (regionName: string) => {
    setActiveGroup(null);
    setActiveGroupRegions([]);
    setActiveRegion(regionName);
    setSearchParams({ region: regionName }, { replace: true });
    if (isCompact) setShowMobilePanel(true);
  };

  const panelTitle = activeGroup || activeRegion || '지역 선택';

  const expertPanelContent = (
    <>
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-3 md:p-4 rounded-t-lg flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm md:text-lg flex items-center gap-1.5 md:gap-2">
            <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            {panelTitle} 전문가
          </h3>
          <p className="text-[11px] md:text-sm opacity-90 mt-0.5 md:mt-1">{regionExperts.length}명의 전문가</p>
        </div>
        {isCompact && (
          <button onClick={() => { setShowMobilePanel(false); setSearchParams({}, { replace: true }); }} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <CardContent className="p-2 md:p-3 max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
        {regionExperts.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-muted-foreground">
            <Users className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 opacity-50" />
            <p className="text-xs md:text-sm">해당 지역에 등록된 전문가가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-1 md:space-y-2">
            {regionExperts.map(expert => {
              const isSelected = selectedExperts.includes(expert.id);
              return (
                <div 
                  key={expert.id} 
                  className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg transition-colors border ${isSelected ? 'bg-primary/5 border-primary/30' : 'border-transparent hover:bg-muted/50 hover:border-border'}`}
                >
                  <Avatar className="h-8 w-8 md:h-10 md:w-10 shrink-0">
                    <AvatarImage src={expert.image} alt={expert.name} />
                    <AvatarFallback className="text-xs md:text-sm">{expert.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="font-medium text-xs md:text-sm truncate">{expert.name}</span>
                      {expert.isRegionalManager && (
                        <Badge variant="default" className="text-[9px] md:text-[10px] px-1 md:px-1.5 py-0">총괄</Badge>
                      )}
                    </div>
                    <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">
                      {expert.services && expert.services.length > 0 
                        ? expert.services.join(' · ') 
                        : expert.specialty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant={isSelected ? "secondary" : "default"}
                      className="h-7 px-2 text-[10px] md:text-xs touch-manipulation"
                      onClick={() => selectExpert(expert.id)}
                    >
                      {isSelected ? <><CheckCircle2 className="h-3 w-3 mr-0.5" />선택됨</> : '선택'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-[10px] md:text-xs touch-manipulation"
                      asChild
                    >
                      <Link to={`/experts/${expert.id}`}>프로필</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
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
    </>
  );

  return (
    <div className="theme-regions min-h-screen bg-white">
      <Navbar />
      
      <div className="theme-page-header">
        <div className="container mx-auto px-3 md:px-4">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-3 md:mb-4 text-xs md:text-sm">
            <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            홈으로 돌아가기
          </Link>
          
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900 mb-1 md:mb-2">
              지역별 <span className="theme-text">전문가 네트워크</span>
            </h1>
            <p className="font-noto text-neutral-600 text-xs md:text-sm">
              각 지역 특성과 의료 환경을 고려한 맞춤형 전문가 네트워크입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
              {regionGroupsCompat.map((group) => (
                <Card key={group.name} className="overflow-hidden">
                  <div className="bg-muted px-2 md:px-4 py-1.5 md:py-2 cursor-pointer hover:bg-muted/80 transition-colors touch-manipulation" onClick={() => handleGroupClick(group)}>
                    <h2 className={`font-bold text-xs md:text-sm ${activeGroup === group.name ? 'text-primary' : ''}`}>{group.name}</h2>
                  </div>
                  <CardContent className="p-1.5 md:p-3 space-y-0.5 md:space-y-1.5">
                    {group.regions.map((regionName) => {
                      const manager = getManagerForRegion(regionName);
                      const count = getExpertCountForRegion(regionName);
                      return (
                        <div 
                          key={regionName}
                          className={`flex items-center justify-between p-1.5 md:p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors touch-manipulation ${activeRegion === regionName ? 'bg-primary/10 ring-1 ring-primary/30' : ''}`}
                          onClick={() => handleRegionClick(regionName)}
                        >
                          <div className="flex items-center gap-1 md:gap-2">
                            <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary" />
                            <span className="text-[11px] md:text-sm font-medium">{regionName}</span>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2">
                            {manager && (
                              <Badge variant="secondary" className="text-[9px] md:text-xs hidden sm:flex items-center gap-1">
                                <User className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                {manager.name}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-[9px] md:text-xs px-1 md:px-2">
                              <Users className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1" />
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

          {/* Desktop: inline panel */}
          <div className="hidden lg:block w-full lg:w-2/5">
            <Card className="sticky top-20 md:top-24">
              {expertPanelContent}
            </Card>
          </div>
        </div>
      </div>

      {/* Compact (< 1024px): overlay popup */}
      {isCompact && showMobilePanel && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) { setShowMobilePanel(false); setSearchParams({}, { replace: true }); }
          }}
        >
          <div className="w-full max-h-[75vh] bg-white rounded-t-2xl shadow-2xl animate-slide-up overflow-hidden">
            {expertPanelContent}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default RegionalExperts;
