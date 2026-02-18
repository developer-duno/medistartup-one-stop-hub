
import React from 'react';
import { motion } from 'framer-motion';
import { FinancialResult } from '../../../admin/simulator/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FinancialResultViewProps {
  result: FinancialResult;
}

const COLORS = ['hsl(210, 70%, 50%)', 'hsl(160, 60%, 45%)', 'hsl(40, 80%, 50%)', 'hsl(0, 60%, 55%)'];

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.6 + i * 0.1, duration: 0.3 },
  }),
};

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
    <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
      <h3 className="text-sm font-semibold text-foreground">예상 초기 개원 비용</h3>
      
      <div className="flex gap-3 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          className="w-1/2 h-[160px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                paddingAngle={3} dataKey="value" strokeWidth={0} animationBegin={200} animationDuration={800}>
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        
        <div className="w-1/2 space-y-1.5">
          {chartData.map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={itemVariants}
              className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-semibold text-xs">{item.formatted}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }} className="pt-2 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium">총 예상 초기 비용</span>
          <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 200 }}
            className="font-bold text-lg text-primary">
            {result.totalCost}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialResultView;
