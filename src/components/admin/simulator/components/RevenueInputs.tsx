
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimulatorTestParams, MEDICAL_SPECIALTIES, STANDARDIZED_REGIONS } from '../types';

interface RevenueInputsProps {
  params: SimulatorTestParams;
  onParamChange: (key: string, value: any) => void;
}

const RevenueInputs: React.FC<RevenueInputsProps> = ({ params, onParamChange }) => {
  // Filter to specialties commonly used for revenue simulation
  const revenueSpecialties = MEDICAL_SPECIALTIES.filter(specialty => 
    ['내과', '피부과', '정형외과', '안과', '치과', '한의원'].includes(specialty));

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="specialty">진료과목</Label>
        <Select value={params.specialty} onValueChange={(v) => onParamChange('specialty', v)}>
          <SelectTrigger id="specialty">
            <SelectValue placeholder="진료과목 선택" />
          </SelectTrigger>
          <SelectContent>
            {revenueSpecialties.map(specialty => (
              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="patients">일일 예상 환자 수</Label>
        <Input 
          id="patients" 
          type="number" 
          value={params.patients}
          onChange={(e) => onParamChange('patients', parseInt(e.target.value))}
        />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="region">지역</Label>
        <Select value={params.region} onValueChange={(v) => onParamChange('region', v)}>
          <SelectTrigger id="region">
            <SelectValue placeholder="지역 선택" />
          </SelectTrigger>
          <SelectContent>
            {STANDARDIZED_REGIONS.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default RevenueInputs;
