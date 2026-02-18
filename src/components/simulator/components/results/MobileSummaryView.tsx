
import React from 'react';
import { motion } from 'framer-motion';
import { FinancialResult, RevenueResult, StaffingResult } from '../../../admin/simulator/types';
import { TrendingUp, Wallet, Users } from 'lucide-react';
import BreakEvenCard from './BreakEvenCard';

interface MobileSummaryViewProps {
  financial: FinancialResult;
  revenue: RevenueResult;
  staffing: StaffingResult;
}

const MobileSummaryView: React.FC<MobileSummaryViewProps> = ({ financial, revenue, staffing }) => {
  const staffCostNum = staffing.staffing.reduce((sum, s) => sum + s.count * s.salary, 0);
  const totalStaff = staffing.staffing.reduce((sum, s) => sum + s.count, 0);
  const profitMargin = revenue.rawRevenue > 0 ? Math.round((revenue.rawProfit / revenue.rawRevenue) * 100) : 0;

  return (
    <div className="space-y-2.5">
      {/* 핵심 지표 3칸 */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: <Wallet className="h-3.5 w-3.5" />, label: '초기투자', value: financial.totalCost, color: 'text-primary' },
          { icon: <TrendingUp className="h-3.5 w-3.5" />, label: '월 순이익', value: revenue.profit, color: 'text-primary', sub: `${profitMargin}%` },
          { icon: <Users className="h-3.5 w-3.5" />, label: '인력/인건비', value: `${totalStaff}명`, color: 'text-primary', sub: `${staffCostNum.toLocaleString()}만` },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.3 }}
            className="bg-card border border-border rounded-lg p-2 text-center"
          >
            <p className="text-[9px] text-muted-foreground">{card.label}</p>
            <p className={`font-bold text-xs mt-0.5 ${card.color}`}>{card.value}</p>
            {card.sub && <p className="text-[9px] text-muted-foreground">{card.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* 손익분기점 */}
      <BreakEvenCard financial={financial} revenue={revenue} compact />

      {/* 수익 구조 + 인력 구성 한 줄 */}
      <div className="grid grid-cols-2 gap-1.5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="bg-card border border-border rounded-lg p-2.5"
        >
          <p className="text-[9px] font-semibold text-foreground mb-1.5">수익 구조</p>
          <div className="flex h-4 rounded-full overflow-hidden bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profitMargin}%` }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-primary"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${100 - profitMargin}%` }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-destructive/60"
            />
          </div>
          <div className="flex justify-between mt-1 text-[8px] text-muted-foreground">
            <span>이익 {profitMargin}%</span>
            <span>비용 {100 - profitMargin}%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.3 }}
          className="bg-card border border-border rounded-lg p-2.5"
        >
          <p className="text-[9px] font-semibold text-foreground mb-1.5">인력 구성</p>
          <div className="flex flex-wrap gap-1">
            {staffing.staffing.map((staff, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-0.5 bg-muted text-[9px] rounded-full px-1.5 py-0.5 text-muted-foreground"
              >
                {staff.role}<span className="font-semibold text-foreground">{staff.count}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileSummaryView;
