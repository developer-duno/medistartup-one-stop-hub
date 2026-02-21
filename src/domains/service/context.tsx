
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Service, NewService } from './types';
import { useToast } from '@/components/ui/use-toast';
import { initialServices } from './initialData';

interface ServicesContextType {
  services: Service[];
  addService: (service: NewService) => void;
  updateService: (service: Service) => void;
  deleteService: (id: number) => void;
  getServicesByCategory: (category: string) => Service[];
  getAllServices: () => Service[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const { toast } = useToast();

  const addService = (newService: NewService) => {
    setServices(prevServices => {
      const newId = Math.max(0, ...prevServices.map(service => service.id)) + 1;
      const serviceWithId = { ...newService, id: newId };
      
      toast({
        title: "서비스 추가",
        description: `'${newService.title}' 서비스가 추가되었습니다.`,
      });
      
      return [...prevServices, serviceWithId];
    });
  };

  const updateService = (updatedService: Service) => {
    setServices(prevServices => {
      const newServices = prevServices.map(service => 
        service.id === updatedService.id ? updatedService : service
      );
      
      toast({
        title: "서비스 업데이트",
        description: `'${updatedService.title}' 서비스가 업데이트되었습니다.`,
      });
      
      return newServices;
    });
  };

  const deleteService = (id: number) => {
    setServices(prevServices => {
      const serviceToDelete = prevServices.find(service => service.id === id);
      const newServices = prevServices.filter(service => service.id !== id);
      
      if (serviceToDelete) {
        toast({
          title: "서비스 삭제",
          description: `'${serviceToDelete.title}' 서비스가 삭제되었습니다.`,
        });
      }
      
      return newServices;
    });
  };

  const getServicesByCategory = (category: string) => {
    if (category === 'all') {
      return services;
    }
    return services.filter(service => service.category === category);
  };

  const getAllServices = () => services;

  return (
    <ServicesContext.Provider value={{ 
      services, 
      addService, 
      updateService, 
      deleteService, 
      getServicesByCategory,
      getAllServices
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
