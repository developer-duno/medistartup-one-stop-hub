
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Users } from 'lucide-react';
import SimulatorCard from './SimulatorCard';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing } from './SimulatorUtils';
import { Simulator } from '../admin/simulator/types';

// Default simulators if none found in localStorage
const defaultSimulators: Simulator[] = [
  {
    id: 1,
    title: '개원 비용 시뮬레이터',
    description: '진료과목별 평균 개원 비용을 확인하세요',
    type: 'financial',
    active: true,
    views: 0
  },
  {
    id: 2,
    title: '수익성 분석 시뮬레이터',
    description: '지역 및 진료과목별 예상 수익 시뮬레이션',
    type: 'revenue',
    active: true,
    views: 0
  },
  {
    id: 3,
    title: '인력 구성 시뮬레이터',
    description: '병원 규모별 최적 인력 구성 시뮬레이션',
    type: 'staffing',
    active: true,
    views: 0
  }
];

const SimulatorSection = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);

  // Load simulators from localStorage
  useEffect(() => {
    const storedSimulators = localStorage.getItem('simulators');
    if (storedSimulators) {
      try {
        const parsedSimulators = JSON.parse(storedSimulators);
        // Only show active simulators
        const activeSimulators = parsedSimulators.filter((sim: Simulator) => sim.active);
        setSimulators(activeSimulators);
      } catch (error) {
        console.error('Error parsing stored simulators:', error);
        setSimulators(defaultSimulators);
      }
    } else {
      setSimulators(defaultSimulators);
    }
  }, []);
  
  // Get simulator function based on type
  const getSimulatorFunction = (type: string) => {
    switch(type) {
      case 'financial':
        return simulateFinancialCosts;
      case 'revenue':
        return simulateRevenue;
      case 'staffing':
        return simulateStaffing;
      default:
        return simulateFinancialCosts;
    }
  };
  
  // Track simulator usage
  const trackSimulatorUsage = (simulatorId: number) => {
    const storedSimulators = localStorage.getItem('simulators');
    if (storedSimulators) {
      try {
        const parsedSimulators = JSON.parse(storedSimulators);
        const updatedSimulators = parsedSimulators.map((sim: Simulator) => {
          if (sim.id === simulatorId) {
            return {...sim, views: (sim.views || 0) + 1};
          }
          return sim;
        });
        localStorage.setItem('simulators', JSON.stringify(updatedSimulators));
      } catch (error) {
        console.error('Error updating simulator usage:', error);
      }
    }
  };

  // Get default parameters for simulator types
  const getDefaultParamsForType = (type: string) => {
    switch(type) {
      case 'financial':
        return { specialty: '내과', size: 50, location: '중형상가' };
      case 'revenue':
        return { specialty: '피부과', patients: 30, region: '서울/경기' };
      case 'staffing':
        return { specialty: '치과', size: 100, services: ['일반진료', '미용'] };
      default:
        return { specialty: '내과', size: 50, location: '중형상가' };
    }
  };

  return (
    <section id="simulators" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            병원창업 <span className="text-primary">시뮬레이터</span>
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            메디스타트업의 데이터에 기반한 시뮬레이터로 병원 창업에 필요한 비용과 수익을 미리 예측해보세요.
            지역과 규모에 맞춰 최적화된 정보를 제공합니다.
          </p>
        </div>
        
        {simulators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulators.map((simulator) => (
              <SimulatorCard
                key={simulator.id}
                id={simulator.id}
                title={simulator.title}
                description={simulator.description}
                icon={
                  simulator.type === 'financial' ? <Calculator className="h-6 w-6 text-primary" /> :
                  simulator.type === 'revenue' ? <TrendingUp className="h-6 w-6 text-primary" /> :
                  <Users className="h-6 w-6 text-primary" />
                }
                simulatorType={(simulator.type as 'financial' | 'revenue' | 'staffing')}
                onSimulate={() => {
                  trackSimulatorUsage(simulator.id);
                  return getSimulatorFunction(simulator.type)(getDefaultParamsForType(simulator.type));
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-500">시뮬레이터를 준비 중입니다. 잠시만 기다려주세요.</p>
          </div>
        )}
        
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            * 시뮬레이션 결과는 당사의 데이터베이스에 근거한 예상치이며, 실제 상황과 차이가 있을 수 있습니다.
            <br />더 정확한 분석이 필요하시면 전문가 상담을 신청해주세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
