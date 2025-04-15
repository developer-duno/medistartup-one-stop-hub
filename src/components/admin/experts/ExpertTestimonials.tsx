
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Minus } from 'lucide-react';

interface ExpertTestimonialsProps {
  testimonials: Array<{
    name: string;
    position: string;
    content: string;
    image?: string;
    video?: string;
  }>;
  setTestimonials: React.Dispatch<React.SetStateAction<Array<{
    name: string;
    position: string;
    content: string;
    image?: string;
    video?: string;
  }>>>;
}

const ExpertTestimonials: React.FC<ExpertTestimonialsProps> = ({
  testimonials,
  setTestimonials
}) => {
  // Add a new testimonial
  const addTestimonial = () => {
    setTestimonials([...testimonials, {
      name: '',
      position: '',
      content: '',
      image: '',
      video: ''
    }]);
  };
  
  // Remove a testimonial
  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };
  
  // Update testimonial field
  const updateField = (index: number, field: string, value: string) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <FormLabel className="text-base">추천사</FormLabel>
      </div>
      
      {testimonials.length === 0 ? (
        <div className="text-center p-6 border border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">고객 추천사를 추가해 주세요</p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={addTestimonial}
          >
            <Plus className="h-4 w-4 mr-2" />
            추천사 추가
          </Button>
        </div>
      ) : (
        <>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="mb-6 border rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">추천사 {index + 1}</h4>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeTestimonial(index)}
                >
                  <Minus className="h-4 w-4 mr-1" />
                  삭제
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <FormLabel className="text-sm">이름</FormLabel>
                  <Input 
                    placeholder="고객 이름" 
                    value={testimonial.name} 
                    onChange={(e) => updateField(index, 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <FormLabel className="text-sm">직책</FormLabel>
                  <Input 
                    placeholder="직책 (예: OO병원 원장)" 
                    value={testimonial.position} 
                    onChange={(e) => updateField(index, 'position', e.target.value)}
                  />
                </div>
                
                <div>
                  <FormLabel className="text-sm">내용</FormLabel>
                  <Textarea 
                    placeholder="추천사 내용" 
                    value={testimonial.content} 
                    onChange={(e) => updateField(index, 'content', e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div>
                  <FormLabel className="text-sm">이미지 URL</FormLabel>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    value={testimonial.image || ''} 
                    onChange={(e) => updateField(index, 'image', e.target.value)}
                  />
                </div>
                
                <div>
                  <FormLabel className="text-sm">영상 URL (옵션)</FormLabel>
                  <Input 
                    placeholder="https://www.youtube.com/embed/..." 
                    value={testimonial.video || ''} 
                    onChange={(e) => updateField(index, 'video', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={addTestimonial}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            추천사 추가
          </Button>
        </>
      )}
    </div>
  );
};

export default ExpertTestimonials;
