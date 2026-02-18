
import React from 'react';
import SimulatorHeader from './components/SimulatorHeader';
import SimulatorDisclaimer from './components/SimulatorDisclaimer';
import UnifiedSimulator from './UnifiedSimulator';

const SimulatorSection = () => {
  return (
    <section id="simulators" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SimulatorHeader />
        <div className="max-w-5xl mx-auto">
          <UnifiedSimulator />
        </div>
        <SimulatorDisclaimer />
      </div>
    </section>
  );
};

export default SimulatorSection;
