
// Utility functions for simulation calculations

// Financial (개원 비용) simulator
export const simulateFinancialCosts = (data: {
  specialty: string;
  size: number; 
  location: string;
}) => {
  // Base cost calculations based on inputs
  const baseSqMPrice = getBasePriceBySpecialty(data.specialty);
  const locationMultiplier = getLocationMultiplier(data.location);
  
  // Calculate individual costs
  const interiorCost = Math.round(data.size * baseSqMPrice * locationMultiplier / 10) * 10;
  const equipmentCost = Math.round(getEquipmentCostBySpecialty(data.specialty) * (data.size / 50) / 10) * 10;
  const licenseCost = 500; // 인허가 기본 비용 (단위: 만원)
  const miscCost = Math.round((interiorCost + equipmentCost) * 0.1 / 10) * 10; // 기타 비용은 약 10%
  
  const totalCost = interiorCost + equipmentCost + licenseCost + miscCost;
  
  return {
    interiorCost: `${interiorCost.toLocaleString()}만원`,
    equipmentCost: `${equipmentCost.toLocaleString()}만원`,
    licenseCost: `${licenseCost.toLocaleString()}만원`,
    miscCost: `${miscCost.toLocaleString()}만원`,
    totalCost: `${totalCost.toLocaleString()}만원`,
  };
};

// Revenue (수익성) simulator
export const simulateRevenue = (data: {
  specialty: string;
  patients: number;
  region: string;
}) => {
  // Base calculations
  const avgRevenuePerPatient = getAvgRevenueBySpecialty(data.specialty);
  const regionMultiplier = getRegionMultiplier(data.region);
  
  // Monthly revenue calculation
  const monthlyRevenue = Math.round(data.patients * 22 * avgRevenuePerPatient * regionMultiplier / 10) * 10;
  
  // Expenses calculation (rent, staff, utilities, etc)
  const monthlyExpenses = Math.round(getBaseExpensesBySpecialty(data.specialty) * regionMultiplier / 10) * 10;
  
  // Calculate profit
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  
  // Region comparison (percentage compared to average)
  const regionComparison = Math.min(Math.round((monthlyProfit / getAvgProfitByRegion(data.region, data.specialty)) * 100), 150);
  
  return {
    revenue: `${monthlyRevenue.toLocaleString()}만원`,
    expenses: `${monthlyExpenses.toLocaleString()}만원`,
    profit: `${monthlyProfit.toLocaleString()}만원`,
    regionComparison,
  };
};

// Staffing (인력 구성) simulator
export const simulateStaffing = (data: {
  specialty: string;
  size: number;
  services: string[];
}) => {
  // Base staff configurations
  const baseStaff = getBaseStaffBySpecialty(data.specialty);
  
  // Adjust for size
  const sizeMultiplier = Math.ceil(data.size / 50);
  
  // Adjust for services
  const staffing = calculateStaffingNeeds(baseStaff, sizeMultiplier, data.services);
  
  // Calculate monthly cost
  let monthlyCost = 0;
  staffing.forEach(staff => {
    monthlyCost += staff.salary * staff.count;
  });
  
  return {
    staffing,
    monthlyCost: `${monthlyCost.toLocaleString()}만원`,
  };
};

// Helper functions
function getBasePriceBySpecialty(specialty: string): number {
  const prices: Record<string, number> = {
    '내과': 100,
    '소아과': 90,
    '외과': 120,
    '산부인과': 130,
    '피부과': 150,
    '치과': 180,
    '정형외과': 140,
    '안과': 160,
    '한의원': 100,
    '종합병원': 200,
  };
  
  return prices[specialty] || 100; // 기본값 100만원/평
}

function getLocationMultiplier(location: string): number {
  const multipliers: Record<string, number> = {
    '중형상가': 1.0,
    '대형상가': 1.5,
    '주택가': 0.8,
    '오피스밀집지역': 1.3,
  };
  
  return multipliers[location] || 1.0;
}

function getEquipmentCostBySpecialty(specialty: string): number {
  const costs: Record<string, number> = {
    '내과': 3000,
    '소아과': 2000,
    '외과': 4000,
    '산부인과': 5000,
    '피부과': 8000,
    '치과': 10000,
    '정형외과': 6000,
    '안과': 7000,
    '한의원': 3000,
    '종합병원': 15000,
  };
  
  return costs[specialty] || 3000; // 기본값 3000만원
}

function getAvgRevenueBySpecialty(specialty: string): number {
  const revenues: Record<string, number> = {
    '내과': 3.5,
    '피부과': 5.0,
    '정형외과': 4.5,
    '안과': 6.0,
    '치과': 8.0,
    '한의원': 4.0,
  };
  
  return revenues[specialty] || 4.0; // 기본값 4만원/환자
}

function getRegionMultiplier(region: string): number {
  const multipliers: Record<string, number> = {
    '서울/경기': 1.3,
    '부산/경남': 1.0,
    '대전/충남': 0.9,
    '대구/경북': 0.95,
    '광주/전라': 0.9,
  };
  
  return multipliers[region] || 1.0;
}

function getBaseExpensesBySpecialty(specialty: string): number {
  const expenses: Record<string, number> = {
    '내과': 1500,
    '피부과': 2500,
    '정형외과': 2200,
    '안과': 2800,
    '치과': 3500,
    '한의원': 1800,
  };
  
  return expenses[specialty] || 2000; // 기본값 2000만원
}

function getAvgProfitByRegion(region: string, specialty: string): number {
  // Base profit by specialty
  const baseProfit: Record<string, number> = {
    '내과': 1500,
    '피부과': 2500,
    '정형외과': 2000,
    '안과': 2200,
    '치과': 3000,
    '한의원': 1600,
  };
  
  const base = baseProfit[specialty] || 2000;
  const regionMultiplier = getRegionMultiplier(region);
  
  return base * regionMultiplier;
}

interface StaffMember {
  role: string;
  count: number;
  salary: number;
}

function getBaseStaffBySpecialty(specialty: string): StaffMember[] {
  const staffConfigs: Record<string, StaffMember[]> = {
    '내과': [
      { role: '의사', count: 1, salary: 1000 },
      { role: '간호사', count: 1, salary: 350 },
      { role: '원무과', count: 1, salary: 270 },
    ],
    '치과': [
      { role: '치과의사', count: 1, salary: 1200 },
      { role: '치위생사', count: 2, salary: 330 },
      { role: '원무과', count: 1, salary: 270 },
    ],
    '한의원': [
      { role: '한의사', count: 1, salary: 900 },
      { role: '간호조무사', count: 1, salary: 280 },
      { role: '원무과', count: 1, salary: 250 },
    ],
    '종합병원': [
      { role: '의사', count: 3, salary: 1200 },
      { role: '간호사', count: 6, salary: 350 },
      { role: '의료기사', count: 2, salary: 320 },
      { role: '원무과', count: 2, salary: 270 },
      { role: '행정직', count: 1, salary: 350 },
    ],
  };
  
  return staffConfigs[specialty] || [
    { role: '의사', count: 1, salary: 1000 },
    { role: '간호사', count: 1, salary: 350 },
    { role: '원무과', count: 1, salary: 270 },
  ];
}

function calculateStaffingNeeds(
  baseStaff: StaffMember[], 
  sizeMultiplier: number, 
  services: string[]
): StaffMember[] {
  const result = baseStaff.map(staff => ({...staff}));
  
  // Adjust for size
  if (sizeMultiplier > 1) {
    result.forEach(staff => {
      if (staff.role === '의사' || staff.role === '치과의사' || staff.role === '한의사') {
        // Increase doctors based on size but with diminishing returns
        staff.count += Math.floor(sizeMultiplier * 0.5);
      } else if (staff.role === '간호사' || staff.role === '치위생사') {
        // Increase nursing staff linearly with size
        staff.count = Math.ceil(staff.count * (1 + (sizeMultiplier - 1) * 0.7));
      } else if (staff.role === '원무과') {
        // Increase admin staff slowly
        staff.count = Math.ceil(staff.count * (1 + (sizeMultiplier - 1) * 0.3));
      }
    });
  }
  
  // Adjust for services
  if (services.includes('수술')) {
    // Add specialized staff for surgeries
    result.push({ role: '수술실간호사', count: 1, salary: 380 });
    
    // Increase doctor count for surgeries
    const doctorIndex = result.findIndex(s => 
      s.role === '의사' || s.role === '치과의사');
    if (doctorIndex !== -1) {
      result[doctorIndex].count += 1;
    }
  }
  
  if (services.includes('미용')) {
    // Add specialized staff for cosmetic procedures
    result.push({ role: '피부관리사', count: 1, salary: 320 });
  }
  
  // Round counts to integers
  result.forEach(staff => {
    staff.count = Math.max(1, Math.round(staff.count));
  });
  
  return result;
}
