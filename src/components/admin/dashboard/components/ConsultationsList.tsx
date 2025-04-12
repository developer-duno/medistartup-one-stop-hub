
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Consultation {
  name: string;
  contact: string;
  service: string;
  date: string;
  status: 'pending' | 'completed' | 'needsAssignment';
}

interface ConsultationsListProps {
  consultations: Consultation[];
  title: string;
}

const ConsultationsList = ({ consultations, title }: ConsultationsListProps) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">진행중</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span>;
      case 'needsAssignment':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">배정 필요</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">알 수 없음</span>;
    }
  };

  return (
    <div>
      <h3 className="font-pretendard font-semibold text-xl mb-4">{title}</h3>
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
                <th className="text-right p-4 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{consultation.name}</td>
                  <td className="p-4">{consultation.contact}</td>
                  <td className="p-4">{consultation.service}</td>
                  <td className="p-4">{consultation.date}</td>
                  <td className="p-4">{getStatusBadge(consultation.status)}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm">상세보기</Button>
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

export default ConsultationsList;
