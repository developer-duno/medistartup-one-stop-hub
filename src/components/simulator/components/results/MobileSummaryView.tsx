
import React from 'react';
import { motion } from 'framer-motion';
import { FinancialResult, RevenueResult, StaffingResult } from '../../../admin/simulator/types';
import { TrendingUp, Wallet, Users, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MobileSummaryViewProps {
  financial: FinancialResult;
  revenue: RevenueResult;
  staffing: StaffingResult;
}

const MobileSummaryView: React.FC<MobileSummaryViewProps> = ({ financial, revenue, staffing }) => {
  // 손익분기점 계산: 총 초기비용(백만원→만원) / 월 순이익(만원) = 개월수
  const totalInvestment = financial.rawTotal * 100; // 백만원 → 만원
  const monthlyProfit = revenue.rawProfit;
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(totalInvestment / monthlyProfit) : 0;
  const breakEvenYears = Math.floor(breakEvenMonths / 12);
  const breakEvenRemainMonths = breakEvenMonths % 12;
  const breakEvenText = breakEvenYears > 0
    ? `${breakEvenYears}년 ${breakEvenRemainMonths > 0 ? `${breakEvenRemainMonths}개월` : ''}`
    : `${breakEvenMonths}개월`;

  // 월 비용 구조 (인건비 + 기타운영비)
  const staffCostNum = staffing.staffing.reduce((sum, s) => sum + s.count * s.salary, 0);
  const totalStaff = staffing.staffing.reduce((sum, s) => sum + s.count, 0);

  // 수익률 계산
  const profitMargin = revenue.rawRevenue > 0 ? Math.round((revenue.rawProfit / revenue.rawRevenue) * 100) : 0;

  // 손익분기 진행률 (최대 60개월 기준)
  const breakEvenProgress = Math.min(Math.round((1 - breakEvenMonths / 60) * 100), 100);

  const cards = [
    {
      icon: <Wallet className="h-4 w-4" />,
      label: '초기 투자비용',
      value: financial.totalCost,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: '월 순이익',
      value: revenue.profit,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      sub: `수익률 ${profitMargin}%`,
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: '필요 인력',
      value: `${totalStaff}명`,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      sub: `인건비 ${staffCostNum.toLocaleString()}만원/월`,
    },
  ];

  return (
    <div className="space-y-4">
      {/* 핵심 지표 카드 그리드 */}
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            className="bg-card border border-border rounded-xl p-3 text-center"
          >
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${card.bgColor} ${card.color} mb-2`}>
              {card.icon}
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">{card.label}</p>
            <p className={`font-bold text-sm mt-1 ${card.color}`}>{card.value}</p>
            {card.sub && (
              <p className="text-[10px] text-muted-foreground mt-0.5">{card.sub}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* 손익분기점 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-primary/15 p-1.5 rounded-full">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm text-foreground">손익분기점</span>
        </div>

        <div className="flex items-end justify-between mb-2">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4, type: 'spring', stiffness: 200 }}
            className="font-bold text-2xl text-primary"
          >
            {breakEvenText}
          </motion.span>
          <span className="text-xs text-muted-foreground">
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

        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>투자: {financial.totalCost}</span>
          <span>월 회수: {revenue.profit}</span>
        </div>
      </motion.div>

      {/* 수익 구조 바 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="bg-card border border-border rounded-xl p-4"
      >
        <p className="text-xs font-semibold text-foreground mb-3">월 수익 구조</p>
        <div className="flex h-6 rounded-full overflow-hidden bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${profitMargin}%` }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-primary flex items-center justify-center"
          >
            <span className="text-[9px] text-primary-foreground font-bold">순이익</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${100 - profitMargin}%` }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="bg-destructive/70 flex items-center justify-center"
          >
            <span className="text-[9px] text-destructive-foreground font-bold">비용</span>
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>매출 {revenue.revenue}</span>
          <span>비용 {revenue.expenses}</span>
        </div>
      </motion.div>

      {/* 인력 구성 컴팩트 리스트 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="bg-card border border-border rounded-xl p-4"
      >
        <p className="text-xs font-semibold text-foreground mb-2">인력 구성</p>
        <div className="flex flex-wrap gap-1.5">
          {staffing.staffing.map((staff, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + i * 0.05, duration: 0.2 }}
              className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-[11px] rounded-full px-2.5 py-1"
            >
              {staff.role}
              <span className="font-semibold text-foreground">{staff.count}</span>
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileSummaryView;
