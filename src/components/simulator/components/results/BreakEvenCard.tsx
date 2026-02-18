
import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { FinancialResult, RevenueResult } from '../../../admin/simulator/types';

interface BreakEvenCardProps {
  financial: FinancialResult;
  revenue: RevenueResult;
  compact?: boolean;
}

const BreakEvenCard: React.FC<BreakEvenCardProps> = ({ financial, revenue, compact = false }) => {
  const totalInvestment = financial.rawTotal * 100;
  const monthlyProfit = revenue.rawProfit;
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(totalInvestment / monthlyProfit) : 0;
  const breakEvenYears = Math.floor(breakEvenMonths / 12);
  const breakEvenRemainMonths = breakEvenMonths % 12;
  const breakEvenText = breakEvenYears > 0
    ? `${breakEvenYears}년 ${breakEvenRemainMonths > 0 ? `${breakEvenRemainMonths}개월` : ''}`
    : `${breakEvenMonths}개월`;
  const breakEvenProgress = Math.min(Math.round((1 - breakEvenMonths / 60) * 100), 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className={`flex items-center gap-2 ${compact ? 'mb-2' : 'mb-3'}`}>
        <div className="bg-primary/15 p-1.5 rounded-full">
          <Target className={`text-primary ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
        </div>
        <span className={`font-semibold text-foreground ${compact ? 'text-xs' : 'text-sm'}`}>손익분기점</span>
      </div>

      <div className="flex items-end justify-between mb-2">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4, type: 'spring', stiffness: 200 }}
          className={`font-bold text-primary ${compact ? 'text-xl' : 'text-2xl'}`}
        >
          {breakEvenText}
        </motion.span>
        <span className={`text-muted-foreground ${compact ? 'text-[10px]' : 'text-xs'}`}>
          {monthlyProfit > 0 ? '투자금 회수까지' : '수익 발생 필요'}
        </span>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ transformOrigin: 'left' }}
      >
        <Progress value={breakEvenProgress} className="h-2" />
      </motion.div>

      <div className={`flex justify-between mt-1.5 text-muted-foreground ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
        <span>투자: {financial.totalCost}</span>
        <span>월 회수: {revenue.profit}</span>
      </div>
    </motion.div>
  );
};

export default BreakEvenCard;
