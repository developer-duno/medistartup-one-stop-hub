import { useState, useEffect } from 'react';
import { Simulator, UsageData } from '../types';

// Mock simulator data
const mockSimulators: Simulator[] = [
  {
    id: 1,
    title: '개원 비용 시뮬레이터',
    description: '진료과목별 평균 개원 비용 시뮬레이션',
    type: 'financial',
    active: true,
    views: 1240
  },
  {
    id: 2,
    title: '수익성 분석 시뮬레이터',
    description: '지역 및 진료과목별 예상 수익 시뮬레이션',
    type: 'revenue',
    active: true,
    views: 890
  },
  {
    id: 3,
    title: '인력 구성 시뮬레이터',
    description: '병원 규모별 최적 인력 구성 시뮬레이션',
    type: 'staffing',
    active: true,
    views: 560
  }
];

// Calculate usage data from simulators
const generateUsageData = (simulators: Simulator[]): UsageData[] => {
  const totalViews = simulators.reduce((sum, sim) => sum + (sim.views || 0), 0);
  const months = ['1월', '2월', '3월', '4월', '5월', '6월'];
  
  // Generate data based on total views
  return months.map((month, index) => ({
    date: `2023-0${index + 1}`,
    views: Math.floor((totalViews / 6) * (0.8 + Math.random() * 0.4))
  }));
};

export const useSimulators = () => {
  const [simulators, setSimulators] = useState<Simulator[]>(mockSimulators);
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  // Load simulators from localStorage or use mock data
  useEffect(() => {
    try {
      const storedSimulators = localStorage.getItem('simulators');
      if (storedSimulators) {
        const parsedData = JSON.parse(storedSimulators);
        
        // Check if the parsed data is valid and has at least one simulator
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // Ensure at least one simulator is active
          const hasActiveSimulator = parsedData.some(sim => sim.active);
          
          if (hasActiveSimulator) {
            setSimulators(parsedData);
          } else {
            // If no active simulators, ensure at least the first one is active
            const updatedData = [...parsedData];
            updatedData[0] = {...updatedData[0], active: true};
            setSimulators(updatedData);
            localStorage.setItem('simulators', JSON.stringify(updatedData));
          }
        } else {
          // Invalid or empty data, use mock data
          console.log('저장된 시뮬레이터 데이터가 없거나 잘못되었습니다. 기본 데이터를 사용합니다.');
          setSimulators(mockSimulators);
          localStorage.setItem('simulators', JSON.stringify(mockSimulators));
        }
      } else {
        // No stored data, use mock data
        console.log('저장된 시뮬레이터 데이터가 없습니다. 기본 데이터를 사용합니다.');
        setSimulators(mockSimulators);
        localStorage.setItem('simulators', JSON.stringify(mockSimulators));
      }
    } catch (error) {
      console.error('시뮬레이터 데이터 로딩 중 오류:', error);
      setSimulators(mockSimulators); // Fallback to mock data on error
      localStorage.setItem('simulators', JSON.stringify(mockSimulators));
    }
  }, []);

  // Generate usage data whenever simulators change
  useEffect(() => {
    setUsageData(generateUsageData(simulators));
  }, [simulators]);

  // Save simulators to localStorage when they change
  useEffect(() => {
    if (simulators.length > 0) {
      localStorage.setItem('simulators', JSON.stringify(simulators));
      
      // Dispatch a custom event to notify other components about the change
      window.dispatchEvent(new CustomEvent('simulatorUpdate'));
    }
  }, [simulators]);

  const updateSimulator = (updatedSimulator: Simulator) => {
    const updatedSimulators = simulators.map(s => 
      s.id === updatedSimulator.id ? updatedSimulator : s
    );
    setSimulators(updatedSimulators);
  };

  const addSimulator = (newSimulator: Simulator) => {
    setSimulators([...simulators, newSimulator]);
  };

  const deleteSimulator = (id: number) => {
    const remainingSimulators = simulators.filter(s => s.id !== id);
    // Ensure we always have at least one simulator
    if (remainingSimulators.length === 0) {
      setSimulators(mockSimulators);
    } else {
      // Ensure at least one simulator is active
      const hasActiveSimulator = remainingSimulators.some(sim => sim.active);
      if (!hasActiveSimulator && remainingSimulators.length > 0) {
        remainingSimulators[0].active = true;
      }
      setSimulators(remainingSimulators);
    }
  };

  const toggleSimulatorActive = (id: number) => {
    const updatedSimulators = simulators.map(s => 
      s.id === id ? {...s, active: !s.active} : s
    );
    
    // Ensure at least one simulator is active
    const hasActiveSimulator = updatedSimulators.some(sim => sim.active);
    if (!hasActiveSimulator) {
      // If trying to deactivate the last active simulator, keep it active
      const original = simulators.find(s => s.id === id);
      if (original && original.active) {
        return original.active; // Return previous state without changing
      }
    }
    
    setSimulators(updatedSimulators);
    return !simulators.find(s => s.id === id)?.active;
  };

  return {
    simulators,
    usageData,
    updateSimulator,
    addSimulator,
    deleteSimulator,
    toggleSimulatorActive
  };
};
