import React, { useState, useMemo } from 'react';
import { useRegions } from '@/contexts/RegionsContext';
import { useExperts } from '@/contexts/ExpertsContext';
import { useConsultation } from '@/contexts/ConsultationContext';
import { MapPin, Users, User, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import CustomButton from '@/components/ui/CustomButton';
import { Link } from 'react-router-dom';
import { useRegionGroups } from '@/hooks/useRegionGroups';
import { useIsMobile } from '@/hooks/use-mobile';

const RegionalMap = () => {
  const { 
    activeRegion, 
    setActiveRegion, 
  } = useRegions();
  const { experts } = useExperts();
  const { selectedExperts, selectExpert } = useConsultation();
  const { regionGroupsCompat, loading } = useRegionGroups();
  const isMobile = useIsMobile();
  const [isBelowLg, setIsBelowLg] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const handler = () => setIsBelowLg(window.innerWidth < 1024);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeGroupRegions, setActiveGroupRegions] = useState<string[]>([]);
  const [showMobilePanel, setShowMobilePanel] = useState(false);

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
    if (isBelowLg) setShowMobilePanel(true);
  };

  const handleRegionClick = (regionName: string) => {
    setActiveGroup(null);
    setActiveGroupRegions([]);
    setActiveRegion(regionName);
    if (isBelowLg) setShowMobilePanel(true);
  };

  const panelTitle = activeGroup || activeRegion || '지역 선택';

  if (loading) return null;

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
        {isBelowLg && (
          <button onClick={() => setShowMobilePanel(false)} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <CardContent className="p-2 md:p-3 max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
        {regionExperts.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-muted-foreground">
            <Users className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 opacity-50" />
            <p className="text-xs md:text-sm">지역을 선택하면 전문가 목록이 표시됩니다.</p>
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
                    <CustomButton
                      variant={isSelected ? "secondary" : "outline"}
                      size="sm"
                      className="h-7 px-2 text-[10px] md:text-xs active:scale-95 transition-transform duration-150 touch-manipulation select-none"
                      onClick={() => selectExpert(expert.id)}
                    >
                      {isSelected ? <><CheckCircle2 className="h-3 w-3 mr-0.5" />선택됨</> : '선택'}
                    </CustomButton>
                    <CustomButton
                      variant="primary"
                      size="sm"
                      className="h-7 px-2 text-[10px] md:text-xs active:scale-95 transition-transform duration-150 touch-manipulation select-none"
                      asChild
                    >
                      <Link to={`/experts/${expert.id}`}>프로필</Link>
                    </CustomButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {regionExperts.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <CustomButton variant="outline" size="sm" className="w-full active:scale-95 transition-transform duration-150 touch-manipulation select-none" asChild>
              <Link to={`/experts?region=${encodeURIComponent(activeRegion)}`}>
                전체 전문가 보기
              </Link>
            </CustomButton>
          </div>
        )}
      </CardContent>
    </>
  );

  return (
    <section id="regions" className="py-12 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-2 md:mb-4">
            지역별 <span className="text-primary">전문가 네트워크</span>
          </h2>
          <p className="font-noto text-neutral-600 text-xs md:text-base max-w-2xl mx-auto">
            각 지역 특성과 의료 환경을 고려한 맞춤형 전문가 네트워크를 구축했습니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
              {regionGroupsCompat.map((group) => (
                <Card key={group.name} className="overflow-hidden">
                  <div className="bg-muted px-2 md:px-4 py-1.5 md:py-2 cursor-pointer hover:bg-muted/80 transition-colors touch-manipulation" onClick={() => handleGroupClick(group)}>
                    <h3 className={`font-bold text-xs md:text-sm ${activeGroup === group.name ? 'text-primary' : ''}`}>{group.name}</h3>
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
                            <Badge variant="outline" className={`text-[9px] md:text-xs px-1 md:px-2 ${count === 0 ? 'text-muted-foreground bg-muted border-muted' : ''}`}>
                              <Users className="h-2.5 w-2.5 md:h-3 md:w-3 mr-0.5 md:mr-1" />
                              {count === 0 ? '모집 중' : `${count}명`}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-4 md:mt-6">
              <Link to="/regions" className="inline-flex items-center bg-white px-4 md:px-6 py-2 md:py-3 rounded-md shadow-sm border border-neutral-200 hover:shadow-md transition-shadow font-pretendard font-medium text-xs md:text-base">
                지역 전체 보기
                <ArrowRight className="ml-1.5 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Link>
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

      {/* Mobile: overlay popup */}
      {isBelowLg && showMobilePanel && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMobilePanel(false);
          }}
        >
          <div className="w-full max-h-[75vh] bg-white rounded-t-2xl shadow-2xl animate-slide-up overflow-hidden">
            {expertPanelContent}
          </div>
        </div>
      )}
    </section>
  );
};

export default RegionalMap;
