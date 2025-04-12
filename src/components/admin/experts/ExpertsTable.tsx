
import React from 'react';
import { Edit, Trash, Eye, EyeOff, MoveUp, MoveDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExperts } from '@/contexts/ExpertsContext';
import { Expert } from '@/types/expert';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

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
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                순서
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                전문가
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                직책
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                지역
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                서비스
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExperts.length > 0 ? (
              sortedExperts.map((expert, index) => (
                <tr key={expert.id} className={!expert.showOnMain ? "bg-gray-50" : ""}>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1"
                        disabled={index === 0}
                        onClick={() => moveExpert(index, 'up')}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{expert.displayOrder !== undefined ? expert.displayOrder + 1 : index + 1}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1"
                        disabled={index === experts.length - 1}
                        onClick={() => moveExpert(index, 'down')}
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
                          {expert.isRegionalManager && (
                            <Badge className="ml-2 bg-primary/10 text-primary border-primary/20 text-xs">총괄</Badge>
                          )}
                          {!expert.showOnMain && (
                            <Badge className="ml-2 bg-gray-100 text-gray-500 border-gray-200 text-xs">숨김</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{expert.specialty}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {expert.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {expert.regions && expert.regions.length > 0 ? (
                        expert.regions.map((region) => (
                          <span 
                            key={region} 
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              expert.isRegionalManager && expert.managedRegions?.includes(region) 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {region}
                            {expert.isRegionalManager && expert.managedRegions?.includes(region) && (
                              <span className="ml-1 text-[10px] bg-blue-200 px-1 rounded">총괄</span>
                            )}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">지역 없음</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {expert.services && expert.services.length > 0 ? (
                        expert.services.map((service) => (
                          <span 
                            key={service} 
                            className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                          >
                            {service}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">서비스 없음</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={expert.showOnMain ? "text-blue-600 hover:text-blue-900" : "text-gray-400 hover:text-gray-600"}
                      onClick={() => handleToggleVisibility(expert.id, expert.name, expert.showOnMain || false)}
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
                      onClick={() => handleDelete(expert.id, expert.name)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  등록된 전문가가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpertsTable;
