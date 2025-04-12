
import React from 'react';
import { MoveUp, MoveDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Expert } from '@/types/expert';
import { RegionBadges, ServiceBadges, ExpertStatusBadges } from './ExpertBadges';
import ExpertTableActions from './ExpertTableActions';

interface ExpertTableRowProps {
  expert: Expert;
  index: number;
  experts: Expert[];
  onEditExpert: (expert: Expert) => void;
  onDeleteExpert: (id: number, name: string) => void;
  onToggleVisibility: (id: number, name: string, currentVisibility: boolean) => void;
  onMoveExpert: (index: number, direction: 'up' | 'down') => void;
}

const ExpertTableRow: React.FC<ExpertTableRowProps> = ({
  expert,
  index,
  experts,
  onEditExpert,
  onDeleteExpert,
  onToggleVisibility,
  onMoveExpert
}) => {
  return (
    <tr className={!expert.showOnMain ? "bg-gray-50" : ""}>
      <td className="px-3 py-4 whitespace-nowrap">
        <div className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1"
            disabled={index === 0}
            onClick={() => onMoveExpert(index, 'up')}
          >
            <MoveUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{expert.displayOrder !== undefined ? expert.displayOrder + 1 : index + 1}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1"
            disabled={index === experts.length - 1}
            onClick={() => onMoveExpert(index, 'down')}
          >
            <MoveDown className="h-4 w-4" />
          </Button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img 
              className="h-10 w-10 rounded-full object-cover" 
              src={expert.image || "/placeholder.svg"} 
              alt={expert.name} 
            />
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-900">{expert.name}</div>
              <ExpertStatusBadges 
                isRegionalManager={expert.isRegionalManager || false} 
                showOnMain={expert.showOnMain || false} 
              />
            </div>
            <div className="text-sm text-gray-500">{expert.specialty}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expert.role}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RegionBadges 
          regions={expert.regions || []} 
          managedRegions={expert.managedRegions || []} 
          isRegionalManager={expert.isRegionalManager || false} 
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ServiceBadges services={expert.services || []} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ExpertTableActions 
          expert={expert}
          onEditExpert={onEditExpert}
          onDeleteExpert={onDeleteExpert}
          onToggleVisibility={onToggleVisibility}
        />
      </td>
    </tr>
  );
};

export default ExpertTableRow;
