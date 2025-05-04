
import React from 'react';
import { SimulatorResultsProps } from './types/simulatorTypes';
import { FinancialResult, RevenueResult, StaffingResult } from '../admin/simulator/types';
import FinancialResultView from './components/results/FinancialResultView';
import RevenueResultView from './components/results/RevenueResultView';
import StaffingResultView from './components/results/StaffingResultView';

const SimulatorResults: React.FC<SimulatorResultsProps> = ({
  simulatorType,
  result
}) => {
  switch(simulatorType) {
    case 'financial':
      return <FinancialResultView result={result as FinancialResult} />;
    case 'revenue':
      return <RevenueResultView result={result as RevenueResult} />;
    case 'staffing':
      return <StaffingResultView result={result as StaffingResult} />;
    default:
      return null;
  }
};

export default SimulatorResults;
