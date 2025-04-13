
import { Expert } from '@/types/expert';
import { Region, RegionInfo } from './types';

// 지역 매니저 정보 가져오기 (isRegionalManager가 true인 전문가 중 해당 지역을 담당하는 전문가)
export const getRegionalManager = (regionName: string, experts: Expert[]) => {
  const includesRegions = getIncludesRegionsByName(regionName);
  if (!includesRegions.length) return null;
  
  return experts.find(expert => 
    expert.isRegionalManager && 
    expert.regions.some(region => includesRegions.includes(region))
  );
};

// 지역이름으로 포함된 지역들 찾기
export const getIncludesRegionsByName = (regionName: string, regions?: Region[]): string[] => {
  if (regions) {
    const currentRegion = regions.find(region => region.name === regionName);
    return currentRegion?.includesRegions || [];
  } 
  
  // 이전 호환성을 위해 유지
  switch (regionName) {
    case '서울/경기':
      return ['서울', '경기', '인천'];
    case '강원':
      return ['강원'];
    case '충청':
      return ['대전', '충남', '충북', '세종'];
    case '경북/대구':
      return ['대구', '경북'];
    case '전라':
      return ['광주', '전남', '전북'];
    case '경남/부산':
      return ['부산', '경남', '울산'];
    case '제주':
      return ['제주'];
    default:
      return [];
  }
};

// 지역별 전문가 수 계산
export const getRegionalExpertCount = (regionName: string, experts: Expert[], regions?: Region[]) => {
  const includesRegions = getIncludesRegionsByName(regionName, regions);
  if (!includesRegions.length) return 0;
  
  return experts.filter(expert => 
    expert.regions.some(region => includesRegions.includes(region))
  ).length;
};

// 지역별 주요 서비스 가져오기
export const getRegionTopServices = (regionName: string, experts: Expert[], regions?: Region[]): string[] => {
  const includesRegions = getIncludesRegionsByName(regionName, regions);
  if (!includesRegions.length) return [];
  
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
export const getActiveRegionInfo = (activeRegion: string, experts: Expert[], regions?: Region[]): RegionInfo | null => {
  let region;
  
  if (regions) {
    region = regions.find(r => r.name === activeRegion);
  }
  
  if (!region) {
    // 기존 regionData에서 찾기 (이전 버전과의 호환성을 위해)
    const { regions: defaultRegions } = require('./regionData');
    region = defaultRegions.find((r: Region) => r.name === activeRegion);
  }
  
  if (!region) return null;
  
  const manager = getRegionalManager(activeRegion, experts);
  const expertCount = getRegionalExpertCount(activeRegion, experts, regions);
  const topServices = getRegionTopServices(activeRegion, experts, regions);
  
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
  return `/experts?region=${encodeURIComponent(activeRegion)}`;
};
