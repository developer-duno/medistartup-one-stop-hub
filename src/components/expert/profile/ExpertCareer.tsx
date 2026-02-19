
import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { Expert } from '@/types/expert';

interface ExpertCareerProps {
  expert: Expert;
}

const ExpertCareer: React.FC<ExpertCareerProps> = ({ expert }) => {
  const defaultCareerTimeline = expert.careerTimeline || 
    [{ year: expert.experience, position: expert.role, company: '', description: expert.specialty }];

  const defaultEducation = expert.educationHistory || [];

  return (
    <section className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-primary/10 p-1.5 rounded-md">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <h2 className="font-pretendard font-bold text-lg md:text-2xl">경력</h2>
        </div>
        <div className="relative border-l-2 border-primary/20 pl-6 md:pl-8 space-y-6">
          {defaultCareerTimeline.map((career, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[calc(1.5rem+1px)] md:-left-[calc(2rem+1px)] w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary-50 border-3 md:border-4 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
              </div>
              <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary rounded-full text-xs md:text-sm font-medium mb-2">
                {career.year}
              </span>
              <h3 className="font-pretendard font-bold text-base md:text-lg text-neutral-900 mb-0.5">
                {career.position}
              </h3>
              {career.company && (
                <p className="text-neutral-500 text-sm mb-1.5">{career.company}</p>
              )}
              {career.description && (
                <p className="text-neutral-600 text-xs md:text-sm leading-relaxed">
                  {career.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {defaultEducation.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-pretendard font-bold text-lg md:text-2xl">학력</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {defaultEducation.map((education, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-lg p-4">
                <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary rounded-full text-xs font-medium mb-2">
                  {education.year || ''}
                </span>
                <h3 className="font-pretendard font-bold text-sm md:text-base text-neutral-900 mb-0.5">
                  {education.degree}
                </h3>
                {education.institution && (
                  <p className="text-neutral-500 text-xs md:text-sm">{education.institution}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpertCareer;
