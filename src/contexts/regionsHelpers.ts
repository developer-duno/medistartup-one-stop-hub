
import { Region, RegionInfo, RegionAdmin } from '@/components/map/types';
import { Expert } from '@/types/expert';
import { regions as initialRegions } from '@/components/map/regionData';

// Convert regions to admin format for initial data
export const convertToAdminRegions = (regions: Region[]): RegionAdmin[] => {
  return regions.map((region, index) => ({
    ...region,
    active: true,
    manager: ['김지역', '이담당', '박매니저', '최지역', '정관리'][index % 5],
    mainCities: region.includesRegions,
    serviceCount: 4 + (index % 5)
  }));
};

// Get stored regions from localStorage or use initial data
export const getStoredRegions = (): RegionAdmin[] => {
  try {
    const stored = localStorage.getItem('adminRegions');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to parse stored regions:", error);
  }
  
  return convertToAdminRegions(initialRegions);
};

// Get regional manager info
export const getRegionalManager = (
  regionName: string, 
  adminRegions: RegionAdmin[], 
  experts: Expert[]
): Expert | null => {
  const currentRegion = adminRegions.find(region => region.name === regionName && region.active);
  if (!currentRegion) return null;
  
  const includesRegions = currentRegion.includesRegions;
  
  return experts.find(expert => 
    expert.isRegionalManager && 
    expert.regions.some(region => includesRegions.includes(region))
  ) || null;
};

// Calculate region expert count
export const getRegionalExpertCount = (
  regionName: string, 
  adminRegions: RegionAdmin[], 
  experts: Expert[]
): number => {
  const currentRegion = adminRegions.find(region => region.name === regionName);
  if (!currentRegion) return 0;
  
  const includesRegions = currentRegion.includesRegions;
  
  return experts.filter(expert => 
    expert.regions.some(region => includesRegions.includes(region))
  ).length;
};

// Get region top services
export const getRegionTopServices = (
  regionName: string, 
  adminRegions: RegionAdmin[], 
  experts: Expert[]
): Array<{name: string; percent: number}> => {
  const currentRegion = adminRegions.find(region => region.name === regionName);
  if (!currentRegion) return [];
  
  const includesRegions = currentRegion.includesRegions;
  
  // Get all services from experts in this region
  const allServices = experts
    .filter(expert => expert.regions.some(region => includesRegions.includes(region)))
    .flatMap(expert => expert.services);
  
  // Count service occurrences
  const serviceCounts: Record<string, number> = {};
  let totalServices = 0;
  
  allServices.forEach(service => {
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    totalServices++;
  });
  
  // Sort by count and return top 3 with percentages
  return Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / Math.max(1, totalServices)) * 100)
    }));
};

// Get active region info
export const getActiveRegionInfo = (
  activeRegion: string, 
  adminRegions: RegionAdmin[], 
  experts: Expert[]
): RegionInfo | null => {
  const region = adminRegions.find(region => region.name === activeRegion && region.active);
  if (!region) return null;
  
  const manager = getRegionalManager(activeRegion, adminRegions, experts);
  const expertCount = getRegionalExpertCount(activeRegion, adminRegions, experts);
  const topServices = getRegionTopServices(activeRegion, adminRegions, experts);
  
  return {
    ...region,
    manager: manager?.name || '담당자 미지정',
    phone: manager?.contact || '번호 미등록',
    email: manager?.email || 'contact@medistartup.kr',
    expertCount,
    topServices,
    hasManager: !!manager,
    description: `${region.name} 지역의 의료 창업 환경에 특화된 전문가 서비스를 제공합니다.`,
    mainCities: region.mainCities
  };
};

// Get URL with region filter
export const getFilteredUrl = (
  regionName: string, 
  adminRegions: RegionAdmin[]
): string => {
  const region = adminRegions.find(r => r.name === regionName);
  if (!region) return '/experts';
  
  return `/experts?region=${encodeURIComponent(region.name)}`;
};
