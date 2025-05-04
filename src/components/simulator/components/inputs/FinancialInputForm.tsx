
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { MEDICAL_SPECIALTIES, LOCATION_TYPES } from '../../../admin/simulator/types';

interface FinancialInputFormProps {
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
}

const FinancialInputForm: React.FC<FinancialInputFormProps> = ({ 
  financialInputs, 
  setFinancialInputs 
}) => {
  const specialties = MEDICAL_SPECIALTIES;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">진료과목</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={financialInputs.specialty}
          onChange={(e) => setFinancialInputs({...financialInputs, specialty: e.target.value})}
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">규모 (평수)</label>
        <div className="flex items-center gap-3">
          <Slider
            value={financialInputs.size}
            min={30}
            max={200}
            step={10}
            onValueChange={(value) => setFinancialInputs({...financialInputs, size: value})}
            className="flex-grow"
          />
          <span className="text-sm font-medium w-12 text-right">
            {financialInputs.size}평
          </span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">위치</label>
        <select
          className="w-full p-2 border rounded-md"
          value={financialInputs.location}
          onChange={(e) => setFinancialInputs({...financialInputs, location: e.target.value})}
        >
          {LOCATION_TYPES.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FinancialInputForm;
