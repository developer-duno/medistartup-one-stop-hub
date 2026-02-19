
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Expert } from '@/types/expert';
import { useExperts } from './ExpertsContext';
import { toast } from 'sonner';

interface ConsultationContextType {
  selectedExperts: number[];
  selectExpert: (expertId: number) => void;
  deselectExpert: (expertId: number) => void;
  clearSelectedExperts: () => void;
  isConsultationOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
  getSelectedExpertsData: () => (Expert | undefined)[];
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const ConsultationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { experts } = useExperts();
  const [selectedExperts, setSelectedExperts] = useState<number[]>([]);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Initialize from localStorage if available
  useEffect(() => {
    const storedExperts = localStorage.getItem('medistartup_selected_experts');
    if (storedExperts) {
      try {
        const parsedExperts = JSON.parse(storedExperts);
        if (Array.isArray(parsedExperts)) {
          setSelectedExperts(parsedExperts);
        }
      } catch (error) {
        console.error('Error parsing stored experts:', error);
      }
    }
  }, []);

  // Update localStorage when selected experts change
  useEffect(() => {
    localStorage.setItem('medistartup_selected_experts', JSON.stringify(selectedExperts));
  }, [selectedExperts]);

  const selectExpert = (expertId: number) => {
    setSelectedExperts(prev => {
      // If already selected, remove this expert (deselect)
      if (prev.includes(expertId)) {
        return prev.filter(id => id !== expertId);
      }
      
      // Get the expert's services
      const expert = experts.find(e => e.id === expertId);
      if (!expert) return prev;
      
      const expertServices = expert.services;
      
      // Check if any service from this expert is already represented by another expert
      const conflictingExperts = prev.filter(selectedId => {
        const selectedExpert = experts.find(e => e.id === selectedId);
        if (!selectedExpert) return false;
        
        // Check if any service overlaps
        return selectedExpert.services.some(service => 
          expertServices.includes(service)
        );
      });
      
      if (conflictingExperts.length > 0) {
        // Get names of conflicting services
        const conflictingServices: string[] = [];
        for (const conflictId of conflictingExperts) {
          const conflictExpert = experts.find(e => e.id === conflictId);
          if (conflictExpert) {
            const overlappingServices = conflictExpert.services.filter(service => 
              expertServices.includes(service)
            );
            conflictingServices.push(...overlappingServices);
          }
        }
        
        const uniqueConflictingServices = [...new Set(conflictingServices)];
        
        // Get names of conflicting experts
        const conflictingExpertNames = conflictingExperts
          .map(id => experts.find(e => e.id === id)?.name || "")
          .filter(name => name !== "");

        // Auto-replace: remove conflicting experts and add the new one
        const newSelection = prev.filter(id => !conflictingExperts.includes(id));
        
        const replacedNames = conflictingExpertNames.join(', ');
        toast.info(`${replacedNames} 전문가가 ${expert.name} 전문가로 교체되었습니다.`, {
          description: `중복 카테고리: ${uniqueConflictingServices.join(', ')}`
        });
        
        return [...newSelection, expertId];
      }
      
      // Add this expert to selection
      return [...prev, expertId];
    });
  };

  const deselectExpert = (expertId: number) => {
    setSelectedExperts(prev => prev.filter(id => id !== expertId));
  };

  const clearSelectedExperts = () => {
    setSelectedExperts([]);
  };

  const openConsultation = () => {
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
  };

  const getSelectedExpertsData = () => {
    return selectedExperts.map(id => experts.find(expert => expert.id === id));
  };

  return (
    <ConsultationContext.Provider
      value={{
        selectedExperts,
        selectExpert,
        deselectExpert,
        clearSelectedExperts,
        isConsultationOpen,
        openConsultation,
        closeConsultation,
        getSelectedExpertsData
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = (): ConsultationContextType => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};
