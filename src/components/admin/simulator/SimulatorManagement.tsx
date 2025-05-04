
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Simulator } from './types';
import { useSimulators } from './hooks/useSimulators';
import SimulatorHeader from './components/SimulatorHeader';
import SimulatorTabs from './components/SimulatorTabs';
import { useSimulatorsContext } from '@/contexts/SimulatorsContext';

const SimulatorManagement: React.FC = () => {
  const [editingSimulator, setEditingSimulator] = useState<Simulator | null>(null);
  const [testingSimulator, setTestingSimulator] = useState<Simulator | null>(null);
  const [activeTab, setActiveTab] = useState('list');
  const { toast } = useToast();
  
  // 시뮬레이터 콘텍스트를 통한 초기화 확인
  const { initialized, initializeSimulators } = useSimulatorsContext();
  
  // 시뮬레이터 데이터 불러오기
  const { 
    simulators, 
    usageData, 
    updateSimulator, 
    addSimulator, 
    deleteSimulator, 
    toggleSimulatorActive 
  } = useSimulators();

  // 시뮬레이터 초기화 확인
  useEffect(() => {
    if (!initialized) {
      initializeSimulators();
    }
  }, [initialized, initializeSimulators]);
  
  // 시뮬레이터가 비어있는 경우 경고
  useEffect(() => {
    if (simulators.length === 0) {
      toast({
        title: "시뮬레이터 데이터 없음",
        description: "등록된 시뮬레이터가 없습니다. 새 시뮬레이터를 추가하세요.",
        variant: "destructive", // Changed from "warning" to "destructive"
      });
    }
  }, [simulators, toast]);

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
    
    if (editingSimulator.id && simulators.some(s => s.id === editingSimulator.id)) {
      updateSimulator(editingSimulator);
    } else {
      addSimulator(editingSimulator);
    }
    
    setEditingSimulator(null);
    setActiveTab('list');
    
    toast({
      title: "시뮬레이터 저장됨",
      description: "시뮬레이터가 성공적으로 저장되었습니다.",
    });
    
    // 저장 후 시뮬레이터 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent('simulatorUpdate'));
  };

  const handleDeleteSimulator = (id: number) => {
    // 삭제 후 남은 시뮬레이터 수 확인
    const remainingCount = simulators.filter(s => s.id !== id).length;
    
    // 마지막 시뮬레이터를 삭제하려는 경우 경고
    if (remainingCount === 0) {
      toast({
        title: "마지막 시뮬레이터 삭제 불가",
        description: "최소한 하나의 시뮬레이터가 필요합니다. 새 시뮬레이터를 먼저 추가하세요.",
        variant: "destructive",
      });
      return;
    }
    
    deleteSimulator(id);
    
    toast({
      title: "시뮬레이터 삭제됨",
      description: "시뮬레이터가 성공적으로 삭제되었습니다.",
    });
    
    // 삭제 후 시뮬레이터 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent('simulatorUpdate'));
  };

  const handleToggleActive = (id: number) => {
    // 활성화된 시뮬레이터 수 확인
    const activeCount = simulators.filter(s => s.active && s.id !== id).length;
    
    // 마지막 활성화된 시뮬레이터를 비활성화하려는 경우
    if (activeCount === 0 && simulators.find(s => s.id === id)?.active) {
      toast({
        title: "비활성화 불가",
        description: "최소한 하나의 활성화된 시뮬레이터가 필요합니다.",
        variant: "destructive",
      });
      return;
    }
    
    const newStatus = toggleSimulatorActive(id);
    
    toast({
      title: `시뮬레이터 ${newStatus ? '활성화' : '비활성화'}됨`,
      description: `시뮬레이터가 성공적으로 ${newStatus ? '활성화' : '비활성화'}되었습니다.`,
      variant: newStatus ? "default" : "destructive",
    });
    
    // 상태 변경 후 시뮬레이터 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent('simulatorUpdate'));
  };

  const handleCancelEdit = () => {
    setEditingSimulator(null);
    setActiveTab('list');
  };

  const handleBackFromTest = () => {
    setTestingSimulator(null);
    setActiveTab('list');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <SimulatorHeader 
        onCreateSimulator={handleCreateSimulator}
        isListView={activeTab === 'list'}
      />

      <SimulatorTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        simulators={simulators}
        usageData={usageData}
        editingSimulator={editingSimulator}
        testingSimulator={testingSimulator}
        onEditSimulator={handleEditSimulator}
        onToggleActive={handleToggleActive}
        onDeleteSimulator={handleDeleteSimulator}
        onTestSimulator={handleTestSimulator}
        onSaveSimulator={handleSaveSimulator}
        onCancelEdit={handleCancelEdit}
        onUpdateSimulator={handleUpdateSimulator}
        onBackFromTest={handleBackFromTest}
      />
    </div>
  );
};

export default SimulatorManagement;
