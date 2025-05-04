
import React from 'react';

const SimulatorDisclaimer: React.FC = () => {
  return (
    <div className="mt-10 text-center">
      <p className="text-sm text-muted-foreground">
        * 시뮬레이션 결과는 당사의 데이터베이스에 근거한 예상치이며, 실제 상황과 차이가 있을 수 있습니다.
        <br />더 정확한 분석이 필요하시면 전문가 상담을 신청해주세요.
      </p>
    </div>
  );
};

export default SimulatorDisclaimer;
