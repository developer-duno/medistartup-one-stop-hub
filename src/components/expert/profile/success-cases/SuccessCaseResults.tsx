
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessCaseResultsProps {
  results: string[];
}

const SuccessCaseResults: React.FC<SuccessCaseResultsProps> = ({ results }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-neutral-900 mb-2">주요 성과:</h4>
      {results.map((result, resultIdx) => (
        <div key={resultIdx} className="flex items-start gap-3">
          <div className="mt-1">
            <CheckCircle className="h-4 w-4 text-primary" />
          </div>
          <p className="text-neutral-600">{result}</p>
        </div>
      ))}
    </div>
  );
};

export default SuccessCaseResults;

