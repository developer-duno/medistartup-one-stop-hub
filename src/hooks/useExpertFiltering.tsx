
import { useState, useEffect } from 'react';
import { Expert } from '@/types/expert';
import { useSearchParams } from 'react-router-dom';
import { useConsultation } from '@/contexts/ConsultationContext';
import { useRegions } from '@/contexts/RegionsContext';

export function useExpertFiltering(expertsData: Expert[]) {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid"); // grid or compare
  const { selectedExperts } = useConsultation();
  const { adminRegions } = useRegions();
  const [filters, setFilters] = useState({
    search: "",
    regions: [] as string[],
    services: [] as string[]
  });
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Get service and region from URL params
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const regionParam = searchParams.get('region');
    
    const newFilters = { ...filters };
    
    // Handle service filtering
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
    
    // Handle region filtering
    if (regionParam) {
      // Check if the region parameter matches any admin region or subregion
      const regionExists = adminRegions.some(r => 
        r.name === regionParam || 
        (r.includesRegions && r.includesRegions.includes(regionParam))
      );
      
      if (regionExists && !newFilters.regions.includes(regionParam)) {
        newFilters.regions = [regionParam];
      }
    }
    
    // Set the new filters if they're different from current ones
    if (
      newFilters.services.length !== filters.services.length || 
      newFilters.regions.length !== filters.regions.length
    ) {
      setFilters(newFilters);
    }
  }, [searchParams, adminRegions]);
  
  // Get all subregions for a given region name
  const getSubRegions = (regionName: string): string[] => {
    const region = adminRegions.find(r => r.name === regionName);
    return region?.includesRegions || [];
  };
  
  // Filter experts based on active category and filters
  useEffect(() => {
    let results = [...expertsData];
    
    if (activeCategory !== "all") {
      results = results.filter(expert => 
        expert.services.some(service => service === activeCategory)
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(expert => 
        expert.name.toLowerCase().includes(searchLower) || 
        expert.role.toLowerCase().includes(searchLower) || 
        expert.specialty.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.regions.length > 0) {
      results = results.filter(expert => {
        // For each selected filter region
        return filters.regions.some(filterRegion => {
          // Check if expert directly has this region
          if (expert.regions.includes(filterRegion)) {
            return true;
          }
          
          // Check if this filter region is a major region that includes expert's regions
          const subRegions = getSubRegions(filterRegion);
          if (subRegions.length > 0) {
            return expert.regions.some(expertRegion => subRegions.includes(expertRegion));
          }
          
          return false;
        });
      });
    }
    
    if (filters.services.length > 0) {
      results = results.filter(expert => 
        expert.services.some(service => filters.services.includes(service))
      );
    }
    
    setFilteredExperts(results);
  }, [filters, activeCategory, expertsData, adminRegions]);
  
  // Initialize filtered experts with all experts
  useEffect(() => {
    setFilteredExperts(expertsData);
  }, [expertsData]);

  // Reset all filters
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
