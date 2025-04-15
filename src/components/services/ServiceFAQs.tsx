
import React from 'react';
import ServiceCard from './ServiceCard';

interface FAQProps {
  question: string;
  answer: string;
}

interface ServiceFAQsProps {
  faqs: FAQProps[];
}

const ServiceFAQs: React.FC<ServiceFAQsProps> = ({ faqs }) => {
  return (
    <section className="mb-10 md:mb-16">
      <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-4 md:mb-6">
        자주 묻는 질문
      </h2>
      <div className="space-y-4 md:space-y-6">
        {faqs.map((faq, index) => (
          <ServiceCard key={index}>
            <h3 className="font-pretendard font-bold text-base md:text-lg text-neutral-900 mb-2 md:mb-3">
              Q. {faq.question}
            </h3>
            <p className="font-noto text-sm md:text-base text-neutral-600">
              A. {faq.answer}
            </p>
          </ServiceCard>
        ))}
      </div>
    </section>
  );
};

export default ServiceFAQs;
