
import React, { useState } from 'react';
import { Edit, Trash, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Expert } from '@/types/expert';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ExpertTableActionsProps {
  expert: Expert;
  onEditExpert: (expert: Expert) => void;
  onDeleteExpert: (id: number, name: string) => void;
  onToggleVisibility: (id: number, name: string, currentVisibility: boolean) => void;
  onApproveExpert: (id: number) => void;
  onRejectExpert: (id: number) => void;
}

const ExpertTableActions: React.FC<ExpertTableActionsProps> = ({
  expert,
  onEditExpert,
  onDeleteExpert,
  onToggleVisibility,
  onApproveExpert,
  onRejectExpert
}) => {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const handleReject = () => {
    onRejectExpert(expert.id);
    setIsRejectDialogOpen(false);
    setRejectionReason('');
  };
  
  const isPending = expert.applicationStatus === 'pending';
  
  return (
    <>
      {/* Approval actions for pending applications */}
      {isPending && (
        <>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-green-600 hover:text-green-900"
            onClick={() => onApproveExpert(expert.id)}
            title="지원 승인"
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-900"
            onClick={() => setIsRejectDialogOpen(true)}
            title="지원 반려"
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </>
      )}
      
      {/* Visibility toggle (only for approved experts) */}
      {expert.applicationStatus === 'approved' && (
        <Button 
          variant="ghost" 
          size="sm" 
          className={expert.showOnMain ? "text-blue-600 hover:text-blue-900" : "text-gray-400 hover:text-gray-600"}
          onClick={() => onToggleVisibility(expert.id, expert.name, expert.showOnMain || false)}
          title={expert.showOnMain ? "메인에서 숨기기" : "메인에 표시하기"}
        >
          {expert.showOnMain ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      )}
      
      {/* Edit action */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-600 hover:text-blue-900"
        onClick={() => onEditExpert(expert)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      
      {/* Delete action */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-red-600 hover:text-red-900"
        onClick={() => onDeleteExpert(expert.id, expert.name)}
      >
        <Trash className="h-4 w-4" />
      </Button>
      
      {/* Rejection reason dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>전문가 지원 반려</DialogTitle>
            <DialogDescription>
              {expert.name} 전문가의 지원을 반려하시겠습니까? 필요한 경우 반려 사유를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="반려 사유 (선택 사항)"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>취소</Button>
            <Button variant="destructive" onClick={handleReject}>반려 확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpertTableActions;
