
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
  active?: boolean; // 지역 활성화 여부 추가
}

export interface RegionInfo extends Region {
  manager: string;
  phone: string;
  email: string;
  expertCount: number;
  topServices: string[];
  hasManager: boolean;
}

