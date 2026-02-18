
import React from 'react';
import { FinancialResult } from '../../../admin/simulator/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FinancialResultViewProps {
  result: FinancialResult;
}

const COLORS = ['hsl(210, 70%, 50%)', 'hsl(160, 60%, 45%)', 'hsl(40, 80%, 50%)', 'hsl(0, 60%, 55%)'];

const FinancialResultView: React.FC<FinancialResultViewProps> = ({ result }) => {
  const chartData = [
    { name: '인테리어', value: result.rawInterior, formatted: result.interiorCost },
    { name: '장비', value: result.rawEquipment, formatted: result.equipmentCost },
    { name: '인허가', value: result.rawLicense, formatted: result.licenseCost },
    { name: '기타', value: result.rawMisc, formatted: result.miscCost },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary font-bold">{data.formatted}</p>
          <p className="text-muted-foreground text-xs">
            {Math.round((data.value / result.rawTotal) * 100)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 bg-primary/5 p-5 rounded-lg">
      <h3 className="text-lg font-semibold text-foreground">예상 초기 개원 비용</h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-1/2 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value: string) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 space-y-2">
          {chartData.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-semibold text-sm">{item.formatted}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">총 예상 초기 비용</span>
          <span className="font-bold text-xl text-primary">{result.totalCost}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialResultView;
