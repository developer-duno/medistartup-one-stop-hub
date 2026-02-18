
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
  // Raw numeric values (백만원 단위) for charts
  rawInterior: number;
  rawEquipment: number;
  rawLicense: number;
  rawMisc: number;
  rawTotal: number;
}

export interface RevenueResult {
  revenue: string;
  expenses: string;
  profit: string;
  regionComparison: number;
  // Raw numeric values (만원 단위) for charts
  rawRevenue: number;
  rawExpenses: number;
  rawProfit: number;
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
  '종합병원',
  '성형외과',
  '재활의학과',
  '비뇨기과',
  '이비인후과',
  '신경외과',
  '정신건강의학과',
  '가정의학과',
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
