
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
import { AlertTriangle, ArrowRightLeft, X, Plus } from 'lucide-react';

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
  onKeepBoth: () => void;
  onCancel: () => void;
}

const ExpertConflictDialog: React.FC<ExpertConflictDialogProps> = ({
  conflict,
  onReplace,
  onKeepBoth,
  onCancel,
}) => {
  if (!conflict) return null;

  return (
    <AlertDialog open={!!conflict} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md mx-auto p-4 sm:p-6 rounded-xl">
        <AlertDialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-accent/10 p-2 rounded-full shrink-0">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
            <AlertDialogTitle className="font-pretendard text-base sm:text-lg">
              서비스 카테고리 중복
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-3 text-xs sm:text-sm">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{conflict.newExpertName}</span> 전문가와 
                이미 선택된 전문가의 서비스가 겹칩니다.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-3 space-y-3">
                {conflict.conflicts.map((c) => (
                  <div key={c.expertId} className="space-y-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium text-foreground text-xs sm:text-sm">{c.expertName}</span>
                      <ArrowRightLeft className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="font-medium text-foreground text-xs sm:text-sm">{conflict.newExpertName}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.overlappingServices.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="bg-accent/5 border-accent/30 text-accent text-[10px] sm:text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    {c.expertServices.length > c.overlappingServices.length && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                        ※ {c.expertName} 전문가는{' '}
                        <span className="font-medium text-foreground">
                          {c.expertServices.filter(s => !c.overlappingServices.includes(s)).join(', ')}
                        </span>{' '}
                        서비스도 담당 중입니다.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:gap-2 mt-2">
          <AlertDialogCancel asChild>
            <CustomButton variant="outline" size="sm" className="w-full sm:flex-1 text-xs sm:text-sm" onClick={onCancel}>
              <X className="h-3.5 w-3.5 mr-1" />
              취소
            </CustomButton>
          </AlertDialogCancel>
          <CustomButton variant="secondary" size="sm" className="w-full sm:flex-1 text-xs sm:text-sm" onClick={onKeepBoth}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            중복 선택하기
          </CustomButton>
          <CustomButton variant="primary" size="sm" className="w-full sm:flex-1 text-xs sm:text-sm" onClick={onReplace}>
            <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
            교체하기
          </CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExpertConflictDialog;
