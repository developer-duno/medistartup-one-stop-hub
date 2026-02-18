
import React from 'react';

const HeroHeading = () => {
  return (
    <>
      <div className="inline-block px-2 md:px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-noto text-[10px] md:text-sm animate-pulse-light">
        2025년 병원창업 트렌드 업데이트
      </div>
      
      <h1 className="font-pretendard font-bold text-2xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight">
        병원창업 <span className="text-primary">원스탑</span> 컨설팅<br />
        <span className="relative">
          데이터 기반 의사결정
          <svg className="absolute h-2 md:h-4 -bottom-1 left-0 w-full text-accent" viewBox="0 0 100 15" preserveAspectRatio="none">
            <path d="M0,5 Q40,15 80,5 T160,5" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
        </span>
      </h1>
      
      <p className="font-noto text-xs md:text-base text-neutral-600 max-w-xl mx-auto lg:mx-0">
        의원급 개원부터 종합병원 설립까지, 지역 특화 네트워크와 데이터 분석을 활용한 맞춤형 컨설팅 서비스를 제공합니다.
      </p>
    </>
  );
};

export default HeroHeading;
