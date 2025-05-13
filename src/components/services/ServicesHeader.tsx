
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ServicesHeader = () => {
  return (
    <section className="theme-page-header">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          홈으로 돌아가기
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
            병원창업 <span className="theme-text">서비스</span>
          </h1>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            의료기관 설립의 모든 단계를 위한 전문 서비스입니다. 병원 창업의 계획부터 운영까지 필요한 모든 솔루션을 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHeader;
