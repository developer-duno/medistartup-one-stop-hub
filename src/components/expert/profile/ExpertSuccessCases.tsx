
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Expert } from '@/types/expert';

interface ExpertSuccessCasesProps {
  expert: Expert;
}

const ExpertSuccessCases: React.FC<ExpertSuccessCasesProps> = ({ expert }) => {
  if (!expert.successCases || expert.successCases.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-pretendard font-bold text-2xl mb-6">성공 사례</h2>
      <div className="space-y-8">
        {expert.successCases.map((caseItem, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-6">
              <h3 className="font-pretendard font-bold text-xl mb-3">
                {caseItem.title}
              </h3>
              <p className="text-neutral-700 mb-4">
                {caseItem.description}
              </p>
              {caseItem.results && caseItem.results.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-neutral-900 mb-2">주요 성과:</h4>
                  {caseItem.results.map((result, resultIdx) => (
                    <div key={resultIdx} className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-neutral-600">{result}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {caseItem.image && (
              <div className="h-60 w-full">
                <img 
                  src={caseItem.image} 
                  alt={caseItem.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertSuccessCases;
