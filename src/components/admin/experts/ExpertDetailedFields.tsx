
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { NewExpert } from '@/types/expert';
import { Plus, Minus } from 'lucide-react';

interface ExpertDetailedFieldsProps {
  form: UseFormReturn<NewExpert>;
  keyAchievements: string[];
  setKeyAchievements: React.Dispatch<React.SetStateAction<string[]>>;
  educationHistory: Array<{degree: string, institution: string, year: string}>;
  setEducationHistory: React.Dispatch<React.SetStateAction<Array<{degree: string, institution: string, year: string}>>>;
  careerTimeline: Array<{year: string, position: string, company: string, description: string}>;
  setCareerTimeline: React.Dispatch<React.SetStateAction<Array<{year: string, position: string, company: string, description: string}>>>;
}

const ExpertDetailedFields: React.FC<ExpertDetailedFieldsProps> = ({
  form,
  keyAchievements,
  setKeyAchievements,
  educationHistory,
  setEducationHistory,
  careerTimeline,
  setCareerTimeline
}) => {
  // Key Achievements handlers
  const addKeyAchievement = () => {
    setKeyAchievements([...keyAchievements, '']);
  };
  
  const removeKeyAchievement = (index: number) => {
    setKeyAchievements(keyAchievements.filter((_, i) => i !== index));
  };
  
  const handleKeyAchievementChange = (index: number, value: string) => {
    const updated = [...keyAchievements];
    updated[index] = value;
    setKeyAchievements(updated);
  };
  
  // Education handlers
  const addEducation = () => {
    setEducationHistory([...educationHistory, {degree: '', institution: '', year: ''}]);
  };
  
  const removeEducation = (index: number) => {
    setEducationHistory(educationHistory.filter((_, i) => i !== index));
  };
  
  const handleEducationChange = (index: number, field: string, value: string) => {
    const updated = [...educationHistory];
    updated[index] = {...updated[index], [field]: value};
    setEducationHistory(updated);
  };
  
  // Career Timeline handlers
  const addCareerEntry = () => {
    setCareerTimeline([...careerTimeline, {year: '', position: '', company: '', description: ''}]);
  };
  
  const removeCareerEntry = (index: number) => {
    setCareerTimeline(careerTimeline.filter((_, i) => i !== index));
  };
  
  const handleCareerChange = (index: number, field: string, value: string) => {
    const updated = [...careerTimeline];
    updated[index] = {...updated[index], [field]: value};
    setCareerTimeline(updated);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="coverImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>커버 이미지 URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/cover-image.jpg" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Key Achievements */}
      <div>
        <FormLabel className="mb-2 block">주요 성과 항목</FormLabel>
        {keyAchievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Input
              placeholder={`주요 성과 ${index + 1}`}
              value={achievement}
              onChange={(e) => handleKeyAchievementChange(index, e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => removeKeyAchievement(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            {index === keyAchievements.length - 1 && (
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={addKeyAchievement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {keyAchievements.length === 0 && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={addKeyAchievement}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            주요 성과 추가
          </Button>
        )}
      </div>
      
      {/* Education History */}
      <div>
        <FormLabel className="mb-2 block">학력</FormLabel>
        {educationHistory.map((edu, index) => (
          <div key={index} className="p-4 border rounded-md mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <Input
                placeholder="학위"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              />
              <Input
                placeholder="취득연도"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="교육기관"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => removeEducation(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button 
          type="button" 
          variant="outline" 
          onClick={addEducation}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          학력 추가
        </Button>
      </div>
      
      {/* Career Timeline */}
      <div>
        <FormLabel className="mb-2 block">경력 사항</FormLabel>
        {careerTimeline.map((career, index) => (
          <div key={index} className="p-4 border rounded-md mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <Input
                placeholder="기간 (예: 2018-현재)"
                value={career.year}
                onChange={(e) => handleCareerChange(index, 'year', e.target.value)}
              />
              <Input
                placeholder="직책"
                value={career.position}
                onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
              />
            </div>
            <Input
              placeholder="회사/기관명"
              value={career.company}
              onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Input
                placeholder="담당 업무 설명"
                value={career.description}
                onChange={(e) => handleCareerChange(index, 'description', e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => removeCareerEntry(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button 
          type="button" 
          variant="outline" 
          onClick={addCareerEntry}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          경력 추가
        </Button>
      </div>
    </div>
  );
};

export default ExpertDetailedFields;
