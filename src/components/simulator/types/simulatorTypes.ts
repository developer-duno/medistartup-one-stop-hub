
import { FinancialResult, RevenueResult, StaffingResult } from '../../admin/simulator/types';

export interface FinancialInputs {
  specialty: string;
  size: number[];
  location: string;
}

export interface RevenueInputs {
  specialty: string;
  patients: number[];
  region: string;
}

export interface StaffingInputs {
  specialty: string;
  size: number[];
  services: string[];
}

export interface SimulatorInputsProps {
  simulatorType: 'financial' | 'revenue' | 'staffing';
  financialInputs: FinancialInputs;
  setFinancialInputs: React.Dispatch<React.SetStateAction<FinancialInputs>>;
  revenueInputs: RevenueInputs;
  setRevenueInputs: React.Dispatch<React.SetStateAction<RevenueInputs>>;
  staffingInputs: StaffingInputs;
  setStaffingInputs: React.Dispatch<React.SetStateAction<StaffingInputs>>;
}

export interface SimulatorResultsProps {
  simulatorType: 'financial' | 'revenue' | 'staffing';
  result: FinancialResult | RevenueResult | StaffingResult;
}
