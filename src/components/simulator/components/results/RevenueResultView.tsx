
import React from 'react';
import { RevenueResult } from '../../../admin/simulator/types';

interface RevenueResultViewProps {
  result: RevenueResult;
}

const RevenueResultView: React.FC<RevenueResultViewProps> = ({ result }) => {
  return (
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
};

export default RevenueResultView;
