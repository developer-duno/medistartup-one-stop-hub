
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { ExpertItem } from './dashboardData';

interface RecentExpertsCardProps {
  experts: ExpertItem[];
  onViewAllClick: () => void;
  onProfileClick: (expertName: string) => void;
}

const RecentExpertsCard: React.FC<RecentExpertsCardProps> = ({ 
  experts, 
  onViewAllClick,
  onProfileClick
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">최근 등록된 전문가</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary"
            onClick={onViewAllClick}
          >
            모두 보기
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {experts.map((expert, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{expert.name}</p>
                  <p className="text-sm text-muted-foreground">신규 등록</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onProfileClick(expert.name)}
              >
                프로필
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpertsCard;
