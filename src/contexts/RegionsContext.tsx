
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Region } from '../components/map/types';
import { regions as initialRegions } from '../components/map/regionData';
import { useToast } from '@/components/ui/use-toast';

interface RegionsContextType {
  regions: Region[];
  updateRegion: (updatedRegion: Region) => void;
  addRegion: (newRegion: Region) => void;
  deleteRegion: (regionId: string) => void;
  updateExpertCount: (regionName: string, count: number) => void;
  getRegionByName: (name: string) => Region | undefined;
}

const RegionsContext = createContext<RegionsContextType | undefined>(undefined);

export const useRegions = () => {
  const context = useContext(RegionsContext);
  if (context === undefined) {
    throw new Error('useRegions must be used within a RegionsProvider');
  }
  return context;
};

export const RegionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const { toast } = useToast();

  const updateRegion = (updatedRegion: Region) => {
    setRegions(prev => 
      prev.map(region => 
        region.id === updatedRegion.id ? updatedRegion : region
      )
    );
    
    toast({
      title: "지역 정보 업데이트",
      description: `${updatedRegion.name} 지역 정보가 성공적으로 업데이트되었습니다.`
    });
  };

  const addRegion = (newRegion: Region) => {
    setRegions(prev => [...prev, newRegion]);
    
    toast({
      title: "지역 추가 완료",
      description: `${newRegion.name} 지역이 성공적으로 추가되었습니다.`
    });
  };

  const deleteRegion = (regionId: string) => {
    const regionToDelete = regions.find(r => r.id === regionId);
    if (!regionToDelete) return;
    
    setRegions(prev => prev.filter(region => region.id !== regionId));
    
    toast({
      title: "지역 삭제 완료",
      description: `${regionToDelete.name} 지역이 삭제되었습니다.`
    });
  };

  const updateExpertCount = (regionName: string, count: number) => {
    setRegions(prev => 
      prev.map(region => 
        region.name === regionName 
          ? { ...region, expertCount: count } 
          : region
      )
    );
  };

  const getRegionByName = (name: string) => {
    return regions.find(region => region.name === name);
  };

  const value = {
    regions,
    updateRegion,
    addRegion,
    deleteRegion,
    updateExpertCount,
    getRegionByName
  };

  return (
    <RegionsContext.Provider value={value}>
      {children}
    </RegionsContext.Provider>
  );
};
