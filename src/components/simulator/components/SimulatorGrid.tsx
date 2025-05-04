
import React from 'react';
import { Calculator, TrendingUp, Users } from 'lucide-react';
import SimulatorCard from '../SimulatorCard';
import { simulateFinancialCosts, simulateRevenue, simulateStaffing, trackSimulatorUsage } from '../SimulatorUtils';
import { Simulator } from '../../admin/simulator/types';

interface SimulatorGridProps {
  simulators: Simulator[];
}

const SimulatorGrid: React.FC<SimulatorGridProps> = ({ simulators }) => {
  // 시뮬레이터 타입에 맞는 아이콘 반환
  const getSimulatorIcon = (type: string) => {
    switch(type) {
      case 'financial':
        return <Calculator className="h-6 w-6 text-primary" />;
      case 'revenue':
        return <TrendingUp className="h-6 w-6 text-primary" />;
      case 'staffing':
        return <Users className="h-6 w-6 text-primary" />;
      default:
        return <Calculator className="h-6 w-6 text-primary" />;
    }
  };

  // 시뮬레이터 실행 함수
  const handleSimulation = (simulatorId: number, type: string, params: any) => {
    // Use centralized tracking function
    trackSimulatorUsage(simulatorId);
    
    if (type === 'financial') {
      return simulateFinancialCosts(params);
    } else if (type === 'revenue') {
      return simulateRevenue(params);
    } else if (type === 'staffing') {
      return simulateStaffing(params);
    }
    
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {simulators.filter(sim => sim.active).map((simulator) => (
        <SimulatorCard
          key={simulator.id}
          id={simulator.id}
          title={simulator.title}
          description={simulator.description}
          icon={getSimulatorIcon(simulator.type)}
          simulatorType={(simulator.type as 'financial' | 'revenue' | 'staffing')}
          onSimulate={(params) => handleSimulation(simulator.id, simulator.type, params)}
        />
      ))}
    </div>
  );
};

export default SimulatorGrid;
