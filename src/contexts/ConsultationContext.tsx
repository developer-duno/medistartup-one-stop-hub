
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Expert } from '@/types/expert';
import { useExperts } from './ExpertsContext';

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
      if (prev.includes(expertId)) return prev;
      
      // Maximum 3 experts
      if (prev.length >= 3) {
        const newSelected = [...prev];
        newSelected.shift(); // Remove oldest selection
        return [...newSelected, expertId];
      }
      
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
