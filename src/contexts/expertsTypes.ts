
import { Expert, NewExpert } from '../types/expert';
import { ReactNode } from 'react';

export interface ExpertsContextType {
  experts: Expert[];
  loading: boolean;
  addExpert: (expert: NewExpert) => void;
  updateExpert: (expert: Expert) => void;
  deleteExpert: (id: number) => void;
  updateExpertsOrder: (newOrder: Expert[]) => void;
  toggleExpertMainVisibility: (id: number) => void;
  applyAsExpert: (expert: NewExpert) => void;
  approveExpert: (id: number) => void;
  rejectExpert: (id: number, reason: string) => void;
  pendingApplications: Expert[];
  getExpertById: (id: number) => Expert | undefined;
}

export interface ExpertsProviderProps {
  children: ReactNode;
}
