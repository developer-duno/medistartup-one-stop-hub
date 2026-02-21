
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Expert, NewExpert } from './types';
import { mapRowToExpert, mapExpertToRow } from './dbMapper';

const EXPERTS_KEY = ['experts'] as const;

const fetchExperts = async (): Promise<Expert[]> => {
  const { data, error } = await supabase
    .from('experts_public' as any)
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return (data || []).map((row: any) => mapRowToExpert(row));
};

export const useExpertsQuery = () => {
  return useQuery({
    queryKey: EXPERTS_KEY,
    queryFn: fetchExperts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    
  });
};

export const useAddExpert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newExpert: NewExpert) => {
      const row = mapExpertToRow({
        ...newExpert,
        regions: Array.isArray(newExpert.regions) ? newExpert.regions : [],
        services: Array.isArray(newExpert.services) ? newExpert.services : [],
        certifications: Array.isArray(newExpert.certifications) ? newExpert.certifications : [],
        isApproved: true,
        applicationStatus: 'approved' as const,
        approvalDate: new Date().toISOString(),
      });
      const { data, error } = await supabase.from('experts').insert(row).select().single();
      if (error) throw error;
      return mapRowToExpert(data as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERTS_KEY });
    },
  });
};

export const useUpdateExpert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (expert: Expert) => {
      const row = mapExpertToRow(expert);
      const { error } = await supabase.from('experts').update(row).eq('id', expert.id);
      if (error) throw error;
      return expert;
    },
    onSuccess: (expert) => {
      queryClient.setQueryData<Expert[]>(EXPERTS_KEY, (old) =>
        old?.map((e) => (e.id === expert.id ? expert : e))
      );
    },
  });
};

export const useDeleteExpert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('experts').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Expert[]>(EXPERTS_KEY, (old) =>
        old?.filter((e) => e.id !== id)
      );
    },
  });
};

export const useApplyAsExpert = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newExpert: NewExpert) => {
      // Insert application
      await supabase.from('expert_applications').insert({
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

      // Insert expert record as pending
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
      const { data, error } = await supabase.from('experts').insert(row).select().single();
      if (error) throw error;
      return data ? mapRowToExpert(data as any) : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERTS_KEY });
    },
  });
};
