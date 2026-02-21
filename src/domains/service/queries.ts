
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Service, NewService } from './types';

const SERVICES_KEY = ['services'] as const;

const mapRow = (row: any): Service => ({
  id: row.id,
  title: row.title,
  description: row.description,
  icon: row.icon,
  path: row.path,
  category: row.category,
  order: row.display_order,
});

const fetchServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []).map(mapRow);
};

export const useServicesQuery = () => {
  return useQuery({
    queryKey: SERVICES_KEY,
    queryFn: fetchServices,
    staleTime: 10 * 60 * 1000, // Services change rarely
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useAddService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newService: NewService) => {
      const { data, error } = await supabase
        .from('services')
        .insert({
          title: newService.title,
          description: newService.description,
          icon: newService.icon,
          path: newService.path,
          category: newService.category,
          display_order: newService.order || 0,
        })
        .select()
        .single();
      if (error) throw error;
      return mapRow(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_KEY });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      const { error } = await supabase
        .from('services')
        .update({
          title: service.title,
          description: service.description,
          icon: service.icon,
          path: service.path,
          category: service.category,
          display_order: service.order || 0,
        })
        .eq('id', service.id);
      if (error) throw error;
      return service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_KEY });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_KEY });
    },
  });
};
