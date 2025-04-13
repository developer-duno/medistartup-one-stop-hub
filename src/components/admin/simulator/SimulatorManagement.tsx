
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SimulatorTabs from './components/SimulatorTabs';
import { useToast } from '@/components/ui/use-toast';
import { SimulatorProvider, useSimulatorContext } from './contexts/SimulatorContext';

const SimulatorContent = () => {
  const { activeTab, handleCreateSimulator } = useSimulatorContext();
  
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

      <SimulatorTabs />
    </div>
  );
};

const SimulatorManagement: React.FC = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "시뮬레이터 관리",
      description: "시뮬레이터를 추가, 수정 및 테스트할 수 있습니다.",
    });
  }, [toast]);

  return (
    <SimulatorProvider>
      <SimulatorContent />
    </SimulatorProvider>
  );
};

export default SimulatorManagement;
