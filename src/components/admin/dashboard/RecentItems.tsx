
import React from 'react';
import { Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExperts } from '@/contexts/ExpertsContext';
import { useInsights } from '@/contexts/InsightsContext';

interface RecentItemsProps {
  setActiveSection: (section: string) => void;
}

const RecentItems: React.FC<RecentItemsProps> = ({ setActiveSection }) => {
  const { experts } = useExperts();
  const { insights } = useInsights();

  // Sort by id desc and take top 3
  const recentExperts = [...experts]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  const recentInsights = [...insights]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">최근 등록된 전문가</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => setActiveSection('experts')}
            >
              모두 보기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExperts.length === 0 ? (
              <p className="text-sm text-muted-foreground">등록된 전문가가 없습니다.</p>
            ) : (
              recentExperts.map((expert) => (
                <div key={expert.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{expert.name}</p>
                      <p className="text-sm text-muted-foreground">{expert.specialty}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveSection('experts')}
                  >
                    관리
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">최근 등록된 인사이트</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => setActiveSection('insights')}
            >
              모두 보기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInsights.length === 0 ? (
              <p className="text-sm text-muted-foreground">등록된 인사이트가 없습니다.</p>
            ) : (
              recentInsights.map((insight) => (
                <div key={insight.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-secondary" />
                    </div>
                    <p className="font-medium line-clamp-1">{insight.title}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveSection('insights')}
                  >
                    보기
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentItems;
