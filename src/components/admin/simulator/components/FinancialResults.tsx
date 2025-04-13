
import React from 'react';

interface FinancialResultsProps {
  result: {
    interiorCost: string;
    equipmentCost: string;
    licenseCost: string;
    miscCost: string;
    totalCost: string;
  };
}

const FinancialResults: React.FC<FinancialResultsProps> = ({ result }) => {
  return (
    <div className="grid gap-4">
      <h3 className="font-bold text-xl">시뮬레이션 결과</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-500">내부 인테리어 비용</p>
          <p className="text-xl font-bold">{result.interiorCost}</p>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-500">의료장비 비용</p>
          <p className="text-xl font-bold">{result.equipmentCost}</p>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-500">인허가 비용</p>
          <p className="text-xl font-bold">{result.licenseCost}</p>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-500">기타 비용</p>
          <p className="text-xl font-bold">{result.miscCost}</p>
        </div>
      </div>
      <div className="p-4 bg-primary/10 rounded-lg mt-2">
        <p className="text-sm text-gray-500">총 예상 비용</p>
        <p className="text-2xl font-bold">{result.totalCost}</p>
      </div>
    </div>
  );
};

export default FinancialResults;
