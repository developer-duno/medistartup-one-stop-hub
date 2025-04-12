
import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useExperts } from '@/contexts/ExpertsContext';
import { NewExpert } from '@/types/expert';
import { Textarea } from "@/components/ui/textarea";

interface AddExpertFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const AddExpertForm: React.FC<AddExpertFormProps> = ({ onCancel, onSubmit }) => {
  const { addExpert } = useExperts();
  
  const form = useForm<NewExpert>({
    defaultValues: {
      name: '',
      role: '',
      specialty: '',
      image: '',
      experience: '',
      projects: '',
      description: '',
      regions: [],
      services: []
    }
  });

  const regionOptions = ['서울', '경기', '인천', '대전', '충남', '충북', '부산', '대구', '광주', '제주'];
  
  const serviceOptions = [
    '입지 분석', '재무 컨설팅', '설계 및 인테리어', '인허가 대행', 
    '인력 채용', '마케팅 전략', '의료기기 구입 및 설치', '수납 및 의료폐기물 처리'
  ];

  const handleFormSubmit = (data: NewExpert) => {
    // Add the expert to our context
    addExpert(data);
    
    // Also call the original onSubmit for any additional logic
    onSubmit(data);
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
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel>지역 선택 (다중 선택)</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {regionOptions.map((region) => (
                  <label key={region} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      value={region}
                      onChange={(e) => {
                        const currentRegions = form.getValues("regions") as string[] || [];
                        if (e.target.checked) {
                          form.setValue("regions", [...currentRegions, region]);
                        } else {
                          form.setValue("regions", currentRegions.filter((r) => r !== region));
                        }
                      }}
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
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      value={service}
                      onChange={(e) => {
                        const currentServices = form.getValues("services") as string[] || [];
                        if (e.target.checked) {
                          form.setValue("services", [...currentServices, service]);
                        } else {
                          form.setValue("services", currentServices.filter((s) => s !== service));
                        }
                      }}
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
