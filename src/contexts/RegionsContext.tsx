
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { regions } from '@/components/map/regionData';
import { Region, RegionInfo } from '@/components/map/types';
import { useExperts } from './ExpertsContext';
import { Expert } from '@/types/expert';

interface RegionsContextType {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
  getActiveRegionInfo: () => RegionInfo | null;
  getRegionalExpertCount: (regionName: string) => number;
  getRegionalManager: (regionName: string) => Expert | null;
  getRegionTopServices: (regionName: string) => string[];
  getFilteredUrl: (regionName: string) => string;
}

const RegionsContext = createContext<RegionsContextType | undefined>(undefined);

export const RegionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRegion, setActiveRegion] = useState('서울/경기');
  const { experts } = useExperts();

  // Get regional manager info
  const getRegionalManager = (regionName: string): Expert | null => {
    const currentRegion = regions.find(region => region.name === regionName);
    if (!currentRegion) return null;
    
    const includesRegions = currentRegion.includesRegions;
    
    return experts.find(expert => 
      expert.isRegionalManager && 
      expert.regions.some(region => includesRegions.includes(region))
    ) || null;
  };

  // Calculate region expert count
  const getRegionalExpertCount = (regionName: string): number => {
    const currentRegion = regions.find(region => region.name === regionName);
    if (!currentRegion) return 0;
    
    const includesRegions = currentRegion.includesRegions;
    
    return experts.filter(expert => 
      expert.regions.some(region => includesRegions.includes(region))
    ).length;
  };

  // Get region top services
  const getRegionTopServices = (regionName: string): string[] => {
    const currentRegion = regions.find(region => region.name === regionName);
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
    const region = regions.find(region => region.name === activeRegion);
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
    const region = regions.find(r => r.name === regionName);
    if (!region) return '/experts';
    
    return `/experts?region=${encodeURIComponent(region.name)}`;
  };

  // Add expert counts to regions
  const regionsWithCounts = regions.map(region => ({
    ...region,
    expertCount: getRegionalExpertCount(region.name)
  }));

  return (
    <RegionsContext.Provider value={{
      regions: regionsWithCounts,
      activeRegion,
      setActiveRegion,
      getActiveRegionInfo,
      getRegionalExpertCount,
      getRegionalManager,
      getRegionTopServices,
      getFilteredUrl
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
