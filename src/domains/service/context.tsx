
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Service, NewService } from './types';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  addService: (service: NewService) => void;
  updateService: (service: Service) => void;
  deleteService: (id: number) => void;
  getServicesByCategory: (category: string) => Service[];
  getAllServices: () => Service[];
  refetch: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const mapRow = (row: any): Service => ({
  id: row.id,
  title: row.title,
  description: row.description,
  icon: row.icon,
  path: row.path,
  category: row.category,
  order: row.display_order,
});

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices((data || []).map(mapRow));
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = async (newService: NewService) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          title: newService.title,
          description: newService.description,
          icon: newService.icon,
          path: newService.path,
          category: newService.category,
          display_order: newService.order || services.length + 1,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setServices(prev => [...prev, mapRow(data)]);
        toast({ title: "서비스 추가", description: `'${newService.title}' 서비스가 추가되었습니다.` });
      }
    } catch (err) {
      console.error('Error adding service:', err);
      toast({ title: "오류", description: "서비스 추가에 실패했습니다.", variant: "destructive" });
    }
  };

  const updateService = async (updatedService: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({
          title: updatedService.title,
          description: updatedService.description,
          icon: updatedService.icon,
          path: updatedService.path,
          category: updatedService.category,
          display_order: updatedService.order || 0,
        })
        .eq('id', updatedService.id);

      if (error) throw error;

      setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
      toast({ title: "서비스 업데이트", description: `'${updatedService.title}' 서비스가 업데이트되었습니다.` });
    } catch (err) {
      console.error('Error updating service:', err);
      toast({ title: "오류", description: "서비스 업데이트에 실패했습니다.", variant: "destructive" });
    }
  };

  const deleteService = async (id: number) => {
    const serviceToDelete = services.find(s => s.id === id);
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(s => s.id !== id));
      if (serviceToDelete) {
        toast({ title: "서비스 삭제", description: `'${serviceToDelete.title}' 서비스가 삭제되었습니다.` });
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      toast({ title: "오류", description: "서비스 삭제에 실패했습니다.", variant: "destructive" });
    }
  };

  const getServicesByCategory = (category: string) => {
    if (category === 'all') return services;
    return services.filter(service => service.category === category);
  };

  const getAllServices = () => services;

  return (
    <ServicesContext.Provider value={{
      services,
      loading,
      addService,
      updateService,
      deleteService,
      getServicesByCategory,
      getAllServices,
      refetch: fetchServices,
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
