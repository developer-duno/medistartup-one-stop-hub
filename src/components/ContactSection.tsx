
import React, { useState, useEffect } from 'react';
import { Check, MapPin, Phone, Mail, Clock, Users } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { toast } from '@/components/ui/use-toast';

const ContactSection = () => {
  // Expert data - in a real app, this would come from a central data store or API
  const experts = [
    { id: 1, name: '김태호', service: '재무 컨설팅' },
    { id: 2, name: '박지연', service: '입지 분석' },
    { id: 3, name: '이준호', service: '설계 및 인테리어' },
    { id: 4, name: '최민서', service: '인허가 대행' },
    { id: 5, name: '정서연', service: '인력 채용' },
    { id: 6, name: '강현우', service: '마케팅 전략' },
    { id: 7, name: '윤재호', service: '의료기기 구입 및 설치' },
    { id: 8, name: '한지민', service: '수납 및 의료폐기물 처리' }
  ];

  const [formState, setFormState] = useState({
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
  const [selectedExpertIds, setSelectedExpertIds] = useState([]);

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
  }, [selectedExpertIds]);

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

  return (
    <section id="contact" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            <span className="text-primary">무료 상담</span> 신청하기
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            병원창업에 관한 어떤 질문이든 전문가가 답변해 드립니다.
            첫 상담은 무료로 진행됩니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-pretendard font-bold text-2xl text-neutral-900 mb-2">
                    상담 신청이 완료되었습니다
                  </h3>
                  <p className="font-noto text-neutral-600 mb-6">
                    담당 컨설턴트가 영업일 기준 1일 이내에 연락드릴 예정입니다.
                  </p>
                </div>
              ) : (
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
                    무료 상담 신청하기
                  </CustomButton>
                </form>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              <div className="space-y-8">
                <div>
                  <h3 className="font-pretendard font-bold text-2xl text-neutral-900 mb-6">
                    컨설팅 센터 안내
                  </h3>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-pretendard font-medium text-neutral-900 mb-1">주소</h4>
                        <p className="font-noto text-neutral-600">
                          대전광역시 서구 둔산동 1363 메디컬타워 8층
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-pretendard font-medium text-neutral-900 mb-1">전화</h4>
                        <p className="font-noto text-neutral-600">
                          042-123-4567
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-pretendard font-medium text-neutral-900 mb-1">이메일</h4>
                        <p className="font-noto text-neutral-600">
                          contact@medistartup.kr
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-pretendard font-medium text-neutral-900 mb-1">상담시간</h4>
                        <p className="font-noto text-neutral-600">
                          평일: 09:00 - 18:00<br />
                          주말 및 공휴일: 휴무
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-pretendard font-bold text-lg text-neutral-900 mb-4">
                    찾아오시는 길
                  </h3>
                  <div className="rounded-lg overflow-hidden h-[200px] shadow-sm">
                    <img 
                      src="https://via.placeholder.com/600x400?text=Map+Image" 
                      alt="오시는 길" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
