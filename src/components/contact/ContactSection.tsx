
import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactSuccessMessage from './ContactSuccessMessage';

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

  const [submitted, setSubmitted] = useState(false);

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
                <ContactSuccessMessage />
              ) : (
                <ContactForm 
                  experts={experts} 
                />
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
