
import React, { useState } from 'react';
import { X, Save, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useExperts } from '@/contexts/ExpertsContext';
import { NewExpert } from '@/types/expert';
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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
      certifications: []
    }
  });

  const regionOptions = ['서울', '경기', '인천', '대전', '충남', '충북', '부산', '대구', '광주', '제주'];
  
  const serviceOptions = [
    '입지 분석', '재무 컨설팅', '설계 및 인테리어', '인허가 대행', 
    '인력 채용', '마케팅 전략', '의료기기 구입 및 설치', '수납 및 의료폐기물 처리'
  ];

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };
  
  const addCertificationField = () => {
    setCertifications([...certifications, '']);
  };
  
  const removeCertificationField = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };
  
  const handleCertificationChange = (index: number, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = value;
    setCertifications(updatedCertifications);
  };

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
      certifications: filteredCertifications
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
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>학력</FormLabel>
                  <FormControl>
                    <Input placeholder="OO대학교 OO학과 졸업" {...field} />
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
          
          <div>
            <FormLabel>자격증 및 수료</FormLabel>
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Input
                  placeholder={`자격증 ${index + 1}`}
                  value={cert}
                  onChange={(e) => handleCertificationChange(index, e.target.value)}
                  className="flex-1"
                />
                {index > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => removeCertificationField(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
                {index === certifications.length - 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={addCertificationField}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel>지역 선택 (다중 선택)</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {regionOptions.map((region) => (
                  <label key={region} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`region-${region}`}
                      checked={selectedRegions.includes(region)}
                      onCheckedChange={() => handleRegionToggle(region)}
                    />
                    <span className="text-sm">{region}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <FormLabel>서비스 카테고리 (다중 선택)</FormLabel>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service}`}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              취소
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              저장하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddExpertForm;
