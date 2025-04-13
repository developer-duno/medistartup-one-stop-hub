
import React from 'react';
import { Calculator, TrendingUp, Users } from 'lucide-react';
import SimulatorCard from './SimulatorCard';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing } from './SimulatorUtils';

const SimulatorSection = () => {
  return (
    <section id="simulators" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            병원창업 <span className="text-primary">시뮬레이터</span>
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            메디스타트업의 데이터에 기반한 시뮬레이터로 병원 창업에 필요한 비용과 수익을 미리 예측해보세요.
            지역과 규모에 맞춰 최적화된 정보를 제공합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SimulatorCard
            id={1}
            title="개원 비용 시뮬레이터"
            description="진료과목별 평균 개원 비용을 확인하세요"
            icon={<Calculator className="h-6 w-6 text-primary" />}
            simulatorType="financial"
            onSimulate={simulateFinancialCosts}
          />
          
          <SimulatorCard
            id={2}
            title="수익성 분석 시뮬레이터"
            description="지역 및 진료과목별 예상 수익 시뮬레이션"
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            simulatorType="revenue"
            onSimulate={simulateRevenue}
          />
          
          <SimulatorCard
            id={3}
            title="인력 구성 시뮬레이터"
            description="병원 규모별 최적 인력 구성 시뮬레이션"
            icon={<Users className="h-6 w-6 text-primary" />}
            simulatorType="staffing"
            onSimulate={simulateStaffing}
          />
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            * 시뮬레이션 결과는 당사의 데이터베이스에 근거한 예상치이며, 실제 상황과 차이가 있을 수 있습니다.
            <br />더 정확한 분석이 필요하시면 전문가 상담을 신청해주세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;
