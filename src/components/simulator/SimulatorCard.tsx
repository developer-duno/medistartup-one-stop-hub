
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SimulatorInputs from './SimulatorInputs';
import SimulatorResults from './SimulatorResults';

export interface SimulatorCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  simulatorType: 'financial' | 'revenue' | 'staffing';
  onSimulate: (data: any) => any;
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
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  // Form state based on simulator type
  const [financialInputs, setFinancialInputs] = useState({
    specialty: '내과',
    size: [50], // square meters
    location: '중형상가',
  });
  
  const [revenueInputs, setRevenueInputs] = useState({
    specialty: '피부과',
    patients: [30], // daily patients
    region: '서울/경기',
  });
  
  const [staffingInputs, setStaffingInputs] = useState({
    specialty: '치과',
    size: [100], // square meters
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
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="bg-primary/10 p-2.5 rounded-full">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Button 
            variant={isExpanded ? "outline" : "ghost"} 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1"
          >
            {isExpanded ? '접기' : '시작하기'} 
            <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
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
          
          <CardFooter className="flex justify-between border-t pt-4 mt-4">
            {!result ? (
              <Button onClick={handleSimulate} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                시뮬레이션 실행
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setResult(null)} className="w-full">
                다시 시뮬레이션하기
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SimulatorCard;
