
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
    });
    const revenue = simulateRevenue({
      specialty: inputs.specialty,
      patients: inputs.patients[0],
      region: inputs.region,
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
  };

  return (
    <Card className="w-full border-primary/20 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex gap-3 items-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">병원 창업 종합 시뮬레이터</CardTitle>
            <CardDescription>
              진료과목과 조건을 설정하면 개원비용, 예상수익, 필요인력을 한번에 분석합니다.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Inputs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 기본 설정 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <Calculator className="h-4 w-4" /> 기본 설정
            </h4>
            <div>
              <label className="block text-sm font-medium mb-1">진료과목</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={inputs.specialty}
                onChange={(e) => setInputs({ ...inputs, specialty: e.target.value })}
              >
                {MEDICAL_SPECIALTIES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">규모 (평수)</label>
              <div className="flex items-center gap-3">
                <Slider
                  value={inputs.size}
                  min={30}
                  max={300}
                  step={10}
                  onValueChange={(value) => setInputs({ ...inputs, size: value })}
                  className="flex-grow"
                />
                <span className="text-sm font-medium w-14 text-right">{inputs.size}평</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">위치 유형</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={inputs.location}
                onChange={(e) => setInputs({ ...inputs, location: e.target.value })}
              >
                {LOCATION_TYPES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 수익성 설정 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> 수익성 설정
            </h4>
            <div>
              <label className="block text-sm font-medium mb-1">일평균 환자수</label>
              <div className="flex items-center gap-3">
                <Slider
                  value={inputs.patients}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={(value) => setInputs({ ...inputs, patients: value })}
                  className="flex-grow"
                />
                <span className="text-sm font-medium w-14 text-right">{inputs.patients}명</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">지역</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={inputs.region}
                onChange={(e) => setInputs({ ...inputs, region: e.target.value })}
              >
                {STANDARDIZED_REGIONS.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 인력 설정 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" /> 추가 서비스
            </h4>
            <div>
              <label className="block text-sm font-medium mb-1">제공 서비스</label>
              <div className="space-y-1.5">
                {SERVICE_TYPES.map((service) => (
                  <label key={service} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inputs.services.includes(service)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setInputs({ ...inputs, services: [...inputs.services, service] });
                        } else {
                          setInputs({ ...inputs, services: inputs.services.filter(s => s !== service) });
                        }
                      }}
                      className="mr-2 accent-primary"
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 pt-6 border-t border-border"
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="font-bold text-lg text-center text-foreground"
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  >
                    <FinancialResultView result={results.financial} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                  >
                    <RevenueResultView result={results.revenue} />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
                  >
                    <StaffingResultView result={results.staffing} />
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        {!results ? (
          <Button onClick={handleSimulate} className="w-full" size="lg">
            <Sparkles className="h-4 w-4 mr-2" />
            {isMobile ? '종합 시뮬레이션' : '종합 시뮬레이션 실행'}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleReset} className="w-full" size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            {isMobile ? '다시 실행' : '조건 변경 후 다시 실행'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UnifiedSimulator;
