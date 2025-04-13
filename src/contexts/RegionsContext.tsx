
import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { regions as initialRegions } from '@/components/map/regionData';
import { Region, RegionInfo, RegionAdmin } from '@/components/map/types';
import { useExperts } from './ExpertsContext';
import { Expert } from '@/types/expert';
import { useToast } from '@/components/ui/use-toast';

interface RegionsContextType {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
  getActiveRegionInfo: () => RegionInfo | null;
  getRegionalExpertCount: (regionName: string) => number;
  getRegionalManager: (regionName: string) => Expert | null;
  getRegionTopServices: (regionName: string) => string[];
  getFilteredUrl: (regionName: string) => string;
  
  // Admin operations
  adminRegions: RegionAdmin[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredRegions: RegionAdmin[];
  addRegion: (region: RegionAdmin) => void;
  updateRegion: (region: RegionAdmin) => void;
  deleteRegion: (id: string) => void;
  toggleRegionActive: (id: string) => boolean;
}

const RegionsContext = createContext<RegionsContextType | undefined>(undefined);

// Convert regions to admin format for initial data
const convertToAdminRegions = (regions: Region[]): RegionAdmin[] => {
  return regions.map((region, index) => ({
    ...region,
    active: true,
    manager: ['김지역', '이담당', '박매니저', '최지역', '정관리'][index % 5],
    mainCities: region.includesRegions,
    serviceCount: 4 + (index % 5)
  }));
};

// Get stored regions from localStorage or use initial data
const getStoredRegions = (): RegionAdmin[] => {
  try {
    const stored = localStorage.getItem('adminRegions');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse stored regions:", error);
  }
  
  return convertToAdminRegions(initialRegions);
};

export const RegionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRegion, setActiveRegion] = useState('서울/경기');
  const [adminRegions, setAdminRegions] = useState<RegionAdmin[]>(getStoredRegions);
  const [searchQuery, setSearchQuery] = useState('');
  const { experts } = useExperts();
  const { toast } = useToast();

  // Save to localStorage whenever adminRegions changes
  useEffect(() => {
    try {
      localStorage.setItem('adminRegions', JSON.stringify(adminRegions));
    } catch (error) {
      console.error("Failed to save regions to storage:", error);
    }
  }, [adminRegions]);
  
  // Filter regions based on search query
  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return adminRegions;
    
    const query = searchQuery.toLowerCase().trim();
    return adminRegions.filter(region => 
      region.name.toLowerCase().includes(query) ||
      region.manager?.toLowerCase().includes(query) ||
      region.mainCities?.some(city => city.toLowerCase().includes(query)) ||
      region.includesRegions.some(reg => reg.toLowerCase().includes(query))
    );
  }, [adminRegions, searchQuery]);

  // Add a new region
  const addRegion = (region: RegionAdmin) => {
    setAdminRegions(prev => [...prev, region]);
    toast({
      title: "지역 추가 완료",
      description: `${region.name} 지역이 추가되었습니다.`
    });
  };

  // Update an existing region
  const updateRegion = (updatedRegion: RegionAdmin) => {
    setAdminRegions(prev => 
      prev.map(region => 
        region.id === updatedRegion.id ? updatedRegion : region
      )
    );
    toast({
      title: "지역 수정 완료",
      description: `${updatedRegion.name} 지역 정보가 업데이트되었습니다.`
    });
  };

  // Delete a region
  const deleteRegion = (id: string) => {
    const regionToDelete = adminRegions.find(r => r.id === id);
    if (regionToDelete) {
      setAdminRegions(prev => prev.filter(region => region.id !== id));
      
      if (activeRegion === regionToDelete.name) {
        setActiveRegion('서울/경기'); // Reset to default if active region was deleted
      }
      
      toast({
        title: "지역 삭제 완료",
        description: `${regionToDelete.name} 지역이 삭제되었습니다.`
      });
    }
  };

  // Toggle region active state
  const toggleRegionActive = (id: string): boolean => {
    let newActiveState = false;
    
    setAdminRegions(prev => 
      prev.map(r => {
        if (r.id === id) {
          newActiveState = !r.active;
          return {...r, active: newActiveState};
        }
        return r;
      })
    );
    
    const region = adminRegions.find(r => r.id === id);
    if (region) {
      toast({
        title: region.active ? "지역 비활성화" : "지역 활성화",
        description: `${region.name} 지역이 ${region.active ? '비활성화' : '활성화'}되었습니다.`
      });
    }
    
    return newActiveState;
  };

  // Get regional manager info
  const getRegionalManager = (regionName: string): Expert | null => {
    const currentRegion = adminRegions.find(region => region.name === regionName && region.active);
    if (!currentRegion) return null;
    
    const includesRegions = currentRegion.includesRegions;
    
    return experts.find(expert => 
      expert.isRegionalManager && 
      expert.regions.some(region => includesRegions.includes(region))
    ) || null;
  };

  // Calculate region expert count
  const getRegionalExpertCount = (regionName: string): number => {
    const currentRegion = adminRegions.find(region => region.name === regionName);
    if (!currentRegion) return 0;
    
    const includesRegions = currentRegion.includesRegions;
    
    return experts.filter(expert => 
      expert.regions.some(region => includesRegions.includes(region))
    ).length;
  };

  // Get region top services
  const getRegionTopServices = (regionName: string): string[] => {
    const currentRegion = adminRegions.find(region => region.name === regionName);
    if (!currentRegion) return [];
    
    const includesRegions = currentRegion.includesRegions;
    
    // Get all services from experts in this region
    const allServices = experts
      .filter(expert => expert.regions.some(region => includesRegions.includes(region)))
      .flatMap(expert => expert.services);
    
    // Count service occurrences
    const serviceCounts: Record<string, number> = {};
    allServices.forEach(service => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });
    
    // Sort by count and return top 3
    return Object.entries(serviceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  };

  // Get active region info
  const getActiveRegionInfo = (): RegionInfo | null => {
    const region = adminRegions.find(region => region.name === activeRegion && region.active);
    if (!region) return null;
    
    const manager = getRegionalManager(activeRegion);
    const expertCount = getRegionalExpertCount(activeRegion);
    const topServices = getRegionTopServices(activeRegion);
    
    return {
      ...region,
      manager: manager?.name || '담당자 미지정',
      phone: manager?.contact || '번호 미등록',
      email: manager?.email || 'contact@medistartup.kr',
      expertCount,
      topServices,
      hasManager: !!manager
    };
  };

  // Get URL with region filter
  const getFilteredUrl = (regionName: string): string => {
    const region = adminRegions.find(r => r.name === regionName);
    if (!region) return '/experts';
    
    return `/experts?region=${encodeURIComponent(region.name)}`;
  };

  // Add expert counts to regions for the public view
  const publicRegionsWithCounts = adminRegions
    .filter(region => region.active) // Only include active regions for public view
    .map(region => ({
      ...region,
      expertCount: getRegionalExpertCount(region.name)
    }));

  return (
    <RegionsContext.Provider value={{
      regions: publicRegionsWithCounts,
      activeRegion,
      setActiveRegion,
      getActiveRegionInfo,
      getRegionalExpertCount,
      getRegionalManager,
      getRegionTopServices,
      getFilteredUrl,
      
      // Admin operations
      adminRegions,
      searchQuery,
      setSearchQuery,
      filteredRegions,
      addRegion,
      updateRegion,
      deleteRegion,
      toggleRegionActive
    }}>
      {children}
    </RegionsContext.Provider>
  );
};

export const useRegions = (): RegionsContextType => {
  const context = useContext(RegionsContext);
  if (context === undefined) {
    throw new Error('useRegions must be used within a RegionsProvider');
  }
  return context;
};
