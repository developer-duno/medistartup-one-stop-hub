
import React from 'react';
import { motion } from 'framer-motion';
import { RevenueResult } from '../../../admin/simulator/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RevenueResultViewProps {
  result: RevenueResult;
}

const RevenueResultView: React.FC<RevenueResultViewProps> = ({ result }) => {
  const chartData = [
    { name: '월 매출', value: result.rawRevenue, formatted: result.revenue, color: 'hsl(210, 70%, 50%)' },
    { name: '월 지출', value: result.rawExpenses, formatted: result.expenses, color: 'hsl(0, 60%, 55%)' },
    { name: '순이익', value: result.rawProfit, formatted: result.profit, color: 'hsl(160, 60%, 45%)' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="font-bold" style={{ color: data.color }}>{data.formatted}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 bg-primary/5 p-5 rounded-lg">
      <h3 className="text-lg font-semibold text-foreground">예상 월 수익 분석</h3>
      
      <motion.div
        initial={{ opacity: 0, scaleY: 0.3 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'bottom' }}
        className="h-[200px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={48}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v.toLocaleString()}`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(0,0%,90%,0.3)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} animationBegin={300} animationDuration={800}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 text-center">
        {chartData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
            className="bg-background/60 rounded-lg p-3"
          >
            <p className="text-xs text-muted-foreground">{item.name}</p>
            <p className="font-bold text-sm mt-1" style={{ color: item.color }}>{item.formatted}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="pt-3 border-t border-border"
      >
        <p className="text-sm font-medium mb-2">지역 평균 대비</p>
        <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(result.regionComparison, 150) / 1.5}%` }}
            transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, hsl(210, 70%, 50%), hsl(160, 60%, 45%))',
            }}
          />
        </div>
        <p className="text-right text-xs text-muted-foreground mt-1">
          지역 평균 대비 <span className="font-semibold text-foreground">{result.regionComparison}%</span>
        </p>
      </motion.div>
    </div>
  );
};

export default RevenueResultView;
