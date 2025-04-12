
import React from 'react';
import { Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

interface RecentItemsProps {
  setActiveSection: (section: string) => void;
}

const RecentItems: React.FC<RecentItemsProps> = ({ setActiveSection }) => {
  const { toast } = useToast();

  const handleExpertProfile = (expert: string) => {
    toast({
      title: "전문가 프로필",
      description: `${expert} 전문가의 상세 프로필 보기 기능은 준비 중입니다.`,
      variant: "default",
    });
  };

  const handleInsightView = (insight: string) => {
    toast({
      title: "인사이트 보기",
      description: `${insight.substring(0, 15)}... 인사이트 상세 보기 기능은 준비 중입니다.`,
      variant: "default",
    });
  };

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
            {['윤재호', '한지민', '정서연'].map((expert, i) => (
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
                  onClick={() => handleExpertProfile(expert)}
                >
                  프로필
                </Button>
              </div>
            ))}
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
            {[
              '2023년 의료기관 개원 트렌드 분석',
              '성공적인 의원 마케팅 전략 5가지',
              '의료기관 인허가 절차 간소화 가이드',
              '의료기관 재무 관리의 핵심 지표',
              '의료진 채용 및 관리 베스트 프랙티스',
              '최신 의료장비 도입 가이드 - ROI를 높이는 선택'
            ].map((insight, i) => (
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
                  onClick={() => handleInsightView(insight)}
                >
                  보기
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentItems;
