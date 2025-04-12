
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RecentInsightsCardProps {
  setActiveSection: (section: string) => void;
}

const RecentInsightsCard: React.FC<RecentInsightsCardProps> = ({ setActiveSection }) => {
  const { toast } = useToast();
  
  const insights = [
    '2023년 의료기관 개원 트렌드 분석',
    '성공적인 의원 마케팅 전략 5가지',
    '의료기관 인허가 절차 간소화 가이드',
    '의료기관 재무 관리의 핵심 지표',
    '의료진 채용 및 관리 베스트 프랙티스',
    '최신 의료장비 도입 가이드 - ROI를 높이는 선택'
  ];

  return (
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
          {insights.map((insight, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-secondary" />
                </div>
                <p className="font-medium line-clamp-1">{insight}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "인사이트 보기",
                    description: `${insight.substring(0, 15)}... 인사이트 상세 보기 기능은 준비 중입니다.`,
                    variant: "default",
                  });
                }}
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
