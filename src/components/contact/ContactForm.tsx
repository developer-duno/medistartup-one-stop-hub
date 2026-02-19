
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { toast } from '@/components/ui/use-toast';

// Expert type definition
interface Expert {
  id: number;
  name: string;
  service: string;
}

// Form state type definition
interface FormState {
  name: string;
  phone: string;
  email: string;
  region: string;
  specialty: string;
  message: string;
  consent: boolean;
  selectedExperts: Expert[];
}

interface ContactFormProps {
  experts: Expert[];
}

const ContactForm: React.FC<ContactFormProps> = ({ experts }) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    region: '',
    specialty: '',
    message: '',
    consent: false,
    selectedExperts: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedExpertIds, setSelectedExpertIds] = useState<number[]>([]);

  // Detect pre-selected experts from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const expertIds = urlParams.get('experts');
    
    if (expertIds) {
      const ids = expertIds.split(',').map(Number);
      setSelectedExpertIds(ids);
    }
  }, []);

  // Get expert objects from IDs
  useEffect(() => {
    if (selectedExpertIds.length > 0) {
      const selectedExperts = experts.filter(expert => selectedExpertIds.includes(expert.id));
      setFormState(prev => ({
        ...prev,
        selectedExperts: selectedExperts
      }));
    }
  }, [selectedExpertIds, experts]);

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
    
    // Show success message
    toast({
      title: "상담 신청이 완료되었습니다",
      description: "담당 컨설턴트가 영업일 기준 1일 이내에 연락드릴 예정입니다.",
    });
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        phone: '',
        email: '',
        region: '',
        specialty: '',
        message: '',
        consent: false,
        selectedExperts: []
      });
      setSelectedExpertIds([]);
    }, 3000);
  };

  if (submitted) {
    return null; // The parent component will render ContactSuccessMessage instead
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      
      {/* Selected Experts Display */}
      {formState.selectedExperts.length > 0 && (
        <div>
          <label className="block font-noto text-sm text-neutral-700 mb-2">
            선택한 상담 전문가
          </label>
          <div className="border border-neutral-300 rounded-md p-4 bg-neutral-50">
            <div className="flex flex-wrap gap-2">
              {formState.selectedExperts.map((expert) => (
                <div 
                  key={expert.id}
                  className="bg-primary-50 text-primary text-sm px-3 py-2 rounded-md flex items-center gap-1.5"
                >
                  <Users className="h-4 w-4" />
                  <span>{expert.name}</span>
                  <span className="text-primary-600 text-xs">({expert.service})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
        무료 상담
      </CustomButton>
    </form>
  );
};

export default ContactForm;
