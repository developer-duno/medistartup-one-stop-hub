
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ServicesHeader = () => {
  return (
    <section className="theme-page-header">
      <div className="container mx-auto px-3 md:px-4">
        <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-3 md:mb-4 text-xs md:text-sm">
          <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          홈으로 돌아가기
        </Link>
        
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-pretendard font-bold text-xl md:text-4xl text-neutral-900 mb-1 md:mb-2">
            병원창업 <span className="theme-text">서비스</span>
          </h1>
          <p className="font-noto text-neutral-600 text-xs md:text-sm">
            의료기관 설립의 모든 단계를 위한 전문 서비스입니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHeader;
