
import React, { useEffect } from 'react';
import { useSimulatorsContext } from '@/contexts/SimulatorsContext';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  const { initialized, initializeSimulators } = useSimulatorsContext();
  
  // 모든 페이지에서 항상 시뮬레이터 초기화 상태를 확인
  useEffect(() => {
    if (!initialized) {
      initializeSimulators();
    }
  }, [initialized, initializeSimulators]);
  
  // 시뮬레이터 데이터 확인
  useEffect(() => {
    const checkSimulatorData = () => {
      try {
        const storedSimulators = localStorage.getItem('simulators');
        if (!storedSimulators) {
          console.warn('PageContainer: 시뮬레이터 데이터가 없습니다. 초기화를 시도합니다.');
          initializeSimulators();
        }
      } catch (error) {
        console.error('PageContainer: 시뮬레이터 데이터 확인 중 오류:', error);
      }
    };
    
    checkSimulatorData();
  }, [initializeSimulators]);
  
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <div id="page-container-root">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
