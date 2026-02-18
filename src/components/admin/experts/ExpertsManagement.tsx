
import React, { useState, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpertProfileBuilder from './ExpertProfileBuilder';
import ExpertsTable from './ExpertsTable';
import { useExperts } from '@/contexts/ExpertsContext';
import { Expert } from '@/types/expert';
import { Badge } from '@/components/ui/badge';

const ExpertsManagement: React.FC = () => {
  const [isAddingExpert, setIsAddingExpert] = useState(false);
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);
  const { experts, pendingApplications } = useExperts();
  
  const handleExpertAdded = useCallback(() => {
    console.log("Expert added, resetting form state");
    setIsAddingExpert(false);
  }, []);

  const handleEditExpert = (expert: Expert) => {
    setEditingExpert(expert);
    setIsAddingExpert(true);
  };

  const handleCancel = () => {
    setEditingExpert(null);
    setIsAddingExpert(false);
  };

  const sortedExperts = [...experts].sort((a, b) => 
    (a.displayOrder !== undefined && b.displayOrder !== undefined) 
      ? a.displayOrder - b.displayOrder 
      : 0
  );

  if (isAddingExpert) {
    return (
      <ExpertProfileBuilder 
        onCancel={handleCancel} 
        onSubmit={handleExpertAdded}
        expertToEdit={editingExpert} 
      />
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-pretendard font-bold text-2xl">전문가 관리</h2>
          <p className="text-sm text-gray-500 mt-1">
            총 {experts.length}명의 전문가, {experts.filter(e => e.showOnMain && e.isApproved).length}명 메인에 표시 중
            {pendingApplications.length > 0 && (
              <span className="ml-2">
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  검토 대기 {pendingApplications.length}건
                </Badge>
              </span>
            )}
          </p>
        </div>
        <Button onClick={() => setIsAddingExpert(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          전문가 추가
        </Button>
      </div>
      
      <ExpertsTable 
        experts={sortedExperts} 
        onEditExpert={handleEditExpert}
      />
    </>
  );
};

export default ExpertsManagement;
