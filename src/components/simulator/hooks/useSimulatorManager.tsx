
import { useState, useEffect } from 'react';
import { Simulator } from '../../admin/simulator/types';
import { useToast } from '@/components/ui/use-toast';

export const useSimulatorManager = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load simulators from localStorage
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
    const handleSimulatorUpdate = () => {
      console.log('시뮬레이터 업데이트 이벤트 감지됨');
      loadSimulators();
    };
    
    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'simulators') {
        console.log('시뮬레이터 스토리지 변경 감지됨');
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
  
  // Force init simulators if empty
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

  return {
    simulators,
    isLoading,
    loadError,
    loadSimulators
  };
};
