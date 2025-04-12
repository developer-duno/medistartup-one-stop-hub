
import React from 'react';
import { useExperts } from '@/contexts/ExpertsContext';
import { Expert } from '@/types/expert';
import { useToast } from '@/components/ui/use-toast';
import ExpertTableHeader from './ExpertTableHeader';
import ExpertTableRow from './ExpertTableRow';
import ExpertEmptyTableRow from './ExpertEmptyTableRow';

interface ExpertsTableProps {
  experts: Expert[];
  onEditExpert: (expert: Expert) => void;
}

const ExpertsTable: React.FC<ExpertsTableProps> = ({ experts, onEditExpert }) => {
  const { deleteExpert, toggleExpertMainVisibility, updateExpertsOrder } = useExperts();
  const { toast } = useToast();
  
  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`${name} 전문가를 삭제하시겠습니까?`)) {
      deleteExpert(id);
    }
  };
  
  const handleToggleVisibility = (id: number, name: string, currentVisibility: boolean) => {
    toggleExpertMainVisibility(id);
    toast({
      title: currentVisibility ? "메인 페이지에서 숨김" : "메인 페이지에 표시",
      description: `${name} 전문가가 메인 페이지에 ${currentVisibility ? '표시되지 않습니다.' : '표시됩니다.'}`,
      variant: "default",
    });
  };

  const moveExpert = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === experts.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newExperts = [...experts];
    const temp = { ...newExperts[index] };
    
    // Swap the display orders
    const tempOrder = temp.displayOrder;
    temp.displayOrder = newExperts[newIndex].displayOrder;
    newExperts[newIndex].displayOrder = tempOrder;

    // Swap the positions in the array
    newExperts[index] = newExperts[newIndex];
    newExperts[newIndex] = temp;
    
    updateExpertsOrder(newExperts);

    toast({
      title: "전문가 순서 변경",
      description: `${temp.name} 전문가의 표시 순서가 변경되었습니다.`,
      variant: "default",
    });
  };

  // Sort experts by display order for the table
  const sortedExperts = [...experts].sort((a, b) => {
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <ExpertTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExperts.length > 0 ? (
              sortedExperts.map((expert, index) => (
                <ExpertTableRow
                  key={expert.id}
                  expert={expert}
                  index={index}
                  experts={sortedExperts}
                  onEditExpert={onEditExpert}
                  onDeleteExpert={handleDelete}
                  onToggleVisibility={handleToggleVisibility}
                  onMoveExpert={moveExpert}
                />
              ))
            ) : (
              <ExpertEmptyTableRow />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpertsTable;
