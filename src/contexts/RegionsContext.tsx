
import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { regions as initialRegions } from '@/components/map/regionData';
import { Region, RegionInfo, RegionAdmin } from '@/components/map/types';
import { useExperts } from './ExpertsContext';
import { Expert } from '@/types/expert';
import { useToast } from '@/components/ui/use-toast';
import { 
  getStoredRegions, 
  getRegionalManager, 
  getRegionalExpertCount, 
  getRegionTopServices,
  getActiveRegionInfo,
  getFilteredUrl
} from './regionsHelpers';
import { RegionsContextType } from './RegionsContext.d';

const RegionsContext = createContext<RegionsContextType | undefined>(undefined);

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

  // Add expert counts to regions for the public view
  const publicRegionsWithCounts = useMemo(() => {
    return adminRegions
      .filter(region => region.active) // Only include active regions for public view
      .map(region => ({
        ...region,
        expertCount: getRegionalExpertCount(region.name, adminRegions, experts)
      }));
  }, [adminRegions, experts]);

  return (
    <RegionsContext.Provider value={{
      regions: publicRegionsWithCounts,
      activeRegion,
      setActiveRegion,
      getActiveRegionInfo: () => getActiveRegionInfo(activeRegion, adminRegions, experts),
      getRegionalExpertCount: (regionName) => getRegionalExpertCount(regionName, adminRegions, experts),
      getRegionalManager: (regionName) => getRegionalManager(regionName, adminRegions, experts),
      getRegionTopServices: (regionName) => getRegionTopServices(regionName, adminRegions, experts),
      getFilteredUrl: (regionName) => getFilteredUrl(regionName, adminRegions),
      
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
