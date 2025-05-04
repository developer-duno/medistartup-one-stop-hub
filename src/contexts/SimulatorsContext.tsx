
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Simulator } from '../components/admin/simulator/types';

// Mock simulator data (기본 시뮬레이터 데이터)
const defaultSimulators: Simulator[] = [
  {
    id: 1,
    title: '개원 비용 시뮬레이터',
    description: '진료과목별 평균 개원 비용 시뮬레이션',
    type: 'financial',
    active: true,
    views: 120
  },
  {
    id: 2,
    title: '수익성 분석 시뮬레이터',
    description: '지역 및 진료과목별 예상 수익 시뮬레이션',
    type: 'revenue',
    active: true,
    views: 85
  },
  {
    id: 3,
    title: '인력 구성 시뮬레이터',
    description: '병원 규모별 최적 인력 구성 시뮬레이션',
    type: 'staffing',
    active: true,
    views: 60
  }
];

interface SimulatorsContextType {
  initialized: boolean;
  initializeSimulators: () => void;
}

const SimulatorsContext = createContext<SimulatorsContextType | undefined>(undefined);

export const useSimulatorsContext = () => {
  const context = useContext(SimulatorsContext);
  if (context === undefined) {
    throw new Error('useSimulatorsContext must be used within a SimulatorsProvider');
  }
  return context;
};

export const SimulatorsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  // 시뮬레이터 데이터 초기화 함수
  const initializeSimulators = () => {
    try {
      const storedSimulators = localStorage.getItem('simulators');
      
      if (!storedSimulators) {
        // 저장된 데이터가 없으면 기본 데이터 사용
        localStorage.setItem('simulators', JSON.stringify(defaultSimulators));
        console.log('기본 시뮬레이터 데이터가 설정되었습니다.');
      } else {
        try {
          const parsed = JSON.parse(storedSimulators);
          
          // 데이터 유효성 검사
          if (!Array.isArray(parsed) || parsed.length === 0) {
            // 배열이 아니거나 빈 배열이면 기본 데이터로 리셋
            localStorage.setItem('simulators', JSON.stringify(defaultSimulators));
            console.log('잘못된 시뮬레이터 데이터를 감지하여 리셋했습니다.');
          } else {
            // 활성화된 시뮬레이터가 없으면 첫 번째 시뮬레이터 활성화
            const hasActiveSimulator = parsed.some((sim: Simulator) => sim.active);
            
            if (!hasActiveSimulator && parsed.length > 0) {
              const updated = [...parsed];
              updated[0] = { ...updated[0], active: true };
              localStorage.setItem('simulators', JSON.stringify(updated));
              console.log('활성화된 시뮬레이터가 없어 첫 번째 시뮬레이터를 활성화했습니다.');
            }
          }
        } catch (parseError) {
          // JSON 파싱 오류 시 기본 데이터로 리셋
          localStorage.setItem('simulators', JSON.stringify(defaultSimulators));
          console.error('시뮬레이터 데이터 파싱 오류로 기본 데이터를 재설정했습니다.', parseError);
        }
      }
      
      // 초기화 완료 표시
      setInitialized(true);
      
      // 업데이트 이벤트 발생 (다른 컴포넌트에 알림)
      window.dispatchEvent(new CustomEvent('simulatorUpdate'));
      
    } catch (error) {
      console.error('시뮬레이터 초기화 중 오류:', error);
      // 오류 시에도 초기화 완료로 표시하여 무한 루프 방지
      setInitialized(true);
    }
  };

  // 첫 렌더링 시 초기화 실행
  useEffect(() => {
    if (!initialized) {
      initializeSimulators();
    }
  }, [initialized]);

  // localStorage의 변경 이벤트 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'simulators') {
        // 다른 탭/창에서 시뮬레이터 데이터가 변경되면 초기화 상태 확인
        if (!e.newValue) {
          initializeSimulators();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <SimulatorsContext.Provider value={{ initialized, initializeSimulators }}>
      {children}
    </SimulatorsContext.Provider>
  );
};
