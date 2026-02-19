
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="bg-white rounded-lg shadow-sm border border-neutral-100 px-4 md:px-5 data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="font-pretendard font-bold text-sm md:text-base text-neutral-900 hover:no-underline py-4 text-left">
              Q. {faq.question}
            </AccordionTrigger>
            <AccordionContent className="font-noto text-sm md:text-base text-neutral-600 pb-4">
              A. {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ServiceFAQs;
