
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RecentExpertsCardProps {
  setActiveSection: (section: string) => void;
}

const RecentExpertsCard: React.FC<RecentExpertsCardProps> = ({ setActiveSection }) => {
  const { toast } = useToast();
  const experts = ['윤재호', '한지민', '정서연'];

  return (
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
          {experts.map((expert, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{expert}</p>
                  <p className="text-sm text-muted-foreground">신규 등록</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "전문가 프로필",
                    description: `${expert} 전문가의 상세 프로필 보기 기능은 준비 중입니다.`,
                    variant: "default",
                  });
                }}
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
