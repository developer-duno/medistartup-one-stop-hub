
import React from 'react';
import { CheckCircle, User } from 'lucide-react';
import { Expert } from '@/types/expert';

interface ExpertOverviewProps {
  expert: Expert;
}

const ExpertOverview: React.FC<ExpertOverviewProps> = ({ expert }) => {
  const keyAchievements = (expert.keyAchievements || []).filter(a => a && a.trim() !== '');

  return (
    <section className="animate-fade-in space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <User className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-pretendard font-bold text-lg md:text-2xl">전문가 소개</h2>
        </div>
        <p className="font-noto text-neutral-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
          {expert.description}
        </p>
      </div>
      
      {keyAchievements.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-pretendard font-bold text-lg md:text-2xl">핵심 성과</h2>
          </div>
          <div className="space-y-2.5">
            {keyAchievements.map((achievement: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="mt-1 shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <p className="font-noto text-neutral-700 text-sm md:text-base">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpertOverview;
