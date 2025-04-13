
import React, { useState } from 'react';
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
  };

  const handleDeleteSimulator = (id: number) => {
    deleteSimulator(id);
    
    toast({
      title: "시뮬레이터 삭제됨",
      description: "시뮬레이터가 성공적으로 삭제되었습니다.",
    });
  };

  const handleToggleActive = (id: number) => {
    const newStatus = toggleSimulatorActive(id);
    
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
