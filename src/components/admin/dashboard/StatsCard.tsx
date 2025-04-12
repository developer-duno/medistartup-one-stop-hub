
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { StatItem } from './dashboardData';

interface StatsCardProps {
  stat: StatItem;
  onCardClick: (section: string | undefined) => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat, onCardClick }) => {
  const handleClick = () => {
    if (stat.section) {
      onCardClick(stat.section);
    } else if (stat.onClick) {
      stat.onClick();
    }
  };

  return (
    <Card 
      className={stat.section || stat.onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className={stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}>
            {stat.change}
          </span> 전월 대비
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
