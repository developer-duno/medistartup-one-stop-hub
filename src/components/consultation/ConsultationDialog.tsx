
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useConsultation } from '@/contexts/ConsultationContext';
import { Users, X } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import { useToast } from '@/hooks/use-toast';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you'd typically send the form data to your backend
    console.log('Form submitted:', formState);
    console.log('Selected experts:', selectedExpertsData);
    
    // Show success message
    toast({
      title: "상담 신청이 완료되었습니다",
      description: "담당 컨설턴트가 영업일 기준 1일 이내에 연락드릴 예정입니다.",
    });
    
    // Close dialog and reset form
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
  };

  const removeExpert = (expertId: number) => {
    deselectExpert(expertId);
  };

  return (
    <Dialog open={isConsultationOpen} onOpenChange={closeConsultation}>
      <DialogContent className="max-w-lg bg-white/90 backdrop-blur-lg border border-neutral-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pretendard font-bold text-center">
            무료 상담 신청
          </DialogTitle>
        </DialogHeader>
        
        {/* Selected Experts */}
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
        
        {/* Consultation Form */}
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
                <option value="대전/충남">대전/충남</option>
                <option value="서울/경기">서울/경기</option>
                <option value="부산/경남">부산/경남</option>
                <option value="대구/경북">대구/경북</option>
                <option value="광주/전라">광주/전라</option>
                <option value="강원">강원</option>
                <option value="제주">제주</option>
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
          >
            무료 상담 신청하기
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationDialog;
