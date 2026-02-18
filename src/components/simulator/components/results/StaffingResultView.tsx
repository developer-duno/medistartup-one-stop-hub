
import React from 'react';
import { StaffingResult, StaffMember } from '../../../admin/simulator/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StaffingResultViewProps {
  result: StaffingResult;
}

const COLORS = [
  'hsl(210, 70%, 50%)', 'hsl(160, 60%, 45%)', 'hsl(40, 80%, 50%)',
  'hsl(0, 60%, 55%)', 'hsl(280, 50%, 55%)', 'hsl(30, 70%, 50%)',
  'hsl(190, 60%, 45%)', 'hsl(340, 60%, 50%)', 'hsl(100, 50%, 45%)',
];

const StaffingResultView: React.FC<StaffingResultViewProps> = ({ result }) => {
  const chartData = result.staffing.map((staff: StaffMember) => ({
    name: staff.role,
    cost: staff.count * staff.salary,
    count: staff.count,
    salary: staff.salary,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-muted-foreground">{data.count}명 × {data.salary}만원</p>
          <p className="text-primary font-bold">{data.cost.toLocaleString()}만원/월</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 bg-primary/5 p-5 rounded-lg">
      <h3 className="text-lg font-semibold text-foreground">추천 인력 구성</h3>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={32} layout="vertical">
            <XAxis
              type="number"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}만`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(0,0%,90%,0.3)' }} />
            <Bar dataKey="cost" radius={[0, 6, 6, 0]}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {result.staffing.map((staff: StaffMember, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm py-1">
            <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-muted-foreground">{staff.role}</span>
            <span className="ml-auto font-medium">{staff.count}명</span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">예상 월 인건비</span>
          <span className="font-bold text-xl text-primary">{result.monthlyCost}</span>
        </div>
      </div>
    </div>
  );
};

export default StaffingResultView;
