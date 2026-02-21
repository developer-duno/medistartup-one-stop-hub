
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { Service, NewService } from './types';
import { useToast } from '@/components/ui/use-toast';
import { useServicesQuery, useAddService, useUpdateService, useDeleteService } from './queries';

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

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { data: services = [], isLoading: loading, refetch } = useServicesQuery();
  const addMutation = useAddService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const addService = useCallback(async (newService: NewService) => {
    try {
      await addMutation.mutateAsync(newService);
      toast({ title: "서비스 추가", description: `'${newService.title}' 서비스가 추가되었습니다.` });
    } catch {
      toast({ title: "오류", description: "서비스 추가에 실패했습니다.", variant: "destructive" });
    }
  }, [addMutation, toast]);

  const updateService = useCallback(async (updatedService: Service) => {
    try {
      await updateMutation.mutateAsync(updatedService);
      toast({ title: "서비스 업데이트", description: `'${updatedService.title}' 서비스가 업데이트되었습니다.` });
    } catch {
      toast({ title: "오류", description: "서비스 업데이트에 실패했습니다.", variant: "destructive" });
    }
  }, [updateMutation, toast]);

  const deleteService = useCallback(async (id: number) => {
    const serviceToDelete = services.find(s => s.id === id);
    try {
      await deleteMutation.mutateAsync(id);
      if (serviceToDelete) {
        toast({ title: "서비스 삭제", description: `'${serviceToDelete.title}' 서비스가 삭제되었습니다.` });
      }
    } catch {
      toast({ title: "오류", description: "서비스 삭제에 실패했습니다.", variant: "destructive" });
    }
  }, [deleteMutation, services, toast]);

  const getServicesByCategory = useCallback((category: string) => {
    if (category === 'all') return services;
    return services.filter(service => service.category === category);
  }, [services]);

  const getAllServices = useCallback(() => services, [services]);

  return (
    <ServicesContext.Provider value={{
      services,
      loading,
      addService,
      updateService,
      deleteService,
      getServicesByCategory,
      getAllServices,
      refetch: async () => { await refetch(); },
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
