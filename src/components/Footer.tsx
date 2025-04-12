
import React from 'react';
import { Facebook, Instagram, Youtube, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-lg">M</span>
              </div>
              <span className="text-white font-pretendard font-bold text-xl">MediStartup</span>
            </a>
            <p className="font-noto text-neutral-300 mb-6">
              병원창업 전문 컨설팅 기업 메디스타트업은 의사들의 성공적인 개원을 위한 원스탑 솔루션을 제공합니다.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-pretendard font-bold text-lg mb-6">서비스</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  입지 분석 서비스
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  재무 컨설팅
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  설계 및 인테리어
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  인허가 대행
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  인력 채용
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  마케팅 전략
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-pretendard font-bold text-lg mb-6">지역별 데스크</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  대전/충남
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  서울/경기
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  부산/경남
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  대구/경북
                </a>
              </li>
              <li>
                <a href="#" className="font-noto text-neutral-300 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  광주/전라
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-pretendard font-bold text-lg mb-6">연락처</h3>
            <ul className="space-y-4">
              <li className="flex">
                <span className="font-noto font-medium text-white min-w-[80px]">주소:</span>
                <span className="font-noto text-neutral-300">대전광역시 서구 둔산동 1363 메디컬타워 8층</span>
              </li>
              <li className="flex">
                <span className="font-noto font-medium text-white min-w-[80px]">전화:</span>
                <span className="font-noto text-neutral-300">042-123-4567</span>
              </li>
              <li className="flex">
                <span className="font-noto font-medium text-white min-w-[80px]">이메일:</span>
                <span className="font-noto text-neutral-300">contact@medistartup.kr</span>
              </li>
              <li className="flex">
                <span className="font-noto font-medium text-white min-w-[80px]">상담시간:</span>
                <span className="font-noto text-neutral-300">평일 09:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-noto text-sm text-neutral-400 mb-4 md:mb-0">
              © 2025 메디스타트업. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="font-noto text-sm text-neutral-400 hover:text-white transition-colors">
                이용약관
              </a>
              <a href="#" className="font-noto text-sm text-neutral-400 hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="font-noto text-sm text-neutral-400 hover:text-white transition-colors">
                사이트맵
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
