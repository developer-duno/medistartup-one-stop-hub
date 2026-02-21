
import { useState, useEffect } from 'react';
import { Expert } from '@/domains/expert/types';
import { useSearchParams } from 'react-router-dom';
import { useConsultation } from '@/domains/consultation/context';
import { useRegions } from '@/domains/region/context';
import { useRegionGroups } from '@/hooks/useRegionGroups';

export function useExpertFiltering(expertsData: Expert[]) {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const { selectedExperts } = useConsultation();
  const { adminRegions } = useRegions();
  const { regionGroupsCompat } = useRegionGroups();
  const [filters, setFilters] = useState({
    search: "",
    regions: [] as string[],
    services: [] as string[]
  });
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const regionParam = searchParams.get('region');
    
    const newFilters = { ...filters };
    
    if (serviceParam) {
      const serviceMap: Record<string, string> = {
        'location-analysis': '입지 분석',
        'financial-consulting': '재무 컨설팅',
        'design-interior': '설계 및 인테리어',
        'licensing': '인허가 대행',
        'recruitment': '인력 채용',
        'marketing-strategy': '마케팅 전략',
        'medical-equipment': '의료기기 구입 및 설치',
        'waste-management': '수납 및 의료폐기물 처리'
      };
      
      const serviceName = serviceMap[serviceParam];
      if (serviceName && !newFilters.services.includes(serviceName)) {
        newFilters.services = [serviceName];
      }
    }
    
    if (regionParam) {
      const regionGroup = regionGroupsCompat.find(group => group.name === regionParam);
      if (regionGroup) {
        const regionsToAdd = regionGroup.regions.filter(r => !newFilters.regions.includes(r));
        if (regionsToAdd.length > 0) {
          newFilters.regions = [...newFilters.regions, ...regionsToAdd];
        }
      } else {
        const allRegions = regionGroupsCompat.flatMap(group => group.regions);
        if (allRegions.includes(regionParam) && !newFilters.regions.includes(regionParam)) {
          newFilters.regions = [...newFilters.regions, regionParam];
        }
      }
    }
    
    if (
      newFilters.services.length !== filters.services.length || 
      newFilters.regions.length !== filters.regions.length
    ) {
      setFilters(newFilters);
    }
  }, [searchParams, adminRegions, regionGroupsCompat]);
  
  const getRegionGroup = (regionName: string): string[] => {
    const group = regionGroupsCompat.find(g => g.regions.includes(regionName));
    return group ? group.regions : [regionName];
  };
  
  useEffect(() => {
    let results = [...expertsData];
    
    if (activeCategory !== "all") {
      results = results.filter(expert => 
        expert.services.some(service => service === activeCategory)
      );
    }
    
    if (filters.regions.length > 0) {
      results = results.filter(expert => {
        return filters.regions.some(filterRegion => {
          if (expert.regions.includes(filterRegion)) return true;
          const relatedRegions = getRegionGroup(filterRegion);
          return expert.regions.some(expertRegion => 
            relatedRegions.includes(expertRegion)
          );
        });
      });
    }
    
    if (filters.services.length > 0) {
      results = results.filter(expert => 
        expert.services.some(service => filters.services.includes(service))
      );
    }
    
    setFilteredExperts(results);
  }, [filters, activeCategory, expertsData]);

  const resetFilters = () => {
    setFilters({search: "", regions: [], services: []});
    setActiveCategory("all");
  };

  return {
    filters,
    setFilters,
    viewMode,
    setViewMode,
    filteredExperts,
    showFilters,
    setShowFilters,
    activeCategory,
    setActiveCategory,
    resetFilters
  };
}
