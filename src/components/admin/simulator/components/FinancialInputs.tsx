
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SimulatorTestParams } from '../types';

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
            <SelectItem value="내과">내과</SelectItem>
            <SelectItem value="소아과">소아과</SelectItem>
            <SelectItem value="외과">외과</SelectItem>
            <SelectItem value="산부인과">산부인과</SelectItem>
            <SelectItem value="피부과">피부과</SelectItem>
            <SelectItem value="치과">치과</SelectItem>
            <SelectItem value="정형외과">정형외과</SelectItem>
            <SelectItem value="안과">안과</SelectItem>
            <SelectItem value="한의원">한의원</SelectItem>
            <SelectItem value="종합병원">종합병원</SelectItem>
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
            <SelectItem value="중형상가">중형상가</SelectItem>
            <SelectItem value="대형상가">대형상가</SelectItem>
            <SelectItem value="주택가">주택가</SelectItem>
            <SelectItem value="오피스밀집지역">오피스밀집지역</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default FinancialInputs;
