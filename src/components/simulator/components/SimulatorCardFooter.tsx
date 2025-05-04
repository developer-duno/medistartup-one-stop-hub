
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { SimulatorCardFooterProps } from '../types/simulatorTypes';

const SimulatorCardFooter: React.FC<SimulatorCardFooterProps> = ({
  result,
  handleSimulate,
  setResult
}) => {
  return (
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
  );
};

export default SimulatorCardFooter;
