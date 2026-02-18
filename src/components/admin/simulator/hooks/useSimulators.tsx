
import { useState, useEffect, useCallback } from 'react';
import { Simulator, UsageData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Generate mock usage data from simulators
const generateUsageData = (simulators: Simulator[]): UsageData[] => {
  const totalViews = simulators.reduce((sum, sim) => sum + (sim.views || 0), 0);
  const months = ['1월', '2월', '3월', '4월', '5월', '6월'];
  return months.map((month, index) => ({
    date: `2025-0${index + 1}`,
    views: Math.floor((totalViews / 6) * (0.8 + Math.random() * 0.4))
  }));
};

export const useSimulators = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSimulators = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('simulators')
        .select('*')
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
      }
    } catch (error) {
      console.error('시뮬레이터 로드 오류:', error);
      toast({ title: '로드 오류', description: '시뮬레이터를 불러오지 못했습니다.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSimulators();
  }, [fetchSimulators]);

  useEffect(() => {
    setUsageData(generateUsageData(simulators));
  }, [simulators]);

  const updateSimulator = async (updatedSimulator: Simulator) => {
    try {
      const { error } = await supabase
        .from('simulators')
        .update({
          title: updatedSimulator.title,
          description: updatedSimulator.description,
          type: updatedSimulator.type,
          active: updatedSimulator.active,
          views: updatedSimulator.views,
        })
        .eq('id', updatedSimulator.id);

      if (error) throw error;

      setSimulators(prev => prev.map(s => s.id === updatedSimulator.id ? updatedSimulator : s));
      return true;
    } catch (error) {
      console.error('시뮬레이터 업데이트 오류:', error);
      return false;
    }
  };

  const addSimulator = async (newSimulator: Simulator) => {
    try {
      const { data, error } = await supabase
        .from('simulators')
        .insert({
          title: newSimulator.title,
          description: newSimulator.description,
          type: newSimulator.type,
          active: newSimulator.active,
          views: 0,
          display_order: simulators.length + 1,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const mapped: Simulator = {
          id: data.id,
          title: data.title,
          description: data.description,
          type: data.type,
          active: data.active,
          views: data.views,
        };
        setSimulators(prev => [...prev, mapped]);
      }
      return true;
    } catch (error) {
      console.error('시뮬레이터 추가 오류:', error);
      return false;
    }
  };

  const deleteSimulator = async (id: number) => {
    try {
      const { error } = await supabase
        .from('simulators')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSimulators(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (error) {
      console.error('시뮬레이터 삭제 오류:', error);
      return false;
    }
  };

  const toggleSimulatorActive = async (id: number) => {
    const simulator = simulators.find(s => s.id === id);
    if (!simulator) return false;

    const newActive = !simulator.active;

    try {
      const { error } = await supabase
        .from('simulators')
        .update({ active: newActive })
        .eq('id', id);

      if (error) throw error;

      setSimulators(prev => prev.map(s => s.id === id ? { ...s, active: newActive } : s));
      return newActive;
    } catch (error) {
      console.error('시뮬레이터 상태 변경 오류:', error);
      return false;
    }
  };

  return {
    simulators,
    usageData,
    isLoading,
    updateSimulator,
    addSimulator,
    deleteSimulator,
    toggleSimulatorActive,
    refetch: fetchSimulators,
  };
};
