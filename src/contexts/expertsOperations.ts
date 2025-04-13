
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Expert, NewExpert } from '../types/expert';
import { useToast } from '@/components/ui/use-toast';

export const useExpertOperations = (
  setExperts: Dispatch<SetStateAction<Expert[]>>,
) => {
  const { toast } = useToast();

  const addExpert = useCallback((newExpert: NewExpert) => {
    // Ensure regions and services are arrays
    const expertWithArrays: NewExpert = {
      ...newExpert,
      regions: Array.isArray(newExpert.regions) ? newExpert.regions : [],
      services: Array.isArray(newExpert.services) ? newExpert.services : [],
      certifications: Array.isArray(newExpert.certifications) ? newExpert.certifications : []
    };

    setExperts(prevExperts => {
      // Create new ID by finding the max ID and adding 1
      const newId = Math.max(0, ...prevExperts.map(expert => expert.id)) + 1;
      const expertWithId: Expert = { 
        ...expertWithArrays, 
        id: newId,
        isApproved: true, // Admin added experts are auto-approved
        applicationStatus: 'approved',
        approvalDate: new Date().toISOString()
      };
      
      // Use functional update to ensure we're working with the latest state
      const updatedExperts = [...prevExperts, expertWithId];
      
      // Display success toast
      toast({
        title: "전문가 추가 완료",
        description: `${newExpert.name} 전문가가 성공적으로 등록되었습니다.`,
        variant: "default",
      });

      console.log("Expert added:", expertWithId);
      console.log("Updated experts list:", updatedExperts);
      
      return updatedExperts;
    });
  }, [toast, setExperts]);

  const applyAsExpert = useCallback((newExpert: NewExpert) => {
    // Ensure regions and services are arrays
    const expertWithArrays: NewExpert = {
      ...newExpert,
      regions: Array.isArray(newExpert.regions) ? newExpert.regions : [],
      services: Array.isArray(newExpert.services) ? newExpert.services : [],
      certifications: Array.isArray(newExpert.certifications) ? newExpert.certifications : []
    };

    setExperts(prevExperts => {
      // Create new ID by finding the max ID and adding 1
      const newId = Math.max(0, ...prevExperts.map(expert => expert.id)) + 1;
      const expertWithId: Expert = { 
        ...expertWithArrays, 
        id: newId,
        isApproved: false,
        applicationStatus: 'pending',
        applicationDate: new Date().toISOString(),
        showOnMain: false // Default to not showing on main until approved
      };
      
      // Use functional update to ensure we're working with the latest state
      const updatedExperts = [...prevExperts, expertWithId];
      
      // Display success toast
      toast({
        title: "전문가 신청 접수",
        description: "신청이 접수되었습니다. 검토 후 연락드리겠습니다.",
        variant: "default",
      });

      console.log("Expert application received:", expertWithId);
      
      return updatedExperts;
    });
  }, [toast, setExperts]);

  const approveExpert = useCallback((id: number) => {
    setExperts(prevExperts => {
      const updatedExperts = prevExperts.map(expert => 
        expert.id === id ? {
          ...expert, 
          isApproved: true,
          applicationStatus: 'approved',
          approvalDate: new Date().toISOString()
        } : expert
      );
      
      const approvedExpert = updatedExperts.find(expert => expert.id === id);
      
      if (approvedExpert) {
        toast({
          title: "전문가 승인 완료",
          description: `${approvedExpert.name} 전문가가 승인되었습니다.`,
          variant: "default",
        });
      }
      
      return updatedExperts;
    });
  }, [toast, setExperts]);

  const rejectExpert = useCallback((id: number, reason: string) => {
    setExperts(prevExperts => {
      const updatedExperts = prevExperts.map(expert => 
        expert.id === id ? {
          ...expert, 
          isApproved: false,
          applicationStatus: 'rejected',
          rejectionReason: reason
        } : expert
      );
      
      const rejectedExpert = updatedExperts.find(expert => expert.id === id);
      
      if (rejectedExpert) {
        toast({
          title: "전문가 반려 처리",
          description: `${rejectedExpert.name} 전문가 신청이 반려되었습니다.`,
          variant: "default",
        });
      }
      
      return updatedExperts;
    });
  }, [toast, setExperts]);

  const updateExpert = useCallback((updatedExpert: Expert) => {
    // Ensure regions and services are arrays
    const expertWithArrays: Expert = {
      ...updatedExpert,
      regions: Array.isArray(updatedExpert.regions) ? updatedExpert.regions : [],
      services: Array.isArray(updatedExpert.services) ? updatedExpert.services : [],
      certifications: Array.isArray(updatedExpert.certifications) ? updatedExpert.certifications : []
    };
    
    setExperts(prevExperts => {
      const updatedExperts = prevExperts.map(expert => 
        expert.id === expertWithArrays.id ? expertWithArrays : expert
      );
      
      toast({
        title: "전문가 정보 업데이트",
        description: `${updatedExpert.name} 전문가 정보가 업데이트되었습니다.`,
        variant: "default",
      });
      
      return updatedExperts;
    });
  }, [toast, setExperts]);

  const deleteExpert = useCallback((id: number) => {
    setExperts(prevExperts => {
      const expertToDelete = prevExperts.find(expert => expert.id === id);
      const filteredExperts = prevExperts.filter(expert => expert.id !== id);
      
      if (expertToDelete) {
        toast({
          title: "전문가 삭제 완료",
          description: `${expertToDelete.name} 전문가가 삭제되었습니다.`,
          variant: "default",
        });
        
        console.log("Expert deleted:", expertToDelete);
        console.log("Remaining experts:", filteredExperts);
      }
      
      return filteredExperts;
    });
  }, [toast, setExperts]);

  return {
    addExpert,
    updateExpert,
    deleteExpert,
    applyAsExpert,
    approveExpert,
    rejectExpert
  };
};
