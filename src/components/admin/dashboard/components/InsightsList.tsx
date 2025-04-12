
import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Insight } from '../../insights/types';

interface InsightsListProps {
  insights: Insight[];
  title: string;
}

const InsightsList = ({ insights, title }: InsightsListProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pretendard font-semibold text-xl">{title}</h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin?section=insights')}>
          모두 보기
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">제목</th>
                <th className="text-left p-4 font-medium text-muted-foreground">카테고리</th>
                <th className="text-left p-4 font-medium text-muted-foreground">발행일</th>
                <th className="text-left p-4 font-medium text-muted-foreground">조회수</th>
              </tr>
            </thead>
            <tbody>
              {insights.map((insight) => (
                <tr key={insight.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="line-clamp-1">{insight.title}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md">
                      {insight.category}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-600">{insight.date}</td>
                  <td className="p-4 text-neutral-600">{insight.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4">
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/admin?section=insights')}>
              <Plus className="h-4 w-4 mr-2" />
              인사이트 추가하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsList;
