
import React, { createContext, useState, useContext } from 'react';
import { ExpertsContextType, ExpertsProviderProps } from './expertsTypes';
import { useExpertOperations } from './expertsOperations';
import { initialExperts } from '../data/initialExperts';
import { Expert } from '../types/expert';
import { migrateExpertRegions } from '../utils/regionMigration';

// Create the context with default values
const ExpertsContext = createContext<ExpertsContextType>({
  experts: [],
  addExpert: () => {},
  updateExpert: () => {},
  deleteExpert: () => {},
  updateExpertsOrder: () => {},
  toggleExpertMainVisibility: () => {},
  applyAsExpert: () => {},
  approveExpert: () => {},
  rejectExpert: () => {},
  pendingApplications: [],
  getExpertById: () => undefined,
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
        // Ensure displayOrder, showOnMain and isApproved are set for all experts
        let updatedExperts = parsedExperts.map((expert: Expert, index: number) => ({
          ...expert,
          displayOrder: expert.displayOrder !== undefined ? expert.displayOrder : index,
          showOnMain: expert.showOnMain !== undefined ? expert.showOnMain : true,
          isApproved: expert.isApproved !== undefined ? expert.isApproved : true,
          applicationStatus: expert.applicationStatus || 'approved'
        }));
        
        // Migrate any experts with "경기" region to "경기남부"
        updatedExperts = migrateExpertRegions(updatedExperts);
        
        console.log('Loaded experts from local storage:', updatedExperts);
        return updatedExperts;
      }
    } catch (error) {
      console.error('Error loading experts from local storage:', error);
    }
    
    console.log('Using initial experts data');
    // Initialize display order, showOnMain and isApproved for initial experts
    // Also migrate any experts with "경기" region
    return migrateExpertRegions(initialExperts.map((expert, index) => ({
      ...expert,
      displayOrder: index,
      showOnMain: true,
      isApproved: true,
      applicationStatus: 'approved' as const
    })));
  });
  
  // Save experts to local storage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem(EXPERTS_STORAGE_KEY, JSON.stringify(experts));
      console.log('Saved experts to local storage:', experts);
    } catch (error) {
      console.error('Error saving experts to local storage:', error);
    }
  }, [experts]);
  
  // Get the operations from our custom hook
  const { 
    addExpert, 
    updateExpert, 
    deleteExpert,
    applyAsExpert,
    approveExpert,
    rejectExpert
  } = useExpertOperations(setExperts);

  // Update the order of experts
  const updateExpertsOrder = (newOrder: Expert[]) => {
    setExperts(newOrder);
  };

  // Toggle the main page visibility of an expert
  const toggleExpertMainVisibility = (id: number) => {
    setExperts(prevExperts => 
      prevExperts.map(expert => 
        expert.id === id 
          ? { ...expert, showOnMain: !expert.showOnMain }
          : expert
      )
    );
  };

  // Get expert by ID
  const getExpertById = (id: number): Expert | undefined => {
    return experts.find(expert => expert.id === id);
  };

  // Calculate pending applications
  const pendingApplications = React.useMemo(() => {
    return experts.filter(expert => expert.applicationStatus === 'pending');
  }, [experts]);

  // Create the context value object
  const contextValue: ExpertsContextType = {
    experts,
    addExpert,
    updateExpert,
    deleteExpert,
    updateExpertsOrder,
    toggleExpertMainVisibility,
    applyAsExpert,
    approveExpert,
    rejectExpert,
    pendingApplications,
    getExpertById
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};

// Custom hook for using the experts context
export const useExperts = () => {
  const context = useContext(ExpertsContext);
  
  if (context === undefined) {
    throw new Error('useExperts must be used within an ExpertsProvider');
  }
  
  return context;
};
