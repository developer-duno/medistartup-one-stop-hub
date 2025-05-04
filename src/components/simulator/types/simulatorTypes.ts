
import { FinancialResult, RevenueResult, StaffingResult } from '../../admin/simulator/types';

// Input types
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

// Common result type for all simulators
export type SimulatorResult = FinancialResult | RevenueResult | StaffingResult;

// Simulator type identifier
export type SimulatorType = 'financial' | 'revenue' | 'staffing';

// Props interfaces
export interface SimulatorInputsProps {
  simulatorType: SimulatorType;
  financialInputs: FinancialInputs;
  setFinancialInputs: React.Dispatch<React.SetStateAction<FinancialInputs>>;
  revenueInputs: RevenueInputs;
  setRevenueInputs: React.Dispatch<React.SetStateAction<RevenueInputs>>;
  staffingInputs: StaffingInputs;
  setStaffingInputs: React.Dispatch<React.SetStateAction<StaffingInputs>>;
}

export interface SimulatorResultsProps {
  simulatorType: SimulatorType;
  result: SimulatorResult;
}

export interface SimulatorCardFooterProps {
  result: SimulatorResult | null;
  handleSimulate: () => void;
  setResult: React.Dispatch<React.SetStateAction<SimulatorResult | null>>;
}
