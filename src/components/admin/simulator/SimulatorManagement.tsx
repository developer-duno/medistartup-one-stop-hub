
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Simulator } from './types';
import { useSimulators } from './hooks/useSimulators';
import SimulatorHeader from './components/SimulatorHeader';
import SimulatorTabs from './components/SimulatorTabs';

const SimulatorManagement: React.FC = () => {
  const [editingSimulator, setEditingSimulator] = useState<Simulator | null>(null);
  const [testingSimulator, setTestingSimulator] = useState<Simulator | null>(null);
  const [activeTab, setActiveTab] = useState('list');
  const { toast } = useToast();
  
  const { 
    simulators, 
    usageData, 
    updateSimulator, 
    addSimulator, 
    deleteSimulator, 
    toggleSimulatorActive 
  } = useSimulators();
  
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

  const handleSaveSimulator = async () => {
    if (!editingSimulator) return;
    
    if (simulators.some(s => s.id === editingSimulator.id)) {
      const success = await updateSimulator(editingSimulator);
      if (success) {
        toast({ title: "시뮬레이터 업데이트됨", description: "시뮬레이터가 성공적으로 업데이트되었습니다." });
      } else {
        toast({ title: "업데이트 실패", description: "시뮬레이터 업데이트에 실패했습니다.", variant: "destructive" });
        return;
      }
    } else {
      const success = await addSimulator(editingSimulator);
      if (success) {
        toast({ title: "시뮬레이터 추가됨", description: "새로운 시뮬레이터가 성공적으로 추가되었습니다." });
      } else {
        toast({ title: "추가 실패", description: "시뮬레이터 추가에 실패했습니다.", variant: "destructive" });
        return;
      }
    }
    
    setEditingSimulator(null);
    setActiveTab('list');
  };

  const handleDeleteSimulator = async (id: number) => {
    const remainingCount = simulators.filter(s => s.id !== id).length;
    
    if (remainingCount === 0) {
      toast({ title: "마지막 시뮬레이터 삭제 불가", description: "최소한 하나의 시뮬레이터가 필요합니다.", variant: "destructive" });
      return;
    }
    
    const success = await deleteSimulator(id);
    if (success) {
      toast({ title: "시뮬레이터 삭제됨", description: "시뮬레이터가 성공적으로 삭제되었습니다." });
    }
  };

  const handleToggleActive = async (id: number) => {
    const activeCount = simulators.filter(s => s.active && s.id !== id).length;
    
    if (activeCount === 0 && simulators.find(s => s.id === id)?.active) {
      toast({ title: "비활성화 불가", description: "최소한 하나의 활성화된 시뮬레이터가 필요합니다.", variant: "destructive" });
      return;
    }
    
    const newStatus = await toggleSimulatorActive(id);
    toast({
      title: `시뮬레이터 ${newStatus ? '활성화' : '비활성화'}됨`,
      description: `시뮬레이터가 성공적으로 ${newStatus ? '활성화' : '비활성화'}되었습니다.`,
      variant: newStatus ? "default" : "destructive",
    });
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
