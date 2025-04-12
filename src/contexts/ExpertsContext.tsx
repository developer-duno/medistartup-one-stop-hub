
import React, { createContext, useState, useContext } from 'react';
import { ExpertsContextType, ExpertsProviderProps } from './expertsTypes';
import { useExpertOperations } from './expertsOperations';
import { initialExperts } from '../data/initialExperts';
import { Expert } from '../types/expert';

// Create the context with default values
const ExpertsContext = createContext<ExpertsContextType>({
  experts: [],
  addExpert: () => {},
  updateExpert: () => {},
  deleteExpert: () => {},
});

// Provider component
export const ExpertsProvider: React.FC<ExpertsProviderProps> = ({ children }) => {
  const [experts, setExperts] = useState<Expert[]>(initialExperts);
  
  // Get the operations from our custom hook
  const { addExpert, updateExpert, deleteExpert } = useExpertOperations(setExperts);

  // Create the context value object
  const contextValue: ExpertsContextType = {
    experts,
    addExpert,
    updateExpert,
    deleteExpert
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};

// Custom hook for using the experts context
export const useExperts = (): ExpertsContextType => {
  const context = useContext(ExpertsContext);
  
  if (context === undefined) {
    throw new Error('useExperts must be used within an ExpertsProvider');
  }
  
  return context;
};
