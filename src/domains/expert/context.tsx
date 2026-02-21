
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ExpertsContextType, ExpertsProviderProps, Expert, NewExpert } from './types';
import { supabase } from '@/integrations/supabase/client';
import { mapRowToExpert, mapExpertToRow } from './dbMapper';
import { useToast } from '@/components/ui/use-toast';

// Create the context with default values
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

// Provider component
export const ExpertsProvider: React.FC<ExpertsProviderProps> = ({ children }) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch experts from database
  const fetchExperts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('experts_public' as any)
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching experts:', error);
        return;
      }

      if (data) {
        const mapped = data.map((row: any) => mapRowToExpert(row));
        setExperts(mapped);
      }
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  // Add expert (admin)
  const addExpert = useCallback(async (newExpert: NewExpert) => {
    const row = mapExpertToRow({
      ...newExpert,
      regions: Array.isArray(newExpert.regions) ? newExpert.regions : [],
      services: Array.isArray(newExpert.services) ? newExpert.services : [],
      certifications: Array.isArray(newExpert.certifications) ? newExpert.certifications : [],
      isApproved: true,
      applicationStatus: 'approved' as const,
      approvalDate: new Date().toISOString(),
    });

    const { data, error } = await supabase
      .from('experts')
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error('Error adding expert:', error);
      toast({ title: "오류", description: "전문가 추가에 실패했습니다.", variant: "destructive" });
      return;
    }

    if (data) {
      setExperts(prev => [...prev, mapRowToExpert(data as any)]);
      toast({ title: "전문가 추가 완료", description: `${newExpert.name} 전문가가 성공적으로 등록되었습니다.` });
    }
  }, [toast]);

  // Update expert
  const updateExpert = useCallback(async (updatedExpert: Expert) => {
    const row = mapExpertToRow(updatedExpert);

    const { error } = await supabase
      .from('experts')
      .update(row)
      .eq('id', updatedExpert.id);

    if (error) {
      console.error('Error updating expert:', error);
      toast({ title: "오류", description: "전문가 정보 업데이트에 실패했습니다.", variant: "destructive" });
      return;
    }

    setExperts(prev => prev.map(e => e.id === updatedExpert.id ? updatedExpert : e));
    toast({ title: "전문가 정보 업데이트", description: `${updatedExpert.name} 전문가 정보가 업데이트되었습니다.` });
  }, [toast]);

  // Delete expert
  const deleteExpert = useCallback(async (id: number) => {
    const expertToDelete = experts.find(e => e.id === id);
    
    const { error } = await supabase
      .from('experts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting expert:', error);
      toast({ title: "오류", description: "전문가 삭제에 실패했습니다.", variant: "destructive" });
      return;
    }

    setExperts(prev => prev.filter(e => e.id !== id));
    if (expertToDelete) {
      toast({ title: "전문가 삭제 완료", description: `${expertToDelete.name} 전문가가 삭제되었습니다.` });
    }
  }, [experts, toast]);

  // Update experts order
  const updateExpertsOrder = useCallback(async (newOrder: Expert[]) => {
    setExperts(newOrder);
    
    const updates = newOrder.map((expert, index) => 
      supabase.from('experts').update({ display_order: index }).eq('id', expert.id)
    );
    
    await Promise.all(updates);
  }, []);

  // Toggle main page visibility
  const toggleExpertMainVisibility = useCallback(async (id: number) => {
    const expert = experts.find(e => e.id === id);
    if (!expert) return;

    const newShowOnMain = !expert.showOnMain;

    const { error } = await supabase
      .from('experts')
      .update({ show_on_main: newShowOnMain })
      .eq('id', id);

    if (error) {
      console.error('Error toggling visibility:', error);
      return;
    }

    setExperts(prev => prev.map(e => e.id === id ? { ...e, showOnMain: newShowOnMain } : e));
  }, [experts]);

  // Apply as expert (public application)
  const applyAsExpert = useCallback(async (newExpert: NewExpert) => {
    const { error: appError } = await supabase
      .from('expert_applications')
      .insert({
        name: newExpert.name,
        role: newExpert.role,
        specialty: newExpert.specialty,
        image: newExpert.image || '',
        experience: newExpert.experience || '',
        projects: newExpert.projects || '',
        description: newExpert.description || '',
        regions: newExpert.regions || [],
        services: newExpert.services || [],
        certifications: newExpert.certifications || [],
        contact: newExpert.contact || '',
        email: newExpert.email || '',
        cover_image: newExpert.coverImage || '',
        key_achievements: newExpert.keyAchievements || [],
        education_history: newExpert.educationHistory || [],
        career_timeline: newExpert.careerTimeline || [],
        success_cases: newExpert.successCases || [],
        testimonials: newExpert.testimonials || [],
        status: 'pending',
      });

    if (appError) {
      console.error('Error submitting application:', appError);
      toast({ title: "오류", description: "지원 신청에 실패했습니다.", variant: "destructive" });
      return;
    }

    const row = mapExpertToRow({
      ...newExpert,
      regions: Array.isArray(newExpert.regions) ? newExpert.regions : [],
      services: Array.isArray(newExpert.services) ? newExpert.services : [],
      certifications: Array.isArray(newExpert.certifications) ? newExpert.certifications : [],
      isApproved: false,
      applicationStatus: 'pending' as const,
      applicationDate: new Date().toISOString(),
      showOnMain: false,
    });

    const { data, error } = await supabase
      .from('experts')
      .insert(row)
      .select()
      .single();

    if (!error && data) {
      setExperts(prev => [...prev, mapRowToExpert(data as any)]);
    }

    toast({ title: "전문가 신청 접수", description: "신청이 접수되었습니다. 검토 후 연락드리겠습니다." });
  }, [toast]);

  // Approve expert
  const approveExpert = useCallback(async (id: number) => {
    const { error } = await supabase
      .from('experts')
      .update({
        is_approved: true,
        application_status: 'approved',
        approval_date: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error approving expert:', error);
      return;
    }

    setExperts(prev => prev.map(e => e.id === id ? {
      ...e,
      isApproved: true,
      applicationStatus: 'approved' as const,
      approvalDate: new Date().toISOString(),
    } : e));

    const expert = experts.find(e => e.id === id);
    if (expert) {
      toast({ title: "전문가 승인 완료", description: `${expert.name} 전문가가 승인되었습니다.` });
    }
  }, [experts, toast]);

  // Reject expert
  const rejectExpert = useCallback(async (id: number, reason: string) => {
    const { error } = await supabase
      .from('experts')
      .update({
        is_approved: false,
        application_status: 'rejected',
        rejection_reason: reason,
      })
      .eq('id', id);

    if (error) {
      console.error('Error rejecting expert:', error);
      return;
    }

    setExperts(prev => prev.map(e => e.id === id ? {
      ...e,
      isApproved: false,
      applicationStatus: 'rejected' as const,
      rejectionReason: reason,
    } : e));

    const expert = experts.find(e => e.id === id);
    if (expert) {
      toast({ title: "전문가 반려 처리", description: `${expert.name} 전문가 신청이 반려되었습니다.` });
    }
  }, [experts, toast]);

  // Get expert by ID
  const getExpertById = useCallback((id: number): Expert | undefined => {
    return experts.find(expert => expert.id === id);
  }, [experts]);

  // Calculate pending applications
  const pendingApplications = React.useMemo(() => {
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
    getExpertById
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};

// Custom hook for using the experts context
export const useExperts = () => {
  const context = useContext(ExpertsContext);
  
  if (context === undefined) {
    throw new Error('useExperts must be used within an ExpertsProvider');
  }
  
  return context;
};
