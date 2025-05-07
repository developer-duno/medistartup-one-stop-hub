
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { SimulatorCardFooterProps } from '../types/simulatorTypes';
import { useIsMobile } from '@/hooks/use-mobile';

const SimulatorCardFooter: React.FC<SimulatorCardFooterProps> = ({
  result,
  handleSimulate,
  setResult
}) => {
  const isMobile = useIsMobile();

  return (
    <CardFooter className="flex justify-between border-t pt-4 mt-4">
      {!result ? (
        <Button onClick={handleSimulate} className="w-full text-sm sm:text-base">
          <Sparkles className="h-4 w-4 mr-2" />
          {isMobile ? '시뮬레이션' : '시뮬레이션 실행'}
        </Button>
      ) : (
        <Button variant="outline" onClick={() => setResult(null)} className="w-full text-sm sm:text-base">
          {isMobile ? '다시 실행' : '다시 시뮬레이션하기'}
        </Button>
      )}
    </CardFooter>
  );
};

export default SimulatorCardFooter;
