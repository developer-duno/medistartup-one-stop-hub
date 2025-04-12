
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuickLink } from './dashboardData';

interface QuickActionCardProps {
  link: QuickLink;
  onActionClick: (section: string) => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ link, onActionClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onActionClick(link.section)}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <div className="bg-primary/10 p-2 rounded-full">
          {link.icon}
        </div>
        <span className="font-medium">{link.title}</span>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
