
import React from 'react';
import TestimonialCard from './TestimonialCard';

interface TestimonialGridProps {
  testimonials: Array<{
    name: string;
    position?: string;
    content: string;
    image?: string;
    video?: string;
  }>;
}

const TestimonialGrid: React.FC<TestimonialGridProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, idx) => (
        <TestimonialCard key={idx} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialGrid;
