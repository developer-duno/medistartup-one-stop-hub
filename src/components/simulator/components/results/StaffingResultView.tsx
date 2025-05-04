
import React from 'react';
import { Check } from 'lucide-react';
import { StaffingResult, StaffMember } from '../../../admin/simulator/types';

interface StaffingResultViewProps {
  result: StaffingResult;
}

const StaffingResultView: React.FC<StaffingResultViewProps> = ({ result }) => {
  return (
    <div className="space-y-4 bg-primary-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold">추천 인력 구성</h3>
      <ul className="space-y-2">
        {result.staffing.map((staff: StaffMember, index: number) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">{staff.role}</p>
              <p className="text-sm text-muted-foreground">{staff.count}명 권장</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-2 border-t">
        <p className="text-sm">예상 월 인건비</p>
        <p className="font-bold text-xl text-primary">{result.monthlyCost}</p>
      </div>
    </div>
  );
};

export default StaffingResultView;
