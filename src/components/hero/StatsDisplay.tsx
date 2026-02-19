
import React from 'react';
import { TrendingUp, Users, Clock, Sparkles } from 'lucide-react';

const StatsDisplay = () => {
  return (
    <div className="pt-4 md:pt-8 grid grid-cols-4 gap-2 md:gap-6 text-center">
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center mb-1 md:mb-2">
          <TrendingUp size={16} className="text-primary md:hidden" />
          <TrendingUp size={24} className="text-primary hidden md:block" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-base md:text-2xl">98%</p>
        <p className="text-neutral-500 font-noto text-[9px] md:text-sm leading-tight">수익성 증대</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center mb-1 md:mb-2">
          <Users size={16} className="text-primary md:hidden" />
          <Users size={24} className="text-primary hidden md:block" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-base md:text-2xl">1,420+</p>
        <p className="text-neutral-500 font-noto text-[9px] md:text-sm leading-tight">성공사례</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center mb-1 md:mb-2">
          <Clock size={16} className="text-primary md:hidden" />
          <Clock size={24} className="text-primary hidden md:block" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-base md:text-2xl">32일</p>
        <p className="text-neutral-500 font-noto text-[9px] md:text-sm leading-tight">개원 단축</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-9 h-9 md:w-12 md:h-12 flex items-center justify-center mb-1 md:mb-2">
          <Sparkles size={16} className="text-primary md:hidden" />
          <Sparkles size={24} className="text-primary hidden md:block" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-base md:text-2xl">97%</p>
        <p className="text-neutral-500 font-noto text-[9px] md:text-sm leading-tight">고객 만족도</p>
      </div>
    </div>
  );
};

export default StatsDisplay;
