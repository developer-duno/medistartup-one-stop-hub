
import { Expert, NewExpert } from '../types/expert';
import { ReactNode } from 'react';

export interface ExpertsContextType {
  experts: Expert[];
  addExpert: (expert: NewExpert) => void;
  updateExpert: (expert: Expert) => void;
  deleteExpert: (id: number) => void;
  updateExpertsOrder: (newOrder: Expert[]) => void;
  toggleExpertMainVisibility: (id: number) => void;
}

export interface ExpertsProviderProps {
  children: ReactNode;
}
