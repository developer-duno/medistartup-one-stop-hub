
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimulatorTestParams, MEDICAL_SPECIALTIES, SERVICE_TYPES } from '../types';

interface StaffingInputsProps {
  params: SimulatorTestParams;
  onParamChange: (key: string, value: any) => void;
  onServiceToggle: (service: string) => void;
}

const StaffingInputs: React.FC<StaffingInputsProps> = ({ params, onParamChange, onServiceToggle }) => {
  // Filter to specialties commonly used for staffing simulation
  const staffingSpecialties = MEDICAL_SPECIALTIES.filter(specialty => 
    ['내과', '치과', '한의원', '종합병원'].includes(specialty));
    
  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="specialty">진료과목</Label>
        <Select value={params.specialty} onValueChange={(v) => onParamChange('specialty', v)}>
          <SelectTrigger id="specialty">
            <SelectValue placeholder="진료과목 선택" />
          </SelectTrigger>
          <SelectContent>
            {staffingSpecialties.map(specialty => (
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
        <Label>제공 서비스</Label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_TYPES.map(service => (
            <Button 
              key={service}
              variant={params.services?.includes(service) ? "default" : "outline"}
              size="sm"
              onClick={() => onServiceToggle(service)}
            >
              {service}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default StaffingInputs;
