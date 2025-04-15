
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useExperts } from '@/contexts/ExpertsContext';
import { NewExpert, Expert } from '@/types/expert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import sub-components
import ExpertBasicInfo from './ExpertBasicInfo';
import ExpertDescription from './ExpertDescription';
import ExpertCertifications from './ExpertCertifications';
import ExpertRegions from './ExpertRegions';
import ExpertServices from './ExpertServices';
import ExpertFormActions from './ExpertFormActions';
import ExpertDetailedFields from './ExpertDetailedFields';
import ExpertSuccessCases from './ExpertSuccessCases';
import ExpertTestimonials from './ExpertTestimonials';

interface AddExpertFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  expertToEdit?: Expert | null;
}

const AddExpertForm: React.FC<AddExpertFormProps> = ({ onCancel, onSubmit, expertToEdit }) => {
  const { addExpert, updateExpert } = useExperts();
  const [selectedRegions, setSelectedRegions] = useState<string[]>(expertToEdit?.regions || []);
  const [selectedServices, setSelectedServices] = useState<string[]>(expertToEdit?.services || []);
  const [certifications, setCertifications] = useState<string[]>(
    expertToEdit?.certifications?.length ? expertToEdit.certifications : ['']
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegionalManager, setIsRegionalManager] = useState(expertToEdit?.isRegionalManager || false);
  
  // Detailed profile fields
  const [keyAchievements, setKeyAchievements] = useState<string[]>(
    expertToEdit?.keyAchievements || []
  );
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
      name: '',
      role: '',
      specialty: '',
      image: '',
      experience: '',
      projects: '',
      description: '',
      education: '',
      achievements: '',
      contact: '',
      email: '',
      regions: [],
      services: [],
      certifications: [],
      isRegionalManager: false,
      managedRegions: []
    }
  });

  useEffect(() => {
    if (expertToEdit) {
      form.reset(expertToEdit);
      
      setSelectedRegions(expertToEdit.regions || []);
      setSelectedServices(expertToEdit.services || []);
      setCertifications(expertToEdit.certifications?.length ? expertToEdit.certifications : ['']);
      setIsRegionalManager(expertToEdit.isRegionalManager || false);
      
      // Set detailed profile fields
      setKeyAchievements(expertToEdit.keyAchievements || []);
      setEducationHistory(expertToEdit.educationHistory || []);
      setCareerTimeline(expertToEdit.careerTimeline || []);
      setSuccessCases(expertToEdit.successCases || []);
      setTestimonials(expertToEdit.testimonials || []);
    }
  }, [expertToEdit, form]);

  const handleFormSubmit = (data: NewExpert) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    
    setIsSubmitting(true);
    
    const filteredCertifications = certifications.filter(cert => cert.trim() !== '');
    
    const expertData: NewExpert = {
      ...data,
      regions: selectedRegions,
      services: selectedServices,
      certifications: filteredCertifications,
      isRegionalManager: isRegionalManager,
      managedRegions: isRegionalManager ? selectedRegions : [],
      
      // Add detailed profile fields
      keyAchievements: keyAchievements.filter(item => item.trim() !== ''),
      educationHistory: educationHistory.filter(edu => edu.degree.trim() !== '' || edu.institution.trim() !== ''),
      careerTimeline: careerTimeline.filter(career => career.company.trim() !== '' || career.position.trim() !== ''),
      successCases: successCases.filter(caseItem => caseItem.title.trim() !== ''),
      testimonials: testimonials.filter(testimonial => testimonial.name.trim() !== '' && testimonial.content.trim() !== '')
    };

    console.log("Submitting expert data:", expertData);

    if (expertToEdit) {
      updateExpert({
        ...expertData,
        id: expertToEdit.id,
        showOnMain: expertToEdit.showOnMain,
        displayOrder: expertToEdit.displayOrder
      });
      console.log("Updated expert:", expertToEdit.id);
    } else {
      addExpert(expertData);
      console.log("Added new expert");
    }
    
    onSubmit(expertData);
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-pretendard font-bold text-xl">
          {expertToEdit ? '전문가 수정' : '전문가 추가'}
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto">
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
  );
};

export default AddExpertForm;
