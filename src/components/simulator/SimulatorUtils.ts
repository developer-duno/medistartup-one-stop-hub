
// Utility functions for simulator calculations
import { FinancialResult, RevenueResult, StaffingResult, StaffMember } from '../admin/simulator/types';

export const simulateFinancialCosts = (params: { specialty: string; size: number; location: string }): FinancialResult => {
  // Base costs by specialty (in millions of KRW)
  const baseCosts: Record<string, number> = {
    '내과': 150,
    '소아과': 120,
    '외과': 200,
    '산부인과': 230,
    '피부과': 180,
    '치과': 250,
    '정형외과': 220,
    '안과': 210,
    '한의원': 130,
    '종합병원': 500,
  };
  
  // Size multiplier (per pyeong)
  const sizeMultiplier = 0.8;
  
  // Location modifiers
  const locationModifiers: Record<string, number> = {
    '중형상가': 1,
    '대형상가': 1.3,
    '주택가': 0.8,
    '오피스밀집지역': 1.2,
  };
  
  // Calculate costs
  const baseAmount = baseCosts[params.specialty] || 150;
  const sizeAmount = params.size * sizeMultiplier;
  const locationModifier = locationModifiers[params.location] || 1;
  
  const interiorCost = Math.round(baseAmount * 0.4 * locationModifier) + '백만원';
  const equipmentCost = Math.round(baseAmount * 0.5) + '백만원';
  const licenseCost = Math.round(baseAmount * 0.05 + sizeAmount * 0.1) + '백만원';
  const miscCost = Math.round(baseAmount * 0.1) + '백만원';
  const totalCost = Math.round(baseAmount * locationModifier + sizeAmount) + '백만원';
  
  return {
    interiorCost,
    equipmentCost,
    licenseCost,
    miscCost,
    totalCost,
  };
};

export const simulateRevenue = (params: { specialty: string; patients: number; region: string }): RevenueResult => {
  // Base revenue per patient by specialty (in KRW)
  const baseRevenue: Record<string, number> = {
    '내과': 25000,
    '피부과': 35000,
    '정형외과': 40000,
    '안과': 30000,
    '치과': 45000,
    '한의원': 50000,
  };
  
  // Regional multipliers - using standardized regions
  const regionMultipliers: Record<string, number> = {
    '서울/경기': 1.2,
    '부산/경남': 0.9,
    '대전/충남': 0.85,
    '대구/경북': 0.8,
    '광주/전라': 0.75,
    '제주': 0.7,
  };
  
  // Calculate expected revenue
  const perPatientRevenue = baseRevenue[params.specialty] || 30000;
  const regionMultiplier = regionMultipliers[params.region] || 1;
  const dailyPatients = params.patients;
  
  const dailyRevenue = perPatientRevenue * dailyPatients * regionMultiplier;
  const monthlyRevenue = dailyRevenue * 26; // Assuming 26 working days per month
  
  const revenue = Math.round(monthlyRevenue / 10000) + '만원';
  const expenses = Math.round((monthlyRevenue * 0.6) / 10000) + '만원';
  const profit = Math.round((monthlyRevenue * 0.4) / 10000) + '만원';
  
  // Calculate region comparison (percentage relative to national average)
  const nationalAverage = 1;
  const regionComparison = Math.round((regionMultiplier / nationalAverage) * 100);
  
  return {
    revenue,
    expenses,
    profit,
    regionComparison,
  };
};

export const simulateStaffing = (params: { specialty: string; size: number; services: string[] }): StaffingResult => {
  // Base staffing needs
  let baseStaffing: StaffMember[] = [
    { role: '의사/의료진', count: 1, salary: 1000 },
    { role: '간호사', count: 1, salary: 350 },
    { role: '리셉션/행정', count: 1, salary: 250 },
  ];
  
  // Additional staff based on specialty
  if (params.specialty === '치과') {
    baseStaffing.push({ role: '치위생사', count: 1, salary: 300 });
  }
  
  if (params.specialty === '종합병원') {
    baseStaffing = [
      { role: '의사/의료진', count: 3, salary: 1000 },
      { role: '간호사', count: 6, salary: 350 },
      { role: '리셉션/행정', count: 2, salary: 250 },
      { role: '원무과', count: 2, salary: 300 },
      { role: '관리직', count: 1, salary: 400 },
    ];
  }
  
  // Additional staff based on size
  if (params.size > 150) {
    baseStaffing = baseStaffing.map(staff => ({
      ...staff,
      count: staff.role === '간호사' ? staff.count + 1 : staff.count,
    }));
    
    baseStaffing = baseStaffing.map(staff => ({
      ...staff,
      count: staff.role === '리셉션/행정' ? staff.count + 1 : staff.count,
    }));
  }
  
  // Additional staff based on services
  if (params.services?.includes('수술')) {
    baseStaffing.push({ role: '수술실 간호사', count: 1, salary: 400 });
  }
  
  if (params.services?.includes('입원')) {
    baseStaffing.push({ role: '병동 간호사', count: 2, salary: 350 });
  }
  
  // Calculate monthly cost
  const monthlyCost = baseStaffing.reduce((total, staff) => {
    return total + (staff.count * staff.salary);
  }, 0);
  
  return {
    staffing: baseStaffing,
    monthlyCost: monthlyCost + '만원',
  };
};

// Helper function to track simulator usage (centralized)
export const trackSimulatorUsage = (simulatorId: number): void => {
  const storedSimulators = localStorage.getItem('simulators');
  if (storedSimulators) {
    try {
      const parsedSimulators = JSON.parse(storedSimulators);
      const updatedSimulators = parsedSimulators.map((sim: any) => {
        if (sim.id === simulatorId) {
          return {...sim, views: (sim.views || 0) + 1};
        }
        return sim;
      });
      localStorage.setItem('simulators', JSON.stringify(updatedSimulators));
      // Dispatch a custom event to notify other components about the change
      window.dispatchEvent(new CustomEvent('simulatorUpdate', { 
        detail: { action: 'viewIncrement', simulatorId } 
      }));
    } catch (error) {
      console.error('시뮬레이터 사용 기록 업데이트 중 오류:', error);
    }
  }
};
