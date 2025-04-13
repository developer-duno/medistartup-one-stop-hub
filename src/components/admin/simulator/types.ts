
export interface Simulator {
  id: number;
  title: string;
  description: string;
  type: string;
  active: boolean;
  views: number;
}

export interface UsageData {
  date: string;
  views: number;
}

export interface SimulatorTestParams {
  specialty?: string;
  size?: number;
  location?: string;
  patients?: number;
  region?: string;
  services?: string[];
}

// Standardized result interfaces
export interface FinancialResult {
  interiorCost: string;
  equipmentCost: string;
  licenseCost: string;
  miscCost: string;
  totalCost: string;
}

export interface RevenueResult {
  revenue: string;
  expenses: string;
  profit: string;
  regionComparison: number;
}

export interface StaffMember {
  role: string;
  count: number;
  salary: number;
}

export interface StaffingResult {
  staffing: StaffMember[];
  monthlyCost: string;
}

// Constants for simulator
export const MEDICAL_SPECIALTIES = [
  '내과',
  '소아과',
  '외과',
  '산부인과',
  '피부과',
  '치과',
  '정형외과',
  '안과',
  '한의원',
  '종합병원'
];

export const STANDARDIZED_REGIONS = [
  '서울/경기',
  '부산/경남',
  '대전/충남',
  '대구/경북',
  '광주/전라',
  '제주'
];

export const LOCATION_TYPES = [
  '중형상가',
  '대형상가',
  '주택가',
  '오피스밀집지역'
];

export const SERVICE_TYPES = [
  '일반진료',
  '미용',
  '수술',
  '검사',
  '검진',
  '입원'
];
