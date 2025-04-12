
import React from 'react';
import { Edit, Trash, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Expert } from '@/types/expert';

interface ExpertTableActionsProps {
  expert: Expert;
  onEditExpert: (expert: Expert) => void;
  onDeleteExpert: (id: number, name: string) => void;
  onToggleVisibility: (id: number, name: string, currentVisibility: boolean) => void;
}

const ExpertTableActions: React.FC<ExpertTableActionsProps> = ({
  expert,
  onEditExpert,
  onDeleteExpert,
  onToggleVisibility
}) => {
  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className={expert.showOnMain ? "text-blue-600 hover:text-blue-900" : "text-gray-400 hover:text-gray-600"}
        onClick={() => onToggleVisibility(expert.id, expert.name, expert.showOnMain || false)}
        title={expert.showOnMain ? "메인에서 숨기기" : "메인에 표시하기"}
      >
        {expert.showOnMain ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-600 hover:text-blue-900"
        onClick={() => onEditExpert(expert)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-red-600 hover:text-red-900"
        onClick={() => onDeleteExpert(expert.id, expert.name)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
};

export default ExpertTableActions;
