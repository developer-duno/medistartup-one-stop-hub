
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulatorList from '../SimulatorList';
import SimulatorForm from '../SimulatorForm';
import SimulatorUsage from '../SimulatorUsage';
import SimulatorTest from '../SimulatorTest';
import { useSimulatorContext } from '../contexts/SimulatorContext';
import { useToast } from '@/components/ui/use-toast';

const SimulatorTabs: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    editingSimulator, 
    testingSimulator,
    simulators,
    usageData,
    handleEditSimulator,
    handleToggleActive,
    handleDeleteSimulator,
    handleTestSimulator,
    handleSaveSimulator,
    handleCancelEdit,
    handleUpdateSimulator,
    handleBackFromTest
  } = useSimulatorContext();
  
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSimulatorSave = () => {
    handleSaveSimulator();
    toast({
      title: "시뮬레이터 저장됨",
      description: "시뮬레이터가 성공적으로 저장되었습니다.",
    });
  };

  const handleSimulatorDelete = (id: number) => {
    handleDeleteSimulator(id);
    toast({
      title: "시뮬레이터 삭제됨",
      description: "시뮬레이터가 성공적으로 삭제되었습니다.",
    });
  };

  const handleSimulatorToggle = (id: number) => {
    handleToggleActive(id);
    
    const simulator = simulators.find(s => s.id === id);
    const newStatus = !simulator?.active;
    
    toast({
      title: `시뮬레이터 ${newStatus ? '활성화' : '비활성화'}됨`,
      description: `시뮬레이터가 성공적으로 ${newStatus ? '활성화' : '비활성화'}되었습니다.`,
      variant: newStatus ? "default" : "destructive",
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-6">
        <TabsTrigger value="list">시뮬레이터 목록</TabsTrigger>
        <TabsTrigger value="usage">사용 통계</TabsTrigger>
        <TabsTrigger value="edit" disabled={!editingSimulator}>
          {editingSimulator?.id ? '시뮬레이터 수정' : '시뮬레이터 추가'}
        </TabsTrigger>
        <TabsTrigger value="test" disabled={!testingSimulator}>
          시뮬레이터 테스트
        </TabsTrigger>
      </TabsList>

      <TabsContent value="list">
        <SimulatorList 
          simulators={simulators}
          onEdit={handleEditSimulator}
          onToggleActive={handleSimulatorToggle}
          onDelete={handleSimulatorDelete}
          onTest={handleTestSimulator}
        />
      </TabsContent>

      <TabsContent value="usage">
        <SimulatorUsage usageData={usageData} />
      </TabsContent>

      <TabsContent value="edit">
        {editingSimulator && (
          <SimulatorForm 
            simulator={editingSimulator}
            onSave={handleSimulatorSave}
            onCancel={handleCancelEdit}
            onUpdate={handleUpdateSimulator}
          />
        )}
      </TabsContent>

      <TabsContent value="test">
        {testingSimulator && (
          <SimulatorTest 
            simulator={testingSimulator}
            onBack={handleBackFromTest}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default SimulatorTabs;
