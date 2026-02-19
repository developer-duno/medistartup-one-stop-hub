
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import CustomButton from '@/components/ui/CustomButton';
import { AlertTriangle, ArrowRightLeft, X } from 'lucide-react';

export interface ConflictInfo {
  newExpertId: number;
  newExpertName: string;
  conflicts: Array<{
    expertId: number;
    expertName: string;
    expertServices: string[];
    overlappingServices: string[];
  }>;
}

interface ExpertConflictDialogProps {
  conflict: ConflictInfo | null;
  onReplace: () => void;
  onCancel: () => void;
}

const ExpertConflictDialog: React.FC<ExpertConflictDialogProps> = ({
  conflict,
  onReplace,
  onCancel,
}) => {
  if (!conflict) return null;

  return (
    <AlertDialog open={!!conflict} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <AlertDialogContent className="max-w-md mx-4">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <AlertDialogTitle className="font-pretendard text-lg">
              서비스 카테고리 중복
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-sm">
              <p className="text-neutral-600">
                <span className="font-semibold text-neutral-900">{conflict.newExpertName}</span> 전문가와 
                이미 선택된 전문가의 서비스가 겹칩니다.
              </p>
              
              <div className="bg-neutral-50 rounded-lg p-3 space-y-3">
                {conflict.conflicts.map((c) => (
                  <div key={c.expertId} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-800">{c.expertName}</span>
                      <ArrowRightLeft className="h-3.5 w-3.5 text-neutral-400" />
                      <span className="font-medium text-neutral-800">{conflict.newExpertName}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.overlappingServices.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    {c.expertServices.length > c.overlappingServices.length && (
                      <p className="text-xs text-neutral-500">
                        ※ {c.expertName} 전문가는 
                        <span className="font-medium"> {c.expertServices.filter(s => !c.overlappingServices.includes(s)).join(', ')}</span> 서비스도 담당 중입니다.
                        교체 시 해당 전문가의 선택이 해제됩니다.
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-neutral-500 text-xs">
                교체하면 중복되는 기존 전문가가 해제되고 {conflict.newExpertName} 전문가가 추가됩니다.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2 sm:flex-row">
          <AlertDialogCancel asChild>
            <CustomButton variant="outline" className="flex-1" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              취소
            </CustomButton>
          </AlertDialogCancel>
          <CustomButton variant="primary" className="flex-1" onClick={onReplace}>
            <ArrowRightLeft className="h-4 w-4 mr-1" />
            교체하기
          </CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExpertConflictDialog;
