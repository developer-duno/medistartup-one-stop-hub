
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
    active: false,
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
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  // Load simulators from localStorage or use mock data
  useEffect(() => {
    const storedSimulators = localStorage.getItem('simulators');
    if (storedSimulators) {
      try {
        setSimulators(JSON.parse(storedSimulators));
      } catch (error) {
        console.error('Error parsing stored simulators:', error);
        setSimulators(mockSimulators);
        localStorage.setItem('simulators', JSON.stringify(mockSimulators));
      }
    } else {
      setSimulators(mockSimulators);
      localStorage.setItem('simulators', JSON.stringify(mockSimulators));
    }
  }, []);

  // Generate usage data whenever simulators change
  useEffect(() => {
    setUsageData(generateUsageData(simulators));
  }, [simulators]);

  // Save simulators to localStorage when they change
  useEffect(() => {
    localStorage.setItem('simulators', JSON.stringify(simulators));
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
    setSimulators(simulators.filter(s => s.id !== id));
  };

  const toggleSimulatorActive = (id: number) => {
    const updatedSimulators = simulators.map(s => 
      s.id === id ? {...s, active: !s.active} : s
    );
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
