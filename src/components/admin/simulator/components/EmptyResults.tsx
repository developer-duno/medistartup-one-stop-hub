
import React from 'react';
import { ArrowRight } from 'lucide-react';

const EmptyResults: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <ArrowRight className="h-16 w-16 text-gray-300 mb-4" />
      <p className="text-muted-foreground">
        시뮬레이션을 실행하면 여기에 결과가 표시됩니다.
      </p>
    </div>
  );
};

export default EmptyResults;
