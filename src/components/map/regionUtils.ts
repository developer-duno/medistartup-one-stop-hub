
import { regions } from './regionData';
import { Expert } from '@/types/expert';
import { Region, RegionInfo } from './types';

// 지역 매니저 정보 가져오기 (isRegionalManager가 true인 전문가 중 해당 지역을 담당하는 전문가)
export const getRegionalManager = (regionName: string, experts: Expert[]) => {
  const currentRegion = regions.find(region => region.name === regionName);
  if (!currentRegion) return null;
  
  const includesRegions = currentRegion.includesRegions;
  
  return experts.find(expert => 
    expert.isRegionalManager && 
    expert.regions.some(region => includesRegions.includes(region))
  );
};

// 지역별 전문가 수 계산
export const getRegionalExpertCount = (regionName: string, experts: Expert[]) => {
  const currentRegion = regions.find(region => region.name === regionName);
  if (!currentRegion) return 0;
  
  const includesRegions = currentRegion.includesRegions;
  
  return experts.filter(expert => 
    expert.regions.some(region => includesRegions.includes(region))
  ).length;
};

// 지역별 주요 서비스 가져오기
export const getRegionTopServices = (regionName: string, experts: Expert[]): string[] => {
  const currentRegion = regions.find(region => region.name === regionName);
  if (!currentRegion) return [];
  
  const includesRegions = currentRegion.includesRegions;
  
  // 해당 지역 전문가들의 서비스를 모두 가져옴
  const allServices = experts
    .filter(expert => expert.regions.some(region => includesRegions.includes(region)))
    .flatMap(expert => expert.services);
  
  // 서비스별 출현 횟수를 계산
  const serviceCounts: {[key: string]: number} = {};
  allServices.forEach(service => {
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
  });
  
  // 출현 횟수 기준으로 정렬하여 상위 3개 반환
  return Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);
};

// 활성화된 지역에 대한 정보 가져오기
export const getActiveRegionInfo = (activeRegion: string, experts: Expert[]): RegionInfo | null => {
  const region = regions.find(region => region.name === activeRegion);
  if (!region) return null;
  
  const manager = getRegionalManager(activeRegion, experts);
  const expertCount = getRegionalExpertCount(activeRegion, experts);
  const topServices = getRegionTopServices(activeRegion, experts);
  
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

// URL에 지역 정보 포함하여 반환
export const getFilteredUrl = (activeRegion: string): string => {
  const region = regions.find(r => r.name === activeRegion);
  if (!region) return '/experts';
  
  // 지역 이름만 URL 파라미터로 전달
  return `/experts?region=${encodeURIComponent(region.name)}`;
};
