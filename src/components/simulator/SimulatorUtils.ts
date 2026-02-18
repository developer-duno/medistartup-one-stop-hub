
// Utility functions for simulator calculations
// 2024-2025년 실제 업계 데이터 기반 (국세청 TASIS, 건강보험심사평가원, 업계 평균치 참고)
import { FinancialResult, RevenueResult, StaffingResult, StaffMember, STANDARDIZED_REGIONS } from '../admin/simulator/types';

export const simulateFinancialCosts = (params: { specialty: string; size: number; location: string }): FinancialResult => {
  // 진료과목별 기본 개원 비용 (백만원 단위, 30평 기준)
  // 출처: 2024년 업계 평균 개원 컨설팅 데이터 기반
  const baseCosts: Record<string, { interior: number; equipment: number; license: number; misc: number }> = {
    '내과': { interior: 80, equipment: 120, license: 15, misc: 35 },
    '소아과': { interior: 70, equipment: 80, license: 15, misc: 30 },
    '외과': { interior: 100, equipment: 200, license: 20, misc: 50 },
    '산부인과': { interior: 120, equipment: 280, license: 25, misc: 60 },
    '피부과': { interior: 150, equipment: 200, license: 20, misc: 50 },
    '치과': { interior: 100, equipment: 250, license: 20, misc: 40 },
    '정형외과': { interior: 110, equipment: 300, license: 25, misc: 55 },
    '안과': { interior: 120, equipment: 400, license: 25, misc: 60 },
    '한의원': { interior: 60, equipment: 40, license: 10, misc: 25 },
    '종합병원': { interior: 800, equipment: 1500, license: 100, misc: 300 },
    '성형외과': { interior: 200, equipment: 350, license: 25, misc: 70 },    // 총 ~6.5억 (고급 인테리어+수술장비)
    '재활의학과': { interior: 100, equipment: 250, license: 20, misc: 50 },  // 총 ~4.2억 (재활치료 장비)
    '비뇨기과': { interior: 90, equipment: 180, license: 20, misc: 40 },     // 총 ~3.3억
    '이비인후과': { interior: 85, equipment: 150, license: 18, misc: 38 },   // 총 ~2.9억
    '신경외과': { interior: 130, equipment: 450, license: 30, misc: 65 },    // 총 ~6.8억 (고가 장비)
    '정신건강의학과': { interior: 70, equipment: 30, license: 15, misc: 30 }, // 총 ~1.5억 (장비 최소)
    '가정의학과': { interior: 75, equipment: 100, license: 15, misc: 30 },   // 총 ~2.2억
  };
  
  // 평당 인테리어 단가 보정 (기본 30평 기준에서 면적 비례 조정)
  const baseSize = 30; // 기준 면적(평)
  const sizeRatio = params.size / baseSize;
  
  // 인테리어는 면적에 비례, 장비는 면적 영향 적음, 인허가/기타는 소폭 증가
  const interiorSizeMultiplier = sizeRatio;
  const equipmentSizeMultiplier = 1 + (sizeRatio - 1) * 0.3; // 면적 증가 시 30%만 반영
  const licenseSizeMultiplier = 1 + (sizeRatio - 1) * 0.15;
  const miscSizeMultiplier = 1 + (sizeRatio - 1) * 0.4;
  
  // 입지별 보정 계수 (주로 보증금/권리금/인테리어에 영향)
  const locationModifiers: Record<string, { interior: number; misc: number }> = {
    '중형상가': { interior: 1.0, misc: 1.0 },
    '대형상가': { interior: 1.2, misc: 1.5 },    // 대형상가는 보증금/권리금 높음
    '주택가': { interior: 0.85, misc: 0.7 },       // 주택가는 상대적으로 저렴
    '오피스밀집지역': { interior: 1.15, misc: 1.3 }, // 오피스 지역 임대료 높음
  };
  
  const costs = baseCosts[params.specialty] || baseCosts['내과'];
  const locMod = locationModifiers[params.location] || locationModifiers['중형상가'];
  
  const interiorCost = Math.round(costs.interior * interiorSizeMultiplier * locMod.interior);
  const equipmentCost = Math.round(costs.equipment * equipmentSizeMultiplier);
  const licenseCost = Math.round(costs.license * licenseSizeMultiplier);
  const miscCost = Math.round(costs.misc * miscSizeMultiplier * locMod.misc);
  const totalCost = interiorCost + equipmentCost + licenseCost + miscCost;
  
  // 백만원 단위를 만원 단위로 변환하여 표시
  const formatCost = (valueMillion: number) => {
    const valueManwon = valueMillion * 100;
    if (valueManwon >= 10000) {
      const eok = Math.floor(valueManwon / 10000);
      const remainder = valueManwon % 10000;
      return remainder > 0 
        ? `${eok}억 ${remainder.toLocaleString()}만원`
        : `${eok}억원`;
    }
    return valueManwon.toLocaleString() + '만원';
  };

  return {
    interiorCost: formatCost(interiorCost),
    equipmentCost: formatCost(equipmentCost),
    licenseCost: formatCost(licenseCost),
    miscCost: formatCost(miscCost),
    totalCost: formatCost(totalCost),
    rawInterior: interiorCost,
    rawEquipment: equipmentCost,
    rawLicense: licenseCost,
    rawMisc: miscCost,
    rawTotal: totalCost,
  };
};

export const simulateRevenue = (params: { specialty: string; patients: number; region: string }): RevenueResult => {
  // 진료과목별 환자 1인당 평균 진료비 (원)
  // 출처: 2023년 국세청 TASIS 100대 생활업종 + 건강보험심사평가원 데이터 기반 추정
  // 급여 + 비급여 포함 평균 단가
  const perPatientRevenue: Record<string, number> = {
    '내과': 35000,
    '소아과': 30000,
    '외과': 55000,
    '산부인과': 65000,
    '피부과': 70000,
    '치과': 80000,
    '정형외과': 50000,
    '안과': 85000,
    '한의원': 45000,
    '종합병원': 120000,
    '성형외과': 150000,      // 비급여 시술/수술 비중 매우 높음
    '재활의학과': 40000,     // 물리치료 위주, 단가 낮지만 환자수 많음
    '비뇨기과': 50000,       // 검사/시술 포함
    '이비인후과': 35000,     // 감기/중이염 등 일반 진료 위주
    '신경외과': 90000,       // 수술/시술 단가 높음
    '정신건강의학과': 60000, // 상담료+약물치료, 비급여 상담 높음
    '가정의학과': 30000,     // 건강검진+일반진료
  };
  
  // 지역별 매출 보정 계수 (수도권 대비)
  // 출처: 국세청 지역별 의원 매출 통계 기반
  const regionMultipliers: Record<string, number> = {
    '서울/경기': 1.15,    // 수도권: 환자 수 많고 비급여 비중 높음
    '부산/경남': 0.95,    // 부산권: 전국 평균 근접
    '대전/충남': 0.88,    // 대전권: 중위권
    '대구/경북': 0.85,    // 대구권: 중위권
    '광주/전라': 0.80,    // 광주권: 비수도권 하위
    '제주': 0.75,         // 제주: 인구 대비 의원 수 높아 경쟁
  };
  
  const dailyRevenue = (perPatientRevenue[params.specialty] || 40000) * params.patients;
  const regionMultiplier = regionMultipliers[params.region] || 1;
  const adjustedDailyRevenue = dailyRevenue * regionMultiplier;
  
  // 월 영업일 25일 기준 (토요일 반일 포함)
  const monthlyRevenue = adjustedDailyRevenue * 25;
  
  // 진료과목별 비용 비율 (인건비+임대료+재료비+관리비 등)
  const expenseRatios: Record<string, number> = {
    '내과': 0.65,
    '소아과': 0.68,
    '외과': 0.60,
    '산부인과': 0.62,
    '피부과': 0.55,
    '치과': 0.58,
    '정형외과': 0.63,
    '안과': 0.52,
    '한의원': 0.60,
    '종합병원': 0.75,
    '성형외과': 0.48,       // 비급여 비중 매우 높아 마진율 최고
    '재활의학과': 0.67,     // 인건비(치료사) 비중 높음
    '비뇨기과': 0.60,
    '이비인후과': 0.63,
    '신경외과': 0.55,       // 수술 마진율 높음
    '정신건강의학과': 0.50, // 장비/재료비 낮아 마진 좋음
    '가정의학과': 0.65,
  };
  
  const expenseRatio = expenseRatios[params.specialty] || 0.62;
  const monthlyExpenses = monthlyRevenue * expenseRatio;
  const monthlyProfit = monthlyRevenue - monthlyExpenses;
  
  const revenue = Math.round(monthlyRevenue / 10000).toLocaleString() + '만원';
  const expenses = Math.round(monthlyExpenses / 10000).toLocaleString() + '만원';
  const profit = Math.round(monthlyProfit / 10000).toLocaleString() + '만원';
  
  // 지역 대비 지수 (전국 평균 = 100%)
  const regionComparison = Math.round(regionMultiplier * 100);
  
  return {
    revenue,
    expenses,
    profit,
    regionComparison,
    rawRevenue: Math.round(monthlyRevenue / 10000),
    rawExpenses: Math.round(monthlyExpenses / 10000),
    rawProfit: Math.round(monthlyProfit / 10000),
  };
};

export const simulateStaffing = (params: { specialty: string; size: number; services: string[] }): StaffingResult => {
  // 진료과목별 기본 인력 구성 (30평 기준)
  // 급여: 만원/월 (2024-2025년 시장 평균)
  // 출처: 간호사 신규 초봉 평균 ~345만원(4,136만원/년), 간호조무사 ~230만원 기준
  const staffingBySpecialty: Record<string, StaffMember[]> = {
    '내과': [
      { role: '전문의', count: 1, salary: 1200 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '소아과': [
      { role: '전문의', count: 1, salary: 1100 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '외과': [
      { role: '전문의', count: 1, salary: 1500 },
      { role: '간호사', count: 2, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '산부인과': [
      { role: '전문의', count: 1, salary: 1400 },
      { role: '간호사', count: 2, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '초음파사', count: 1, salary: 300 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '피부과': [
      { role: '전문의', count: 1, salary: 1300 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '피부관리사', count: 2, salary: 260 },
      { role: '상담실장', count: 1, salary: 350 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '치과': [
      { role: '치과의사', count: 1, salary: 1300 },
      { role: '치위생사', count: 2, salary: 300 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '정형외과': [
      { role: '전문의', count: 1, salary: 1400 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '물리치료사', count: 2, salary: 280 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '안과': [
      { role: '전문의', count: 1, salary: 1500 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '시력검사사', count: 1, salary: 280 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '한의원': [
      { role: '한의사', count: 1, salary: 1000 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '종합병원': [
      { role: '전문의', count: 5, salary: 1500 },
      { role: '간호사', count: 10, salary: 340 },
      { role: '간호조무사', count: 5, salary: 230 },
      { role: '원무/행정', count: 3, salary: 250 },
      { role: '의료기사', count: 3, salary: 300 },
      { role: '관리직', count: 2, salary: 400 },
    ],
    '성형외과': [
      { role: '전문의', count: 1, salary: 1800 },
      { role: '간호사', count: 2, salary: 340 },
      { role: '상담실장', count: 1, salary: 400 },
      { role: '피부관리사', count: 1, salary: 260 },
      { role: '마취간호사', count: 1, salary: 400 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '재활의학과': [
      { role: '전문의', count: 1, salary: 1300 },
      { role: '물리치료사', count: 3, salary: 280 },
      { role: '작업치료사', count: 1, salary: 270 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '비뇨기과': [
      { role: '전문의', count: 1, salary: 1400 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '이비인후과': [
      { role: '전문의', count: 1, salary: 1200 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '청각사', count: 1, salary: 280 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '신경외과': [
      { role: '전문의', count: 1, salary: 1800 },
      { role: '간호사', count: 2, salary: 340 },
      { role: '방사선사', count: 1, salary: 310 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '정신건강의학과': [
      { role: '전문의', count: 1, salary: 1300 },
      { role: '임상심리사', count: 1, salary: 300 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
    '가정의학과': [
      { role: '전문의', count: 1, salary: 1100 },
      { role: '간호사', count: 1, salary: 340 },
      { role: '간호조무사', count: 1, salary: 230 },
      { role: '원무/행정', count: 1, salary: 250 },
    ],
  };
  
  let staffing = JSON.parse(JSON.stringify(
    staffingBySpecialty[params.specialty] || staffingBySpecialty['내과']
  )) as StaffMember[];
  
  // 면적에 따른 인력 보정 (50평 이상부터 추가 인력)
  if (params.size >= 50 && params.size < 80) {
    // 간호 인력 1명 추가
    const nurseIndex = staffing.findIndex(s => s.role === '간호사' || s.role === '간호조무사');
    if (nurseIndex >= 0) {
      staffing[nurseIndex] = { ...staffing[nurseIndex], count: staffing[nurseIndex].count + 1 };
    }
  } else if (params.size >= 80) {
    // 간호 인력 2명 + 행정 1명 추가
    const nurseIndex = staffing.findIndex(s => s.role === '간호사' || s.role === '간호조무사');
    if (nurseIndex >= 0) {
      staffing[nurseIndex] = { ...staffing[nurseIndex], count: staffing[nurseIndex].count + 2 };
    }
    const adminIndex = staffing.findIndex(s => s.role === '원무/행정');
    if (adminIndex >= 0) {
      staffing[adminIndex] = { ...staffing[adminIndex], count: staffing[adminIndex].count + 1 };
    }
  }
  
  // 추가 서비스에 따른 인력
  if (params.services?.includes('수술')) {
    staffing.push({ role: '수술실 간호사', count: 1, salary: 380 });
    staffing.push({ role: '마취간호사', count: 1, salary: 400 });
  }
  
  if (params.services?.includes('입원')) {
    staffing.push({ role: '병동 간호사', count: 3, salary: 350 });
    staffing.push({ role: '야간 간호조무사', count: 2, salary: 260 });
  }
  
  if (params.services?.includes('검진')) {
    staffing.push({ role: '건강검진 코디네이터', count: 1, salary: 280 });
    staffing.push({ role: '임상병리사', count: 1, salary: 300 });
  }
  
  if (params.services?.includes('미용')) {
    staffing.push({ role: '피부관리사', count: 1, salary: 260 });
    staffing.push({ role: '상담사', count: 1, salary: 300 });
  }
  
  if (params.services?.includes('검사')) {
    staffing.push({ role: '방사선사', count: 1, salary: 310 });
  }
  
  // 월 인건비 계산
  const monthlyCost = staffing.reduce((total, staff) => {
    return total + (staff.count * staff.salary);
  }, 0);
  
  return {
    staffing,
    monthlyCost: monthlyCost.toLocaleString() + '만원',
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
      
      window.dispatchEvent(new CustomEvent('simulatorUpdate', { 
        detail: { action: 'viewIncrement', simulatorId } 
      }));
    } catch (error) {
      console.error('시뮬레이터 사용 기록 업데이트 중 오류:', error);
    }
  }
};
