
import { useState } from 'react';
import { FinancialInputs, RevenueInputs, StaffingInputs } from '../types/simulatorTypes';

export const useSimulatorInputs = () => {
  // Financial simulator inputs
  const [financialInputs, setFinancialInputs] = useState<FinancialInputs>({
    specialty: '내과',
    size: [50],
    location: '중형상가',
  });
  
  // Revenue simulator inputs
  const [revenueInputs, setRevenueInputs] = useState<RevenueInputs>({
    specialty: '피부과',
    patients: [30],
    region: '서울/경기',
  });
  
  // Staffing simulator inputs
  const [staffingInputs, setStaffingInputs] = useState<StaffingInputs>({
    specialty: '치과',
    size: [100],
    services: ['일반진료', '미용'],
  });

  return {
    financialInputs,
    setFinancialInputs,
    revenueInputs,
    setRevenueInputs,
    staffingInputs,
    setStaffingInputs,
  };
};
