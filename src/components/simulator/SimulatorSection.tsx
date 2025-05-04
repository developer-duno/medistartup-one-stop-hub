
import React from 'react';
import { LoadingState } from '@/components/ui/loading-state';
import SimulatorHeader from './components/SimulatorHeader';
import SimulatorGrid from './components/SimulatorGrid';
import SimulatorError from './components/SimulatorError';
import EmptyState from './components/EmptyState';
import SimulatorDisclaimer from './components/SimulatorDisclaimer';
import { useSimulatorManager } from './hooks/useSimulatorManager';

const SimulatorSection = () => {
  const { simulators, isLoading, loadError, loadSimulators } = useSimulatorManager();

  return (
    <section id="simulators" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SimulatorHeader />
        
        {isLoading ? (
          <LoadingState className="py-16" />
        ) : loadError ? (
          <SimulatorError errorMessage={loadError} />
        ) : simulators.filter(sim => sim.active).length > 0 ? (
          <SimulatorGrid simulators={simulators} />
        ) : (
          <EmptyState onRefresh={loadSimulators} />
        )}
        
        <SimulatorDisclaimer />
      </div>
    </section>
  );
};

export default SimulatorSection;
