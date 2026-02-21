
import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { ExpertsContextType, ExpertsProviderProps, Expert, NewExpert } from './types';
import { supabase } from '@/integrations/supabase/client';
import { mapRowToExpert, mapExpertToRow } from './dbMapper';
import { useToast } from '@/components/ui/use-toast';
import { useExpertsQuery, useAddExpert, useUpdateExpert, useDeleteExpert, useApplyAsExpert } from './queries';
import { useQueryClient } from '@tanstack/react-query';

const ExpertsContext = createContext<ExpertsContextType>({
  experts: [],
  loading: true,
  addExpert: () => {},
  updateExpert: () => {},
  deleteExpert: () => {},
  updateExpertsOrder: () => {},
  toggleExpertMainVisibility: () => {},
  applyAsExpert: () => {},
  approveExpert: () => {},
  rejectExpert: () => {},
  pendingApplications: [],
  getExpertById: () => undefined,
});

export const ExpertsProvider: React.FC<ExpertsProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: experts = [], isLoading: loading } = useExpertsQuery();
  const addMutation = useAddExpert();
  const updateMutation = useUpdateExpert();
  const deleteMutation = useDeleteExpert();
  const applyMutation = useApplyAsExpert();

  const addExpert = useCallback(async (newExpert: NewExpert) => {
    try {
      await addMutation.mutateAsync(newExpert);
      toast({ title: "전문가 추가 완료", description: `${newExpert.name} 전문가가 성공적으로 등록되었습니다.` });
    } catch {
      toast({ title: "오류", description: "전문가 추가에 실패했습니다.", variant: "destructive" });
    }
  }, [addMutation, toast]);

  const updateExpert = useCallback(async (updatedExpert: Expert) => {
    try {
      await updateMutation.mutateAsync(updatedExpert);
      toast({ title: "전문가 정보 업데이트", description: `${updatedExpert.name} 전문가 정보가 업데이트되었습니다.` });
    } catch {
      toast({ title: "오류", description: "전문가 정보 업데이트에 실패했습니다.", variant: "destructive" });
    }
  }, [updateMutation, toast]);

  const deleteExpert = useCallback(async (id: number) => {
    const expertToDelete = experts.find(e => e.id === id);
    try {
      await deleteMutation.mutateAsync(id);
      if (expertToDelete) {
        toast({ title: "전문가 삭제 완료", description: `${expertToDelete.name} 전문가가 삭제되었습니다.` });
      }
    } catch {
      toast({ title: "오류", description: "전문가 삭제에 실패했습니다.", variant: "destructive" });
    }
  }, [deleteMutation, experts, toast]);

  const updateExpertsOrder = useCallback(async (newOrder: Expert[]) => {
    // Optimistic update
    queryClient.setQueryData(['experts'], newOrder);
    const updates = newOrder.map((expert, index) =>
      supabase.from('experts').update({ display_order: index }).eq('id', expert.id)
    );
    await Promise.all(updates);
  }, [queryClient]);

  const toggleExpertMainVisibility = useCallback(async (id: number) => {
    const expert = experts.find(e => e.id === id);
    if (!expert) return;
    const newShowOnMain = !expert.showOnMain;
    const { error } = await supabase.from('experts').update({ show_on_main: newShowOnMain }).eq('id', id);
    if (!error) {
      queryClient.setQueryData<Expert[]>(['experts'], (old) =>
        old?.map(e => e.id === id ? { ...e, showOnMain: newShowOnMain } : e)
      );
    }
  }, [experts, queryClient]);

  const applyAsExpert = useCallback(async (newExpert: NewExpert) => {
    try {
      await applyMutation.mutateAsync(newExpert);
      toast({ title: "전문가 신청 접수", description: "신청이 접수되었습니다. 검토 후 연락드리겠습니다." });
    } catch {
      toast({ title: "오류", description: "지원 신청에 실패했습니다.", variant: "destructive" });
    }
  }, [applyMutation, toast]);

  const approveExpert = useCallback(async (id: number) => {
    const { error } = await supabase.from('experts').update({
      is_approved: true,
      application_status: 'approved',
      approval_date: new Date().toISOString(),
    }).eq('id', id);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ['experts'] });
      const expert = experts.find(e => e.id === id);
      if (expert) toast({ title: "전문가 승인 완료", description: `${expert.name} 전문가가 승인되었습니다.` });
    }
  }, [experts, queryClient, toast]);

  const rejectExpert = useCallback(async (id: number, reason: string) => {
    const { error } = await supabase.from('experts').update({
      is_approved: false,
      application_status: 'rejected',
      rejection_reason: reason,
    }).eq('id', id);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ['experts'] });
      const expert = experts.find(e => e.id === id);
      if (expert) toast({ title: "전문가 반려 처리", description: `${expert.name} 전문가 신청이 반려되었습니다.` });
    }
  }, [experts, queryClient, toast]);

  const getExpertById = useCallback((id: number): Expert | undefined => {
    return experts.find(expert => expert.id === id);
  }, [experts]);

  const pendingApplications = useMemo(() => {
    return experts.filter(expert => expert.applicationStatus === 'pending');
  }, [experts]);

  const contextValue: ExpertsContextType = {
    experts,
    loading,
    addExpert,
    updateExpert,
    deleteExpert,
    updateExpertsOrder,
    toggleExpertMainVisibility,
    applyAsExpert,
    approveExpert,
    rejectExpert,
    pendingApplications,
    getExpertById,
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};

export const useExperts = () => {
  const context = useContext(ExpertsContext);
  if (context === undefined) {
    throw new Error('useExperts must be used within an ExpertsProvider');
  }
  return context;
};
