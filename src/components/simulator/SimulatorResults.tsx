
import React from 'react';
import { Check } from 'lucide-react';

interface SimulatorResultsProps {
  simulatorType: 'financial' | 'revenue' | 'staffing';
  result: any;
}

const SimulatorResults: React.FC<SimulatorResultsProps> = ({
  simulatorType,
  result
}) => {
  const renderFinancialResults = () => (
    <div className="space-y-4 bg-primary-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold">예상 초기 개원 비용</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm">인테리어 비용</p>
          <p className="font-semibold">{result.interiorCost}</p>
        </div>
        <div>
          <p className="text-sm">장비 비용</p>
          <p className="font-semibold">{result.equipmentCost}</p>
        </div>
        <div>
          <p className="text-sm">인허가 비용</p>
          <p className="font-semibold">{result.licenseCost}</p>
        </div>
        <div>
          <p className="text-sm">기타 비용</p>
          <p className="font-semibold">{result.miscCost}</p>
        </div>
        <div className="col-span-2 pt-2 border-t">
          <p className="text-sm">총 예상 초기 비용</p>
          <p className="font-bold text-xl text-primary">{result.totalCost}</p>
        </div>
      </div>
    </div>
  );
  
  const renderRevenueResults = () => (
    <div className="space-y-4 bg-primary-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold">예상 월 수익</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm">예상 월 매출</p>
          <p className="font-semibold">{result.revenue}</p>
        </div>
        <div>
          <p className="text-sm">예상 월 지출</p>
          <p className="font-semibold">{result.expenses}</p>
        </div>
        <div className="col-span-2 pt-2 border-t">
          <p className="text-sm">예상 월 순이익</p>
          <p className="font-bold text-xl text-primary">{result.profit}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mt-2">지역 평균 대비</p>
        <div className="h-2 w-full bg-neutral-200 rounded-full mt-1">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{width: `${result.regionComparison}%`}}
          ></div>
        </div>
        <p className="text-right text-xs text-muted-foreground mt-1">
          지역 평균 대비 {result.regionComparison}%
        </p>
      </div>
    </div>
  );
  
  const renderStaffingResults = () => (
    <div className="space-y-4 bg-primary-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold">추천 인력 구성</h3>
      <ul className="space-y-2">
        {result.staffing.map((staff: any, index: number) => (
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

  switch(simulatorType) {
    case 'financial':
      return renderFinancialResults();
    case 'revenue':
      return renderRevenueResults();
    case 'staffing':
      return renderStaffingResults();
    default:
      return null;
  }
};

export default SimulatorResults;
