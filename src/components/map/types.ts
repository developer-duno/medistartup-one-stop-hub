
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

export interface RegionAdmin extends Region {
  manager?: string;
  active?: boolean;
  mainCities?: string[];
  serviceCount?: number;
}

export interface RegionExpert {
  expert: Expert;
  assignedRegions: string[];
}

export type RegionFormData = Partial<Region> & {
  id?: number | string;
  manager?: string;
  active?: boolean;
  mainCities?: string[];
};
