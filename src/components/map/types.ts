
import { Expert } from '@/types/expert';

export interface Region {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  includesRegions: string[];
  expertCount?: number;
  latitude?: number;
  longitude?: number;
}

export interface RegionInfo extends Region {
  manager: string;
  phone: string;
  email: string;
  expertCount: number;
  topServices: string[];
  hasManager: boolean;
}
