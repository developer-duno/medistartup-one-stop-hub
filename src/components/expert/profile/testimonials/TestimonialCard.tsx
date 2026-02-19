
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    content: string;
    name: string;
    position?: string;
    image?: string;
    video?: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col touch-manipulation select-none transition-all duration-150 active:scale-[0.98] active:shadow-inner">
      <div className="mb-4">
        <Quote className="h-8 w-8 text-primary opacity-40" />
      </div>
      
      <p className="text-neutral-700 italic flex-grow mb-6">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center gap-3">
        {testimonial.image && (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-medium text-neutral-900">{testimonial.name}</p>
          {testimonial.position && (
            <p className="text-neutral-500 text-sm">{testimonial.position}</p>
          )}
        </div>
      </div>
      
      {testimonial.video && (
        <div className="mt-4 aspect-video w-full">
          <iframe
            src={testimonial.video}
            title={`${testimonial.name} 추천 영상`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
