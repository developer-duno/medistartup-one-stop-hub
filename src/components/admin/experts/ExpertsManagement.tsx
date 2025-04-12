
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddExpertForm from './AddExpertForm';
import ExpertsTable from './ExpertsTable';
import { useExperts } from '@/contexts/ExpertsContext';

const ExpertsManagement: React.FC = () => {
  const [isAddingExpert, setIsAddingExpert] = useState(false);
  const { experts } = useExperts();
  
  const handleExpertAdded = () => {
    setIsAddingExpert(false);
  };

  if (isAddingExpert) {
    return <AddExpertForm onCancel={() => setIsAddingExpert(false)} onSubmit={handleExpertAdded} />;
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">전문가 관리</h2>
        <Button onClick={() => setIsAddingExpert(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          전문가 추가
        </Button>
      </div>
      
      <ExpertsTable experts={experts} />
    </>
  );
};

export default ExpertsManagement;
