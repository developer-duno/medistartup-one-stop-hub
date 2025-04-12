
import React from 'react';
import { SimulatorOption } from '../types';
import SimulatorOptionCard from './SimulatorOptionCard';

interface SimulatorOptionsListProps {
  options: SimulatorOption[];
  onEdit: (option: SimulatorOption) => void;
  onDelete: (optionId: string) => void;
}

const SimulatorOptionsList: React.FC<SimulatorOptionsListProps> = ({ 
  options, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <SimulatorOptionCard
          key={option.id}
          option={option}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SimulatorOptionsList;
