
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { NewExpert } from '@/types/expert';
import { useExperts } from '@/contexts/ExpertsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import form components
import ExpertBasicInfo from '@/components/admin/experts/ExpertBasicInfo';
import ExpertDescription from '@/components/admin/experts/ExpertDescription';
import ExpertCertifications from '@/components/admin/experts/ExpertCertifications';
import ExpertRegions from '@/components/admin/experts/ExpertRegions';
import ExpertServices from '@/components/admin/experts/ExpertServices';
import ExpertFormActions from '@/components/admin/experts/ExpertFormActions';
import ExpertDetailedFields from '@/components/admin/experts/ExpertDetailedFields';
import ExpertSuccessCases from '@/components/admin/experts/ExpertSuccessCases';
import ExpertTestimonials from '@/components/admin/experts/ExpertTestimonials';

interface ExpertApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpertApplicationModal: React.FC<ExpertApplicationModalProps> = ({ open, onOpenChange }) => {
  const { applyAsExpert } = useExperts();
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Additional state for detailed profile
  const [keyAchievements, setKeyAchievements] = useState<string[]>([]);
  const [educationHistory, setEducationHistory] = useState<Array<{degree: string, institution: string, year: string}>>([]);
  const [careerTimeline, setCareerTimeline] = useState<Array<{year: string, position: string, company: string, description: string}>>([]);
  const [successCases, setSuccessCases] = useState<Array<{title: string, description: string, image?: string, results: string[]}>>([]);
  const [testimonials, setTestimonials] = useState<Array<{name: string, position: string, content: string, image?: string, video?: string}>>([]);
  
  const form = useForm<NewExpert>({
    defaultValues: {
      name: '',
      role: '',
      specialty: '',
      image: '',
      experience: '',
      projects: '',
      description: '',
      education: '',
      contact: '',
      email: '',
      achievements: '',
      coverImage: '',
    }
  });

  const onSubmit = (data: NewExpert) => {
    setIsSubmitting(true);
    
    // Combine form data with all detailed fields
    const expertData: NewExpert = {
      ...data,
      regions: selectedRegions,
      services: selectedServices,
      certifications: certifications.filter(cert => cert.trim() !== ''),
      keyAchievements: keyAchievements.filter(item => item.trim() !== ''),
      educationHistory: educationHistory.filter(edu => edu.degree.trim() !== '' || edu.institution.trim() !== ''),
      careerTimeline: careerTimeline.filter(career => career.company.trim() !== '' || career.position.trim() !== ''),
      successCases: successCases.filter(caseItem => caseItem.title.trim() !== ''),
      testimonials: testimonials.filter(testimonial => testimonial.name.trim() !== '' && testimonial.content.trim() !== '')
    };
    
    applyAsExpert(expertData);
    
    // Reset all form fields
    form.reset();
    setSelectedRegions([]);
    setSelectedServices([]);
    setCertifications(['']);
    setKeyAchievements([]);
    setEducationHistory([]);
    setCareerTimeline([]);
    setSuccessCases([]);
    setTestimonials([]);
    
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    form.reset();
    setSelectedRegions([]);
    setSelectedServices([]);
    setCertifications(['']);
    setKeyAchievements([]);
    setEducationHistory([]);
    setCareerTimeline([]);
    setSuccessCases([]);
    setTestimonials([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">전문가 지원 신청</DialogTitle>
          <DialogDescription>
            메디스타트업의 전문가로 활동하고 싶으시면 아래 양식을 작성해주세요.
            모든 신청서는 검토 후 승인됩니다.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="basic">기본 정보</TabsTrigger>
                <TabsTrigger value="detailed">상세 프로필</TabsTrigger>
                <TabsTrigger value="cases">성공 사례</TabsTrigger>
                <TabsTrigger value="testimonials">추천사</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-4">기본 정보</h3>
                  <ExpertBasicInfo form={form} />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-4">소개 및 성과</h3>
                  <ExpertDescription form={form} />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-4">자격증 및 지역/서비스</h3>
                  <div className="space-y-6">
                    <ExpertCertifications 
                      certifications={certifications} 
                      setCertifications={setCertifications} 
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ExpertRegions 
                        selectedRegions={selectedRegions} 
                        setSelectedRegions={setSelectedRegions} 
                      />
                      
                      <ExpertServices 
                        selectedServices={selectedServices} 
                        setSelectedServices={setSelectedServices} 
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed">
                <ExpertDetailedFields
                  form={form}
                  keyAchievements={keyAchievements}
                  setKeyAchievements={setKeyAchievements}
                  educationHistory={educationHistory}
                  setEducationHistory={setEducationHistory}
                  careerTimeline={careerTimeline}
                  setCareerTimeline={setCareerTimeline}
                />
              </TabsContent>
              
              <TabsContent value="cases">
                <ExpertSuccessCases
                  successCases={successCases}
                  setSuccessCases={setSuccessCases}
                />
              </TabsContent>
              
              <TabsContent value="testimonials">
                <ExpertTestimonials
                  testimonials={testimonials}
                  setTestimonials={setTestimonials}
                />
              </TabsContent>
            </Tabs>
            
            <div className="text-sm text-muted-foreground">
              모든 신청서는 관리자 검토 후 승인됩니다. 승인이 완료되면 연락드리겠습니다.
            </div>
            
            <ExpertFormActions onCancel={handleCancel} isSubmitting={isSubmitting} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpertApplicationModal;
