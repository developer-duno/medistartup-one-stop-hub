
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimulatorTestParams } from '../types';

interface RevenueInputsProps {
  params: SimulatorTestParams;
  onParamChange: (key: string, value: any) => void;
}

const RevenueInputs: React.FC<RevenueInputsProps> = ({ params, onParamChange }) => {
  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="specialty">진료과목</Label>
        <Select value={params.specialty} onValueChange={(v) => onParamChange('specialty', v)}>
          <SelectTrigger id="specialty">
            <SelectValue placeholder="진료과목 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="내과">내과</SelectItem>
            <SelectItem value="피부과">피부과</SelectItem>
            <SelectItem value="정형외과">정형외과</SelectItem>
            <SelectItem value="안과">안과</SelectItem>
            <SelectItem value="치과">치과</SelectItem>
            <SelectItem value="한의원">한의원</SelectItem>
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
            <SelectItem value="서울/경기">서울/경기</SelectItem>
            <SelectItem value="부산/경남">부산/경남</SelectItem>
            <SelectItem value="대전/충남">대전/충남</SelectItem>
            <SelectItem value="대구/경북">대구/경북</SelectItem>
            <SelectItem value="광주/전라">광주/전라</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default RevenueInputs;
