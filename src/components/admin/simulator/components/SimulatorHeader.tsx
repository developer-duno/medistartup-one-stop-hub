
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface SimulatorHeaderProps {
  onCreateSimulator: () => void;
  isListView: boolean;
}

const SimulatorHeader: React.FC<SimulatorHeaderProps> = ({ 
  onCreateSimulator,
  isListView
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-pretendard font-bold text-2xl">시뮬레이터 관리</h2>
      {isListView && (
        <Button onClick={onCreateSimulator}>
          <Plus className="h-4 w-4 mr-2" />
          시뮬레이터 추가
        </Button>
      )}
    </div>
  );
};

export default SimulatorHeader;
