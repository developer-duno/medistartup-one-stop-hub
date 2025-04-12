
import React, { useState, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddExpertForm from './AddExpertForm';
import ExpertsTable from './ExpertsTable';
import { useExperts } from '@/contexts/ExpertsContext';

const ExpertsManagement: React.FC = () => {
  const [isAddingExpert, setIsAddingExpert] = useState(false);
  const { experts } = useExperts();
  
  const handleExpertAdded = useCallback(() => {
    console.log("Expert added, resetting form state");
    setIsAddingExpert(false);
  }, []);

  const sortedExperts = [...experts].sort((a, b) => 
    (a.displayOrder !== undefined && b.displayOrder !== undefined) 
      ? a.displayOrder - b.displayOrder 
      : 0
  );

  if (isAddingExpert) {
    return <AddExpertForm onCancel={() => setIsAddingExpert(false)} onSubmit={handleExpertAdded} />;
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-pretendard font-bold text-2xl">전문가 관리</h2>
          <p className="text-sm text-gray-500 mt-1">
            총 {experts.length}명의 전문가, {experts.filter(e => e.showOnMain).length}명 메인에 표시 중
          </p>
        </div>
        <Button onClick={() => setIsAddingExpert(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          전문가 추가
        </Button>
      </div>
      
      <ExpertsTable experts={sortedExperts} />
    </>
  );
};

export default ExpertsManagement;
