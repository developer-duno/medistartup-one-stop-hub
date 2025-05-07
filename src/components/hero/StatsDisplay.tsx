
import React from 'react';
import { TrendingUp, Users, Clock, Sparkles } from 'lucide-react';

const StatsDisplay = () => {
  return (
    <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <TrendingUp size={24} className="text-primary" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-2xl">98%</p>
        <p className="text-neutral-500 font-noto text-sm">수익성 증대</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <Users size={24} className="text-primary" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-2xl">1,420+</p>
        <p className="text-neutral-500 font-noto text-sm">고객 성공사례</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <Clock size={24} className="text-primary" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-2xl">32일</p>
        <p className="text-neutral-500 font-noto text-sm">개원기간 단축</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <Sparkles size={24} className="text-primary" />
        </div>
        <p className="text-neutral-900 font-pretendard font-bold text-2xl">97%</p>
        <p className="text-neutral-500 font-noto text-sm">고객 만족도</p>
      </div>
    </div>
  );
};

export default StatsDisplay;
