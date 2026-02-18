
import { useState, useEffect } from 'react';
import { Simulator } from '../../admin/simulator/types';
import { supabase } from '@/integrations/supabase/client';

export const useSimulatorManager = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadSimulators = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const { data, error } = await supabase
        .from('simulators')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped: Simulator[] = data.map(row => ({
          id: row.id,
          title: row.title,
          description: row.description,
          type: row.type,
          active: row.active,
          views: row.views,
        }));
        setSimulators(mapped);
      } else {
        setSimulators([]);
      }
    } catch (error) {
      console.error('시뮬레이터 로드 오류:', error);
      setLoadError('시뮬레이터를 불러오는 중 문제가 발생했습니다.');
      setSimulators([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSimulators();
  }, []);

  return {
    simulators,
    isLoading,
    loadError,
    loadSimulators
  };
};
