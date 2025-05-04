
import React from 'react';
import { FinancialResult } from '../../../admin/simulator/types';

interface FinancialResultViewProps {
  result: FinancialResult;
}

const FinancialResultView: React.FC<FinancialResultViewProps> = ({ result }) => {
  return (
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
};

export default FinancialResultView;
