
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
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
  );
};

export default ContactInfo;
