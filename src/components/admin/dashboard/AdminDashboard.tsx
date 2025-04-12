
import React from 'react';
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare,
  Plus, ArrowRight, ArrowUp, ArrowDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { 
      title: '총 전문가', 
      value: '8명', 
      change: '+2명', 
      trend: 'up',
      icon: <Users className="h-8 w-8 text-primary" /> 
    },
    { 
      title: '이번 달 상담 신청', 
      value: '24건', 
      change: '+12%', 
      trend: 'up',
      icon: <MessageSquare className="h-8 w-8 text-secondary" /> 
    },
    { 
      title: '페이지 조회수', 
      value: '1,248', 
      change: '+18%', 
      trend: 'up',
      icon: <Eye className="h-8 w-8 text-accent" /> 
    },
    { 
      title: '성공사례', 
      value: '16건', 
      change: '+3건', 
      trend: 'up',
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
  
  const recentInsights = [
    {
      id: 1,
      title: "2025년 병원창업 트렌드 보고서 - 의료정책 변화와 대응방안",
      category: "트렌드 리포트",
      date: "2025.03.15",
      views: 342
    },
    {
      id: 2,
      title: "디지털 헬스케어 시대의 병원 공간 설계 - 효율과 환자경험의 균형",
      category: "설계 & 인테리어",
      date: "2025.02.28",
      views: 215
    },
    {
      id: 3,
      title: "빅데이터로 보는 2025년 입지 분석 - 지역별 의료수요 예측",
      category: "입지 분석",
      date: "2025.02.10",
      views: 189
    }
  ];
  
  const topServices = [
    {
      name: "입지 분석",
      consultations: 38,
      change: "+12%",
      trend: "up"
    },
    {
      name: "재무 컨설팅",
      consultations: 32,
      change: "+8%",
      trend: "up"
    },
    {
      name: "설계 및 인테리어",
      consultations: 27,
      change: "+5%",
      trend: "up"
    },
    {
      name: "인허가 대행",
      consultations: 22,
      change: "-3%",
      trend: "down"
    },
    {
      name: "의료기기 구입 및 설치",
      consultations: 18,
      change: "+15%",
      trend: "up"
    }
  ];

  const handleQuickLink = (section: string) => {
    navigate(`/admin?section=${section}`);
  };

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
                <span className={stat.trend === 'up' ? 'text-green-500 flex items-center' : 'text-red-500 flex items-center'}>
                  {stat.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
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
          <Card 
            key={index} 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleQuickLink(link.section)}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div className="bg-primary/10 p-2 rounded-full">
                {link.icon}
              </div>
              <span className="font-medium">{link.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-pretendard font-semibold text-xl">최근 인사이트</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin?section=insights">
                모두 보기
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
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
                  {recentInsights.map((insight) => (
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
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin?section=insights" className="flex items-center justify-center">
                    <Plus className="h-4 w-4 mr-2" />
                    인사이트 추가하기
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-pretendard font-semibold text-xl">인기 서비스</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin?section=services">
                모두 보기
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">서비스</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">상담 건수</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">변화율</th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((service, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{service.name}</td>
                      <td className="p-4 text-center">{service.consultations}건</td>
                      <td className="p-4 text-right">
                        <span className={`flex items-center justify-end ${service.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {service.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                          {service.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/admin?section=simulator" className="flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    시뮬레이터 관리하기
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
                <th className="text-right p-4 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">김의사</td>
                <td className="p-4">010-1234-5678</td>
                <td className="p-4">입지 분석</td>
                <td className="p-4">2023-04-10</td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">진행중</span></td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">상세보기</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">이원장</td>
                <td className="p-4">010-9876-5432</td>
                <td className="p-4">재무 컨설팅</td>
                <td className="p-4">2023-04-09</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">상세보기</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4">박의사</td>
                <td className="p-4">010-5555-1234</td>
                <td className="p-4">인허가 대행</td>
                <td className="p-4">2023-04-08</td>
                <td className="p-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">완료</span></td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">상세보기</Button>
                </td>
              </tr>
              <tr>
                <td className="p-4">최치과</td>
                <td className="p-4">010-2222-3333</td>
                <td className="p-4">설계 및 인테리어</td>
                <td className="p-4">2023-04-07</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">배정 필요</span></td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">상세보기</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
