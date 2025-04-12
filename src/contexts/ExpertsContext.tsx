
import React, { createContext, useState, useContext, useEffect } from 'react';
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

// Local storage key for experts data
const EXPERTS_STORAGE_KEY = 'medistartup_experts';

// Provider component
export const ExpertsProvider: React.FC<ExpertsProviderProps> = ({ children }) => {
  // Initialize state from local storage or use initial data as fallback
  const [experts, setExperts] = useState<Expert[]>(() => {
    try {
      const storedExperts = localStorage.getItem(EXPERTS_STORAGE_KEY);
      if (storedExperts) {
        const parsedExperts = JSON.parse(storedExperts);
        console.log('Loaded experts from local storage:', parsedExperts);
        return parsedExperts;
      }
    } catch (error) {
      console.error('Error loading experts from local storage:', error);
    }
    
    console.log('Using initial experts data');
    return initialExperts;
  });
  
  // Save experts to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(EXPERTS_STORAGE_KEY, JSON.stringify(experts));
      console.log('Saved experts to local storage:', experts);
    } catch (error) {
      console.error('Error saving experts to local storage:', error);
    }
  }, [experts]);
  
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
