import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useConsultation } from '@/contexts/ConsultationContext';
import { Users, X } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';

interface ConsultationFormState {
  name: string;
  phone: string;
  email: string;
  region: string;
  specialty: string;
  message: string;
  consent: boolean;
}

const ConsultationDialog: React.FC = () => {
  const { isConsultationOpen, closeConsultation, getSelectedExpertsData, selectedExperts, deselectExpert } = useConsultation();
  const { toast } = useToast();
  const selectedExpertsData = getSelectedExpertsData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, setFormState] = useState<ConsultationFormState>({
    name: '',
    phone: '',
    email: '',
    region: '',
    specialty: '',
    message: '',
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          name: formState.name,
          phone: formState.phone,
          email: formState.email || '',
          region: formState.region,
          specialty: formState.specialty,
          message: formState.message || '',
          selected_expert_ids: selectedExperts,
          status: 'pending',
        });

      if (error) {
        console.error('Error submitting consultation:', error);
        toast({
          title: "오류 발생",
          description: "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
        return;
      }

      // Send email notification (non-blocking)
      supabase.functions.invoke('send-consultation-notification', {
        body: {
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          region: formState.region,
          specialty: formState.specialty,
          message: formState.message,
        },
      }).catch((err) => console.error('Notification error:', err));
      
      toast({
        title: "상담 신청이 완료되었습니다",
        description: "담당 컨설턴트가 영업일 기준 1일 이내에 연락드릴 예정입니다.",
      });
      
      closeConsultation();
      setFormState({
        name: '',
        phone: '',
        email: '',
        region: '',
        specialty: '',
        message: '',
        consent: false
      });
    } catch (error) {
      console.error('Error submitting consultation:', error);
      toast({
        title: "오류 발생",
        description: "상담 신청 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeExpert = (expertId: number) => {
    deselectExpert(expertId);
  };

  return (
    <Dialog open={isConsultationOpen} onOpenChange={closeConsultation}>
      <DialogContent className="max-w-lg bg-white/90 backdrop-blur-lg border border-neutral-200 shadow-lg max-h-[90vh] p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-pretendard font-bold text-center">
                무료 상담
              </DialogTitle>
            </DialogHeader>
            
            {selectedExpertsData.length > 0 && (
              <div className="mb-6">
                <label className="block font-noto text-sm text-neutral-700 mb-2">
                  선택한 상담 전문가
                </label>
                <div className="border border-neutral-300 rounded-md p-4 bg-neutral-50/50 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {selectedExpertsData.map((expert) => expert && (
                      <div 
                        key={expert.id}
                        className="bg-primary-50 text-primary text-sm px-3 py-2 rounded-md flex items-center gap-1.5"
                      >
                        <Users className="h-4 w-4" />
                        <span>{expert.name}</span>
                        <span className="text-primary-600 text-xs">({expert.services[0]})</span>
                        <button 
                          onClick={() => removeExpert(expert.id)} 
                          className="ml-1 text-neutral-400 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-noto text-sm text-neutral-700 mb-1">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    placeholder="홍길동"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-noto text-sm text-neutral-700 mb-1">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    placeholder="010-1234-5678"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-noto text-sm text-neutral-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  placeholder="example@medistartup.kr"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="region" className="block font-noto text-sm text-neutral-700 mb-1">
                    관심 지역 *
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formState.region}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    required
                  >
                    <option value="">선택해주세요</option>
                    <optgroup label="수도권">
                      <option value="서울">서울</option>
                      <option value="경기남부">경기남부</option>
                      <option value="경기북부">경기북부</option>
                      <option value="인천">인천</option>
                    </optgroup>
                    <optgroup label="충청권">
                      <option value="대전">대전</option>
                      <option value="세종">세종</option>
                      <option value="충남">충남</option>
                      <option value="충북">충북</option>
                    </optgroup>
                    <optgroup label="경상권">
                      <option value="부산">부산</option>
                      <option value="울산">울산</option>
                      <option value="대구">대구</option>
                      <option value="경남">경남</option>
                      <option value="경북">경북</option>
                    </optgroup>
                    <optgroup label="전라/제주권">
                      <option value="광주">광주</option>
                      <option value="제주">제주</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label htmlFor="specialty" className="block font-noto text-sm text-neutral-700 mb-1">
                    진료과목 *
                  </label>
                  <select
                    id="specialty"
                    name="specialty"
                    value={formState.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                    required
                  >
                    <option value="">선택해주세요</option>
                    <option value="내과">내과</option>
                    <option value="외과">외과</option>
                    <option value="소아과">소아과</option>
                    <option value="산부인과">산부인과</option>
                    <option value="정형외과">정형외과</option>
                    <option value="신경외과">신경외과</option>
                    <option value="피부과">피부과</option>
                    <option value="안과">안과</option>
                    <option value="이비인후과">이비인후과</option>
                    <option value="치과">치과</option>
                    <option value="한의원">한의원</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-noto text-sm text-neutral-700 mb-1">
                  문의사항
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 min-h-[120px]"
                  placeholder="궁금하신 사항이나 요청사항을 작성해주세요."
                ></textarea>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formState.consent}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-primary border-neutral-300 rounded focus:ring-primary-300"
                    required
                  />
                </div>
                <label htmlFor="consent" className="ml-2 font-noto text-sm text-neutral-600">
                  개인정보 수집 및 이용에 동의합니다. *
                </label>
              </div>

              <CustomButton 
                type="submit" 
                variant="accent" 
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? '접수 중...' : '무료 상담하기'}
              </CustomButton>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
