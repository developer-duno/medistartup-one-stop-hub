
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Expert } from '@/types/expert';
import { useExperts } from './ExpertsContext';
import { toast } from 'sonner';
import ExpertConflictDialog, { ConflictInfo } from '@/components/consultation/ExpertConflictDialog';

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
  const [conflictInfo, setConflictInfo] = useState<ConflictInfo | null>(null);

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

  const selectExpert = useCallback((expertId: number) => {
    // If already selected, deselect
    if (selectedExperts.includes(expertId)) {
      setSelectedExperts(prev => prev.filter(id => id !== expertId));
      return;
    }

    const expert = experts.find(e => e.id === expertId);
    if (!expert) return;

    const expertServices = expert.services;

    // Check for conflicts
    const conflictingExperts = selectedExperts.filter(selectedId => {
      const selectedExpert = experts.find(e => e.id === selectedId);
      if (!selectedExpert) return false;
      return selectedExpert.services.some(service => expertServices.includes(service));
    });

    if (conflictingExperts.length > 0) {
      // Build conflict info and show dialog
      const conflicts = conflictingExperts.map(conflictId => {
        const conflictExpert = experts.find(e => e.id === conflictId)!;
        const overlappingServices = conflictExpert.services.filter(service =>
          expertServices.includes(service)
        );
        return {
          expertId: conflictId,
          expertName: conflictExpert.name,
          expertServices: conflictExpert.services,
          overlappingServices,
        };
      });

      setConflictInfo({
        newExpertId: expertId,
        newExpertName: expert.name,
        conflicts,
      });
      return;
    }

    // No conflict, add directly
    setSelectedExperts(prev => [...prev, expertId]);
  }, [selectedExperts, experts]);

  const handleConflictReplace = useCallback(() => {
    if (!conflictInfo) return;
    const conflictIds = conflictInfo.conflicts.map(c => c.expertId);
    setSelectedExperts(prev => {
      const filtered = prev.filter(id => !conflictIds.includes(id));
      return [...filtered, conflictInfo.newExpertId];
    });
    const replacedNames = conflictInfo.conflicts.map(c => c.expertName).join(', ');
    toast.info(`${replacedNames} → ${conflictInfo.newExpertName} 전문가로 교체되었습니다.`);
    setConflictInfo(null);
  }, [conflictInfo]);

  const handleConflictCancel = useCallback(() => {
    setConflictInfo(null);
  }, []);

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
      <ExpertConflictDialog
        conflict={conflictInfo}
        onReplace={handleConflictReplace}
        onCancel={handleConflictCancel}
      />
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
