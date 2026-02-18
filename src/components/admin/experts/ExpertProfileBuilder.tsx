import React, { useState, useEffect, useCallback } from 'react';
import { X, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useExperts } from '@/contexts/ExpertsContext';
import { NewExpert, Expert } from '@/types/expert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

import ExpertBasicInfo from './ExpertBasicInfo';
import ExpertDescription from './ExpertDescription';
import ExpertCertifications from './ExpertCertifications';
import ExpertRegions from './ExpertRegions';
import ExpertServices from './ExpertServices';
import ExpertFormActions from './ExpertFormActions';
import ExpertDetailedFields from './ExpertDetailedFields';
import ExpertSuccessCases from './ExpertSuccessCases';
import ExpertTestimonials from './ExpertTestimonials';
import ExpertProfilePreview from './ExpertProfilePreview';

interface ExpertProfileBuilderProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  expertToEdit?: Expert | null;
}

const ExpertProfileBuilder: React.FC<ExpertProfileBuilderProps> = ({ onCancel, onSubmit, expertToEdit }) => {
  const { addExpert, updateExpert } = useExperts();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(expertToEdit?.regions || []);
  const [selectedServices, setSelectedServices] = useState<string[]>(expertToEdit?.services || []);
  const [certifications, setCertifications] = useState<string[]>(
    expertToEdit?.certifications?.length ? expertToEdit.certifications : ['']
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegionalManager, setIsRegionalManager] = useState(expertToEdit?.isRegionalManager || false);
  
  const [keyAchievements, setKeyAchievements] = useState<string[]>(expertToEdit?.keyAchievements || []);
  const [educationHistory, setEducationHistory] = useState<Array<{degree: string, institution: string, year: string}>>(
    expertToEdit?.educationHistory || []
  );
  const [careerTimeline, setCareerTimeline] = useState<Array<{year: string, position: string, company: string, description: string}>>(
    expertToEdit?.careerTimeline || []
  );
  const [successCases, setSuccessCases] = useState<Array<{title: string, description: string, image?: string, results: string[]}>>(
    expertToEdit?.successCases || []
  );
  const [testimonials, setTestimonials] = useState<Array<{name: string, position: string, content: string, image?: string, video?: string}>>(
    expertToEdit?.testimonials || []
  );
  
  const form = useForm<NewExpert>({
    defaultValues: expertToEdit || {
      name: '', role: '', specialty: '', image: '', experience: '',
      projects: '', description: '', contact: '', email: '',
      regions: [], services: [], certifications: [],
      isRegionalManager: false, managedRegions: [], coverImage: ''
    }
  });

  const watchedValues = form.watch();

  useEffect(() => {
    if (expertToEdit) {
      form.reset(expertToEdit);
      setSelectedRegions(expertToEdit.regions || []);
      setSelectedServices(expertToEdit.services || []);
      setCertifications(expertToEdit.certifications?.length ? expertToEdit.certifications : ['']);
      setIsRegionalManager(expertToEdit.isRegionalManager || false);
      setKeyAchievements(expertToEdit.keyAchievements || []);
      setEducationHistory(expertToEdit.educationHistory || []);
      setCareerTimeline(expertToEdit.careerTimeline || []);
      setSuccessCases(expertToEdit.successCases || []);
      setTestimonials(expertToEdit.testimonials || []);
    }
  }, [expertToEdit, form]);

  // Build preview data from form state
  const previewExpert: Partial<Expert> = {
    ...watchedValues,
    regions: selectedRegions,
    services: selectedServices,
    certifications: certifications.filter(c => c.trim()),
    keyAchievements,
    educationHistory,
    careerTimeline,
    successCases,
    testimonials,
  };

  const handleFormSubmit = async (data: NewExpert) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const filteredCertifications = certifications.filter(cert => cert.trim() !== '');
    
    const expertData: NewExpert = {
      ...data,
      regions: selectedRegions,
      services: selectedServices,
      certifications: filteredCertifications,
      isRegionalManager,
      managedRegions: isRegionalManager ? selectedRegions : [],
      keyAchievements: keyAchievements.filter(item => item.trim() !== ''),
      educationHistory: educationHistory.filter(edu => edu.degree.trim() !== '' || edu.institution.trim() !== ''),
      careerTimeline: careerTimeline.filter(career => career.company.trim() !== '' || career.position.trim() !== ''),
      successCases: successCases.filter(caseItem => caseItem.title.trim() !== ''),
      testimonials: testimonials.filter(testimonial => testimonial.name.trim() !== '' && testimonial.content.trim() !== '')
    };

    try {
      if (expertToEdit) {
        await updateExpert({ ...expertData, id: expertToEdit.id, showOnMain: expertToEdit.showOnMain, displayOrder: expertToEdit.displayOrder });
      } else {
        await addExpert(expertData);
      }
      onSubmit(expertData);
    } catch (error) {
      console.error('Error saving expert:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-3">
          <h3 className="font-pretendard font-bold text-xl">
            {expertToEdit ? '전문가 프로필 수정' : '전문가 프로필 빌더'}
          </h3>
          {expertToEdit && (
            <a 
              href={`/experts/${expertToEdit.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              공개 프로필 보기
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showPreview ? '미리보기 숨기기' : '미리보기 보기'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className={`flex ${showPreview ? 'flex-col lg:flex-row' : ''}`}>
        {/* Form Section */}
        <div className={`p-4 ${showPreview ? 'lg:w-3/5 lg:border-r' : 'w-full'}`}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="basic">기본 정보</TabsTrigger>
                  <TabsTrigger value="detailed">상세 프로필</TabsTrigger>
                  <TabsTrigger value="cases">성공 사례</TabsTrigger>
                  <TabsTrigger value="testimonials">추천사</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <ExpertBasicInfo form={form} />
                  <ExpertDescription form={form} />
                  <ExpertCertifications 
                    certifications={certifications} 
                    setCertifications={setCertifications} 
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ExpertRegions 
                      selectedRegions={selectedRegions} 
                      setSelectedRegions={setSelectedRegions}
                      isRegionalManager={isRegionalManager}
                      setIsRegionalManager={setIsRegionalManager}
                    />
                    <ExpertServices 
                      selectedServices={selectedServices} 
                      setSelectedServices={setSelectedServices} 
                    />
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
              
              <ExpertFormActions onCancel={onCancel} isSubmitting={isSubmitting} />
            </form>
          </Form>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="lg:w-2/5 p-4 bg-muted/30">
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-muted-foreground">실시간 미리보기</h4>
                {expertToEdit && (
                  <a 
                    href={`/experts/${expertToEdit.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    실제 페이지 <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="max-h-[72vh] overflow-y-auto rounded-lg shadow-sm">
                <ExpertProfilePreview expert={previewExpert} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertProfileBuilder;
