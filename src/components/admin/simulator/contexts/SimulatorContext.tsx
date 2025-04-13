
import React, { createContext, useState, useContext, useEffect } from 'react';
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

interface SimulatorContextType {
  simulators: Simulator[];
  setSimulators: React.Dispatch<React.SetStateAction<Simulator[]>>;
  editingSimulator: Simulator | null;
  setEditingSimulator: React.Dispatch<React.SetStateAction<Simulator | null>>;
  testingSimulator: Simulator | null;
  setTestingSimulator: React.Dispatch<React.SetStateAction<Simulator | null>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  usageData: UsageData[];
  handleCreateSimulator: () => void;
  handleEditSimulator: (simulator: Simulator) => void;
  handleTestSimulator: (simulator: Simulator) => void;
  handleUpdateSimulator: (field: string, value: any) => void;
  handleSaveSimulator: () => void;
  handleDeleteSimulator: (id: number) => void;
  handleToggleActive: (id: number) => void;
  handleCancelEdit: () => void;
  handleBackFromTest: () => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const useSimulatorContext = () => {
  const context = useContext(SimulatorContext);
  if (context === undefined) {
    throw new Error('useSimulatorContext must be used within a SimulatorProvider');
  }
  return context;
};

export const SimulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [editingSimulator, setEditingSimulator] = useState<Simulator | null>(null);
  const [testingSimulator, setTestingSimulator] = useState<Simulator | null>(null);
  const [activeTab, setActiveTab] = useState('list');
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

  const handleCreateSimulator = () => {
    setEditingSimulator({
      id: Math.max(0, ...simulators.map(s => s.id)) + 1,
      title: '',
      description: '',
      type: 'financial',
      active: true,
      views: 0
    });
    setActiveTab('edit');
  };

  const handleEditSimulator = (simulator: Simulator) => {
    setEditingSimulator({...simulator});
    setActiveTab('edit');
  };

  const handleTestSimulator = (simulator: Simulator) => {
    setTestingSimulator({...simulator});
    setActiveTab('test');
  };

  const handleUpdateSimulator = (field: string, value: any) => {
    if (editingSimulator) {
      setEditingSimulator({
        ...editingSimulator,
        [field]: value
      });
    }
  };

  const handleSaveSimulator = () => {
    if (!editingSimulator) return;
    
    const updatedSimulators = editingSimulator.id 
      ? simulators.map(s => s.id === editingSimulator.id ? editingSimulator : s)
      : [...simulators, editingSimulator];
    
    setSimulators(updatedSimulators);
    setEditingSimulator(null);
    setActiveTab('list');
  };

  const handleDeleteSimulator = (id: number) => {
    setSimulators(simulators.filter(s => s.id !== id));
  };

  const handleToggleActive = (id: number) => {
    const updatedSimulators = simulators.map(s => 
      s.id === id ? {...s, active: !s.active} : s
    );
    setSimulators(updatedSimulators);
  };

  const handleCancelEdit = () => {
    setEditingSimulator(null);
    setActiveTab('list');
  };

  const handleBackFromTest = () => {
    setTestingSimulator(null);
    setActiveTab('list');
  };

  const value = {
    simulators,
    setSimulators,
    editingSimulator,
    setEditingSimulator,
    testingSimulator,
    setTestingSimulator,
    activeTab,
    setActiveTab,
    usageData,
    handleCreateSimulator,
    handleEditSimulator,
    handleTestSimulator,
    handleUpdateSimulator,
    handleSaveSimulator,
    handleDeleteSimulator,
    handleToggleActive,
    handleCancelEdit,
    handleBackFromTest
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
};
