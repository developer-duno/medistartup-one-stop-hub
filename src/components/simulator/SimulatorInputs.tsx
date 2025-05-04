
import React from 'react';
import FinancialInputForm from './components/inputs/FinancialInputForm';
import RevenueInputForm from './components/inputs/RevenueInputForm';
import StaffingInputForm from './components/inputs/StaffingInputForm';

interface SimulatorInputsProps {
  simulatorType: 'financial' | 'revenue' | 'staffing';
  financialInputs: {
    specialty: string;
    size: number[];
    location: string;
  };
  setFinancialInputs: React.Dispatch<React.SetStateAction<{
    specialty: string;
    size: number[];
    location: string;
  }>>;
  revenueInputs: {
    specialty: string;
    patients: number[];
    region: string;
  };
  setRevenueInputs: React.Dispatch<React.SetStateAction<{
    specialty: string;
    patients: number[];
    region: string;
  }>>;
  staffingInputs: {
    specialty: string;
    size: number[];
    services: string[];
  };
  setStaffingInputs: React.Dispatch<React.SetStateAction<{
    specialty: string;
    size: number[];
    services: string[];
  }>>;
}

const SimulatorInputs: React.FC<SimulatorInputsProps> = ({
  simulatorType,
  financialInputs,
  setFinancialInputs,
  revenueInputs,
  setRevenueInputs,
  staffingInputs,
  setStaffingInputs,
}) => {
  switch(simulatorType) {
    case 'financial':
      return (
        <FinancialInputForm 
          financialInputs={financialInputs} 
          setFinancialInputs={setFinancialInputs} 
        />
      );
    case 'revenue':
      return (
        <RevenueInputForm 
          revenueInputs={revenueInputs} 
          setRevenueInputs={setRevenueInputs} 
        />
      );
    case 'staffing':
      return (
        <StaffingInputForm 
          staffingInputs={staffingInputs} 
          setStaffingInputs={setStaffingInputs} 
        />
      );
    default:
      return null;
  }
};

export default SimulatorInputs;
