
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatItem } from './dashboardTypes';
import { useToast } from '@/components/ui/use-toast';

interface DashboardStatsProps {
  stats: StatItem[];
  setActiveSection: (section: string) => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, setActiveSection }) => {
  const { toast } = useToast();
  
  const handleCardClick = (stat: StatItem) => {
    if (stat.section) {
      setActiveSection(stat.section);
    } else if (stat.toastMessage) {
      toast({
        title: stat.toastMessage.title,
        description: stat.toastMessage.description,
        variant: "default",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={stat.section || stat.toastMessage ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
          onClick={() => handleCardClick(stat)}
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
      ))}
    </div>
  );
};

export default DashboardStats;
