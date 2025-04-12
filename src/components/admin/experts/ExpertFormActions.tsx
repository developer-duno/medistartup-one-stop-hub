
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface ExpertFormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ExpertFormActions: React.FC<ExpertFormActionsProps> = ({ onCancel, isSubmitting = false }) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
      >
        취소
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        <Save className="h-4 w-4 mr-2" />
        저장하기
      </Button>
    </div>
  );
};

export default ExpertFormActions;
