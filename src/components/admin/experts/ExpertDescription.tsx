
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { NewExpert } from '@/types/expert';

interface ExpertDescriptionProps {
  form: UseFormReturn<NewExpert>;
}

const ExpertDescription: React.FC<ExpertDescriptionProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>소개</FormLabel>
            <FormControl>
              <Textarea 
                className="w-full p-2 border border-input rounded-md"
                rows={4}
                placeholder="전문가 소개를 입력하세요"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="achievements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>주요 성과</FormLabel>
            <FormControl>
              <Textarea 
                className="w-full p-2 border border-input rounded-md"
                rows={3}
                placeholder="주요 성과 및 실적을 입력하세요"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ExpertDescription;
