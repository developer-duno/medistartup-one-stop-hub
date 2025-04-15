
import React from 'react';
import { Expert } from '@/types/expert';

interface ExpertCareerProps {
  expert: Expert;
}

const ExpertCareer: React.FC<ExpertCareerProps> = ({ expert }) => {
  const defaultCareerTimeline = expert.careerTimeline || 
    [{ year: expert.experience, position: expert.role, company: '', description: expert.specialty }];

  const defaultEducation = expert.educationHistory || [];

  return (
    <section>
      <h2 className="font-pretendard font-bold text-2xl mb-6">경력</h2>
      <div className="relative border-l-2 border-neutral-200 pl-8 pb-2 space-y-8">
        {defaultCareerTimeline.map((career, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-10 w-6 h-6 rounded-full bg-primary-50 border-4 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm font-medium mb-3">
                {career.year}
              </span>
              <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-1">
                {career.position}
              </h3>
              <p className="text-neutral-500 mb-3">{career.company}</p>
              <p className="text-neutral-600 text-sm">
                {career.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {defaultEducation.length > 0 && (
        <>
          <h2 className="font-pretendard font-bold text-2xl mb-6 mt-12">학력</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {defaultEducation.map((education, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary rounded-full text-sm font-medium">
                    {education.year || ''}
                  </span>
                </div>
                <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-1">
                  {education.degree}
                </h3>
                {education.institution && (
                  <p className="text-neutral-500">{education.institution}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ExpertCareer;
