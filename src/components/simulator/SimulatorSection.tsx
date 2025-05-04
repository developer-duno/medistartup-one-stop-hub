
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Users, AlertCircle } from 'lucide-react';
import SimulatorCard from './SimulatorCard';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing, trackSimulatorUsage } from './SimulatorUtils';
import { Simulator } from '../admin/simulator/types';
import { useToast } from '@/components/ui/use-toast';
import { LoadingState } from '@/components/ui/loading-state';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SimulatorSection = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load simulators from localStorage (관리자 페이지에서 관리되는 데이터)
  const loadSimulators = () => {
    setIsLoading(true);
    setLoadError(null);
    
    try {
      const storedSimulators = localStorage.getItem('simulators');
      
      if (storedSimulators) {
        try {
          const parsedSimulators = JSON.parse(storedSimulators);
          
          if (Array.isArray(parsedSimulators) && parsedSimulators.length > 0) {
            // 활성화된 시뮬레이터만 표시
            const activeSimulators = parsedSimulators.filter((sim: Simulator) => sim.active);
            
            if (activeSimulators.length > 0) {
              setSimulators(activeSimulators);
            } else {
              // 활성화된 시뮬레이터가 없으면 모든 시뮬레이터를 표시하되 UI에 비활성 상태임을 표시
              console.log('활성화된 시뮬레이터가 없습니다. 관리자 페이지에서 시뮬레이터를 활성화하세요.');
              setSimulators(parsedSimulators);
            }
          } else {
            throw new Error('저장된 시뮬레이터 데이터 형식이 잘못되었거나 비어 있습니다.');
          }
        } catch (parseError) {
          throw new Error('시뮬레이터 데이터 파싱 중 오류가 발생했습니다.');
        }
      } else {
        // 저장된 시뮬레이터 데이터가 없는 경우 기본 시뮬레이터 생성
        const defaultSimulators = [
          {
            id: 1,
            title: '개원 비용 시뮬레이터',
            description: '진료과목별 평균 개원 비용 시뮬레이션',
            type: 'financial',
            active: true,
            views: 10
          },
          {
            id: 2,
            title: '수익성 분석 시뮬레이터',
            description: '지역 및 진료과목별 예상 수익 시뮬레이션',
            type: 'revenue',
            active: true,
            views: 5
          }
        ];
        
        localStorage.setItem('simulators', JSON.stringify(defaultSimulators));
        setSimulators(defaultSimulators);
        console.log('기본 시뮬레이터가 생성되었습니다.');
      }
    } catch (error) {
      console.error('시뮬레이터 데이터를 불러오는 중 오류 발생:', error);
      setLoadError((error as Error).message || '시뮬레이터를 불러오는 중 문제가 발생했습니다.');
      
      toast({
        title: '시뮬레이터 로드 오류',
        description: '시뮬레이터를 불러오는 중 문제가 발생했습니다. 기본 시뮬레이터를 표시합니다.',
        variant: 'destructive',
      });
      
      // 오류 발생 시 기본 시뮬레이터 표시
      const fallbackSimulators = [
        {
          id: 1,
          title: '개원 비용 시뮬레이터',
          description: '진료과목별 평균 개원 비용 시뮬레이션',
          type: 'financial',
          active: true,
          views: 0
        }
      ];
      
      setSimulators(fallbackSimulators);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 컴포넌트 마운트 시 및 storage 이벤트 발생 시 시뮬레이터 로드
  useEffect(() => {
    loadSimulators();
    
    // Custom event listener for simulator updates
    const handleSimulatorUpdate = () => loadSimulators();
    
    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'simulators') {
        loadSimulators();
      }
    };
    
    // Listen for the custom event for changes in the same window
    window.addEventListener('simulatorUpdate', handleSimulatorUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    // 페이지 로드 후 시간 지연 후 한번 더 시뮬레이터 데이터 확인 (안정성 강화)
    const timeoutId = setTimeout(() => {
      loadSimulators();
    }, 1500);
    
    return () => {
      window.removeEventListener('simulatorUpdate', handleSimulatorUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timeoutId);
    };
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

  // 시뮬레이터 실행 함수
  const handleSimulation = (simulatorId: number, type: string, params: any) => {
    // Use centralized tracking function
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

  // Force init simulators if empty (this will ensure simulators are always available)
  useEffect(() => {
    if (!isLoading && simulators.length === 0) {
      const defaultSimulators = [
        {
          id: 1,
          title: '개원 비용 시뮬레이터',
          description: '진료과목별 평균 개원 비용 시뮬레이션',
          type: 'financial',
          active: true,
          views: 10
        }
      ];
      
      localStorage.setItem('simulators', JSON.stringify(defaultSimulators));
      setSimulators(defaultSimulators);
      console.log('시뮬레이터 없음 감지: 기본 시뮬레이터 생성됨');
    }
  }, [isLoading, simulators]);

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
          <LoadingState className="py-16" />
        ) : loadError ? (
          <Alert variant="destructive" className="mx-auto max-w-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>시뮬레이터 로드 오류</AlertTitle>
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        ) : simulators.filter(sim => sim.active).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulators.filter(sim => sim.active).map((simulator) => (
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
          <div className="text-center py-10 border rounded-lg p-6 max-w-xl mx-auto bg-gray-50">
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">활성화된 시뮬레이터가 없습니다</h3>
            <p className="text-neutral-500 mb-6">
              현재 활성화된 시뮬레이터가 없습니다. 관리자 페이지에서 시뮬레이터를 추가하거나 활성화해주세요.
            </p>
            <button 
              onClick={loadSimulators}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              새로고침
            </button>
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
