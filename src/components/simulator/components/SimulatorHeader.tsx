
import React from 'react';

const SimulatorHeader = () => {
  return (
    <div className="text-center mb-8 md:mb-16">
      <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-2 md:mb-4">
        병원창업 <span className="text-primary">시뮬레이터</span>
      </h2>
      <p className="font-noto text-neutral-600 max-w-2xl mx-auto text-xs md:text-base">
        메디스타트업의 데이터에 기반한 시뮬레이터로 병원 창업에 필요한 비용과 수익을 미리 예측해보세요.
        지역과 규모에 맞춰 최적화된 정보를 제공합니다.
      </p>
    </div>
  );
};

export default SimulatorHeader;
