
import React from 'react';
import { RevenueResult } from '../types';

interface RevenueResultsProps {
  result: RevenueResult;
}

const RevenueResults: React.FC<RevenueResultsProps> = ({ result }) => {
  return (
    <div className="grid gap-4">
      <h3 className="font-bold text-xl">시뮬레이션 결과</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-500">월 예상 수익</p>
          <p className="text-xl font-bold">{result.revenue}</p>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-500">월 예상 지출</p>
          <p className="text-xl font-bold">{result.expenses}</p>
        </div>
      </div>
      <div className="p-4 bg-primary/10 rounded-lg mt-2">
        <p className="text-sm text-gray-500">월 예상 순이익</p>
        <p className="text-2xl font-bold">{result.profit}</p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">지역 평균 대비</p>
        <div className="h-2 bg-gray-200 rounded-full mt-2">
          <div 
            className="h-2 bg-primary rounded-full" 
            style={{ width: `${result.regionComparison}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
          <span>150%</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueResults;
