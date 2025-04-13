
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
import ExpertBasicInfo from '@/components/admin/experts/ExpertBasicInfo';
import ExpertDescription from '@/components/admin/experts/ExpertDescription';
import ExpertRegions from '@/components/admin/experts/ExpertRegions';
import ExpertServices from '@/components/admin/experts/ExpertServices';
import ExpertCertifications from '@/components/admin/experts/ExpertCertifications';
import ExpertFormActions from '@/components/admin/experts/ExpertFormActions';

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
    }
  });

  const onSubmit = (data: NewExpert) => {
    setIsSubmitting(true);
    
    // Combine form data with selected regions, services and certifications
    const expertData: NewExpert = {
      ...data,
      regions: selectedRegions,
      services: selectedServices,
      certifications: certifications.filter(cert => cert.trim() !== ''),
    };
    
    // Submit the application
    applyAsExpert(expertData);
    
    // Reset form
    form.reset();
    setSelectedRegions([]);
    setSelectedServices([]);
    setCertifications(['']);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    form.reset();
    setSelectedRegions([]);
    setSelectedServices([]);
    setCertifications(['']);
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
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-4">기본 정보</h3>
              <ExpertBasicInfo form={form} />
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-4">소개 및 성과</h3>
              <ExpertDescription form={form} />
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-4">지역 및 서비스</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ExpertRegions 
                    selectedRegions={selectedRegions} 
                    setSelectedRegions={setSelectedRegions} 
                  />
                </div>
                <div>
                  <ExpertServices 
                    selectedServices={selectedServices} 
                    setSelectedServices={setSelectedServices} 
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-4">자격증 및 수료</h3>
              <ExpertCertifications 
                certifications={certifications} 
                setCertifications={setCertifications} 
              />
            </div>
            
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
