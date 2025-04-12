
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  onClick?: () => void;
  section?: string;
  setActiveSection?: (section: string) => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  onClick, 
  section, 
  setActiveSection 
}) => {
  const handleClick = () => {
    if (section && setActiveSection) {
      setActiveSection(section);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card 
      className={section || onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={change.includes('+') ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span> 전월 대비
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
