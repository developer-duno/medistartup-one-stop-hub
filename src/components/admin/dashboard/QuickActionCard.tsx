
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QuickActionCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  icon, 
  onClick
}) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div className="bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
