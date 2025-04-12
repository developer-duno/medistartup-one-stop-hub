
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ConsultationsTable = () => {
  const { toast } = useToast();

  const handleConsultationDetails = () => {
    toast({
      title: "상담 상세정보",
      description: "상담 상세정보 보기 기능은 준비 중입니다.",
      variant: "default",
    });
  };

  return (
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
            <tr className="border-b">
              <td className="p-4">김의사</td>
              <td className="p-4">010-1234-5678</td>
              <td className="p-4">입지 분석</td>
              <td className="p-4">2023-04-10</td>
              <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">진행중</span></td>
              <td className="p-4">
                <Button variant="outline" size="sm" onClick={handleConsultationDetails}>상세보기</Button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4">이원장</td>
              <td className="p-4">010-9876-5432</td>
              <td className="p-4">재무 컨설팅</td>
              <td className="p-4">2023-04-09</td>
              <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
              <td className="p-4">
                <Button variant="outline" size="sm" onClick={handleConsultationDetails}>상세보기</Button>
              </td>
            </tr>
            <tr>
              <td className="p-4">박의사</td>
              <td className="p-4">010-5555-1234</td>
              <td className="p-4">인허가 대행</td>
              <td className="p-4">2023-04-08</td>
              <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
              <td className="p-4">
                <Button variant="outline" size="sm" onClick={handleConsultationDetails}>상세보기</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ConsultationsTable;
