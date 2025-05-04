
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SimulatorCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const SimulatorCardHeader: React.FC<SimulatorCardHeaderProps> = ({
  icon,
  title,
  description,
  isExpanded,
  setIsExpanded
}) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="bg-primary/10 p-2.5 rounded-full">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <Button 
          variant={isExpanded ? "outline" : "ghost"} 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1"
        >
          {isExpanded ? '접기' : '시작하기'} 
          <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </Button>
      </div>
    </CardHeader>
  );
};

export default SimulatorCardHeader;
