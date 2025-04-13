
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing } from '@/components/simulator/SimulatorUtils';
import { Simulator, SimulatorTestParams } from './types';
import { useToast } from '@/components/ui/use-toast';

// Import refactored components
import FinancialInputs from './components/FinancialInputs';
import RevenueInputs from './components/RevenueInputs';
import StaffingInputs from './components/StaffingInputs';
import FinancialResults from './components/FinancialResults';
import RevenueResults from './components/RevenueResults';
import StaffingResults from './components/StaffingResults';
import EmptyResults from './components/EmptyResults';
import ViewsCounter from './components/ViewsCounter';

interface SimulatorTestProps {
  simulator: Simulator;
  onBack: () => void;
}

const SimulatorTest: React.FC<SimulatorTestProps> = ({ simulator, onBack }) => {
  const [params, setParams] = useState<SimulatorTestParams>({
    specialty: '내과',
    size: 100,
    location: '중형상가',
    patients: 30,
    region: '서울/경기',
    services: [],
  });
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleParamChange = (key: string, value: any) => {
    setParams({
      ...params,
      [key]: value
    });
  };

  const handleServiceToggle = (service: string) => {
    const newServices = params.services?.includes(service) 
      ? params.services.filter(s => s !== service)
      : [...(params.services || []), service];
    
    handleParamChange('services', newServices);
  };

  const runSimulation = () => {
    let simulationResult;
    
    if (simulator.type === 'financial') {
      simulationResult = simulateFinancialCosts({
        specialty: params.specialty || '내과',
        size: params.size || 100,
        location: params.location || '중형상가'
      });
    } else if (simulator.type === 'revenue') {
      simulationResult = simulateRevenue({
        specialty: params.specialty || '내과',
        patients: params.patients || 30,
        region: params.region || '서울/경기'
      });
    } else if (simulator.type === 'staffing') {
      simulationResult = simulateStaffing({
        specialty: params.specialty || '내과',
        size: params.size || 100,
        services: params.services || []
      });
    }

    setResult(simulationResult);
    
    // Increment the simulator views
    const storedSimulators = localStorage.getItem('simulators');
    if (storedSimulators) {
      try {
        const simulators = JSON.parse(storedSimulators);
        const updatedSimulators = simulators.map((s: Simulator) => 
          s.id === simulator.id ? {...s, views: (s.views || 0) + 1} : s
        );
        localStorage.setItem('simulators', JSON.stringify(updatedSimulators));
      } catch (error) {
        console.error('Error updating simulator views:', error);
      }
    }

    toast({
      title: '시뮬레이션 실행 완료',
      description: `${simulator.title} 시뮬레이션이 성공적으로 실행되었습니다.`,
    });
  };

  const renderInputs = () => {
    switch (simulator.type) {
      case 'financial':
        return <FinancialInputs params={params} onParamChange={handleParamChange} />;
      case 'revenue':
        return <RevenueInputs params={params} onParamChange={handleParamChange} />;
      case 'staffing':
        return (
          <StaffingInputs 
            params={params} 
            onParamChange={handleParamChange} 
            onServiceToggle={handleServiceToggle} 
          />
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">알 수 없는 시뮬레이터 유형입니다.</p>
          </div>
        );
    }
  };

  const renderResults = () => {
    if (!result) return <EmptyResults />;

    switch (simulator.type) {
      case 'financial':
        return <FinancialResults result={result} />;
      case 'revenue':
        return <RevenueResults result={result} />;
      case 'staffing':
        return <StaffingResults result={result} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">결과를 표시할 수 없습니다.</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{simulator.title} 테스트</CardTitle>
            <CardDescription>{simulator.description}</CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>
            뒤로 가기
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">시뮬레이션 설정</h3>
            <div className="grid gap-6">
              {renderInputs()}
            </div>
            <Button 
              className="mt-6 w-full"
              onClick={runSimulation}
              disabled={!simulator.active}
            >
              <Play className="h-4 w-4 mr-2" />
              시뮬레이션 실행
            </Button>
          </div>
          
          <div>
            {renderResults()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <ViewsCounter views={simulator.views} />
      </CardFooter>
    </Card>
  );
};

export default SimulatorTest;
