
import React from 'react';
import { Expert } from '@/types/expert';
import TestimonialGrid from './testimonials/TestimonialGrid';

interface ExpertTestimonialsProps {
  expert: Expert;
}

const ExpertTestimonials: React.FC<ExpertTestimonialsProps> = ({ expert }) => {
  // Check if testimonials exists and has at least one item
  if (!expert.testimonials || expert.testimonials.length === 0) {
    console.log("No testimonials found for expert:", expert.name);
    return null;
  }

  console.log("Rendering testimonials for expert:", expert.name, expert.testimonials.length);
  
  return (
    <section>
      <h2 className="font-pretendard font-bold text-xl md:text-2xl mb-4 md:mb-6">고객 추천사</h2>
      <TestimonialGrid testimonials={expert.testimonials} />
    </section>
  );
};

export default ExpertTestimonials;
