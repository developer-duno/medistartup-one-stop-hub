
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Expert } from '@/types/expert';

interface ExpertOverviewProps {
  expert: Expert;
}

const ExpertOverview: React.FC<ExpertOverviewProps> = ({ expert }) => {
  const keyAchievements = (expert.keyAchievements || []).filter(a => a && a.trim() !== '');

  return (
    <section className="animate-fade-in">
      <h2 className="font-pretendard font-bold text-2xl mb-4">전문가 소개</h2>
      <p className="font-noto text-neutral-700 leading-relaxed whitespace-pre-line mb-8">
        {expert.description}
      </p>
      
      {keyAchievements.length > 0 && (
        <>
          <h2 className="font-pretendard font-bold text-2xl mb-4">핵심 성과</h2>
          <div className="space-y-3">
            {keyAchievements.map((achievement: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="mt-1.5">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <p className="font-noto text-neutral-700">{achievement}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ExpertOverview;
