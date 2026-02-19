
import React from 'react';
import { Expert } from '@/types/expert';
import SuccessCaseItem from './success-cases/SuccessCaseItem';

interface ExpertSuccessCasesProps {
  expert: Expert;
}

const ExpertSuccessCases: React.FC<ExpertSuccessCasesProps> = ({ expert }) => {
  if (!expert.successCases || expert.successCases.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-pretendard font-bold text-xl md:text-2xl mb-4 md:mb-6">성공 사례</h2>
      <div className="space-y-8">
        {expert.successCases.map((caseItem, idx) => (
          <SuccessCaseItem
            key={idx}
            title={caseItem.title}
            description={caseItem.description}
            results={caseItem.results}
            image={caseItem.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ExpertSuccessCases;

