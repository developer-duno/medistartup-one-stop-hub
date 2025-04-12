
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ConsultationItem } from './dashboardData';

interface ConsultationsTableProps {
  consultations: ConsultationItem[];
  onViewAllClick: () => void;
  onDetailsClick: () => void;
}

const ConsultationsTable: React.FC<ConsultationsTableProps> = ({ 
  consultations, 
  onViewAllClick, 
  onDetailsClick 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pretendard font-semibold text-xl">최근 상담 신청</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={onViewAllClick}
        >
          모든 상담 보기
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">이름</th>
                <th className="text-left p-4 font-medium text-muted-foreground">연락처</th>
                <th className="text-left p-4 font-medium text-muted-foreground">관심 서비스</th>
                <th className="text-left p-4 font-medium text-muted-foreground">신청일</th>
                <th className="text-left p-4 font-medium text-muted-foreground">상태</th>
                <th className="text-left p-4 font-medium text-muted-foreground">관리</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation, index) => (
                <tr key={index} className={index !== consultations.length - 1 ? "border-b" : ""}>
                  <td className="p-4">{consultation.name}</td>
                  <td className="p-4">{consultation.contact}</td>
                  <td className="p-4">{consultation.service}</td>
                  <td className="p-4">{consultation.date}</td>
                  <td className="p-4">
                    <span className={`${
                      consultation.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    } px-2 py-1 rounded text-xs`}>
                      {consultation.status === 'pending' ? '진행중' : '완료'}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm" onClick={onDetailsClick}>상세보기</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationsTable;
