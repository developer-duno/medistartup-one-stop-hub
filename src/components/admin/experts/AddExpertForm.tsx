
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useExperts } from '@/contexts/ExpertsContext';
import { NewExpert } from '@/types/expert';

// Import sub-components
import ExpertBasicInfo from './ExpertBasicInfo';
import ExpertDescription from './ExpertDescription';
import ExpertCertifications from './ExpertCertifications';
import ExpertRegions from './ExpertRegions';
import ExpertServices from './ExpertServices';
import ExpertFormActions from './ExpertFormActions';

interface AddExpertFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const AddExpertForm: React.FC<AddExpertFormProps> = ({ onCancel, onSubmit }) => {
  const { addExpert } = useExperts();
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegionalManager, setIsRegionalManager] = useState(false);
  
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

  const handleFormSubmit = (data: NewExpert) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    
    setIsSubmitting(true);
    
    // Filter out empty certifications
    const filteredCertifications = certifications.filter(cert => cert.trim() !== '');
    
    // Ensure regions and services are included in the submission
    const expertData: NewExpert = {
      ...data,
      regions: selectedRegions,
      services: selectedServices,
      certifications: filteredCertifications,
      isRegionalManager: isRegionalManager,
      managedRegions: isRegionalManager ? selectedRegions : []
    };

    console.log("Submitting expert data:", expertData);

    // Add the expert to our context
    addExpert(expertData);
    
    // Also call the original onSubmit for any additional logic
    onSubmit(expertData);
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-pretendard font-bold text-xl">전문가 추가</h3>
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
          
          <ExpertFormActions onCancel={onCancel} isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
};

export default AddExpertForm;
