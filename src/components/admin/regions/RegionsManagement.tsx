
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Region {
  id: string;
  name: string;
  manager: string;
  phone: string;
  email: string;
  position: { x: string; y: string };
  successRate: number;
}

const RegionsManagement = () => {
  const [regions, setRegions] = useState<Region[]>([
    { 
      id: 'daejeon', 
      name: '대전/충남', 
      manager: '김의사', 
      phone: '042-123-4567', 
      email: 'daejeon@medistartup.kr',
      position: { x: '60%', y: '40%' },
      successRate: 92
    },
    { 
      id: 'seoul', 
      name: '서울/경기', 
      manager: '박컨설턴트', 
      phone: '02-456-7890', 
      email: 'seoul@medistartup.kr',
      position: { x: '30%', y: '25%' },
      successRate: 94
    },
    { 
      id: 'busan', 
      name: '부산/경남', 
      manager: '이닥터', 
      phone: '051-789-0123', 
      email: 'busan@medistartup.kr',
      position: { x: '75%', y: '70%' },
      successRate: 90
    },
    { 
      id: 'daegu', 
      name: '대구/경북', 
      manager: '최원장', 
      phone: '053-234-5678', 
      email: 'daegu@medistartup.kr',
      position: { x: '65%', y: '50%' },
      successRate: 88
    },
    { 
      id: 'gwangju', 
      name: '광주/전라', 
      manager: '정매니저', 
      phone: '062-345-6789', 
      email: 'gwangju@medistartup.kr',
      position: { x: '30%', y: '65%' },
      successRate: 89
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">지역별 데스크 관리</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          지역 데스크 추가
        </Button>
      </div>

      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="list">목록 보기</TabsTrigger>
          <TabsTrigger value="map">지도 보기</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">지역</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">담당자</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">연락처</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">이메일</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">성공률</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((region) => (
                    <tr key={region.id} className="border-b">
                      <td className="p-4">{region.name}</td>
                      <td className="p-4">{region.manager}</td>
                      <td className="p-4">{region.phone}</td>
                      <td className="p-4">{region.email}</td>
                      <td className="p-4">{region.successRate}%</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="p-4">
            <div className="relative bg-white rounded-xl p-2 h-[500px] border">
              <svg 
                viewBox="0 0 500 600" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M180,150 C150,180 120,170 100,200 C80,230 70,280 90,320 C110,360 130,400 180,420 C230,440 280,430 330,410 C380,390 410,350 430,300 C450,250 440,200 420,150 C400,100 350,80 300,90 C250,100 210,120 180,150 Z" 
                  fill="#EBF2FC" 
                  stroke="#2C6ECB"
                  strokeWidth="2"
                />

                {regions.map((region) => (
                  <g key={region.id}>
                    <circle 
                      cx={region.position.x} 
                      cy={region.position.y} 
                      r="15"
                      className="fill-primary stroke-primary stroke-2 cursor-pointer"
                    />
                    <text 
                      x={region.position.x} 
                      y={region.position.y}
                      dy=".3em"
                      textAnchor="middle"
                      className="fill-white text-xs font-medium cursor-pointer"
                    >
                      {region.id.charAt(0).toUpperCase()}
                    </text>
                    <text 
                      x={region.position.x} 
                      y={parseFloat(region.position.y.replace('%', '')) + 35 + '%'}
                      textAnchor="middle"
                      className="fill-neutral-700 text-xs font-noto cursor-pointer"
                    >
                      {region.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              지도에서 지역 위치를 드래그하여 조정할 수 있습니다.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      <h3 className="font-pretendard font-semibold text-xl mb-4">지역별 전문가 매칭</h3>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-4">
            각 지역에 활동 가능한 전문가를 매칭하세요. 한 전문가는 여러 지역을 담당할 수 있습니다.
          </p>
          
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium text-muted-foreground">지역</th>
                <th className="text-left p-2 font-medium text-muted-foreground">매칭된 전문가</th>
                <th className="text-right p-2 font-medium text-muted-foreground">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">서울/경기</td>
                <td className="p-2">김태호, 이준호, 윤재호</td>
                <td className="p-2 text-right">
                  <Button variant="outline" size="sm">수정</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">대전/충남</td>
                <td className="p-2">박지연, 최민서</td>
                <td className="p-2 text-right">
                  <Button variant="outline" size="sm">수정</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">부산/경남</td>
                <td className="p-2">강현우, 한지민</td>
                <td className="p-2 text-right">
                  <Button variant="outline" size="sm">수정</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionsManagement;
