
import { Region, RegionInfo, RegionAdmin } from '@/components/map/types';
import { Expert } from '@/types/expert';

export interface RegionsContextType {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
  getActiveRegionInfo: () => RegionInfo | null;
  getRegionalExpertCount: (regionName: string) => number;
  getRegionalManager: (regionName: string) => Expert | null;
  getRegionTopServices: (regionName: string) => Array<{name: string; percent: number}>;
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
