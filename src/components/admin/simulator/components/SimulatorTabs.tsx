
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulatorList from '../SimulatorList';
import SimulatorUsage from '../SimulatorUsage';
import SimulatorForm from '../SimulatorForm';
import SimulatorTest from '../SimulatorTest';
import { Simulator, UsageData } from '../types';

interface SimulatorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  simulators: Simulator[];
  usageData: UsageData[];
  editingSimulator: Simulator | null;
  testingSimulator: Simulator | null;
  onEditSimulator: (simulator: Simulator) => void;
  onToggleActive: (id: number) => void;
  onDeleteSimulator: (id: number) => void;
  onTestSimulator: (simulator: Simulator) => void;
  onSaveSimulator: () => void;
  onCancelEdit: () => void;
  onUpdateSimulator: (field: string, value: any) => void;
  onBackFromTest: () => void;
}

const SimulatorTabs: React.FC<SimulatorTabsProps> = ({
  activeTab,
  setActiveTab,
  simulators,
  usageData,
  editingSimulator,
  testingSimulator,
  onEditSimulator,
  onToggleActive,
  onDeleteSimulator,
  onTestSimulator,
  onSaveSimulator,
  onCancelEdit,
  onUpdateSimulator,
  onBackFromTest
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
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
          onEdit={onEditSimulator}
          onToggleActive={onToggleActive}
          onDelete={onDeleteSimulator}
          onTest={onTestSimulator}
        />
      </TabsContent>

      <TabsContent value="usage">
        <SimulatorUsage usageData={usageData} />
      </TabsContent>

      <TabsContent value="edit">
        {editingSimulator && (
          <SimulatorForm 
            simulator={editingSimulator}
            onSave={onSaveSimulator}
            onCancel={onCancelEdit}
            onUpdate={onUpdateSimulator}
          />
        )}
      </TabsContent>

      <TabsContent value="test">
        {testingSimulator && (
          <SimulatorTest 
            simulator={testingSimulator}
            onBack={onBackFromTest}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default SimulatorTabs;
