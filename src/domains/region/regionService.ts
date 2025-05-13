
import { Region } from '../../components/hero/RegionSelector';

// Default regions data - Updated to use 경기남부 and 경기북부 instead of just 경기
const DEFAULT_REGIONS = ['대전/충남', '서울', '경기남부', '경기북부', '부산/경남', '대구/경북', '광주/전라', '강원', '제주'];

// Domain service for region-related operations
export class RegionService {
  // Get all available regions
  static getAvailableRegions(): string[] {
    return DEFAULT_REGIONS;
  }

  // Store the selected region for cross-component use
  static storeSelectedRegion(region: string): void {
    sessionStorage.setItem('selectedRegion', region);
  }

  // Retrieve the stored region
  static getStoredRegion(): string {
    return sessionStorage.getItem('selectedRegion') || DEFAULT_REGIONS[0];
  }
}
