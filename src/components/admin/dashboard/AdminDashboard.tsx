
import React from 'react';
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const stats = [
    { 
      title: '총 전문가', 
      value: '8명', 
      change: '+2명', 
      icon: <Users className="h-8 w-8 text-primary" /> 
    },
    { 
      title: '이번 달 상담 신청', 
      value: '24건', 
      change: '+12%', 
      icon: <MessageSquare className="h-8 w-8 text-secondary" /> 
    },
    { 
      title: '페이지 조회수', 
      value: '1,248', 
      change: '+18%', 
      icon: <Eye className="h-8 w-8 text-accent" /> 
    },
    { 
      title: '성공사례', 
      value: '16건', 
      change: '+3건', 
      icon: <Trophy className="h-8 w-8 text-green-500" /> 
    }
  ];

  const quickLinks = [
    { title: '전문가 추가', icon: <Users className="h-5 w-5" />, section: 'experts' },
    { title: '서비스 관리', icon: <Settings className="h-5 w-5" />, section: 'services' },
    { title: '인사이트 추가', icon: <FileText className="h-5 w-5" />, section: 'insights' },
    { title: '시뮬레이터 수정', icon: <BarChart3 className="h-5 w-5" />, section: 'simulator' },
    { title: '지역 데스크 관리', icon: <MapPin className="h-5 w-5" />, section: 'regions' },
    { title: '성공사례 추가', icon: <Trophy className="h-5 w-5" />, section: 'success' }
  ];

  return (
    <div>
      <h2 className="font-pretendard font-bold text-2xl mb-6">대시보드</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span> 전월 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="font-pretendard font-semibold text-xl mb-4">빠른 작업</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <Card key={index} className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="bg-primary/10 p-2 rounded-full">
                {link.icon}
              </div>
              <span className="font-medium">{link.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="font-pretendard font-semibold text-xl mb-4">최근 상담 신청</h3>
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
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">김의사</td>
                <td className="p-4">010-1234-5678</td>
                <td className="p-4">입지 분석</td>
                <td className="p-4">2023-04-10</td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">진행중</span></td>
              </tr>
              <tr className="border-b">
                <td className="p-4">이원장</td>
                <td className="p-4">010-9876-5432</td>
                <td className="p-4">재무 컨설팅</td>
                <td className="p-4">2023-04-09</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
              </tr>
              <tr>
                <td className="p-4">박의사</td>
                <td className="p-4">010-5555-1234</td>
                <td className="p-4">인허가 대행</td>
                <td className="p-4">2023-04-08</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
