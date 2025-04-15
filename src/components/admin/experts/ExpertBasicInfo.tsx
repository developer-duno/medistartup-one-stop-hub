
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { NewExpert } from '@/types/expert';

interface ExpertBasicInfoProps {
  form: UseFormReturn<NewExpert>;
}

const ExpertBasicInfo: React.FC<ExpertBasicInfoProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이름</FormLabel>
            <FormControl>
              <Input placeholder="홍길동" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>직책</FormLabel>
            <FormControl>
              <Input placeholder="재무 컨설턴트" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="specialty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>전문 분야</FormLabel>
            <FormControl>
              <Input placeholder="병원 재무설계 및 투자계획 전문" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>프로필 이미지 URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/image.jpg" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>경력 (년)</FormLabel>
            <FormControl>
              <Input placeholder="10년+" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="projects"
        render={({ field }) => (
          <FormItem>
            <FormLabel>프로젝트 수</FormLabel>
            <FormControl>
              <Input placeholder="150+" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>연락처 (관리용)</FormLabel>
            <FormControl>
              <Input placeholder="010-0000-0000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일 (관리용)</FormLabel>
            <FormControl>
              <Input placeholder="example@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ExpertBasicInfo;
