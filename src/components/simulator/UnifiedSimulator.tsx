
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sparkles, Calculator, TrendingUp, Users, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { MEDICAL_SPECIALTIES, LOCATION_TYPES, STANDARDIZED_REGIONS, SERVICE_TYPES, FinancialResult, RevenueResult, StaffingResult } from '../admin/simulator/types';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing } from './SimulatorUtils';
import FinancialResultView from './components/results/FinancialResultView';
import RevenueResultView from './components/results/RevenueResultView';
import StaffingResultView from './components/results/StaffingResultView';
import MobileSummaryView from './components/results/MobileSummaryView';
import BreakEvenCard from './components/results/BreakEvenCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface UnifiedInputs {
  specialty: string;
  size: number[];
  location: string;
  patients: number[];
  region: string;
  services: string[];
}

interface UnifiedResults {
  financial: FinancialResult;
  revenue: RevenueResult;
  staffing: StaffingResult;
}

const UnifiedSimulator: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [inputs, setInputs] = useState<UnifiedInputs>({
    specialty: '내과',
    size: [50],
    location: '중형상가',
    patients: [30],
    region: '서울/경기',
    services: [],
  });

  const [results, setResults] = useState<UnifiedResults | null>(null);
  

  const handleSimulate = () => {
    const financial = simulateFinancialCosts({
      specialty: inputs.specialty,
      size: inputs.size[0],
      location: inputs.location,
      services: inputs.services,
    });
    const revenue = simulateRevenue({
      specialty: inputs.specialty,
      patients: inputs.patients[0],
      region: inputs.region,
      services: inputs.services,
    });
    const staffing = simulateStaffing({
      specialty: inputs.specialty,
      size: inputs.size[0],
      services: inputs.services,
    });

    setResults({ financial, revenue, staffing });

    toast({
      title: '시뮬레이션 완료',
      description: '개원비용, 수익성, 인력구성 분석이 완료되었습니다.',
    });
  };

  const handleReset = () => {
    setResults(null);
    const section = document.getElementById('simulators');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mobile compact inputs
  const renderMobileInputs = () => (
    <div className="space-y-3">
      {/* Row 1: 진료과목 + 위치 */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1 text-muted-foreground">진료과목</label>
          <select
            className="w-full p-1.5 text-sm border rounded-md bg-background"
            value={inputs.specialty}
            onChange={(e) => setInputs({ ...inputs, specialty: e.target.value })}
          >
            {MEDICAL_SPECIALTIES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1 text-muted-foreground">위치 유형</label>
          <select
            className="w-full p-1.5 text-sm border rounded-md bg-background"
            value={inputs.location}
            onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
          >
            {LOCATION_TYPES.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: 규모 + 지역 */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1 text-muted-foreground">규모</label>
          <div className="flex items-center gap-2">
            <Slider
              value={inputs.size}
              min={30} max={300} step={10}
              onValueChange={(value) => setInputs({ ...inputs, size: value })}
              className="flex-grow"
            />
            <span className="text-xs font-medium w-10 text-right shrink-0">{inputs.size}평</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1 text-muted-foreground">지역</label>
          <select
            className="w-full p-1.5 text-sm border rounded-md bg-background"
            value={inputs.region}
            onChange={(e) => setInputs({ ...inputs, region: e.target.value })}
          >
            {STANDARDIZED_REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: 환자수 */}
      <div>
        <label className="block text-xs font-medium mb-1 text-muted-foreground">일평균 환자수</label>
        <div className="flex items-center gap-2">
          <Slider
            value={inputs.patients}
            min={10} max={100} step={5}
            onValueChange={(value) => setInputs({ ...inputs, patients: value })}
            className="flex-grow"
          />
          <span className="text-xs font-medium w-10 text-right shrink-0">{inputs.patients}명</span>
        </div>
      </div>

      {/* 추가 서비스 - 항상 표시 */}
      <div>
        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">추가 서비스</label>
        <div className="flex flex-wrap gap-1.5">
          {SERVICE_TYPES.map((service) => {
            const selected = inputs.services.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => {
                  if (selected) {
                    setInputs({ ...inputs, services: inputs.services.filter(s => s !== service) });
                  } else {
                    setInputs({ ...inputs, services: [...inputs.services, service] });
                  }
                }}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  selected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Desktop inputs - compact
  const renderDesktopInputs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-3">
        <h4 className="font-semibold text-xs text-muted-foreground flex items-center gap-1.5">
          <Calculator className="h-3.5 w-3.5" /> 기본 설정
        </h4>
        <div>
          <label className="block text-xs font-medium mb-1">진료과목</label>
          <select className="w-full p-1.5 text-sm border rounded-md bg-background" value={inputs.specialty}
            onChange={(e) => setInputs({ ...inputs, specialty: e.target.value })}>
            {MEDICAL_SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">규모 (평수)</label>
          <div className="flex items-center gap-2">
            <Slider value={inputs.size} min={30} max={300} step={10}
              onValueChange={(value) => setInputs({ ...inputs, size: value })} className="flex-grow" />
            <span className="text-xs font-medium w-12 text-right">{inputs.size}평</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">위치 유형</label>
          <select className="w-full p-1.5 text-sm border rounded-md bg-background" value={inputs.location}
            onChange={(e) => setInputs({ ...inputs, location: e.target.value })}>
            {LOCATION_TYPES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-xs text-muted-foreground flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5" /> 수익성 설정
        </h4>
        <div>
          <label className="block text-xs font-medium mb-1">일평균 환자수</label>
          <div className="flex items-center gap-2">
            <Slider value={inputs.patients} min={10} max={100} step={5}
              onValueChange={(value) => setInputs({ ...inputs, patients: value })} className="flex-grow" />
            <span className="text-xs font-medium w-12 text-right">{inputs.patients}명</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">지역</label>
          <select className="w-full p-1.5 text-sm border rounded-md bg-background" value={inputs.region}
            onChange={(e) => setInputs({ ...inputs, region: e.target.value })}>
            {STANDARDIZED_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-xs text-muted-foreground flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" /> 추가 서비스
        </h4>
        <div>
          <label className="block text-xs font-medium mb-1">제공 서비스</label>
          <div className="flex flex-wrap gap-1.5">
            {SERVICE_TYPES.map((service) => {
              const selected = inputs.services.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => {
                    if (selected) {
                      setInputs({ ...inputs, services: inputs.services.filter(s => s !== service) });
                    } else {
                      setInputs({ ...inputs, services: [...inputs.services, service] });
                    }
                  }}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full border-primary/20 shadow-lg">
      <CardHeader className={isMobile ? 'pb-2 px-4' : 'pb-4'}>
        <div className="flex gap-3 items-center">
          <div className={`bg-primary/10 rounded-full ${isMobile ? 'p-2' : 'p-3'}`}>
            <Calculator className={isMobile ? 'h-5 w-5 text-primary' : 'h-6 w-6 text-primary'} />
          </div>
          <div>
            <CardTitle className={isMobile ? 'text-base' : 'text-xl'}>병원 창업 종합 시뮬레이터</CardTitle>
            {!isMobile && (
              <CardDescription>
                진료과목과 조건을 설정하면 개원비용, 예상수익, 필요인력을 한번에 분석합니다.
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={isMobile ? 'space-y-3 px-4' : 'space-y-4'}>
        {isMobile ? renderMobileInputs() : renderDesktopInputs()}

        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`pt-4 border-t border-border ${isMobile ? 'space-y-3' : 'space-y-4'}`}
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className={`font-bold text-center text-foreground ${isMobile ? 'text-sm' : 'text-base'}`}
              >
                📊 종합 시뮬레이션 결과
              </motion.h3>

              {isMobile ? (
                <MobileSummaryView
                  financial={results.financial}
                  revenue={results.revenue}
                  staffing={results.staffing}
                />
              ) : (
                <>
                  <BreakEvenCard financial={results.financial} revenue={results.revenue} />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}>
                      <FinancialResultView result={results.financial} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.4, ease: 'easeOut' }}>
                      <RevenueResultView result={results.revenue} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}>
                      <StaffingResultView result={results.staffing} />
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className={`flex justify-between border-t ${isMobile ? 'pt-3 px-4' : 'pt-4'}`}>
        {!results ? (
          <Button onClick={handleSimulate} className="w-full" size={isMobile ? 'default' : 'lg'}>
            <Sparkles className="h-4 w-4 mr-2" />
            {isMobile ? '시뮬레이션 실행' : '종합 시뮬레이션 실행'}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleReset} className="w-full" size={isMobile ? 'default' : 'lg'}>
            <RotateCcw className="h-4 w-4 mr-2" />
            {isMobile ? '다시 실행' : '조건 변경 후 다시 실행'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UnifiedSimulator;
