
import { Region, RegionInfo } from '@/components/map/types';
import { Expert } from '@/types/expert';

export interface RegionsContextType {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
  getActiveRegionInfo: () => RegionInfo | null;
  getRegionalExpertCount: (regionName: string) => number;
  getRegionalManager: (regionName: string) => Expert | null;
  getRegionTopServices: (regionName: string) => string[];
  getFilteredUrl: (regionName: string) => string;
}
