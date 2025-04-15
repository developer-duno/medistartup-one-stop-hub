
import React from 'react';
import { Expert } from '@/types/expert';
import TestimonialGrid from './testimonials/TestimonialGrid';

interface ExpertTestimonialsProps {
  expert: Expert;
}

const ExpertTestimonials: React.FC<ExpertTestimonialsProps> = ({ expert }) => {
  if (!expert.testimonials || expert.testimonials.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="font-pretendard font-bold text-2xl mb-6">고객 추천사</h2>
      <TestimonialGrid testimonials={expert.testimonials} />
    </section>
  );
};

export default ExpertTestimonials;
