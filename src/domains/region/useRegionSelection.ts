
import { useState, useEffect } from 'react';
import { RegionService } from './regionService';

export const useRegionSelection = () => {
  // Domain state
  const [selectedRegion, setSelectedRegion] = useState<string>(RegionService.getStoredRegion());
  const [regions] = useState<string[]>(RegionService.getAvailableRegions());
  
  // Side effect to persist the selected region
  useEffect(() => {
    RegionService.storeSelectedRegion(selectedRegion);
  }, [selectedRegion]);
  
  return {
    selectedRegion,
    setSelectedRegion,
    regions
  };
};
