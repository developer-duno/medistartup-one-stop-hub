
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Simulator } from './types';
import UnifiedSimulator from '@/components/simulator/UnifiedSimulator';
import ViewsCounter from './components/ViewsCounter';

interface SimulatorTestProps {
  simulator: Simulator;
  onBack: () => void;
}

const SimulatorTest: React.FC<SimulatorTestProps> = ({ simulator, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{simulator.title} 미리보기</h3>
          <p className="text-sm text-muted-foreground">{simulator.description}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          뒤로 가기
        </Button>
      </div>

      <div className="border rounded-lg p-4 bg-muted/30">
        <p className="text-xs text-muted-foreground mb-3">💡 아래는 사용자에게 보이는 실제 시뮬레이터입니다.</p>
        <UnifiedSimulator />
      </div>

      <ViewsCounter views={simulator.views} />
    </div>
  );
};

export default SimulatorTest;
