
import React, { useState } from 'react';
import { Plus, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulatorOptionsList from './components/SimulatorOptionsList';
import SimulatorOptionForm from './components/SimulatorOptionForm';
import { useSimulatorOptions } from './hooks/useSimulatorOptions';

const SimulatorManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("options");
  const {
    simulatorOptions,
    editingOption,
    setEditingOption,
    handleAddOption,
    handleEditOption,
    handleDeleteOption,
    handleUpdateOption
  } = useSimulatorOptions();

  const handleEdit = (option: any) => {
    handleEditOption(option);
    setActiveTab("edit");
  };

  const handleCancel = () => {
    setActiveTab("options");
    setEditingOption(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pretendard font-bold text-2xl mb-6">시뮬레이터 관리</h2>
        <Button onClick={handleAddOption}>
          <Plus className="h-4 w-4 mr-2" />
          시뮬레이터 옵션 추가
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="options">
            <BarChart3 className="h-4 w-4 mr-2" />
            시뮬레이터 옵션
          </TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingOption}>
            <Settings className="h-4 w-4 mr-2" />
            옵션 편집
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="options">
          <SimulatorOptionsList
            options={simulatorOptions}
            onEdit={handleEdit}
            onDelete={handleDeleteOption}
          />
        </TabsContent>
        
        <TabsContent value="edit">
          {editingOption && (
            <SimulatorOptionForm
              editingOption={editingOption}
              setEditingOption={setEditingOption}
              onCancel={handleCancel}
              onSave={handleUpdateOption}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatorManagement;
