
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface UsageData {
  date: string;
  views: number;
}

interface SimulatorUsageProps {
  usageData: UsageData[];
}

const SimulatorUsage: React.FC<SimulatorUsageProps> = ({ usageData }) => {
  const totalViews = usageData.reduce((total, d) => total + d.views, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>시뮬레이터 사용 통계</CardTitle>
        <CardDescription>지난 6개월간 시뮬레이터 사용량</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center flex flex-col items-center">
              <BarChart3 className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-muted-foreground">통계 차트는 개발 중입니다.</p>
              <p className="text-sm text-muted-foreground mt-2">
                {totalViews} 총 조회수
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatorUsage;
