import React from 'react';
import { Slider } from '@/components/ui/slider';
import { MEDICAL_SPECIALTIES, STANDARDIZED_REGIONS } from '../../../admin/simulator/types';
import { RevenueInputs } from '../../types/simulatorTypes';

interface RevenueInputFormProps {
  revenueInputs: RevenueInputs;
  setRevenueInputs: React.Dispatch<React.SetStateAction<RevenueInputs>>;
}

const RevenueInputForm: React.FC<RevenueInputFormProps> = ({ 
  revenueInputs, 
  setRevenueInputs 
}) => {
  const specialties = MEDICAL_SPECIALTIES.filter(specialty => 
    ['내과', '피부과', '정형외과', '안과', '치과', '한의원'].includes(specialty));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">진료과목</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={revenueInputs.specialty}
          onChange={(e) => setRevenueInputs({...revenueInputs, specialty: e.target.value})}
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">일평균 환자수</label>
        <div className="flex items-center gap-3">
          <Slider
            value={revenueInputs.patients}
            min={10}
            max={100}
            step={5}
            onValueChange={(value) => setRevenueInputs({...revenueInputs, patients: value})}
            className="flex-grow"
          />
          <span className="text-sm font-medium w-12 text-right">
            {revenueInputs.patients}명
          </span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">지역</label>
        <select
          className="w-full p-2 border rounded-md"
          value={revenueInputs.region}
          onChange={(e) => setRevenueInputs({...revenueInputs, region: e.target.value})}
        >
          {STANDARDIZED_REGIONS.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RevenueInputForm;
