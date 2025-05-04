
import React from 'react';
import FinancialInputForm from './components/inputs/FinancialInputForm';
import RevenueInputForm from './components/inputs/RevenueInputForm';
import StaffingInputForm from './components/inputs/StaffingInputForm';
import { SimulatorInputsProps } from './types/simulatorTypes';

const SimulatorInputs: React.FC<SimulatorInputsProps> = ({
  simulatorType,
  financialInputs,
  setFinancialInputs,
  revenueInputs,
  setRevenueInputs,
  staffingInputs,
  setStaffingInputs,
}) => {
  // 시뮬레이터 유형에 따라 적절한 입력폼 렌더링
  switch(simulatorType) {
    case 'financial':
      return <FinancialInputForm financialInputs={financialInputs} setFinancialInputs={setFinancialInputs} />;
    case 'revenue':
      return <RevenueInputForm revenueInputs={revenueInputs} setRevenueInputs={setRevenueInputs} />;
    case 'staffing':
      return <StaffingInputForm staffingInputs={staffingInputs} setStaffingInputs={setStaffingInputs} />;
    default:
      return null;
  }
};

export default SimulatorInputs;
