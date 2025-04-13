
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SimulatorList from './SimulatorList';
import SimulatorForm from './SimulatorForm';
import SimulatorUsage from './SimulatorUsage';
import { Simulator, UsageData } from './types';

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

// Mock simulator usage data
const mockUsageData: UsageData[] = [
  { date: '2023-01', views: 120 },
  { date: '2023-02', views: 150 },
  { date: '2023-03', views: 200 },
  { date: '2023-04', views: 180 },
  { date: '2023-05', views: 220 },
  { date: '2023-06', views: 250 }
];

const SimulatorManagement: React.FC = () => {
  const [simulators, setSimulators] = useState<Simulator[]>(mockSimulators);
  const [editingSimulator, setEditingSimulator] = useState<Simulator | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  const handleCreateSimulator = () => {
    setEditingSimulator({
      id: Math.max(...simulators.map(s => s.id)) + 1,
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
    setSimulators(simulators.map(s => 
      s.id === id ? {...s, active: !s.active} : s
    ));
  };

  const handleCancelEdit = () => {
    setEditingSimulator(null);
    setActiveTab('list');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">시뮬레이터 관리</h2>
        {activeTab === 'list' && (
          <Button onClick={handleCreateSimulator}>
            <Plus className="h-4 w-4 mr-2" />
            시뮬레이터 추가
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">시뮬레이터 목록</TabsTrigger>
          <TabsTrigger value="usage">사용 통계</TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingSimulator}>
            {editingSimulator?.id ? '시뮬레이터 수정' : '시뮬레이터 추가'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <SimulatorList 
            simulators={simulators}
            onEdit={handleEditSimulator}
            onToggleActive={handleToggleActive}
            onDelete={handleDeleteSimulator}
          />
        </TabsContent>

        <TabsContent value="usage">
          <SimulatorUsage usageData={mockUsageData} />
        </TabsContent>

        <TabsContent value="edit">
          {editingSimulator && (
            <SimulatorForm 
              simulator={editingSimulator}
              onSave={handleSaveSimulator}
              onCancel={handleCancelEdit}
              onUpdate={handleUpdateSimulator}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatorManagement;
