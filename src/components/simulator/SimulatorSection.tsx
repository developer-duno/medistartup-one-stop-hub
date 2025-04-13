
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Users } from 'lucide-react';
import SimulatorCard from './SimulatorCard';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing } from './SimulatorUtils';
import { Simulator } from '../admin/simulator/types';
import { useToast } from '@/components/ui/use-toast';

const SimulatorSection = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load simulators from localStorage (관리자 페이지에서 관리되는 데이터)
  useEffect(() => {
    const loadSimulators = () => {
      setIsLoading(true);
      try {
        const storedSimulators = localStorage.getItem('simulators');
        if (storedSimulators) {
          const parsedSimulators = JSON.parse(storedSimulators);
          // 활성화된 시뮬레이터만 표시
          const activeSimulators = parsedSimulators.filter((sim: Simulator) => sim.active);
          setSimulators(activeSimulators);
        }
      } catch (error) {
        console.error('시뮬레이터 데이터를 불러오는 중 오류 발생:', error);
        toast({
          title: '시뮬레이터 로드 오류',
          description: '시뮬레이터를 불러오는 중 문제가 발생했습니다.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSimulators();
    
    // 시뮬레이터 데이터가 변경될 때마다 갱신
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'simulators') {
        loadSimulators();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toast]);
  
  // 시뮬레이터 타입에 맞는 아이콘 반환
  const getSimulatorIcon = (type: string) => {
    switch(type) {
      case 'financial':
        return <Calculator className="h-6 w-6 text-primary" />;
      case 'revenue':
        return <TrendingUp className="h-6 w-6 text-primary" />;
      case 'staffing':
        return <Users className="h-6 w-6 text-primary" />;
      default:
        return <Calculator className="h-6 w-6 text-primary" />;
    }
  };
  
  // 시뮬레이터 사용 추적
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
        console.error('시뮬레이터 사용 기록 업데이트 중 오류:', error);
      }
    }
  };

  // 시뮬레이터 실행 함수
  const handleSimulation = (simulatorId: number, type: string, params: any) => {
    trackSimulatorUsage(simulatorId);
    
    if (type === 'financial') {
      return simulateFinancialCosts(params);
    } else if (type === 'revenue') {
      return simulateRevenue(params);
    } else if (type === 'staffing') {
      return simulateStaffing(params);
    }
    
    return null;
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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : simulators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulators.map((simulator) => (
              <SimulatorCard
                key={simulator.id}
                id={simulator.id}
                title={simulator.title}
                description={simulator.description}
                icon={getSimulatorIcon(simulator.type)}
                simulatorType={(simulator.type as 'financial' | 'revenue' | 'staffing')}
                onSimulate={(params) => handleSimulation(simulator.id, simulator.type, params)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-500">
              현재 활성화된 시뮬레이터가 없습니다. 관리자 페이지에서 시뮬레이터를 추가해주세요.
            </p>
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
