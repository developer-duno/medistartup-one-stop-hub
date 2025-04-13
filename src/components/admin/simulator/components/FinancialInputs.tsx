
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimulatorTestParams, MEDICAL_SPECIALTIES, LOCATION_TYPES } from '../types';

interface FinancialInputsProps {
  params: SimulatorTestParams;
  onParamChange: (key: string, value: any) => void;
}

const FinancialInputs: React.FC<FinancialInputsProps> = ({ params, onParamChange }) => {
  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="specialty">진료과목</Label>
        <Select value={params.specialty} onValueChange={(v) => onParamChange('specialty', v)}>
          <SelectTrigger id="specialty">
            <SelectValue placeholder="진료과목 선택" />
          </SelectTrigger>
          <SelectContent>
            {MEDICAL_SPECIALTIES.map(specialty => (
              <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="size">규모 (평)</Label>
        <Input 
          id="size" 
          type="number"
          value={params.size}
          onChange={(e) => onParamChange('size', parseInt(e.target.value))}
        />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="location">위치 유형</Label>
        <Select value={params.location} onValueChange={(v) => onParamChange('location', v)}>
          <SelectTrigger id="location">
            <SelectValue placeholder="위치 유형 선택" />
          </SelectTrigger>
          <SelectContent>
            {LOCATION_TYPES.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default FinancialInputs;
