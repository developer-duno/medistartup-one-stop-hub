
import React from 'react';
import { Check } from 'lucide-react';

const ContactSuccessMessage = () => {
  return (
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
  );
};

export default ContactSuccessMessage;
