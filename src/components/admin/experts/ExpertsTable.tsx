
import React, { useState } from 'react';
import { useExperts } from '@/contexts/ExpertsContext';
import { Expert } from '@/types/expert';
import { useToast } from '@/components/ui/use-toast';
import ExpertTableHeader from './ExpertTableHeader';
import ExpertTableRow from './ExpertTableRow';
import ExpertEmptyTableRow from './ExpertEmptyTableRow';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ExpertsTableProps {
  experts: Expert[];
  onEditExpert: (expert: Expert) => void;
}

const ExpertsTable: React.FC<ExpertsTableProps> = ({ experts, onEditExpert }) => {
  const { deleteExpert, toggleExpertMainVisibility, updateExpertsOrder, approveExpert, rejectExpert } = useExperts();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  
  const handleDelete = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteExpert(deleteTarget.id);
      setDeleteTarget(null);
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

  const handleApproveExpert = (id: number) => {
    if (window.confirm('이 전문가 지원을 승인하시겠습니까?')) {
      approveExpert(id);
    }
  };

  const handleRejectExpert = (id: number) => {
    rejectExpert(id, '');
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

  const filteredExperts = experts.filter(expert => {
    if (filter === 'all') return true;
    return expert.applicationStatus === filter;
  });

  // Sort experts by display order for the table
  const sortedExperts = [...filteredExperts].sort((a, b) => {
    // First sort by application status (pending first)
    if (a.applicationStatus === 'pending' && b.applicationStatus !== 'pending') return -1;
    if (a.applicationStatus !== 'pending' && b.applicationStatus === 'pending') return 1;
    
    // Then by display order
    return (a.displayOrder || 0) - (b.displayOrder || 0);
  });

  const pendingCount = experts.filter(e => e.applicationStatus === 'pending').length;

  return (
    <>
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {filter === 'all' ? '모든 전문가' : 
           filter === 'pending' ? '승인 대기 중' : 
           filter === 'approved' ? '승인된 전문가' : '반려된 지원'}
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            전체
          </Button>
          <Button 
            variant={filter === 'pending' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('pending')}
            className="flex items-center"
          >
            대기 중
            {pendingCount > 0 && (
              <span className="ml-1 bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {pendingCount}
              </span>
            )}
          </Button>
          <Button 
            variant={filter === 'approved' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('approved')}
          >
            승인됨
          </Button>
          <Button 
            variant={filter === 'rejected' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('rejected')}
          >
            반려됨
          </Button>
        </div>
      </div>
      
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
                  onApproveExpert={handleApproveExpert}
                  onRejectExpert={handleRejectExpert}
                />
              ))
            ) : (
              <ExpertEmptyTableRow />
            )}
          </tbody>
        </table>
      </div>
    </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>전문가 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.name} 전문가를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExpertsTable;
