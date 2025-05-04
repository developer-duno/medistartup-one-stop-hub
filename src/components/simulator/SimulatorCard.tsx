
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { FinancialResult, RevenueResult, StaffingResult } from '../admin/simulator/types';
import SimulatorInputs from './SimulatorInputs';
import SimulatorResults from './SimulatorResults';
import SimulatorCardHeader from './components/SimulatorCardHeader';
import SimulatorCardFooter from './components/SimulatorCardFooter';
import { FinancialInputs, RevenueInputs, StaffingInputs } from './types/simulatorTypes';

export interface SimulatorCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  simulatorType: 'financial' | 'revenue' | 'staffing';
  onSimulate: (data: any) => FinancialResult | RevenueResult | StaffingResult;
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({
  id,
  title,
  description,
  icon,
  simulatorType,
  onSimulate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [result, setResult] = useState<FinancialResult | RevenueResult | StaffingResult | null>(null);
  const { toast } = useToast();
  
  // 초기 상태값 설정
  const [financialInputs, setFinancialInputs] = useState<FinancialInputs>({
    specialty: '내과',
    size: [50],
    location: '중형상가',
  });
  
  const [revenueInputs, setRevenueInputs] = useState<RevenueInputs>({
    specialty: '피부과',
    patients: [30],
    region: '서울/경기',
  });
  
  const [staffingInputs, setStaffingInputs] = useState<StaffingInputs>({
    specialty: '치과',
    size: [100],
    services: ['일반진료', '미용'],
  });

  const handleSimulate = () => {
    let simulationData;
    let result;
    
    switch(simulatorType) {
      case 'financial':
        simulationData = financialInputs;
        result = onSimulate({
          ...financialInputs,
          size: financialInputs.size[0],
        });
        break;
      case 'revenue':
        simulationData = revenueInputs;
        result = onSimulate({
          ...revenueInputs,
          patients: revenueInputs.patients[0],
        });
        break;
      case 'staffing':
        simulationData = staffingInputs;
        result = onSimulate({
          ...staffingInputs,
          size: staffingInputs.size[0],
        });
        break;
    }
    
    setResult(result);
    
    toast({
      title: "시뮬레이션 완료",
      description: "결과가 생성되었습니다.",
    });
  };

  return (
    <Card className={`transition-all duration-300 ${isExpanded ? 'border-primary shadow-md' : 'hover:border-primary/50'}`}>
      <SimulatorCardHeader 
        icon={icon}
        title={title}
        description={description}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      
      {isExpanded && (
        <>
          <CardContent className="pt-0 pb-0">
            <SimulatorInputs
              simulatorType={simulatorType}
              financialInputs={financialInputs}
              setFinancialInputs={setFinancialInputs}
              revenueInputs={revenueInputs}
              setRevenueInputs={setRevenueInputs}
              staffingInputs={staffingInputs}
              setStaffingInputs={setStaffingInputs}
            />
            
            {result && (
              <div className="mt-6">
                <SimulatorResults
                  simulatorType={simulatorType}
                  result={result}
                />
              </div>
            )}
          </CardContent>
          
          <SimulatorCardFooter
            result={result}
            handleSimulate={handleSimulate}
            setResult={setResult}
          />
        </>
      )}
    </Card>
  );
};

export default SimulatorCard;
