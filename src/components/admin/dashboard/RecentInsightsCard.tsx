
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { InsightItem } from './dashboardData';

interface RecentInsightsCardProps {
  insights: InsightItem[];
  onViewAllClick: () => void;
  onInsightClick: (insightTitle: string) => void;
}

const RecentInsightsCard: React.FC<RecentInsightsCardProps> = ({ 
  insights, 
  onViewAllClick,
  onInsightClick
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">최근 등록된 인사이트</CardTitle>
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
          {insights.map((insight, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-secondary" />
                </div>
                <p className="font-medium line-clamp-1">{insight.title}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onInsightClick(insight.title)}
              >
                보기
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentInsightsCard;
