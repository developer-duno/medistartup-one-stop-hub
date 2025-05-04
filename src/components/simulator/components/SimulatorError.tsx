
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface SimulatorErrorProps {
  errorMessage: string;
}

const SimulatorError: React.FC<SimulatorErrorProps> = ({ errorMessage }) => {
  return (
    <Alert variant="destructive" className="mx-auto max-w-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>시뮬레이터 로드 오류</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default SimulatorError;
