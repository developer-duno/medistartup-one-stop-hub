
import React, { useState, useEffect } from 'react';
import SimulatorHeader from './components/SimulatorHeader';
import SimulatorDisclaimer from './components/SimulatorDisclaimer';
import UnifiedSimulator from './UnifiedSimulator';
import { supabase } from '@/integrations/supabase/client';

const SimulatorSection = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVisibility = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('value')
          .eq('key', 'simulator_visible')
          .single();

        if (error) {
          // 설정이 없으면 기본값으로 노출
          setIsVisible(true);
          return;
        }
        setIsVisible(data?.value === 'true');
      } catch {
        setIsVisible(true);
      }
    };
    checkVisibility();
  }, []);

  // 아직 로딩 중이거나 비노출이면 렌더링 안 함
  if (isVisible === null || isVisible === false) return null;

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
