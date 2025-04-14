
import React from 'react';

interface ProcessStepProps {
  step: number;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  process: ProcessStepProps[];
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ process }) => {
  return (
    <section className="mb-10 md:mb-16">
      <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-4 md:mb-6">
        서비스 프로세스
      </h2>
      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-neutral-200"></div>
        <div className="space-y-6 md:space-y-8">
          {process.map((step) => (
            <div key={step.step} className="relative pl-12 md:pl-16">
              <div className="absolute left-0 rounded-full w-8 h-8 md:w-12 md:h-12 bg-primary flex items-center justify-center text-white font-pretendard font-bold text-sm md:text-base">
                {step.step}
              </div>
              <div>
                <h3 className="font-pretendard font-bold text-lg md:text-xl text-neutral-900 mb-1 md:mb-2">
                  {step.title}
                </h3>
                <p className="font-noto text-sm md:text-base text-neutral-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
