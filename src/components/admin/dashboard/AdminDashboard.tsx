
import React from 'react';
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare, ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const { toast } = useToast();
  
  const stats = [
    { 
      title: '총 전문가', 
      value: '8명', 
      change: '+2명', 
      icon: <Users className="h-8 w-8 text-primary" />,
      section: 'experts'
    },
    { 
      title: '이번 달 상담 신청', 
      value: '24건', 
      change: '+12%', 
      icon: <MessageSquare className="h-8 w-8 text-secondary" />,
      onClick: () => {
        toast({
          title: "상담 신청 관리",
          description: "상담 신청 관리 기능은 준비 중입니다.",
          variant: "default",
        });
      }
    },
    { 
      title: '페이지 조회수', 
      value: '1,248', 
      change: '+18%', 
      icon: <Eye className="h-8 w-8 text-accent" />,
      onClick: () => {
        toast({
          title: "통계 확인",
          description: "페이지 조회수 상세 통계 기능은 준비 중입니다.",
          variant: "default",
        });
      }
    },
    { 
      title: '성공사례', 
      value: '16건', 
      change: '+3건', 
      icon: <Trophy className="h-8 w-8 text-green-500" />,
      section: 'success'
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

  const handleConsultationDetails = () => {
    toast({
      title: "상담 상세정보",
      description: "상담 상세정보 보기 기능은 준비 중입니다.",
      variant: "default",
    });
  };

  return (
    <div>
      <h2 className="font-pretendard font-bold text-2xl mb-6">대시보드</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={stat.section || stat.onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
            onClick={stat.section ? () => setActiveSection(stat.section) : stat.onClick}
          >
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
          <Card 
            key={index} 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setActiveSection(link.section)}
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

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pretendard font-semibold text-xl">최근 상담 신청</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={() => {
            toast({
              title: "상담 신청 관리",
              description: "모든 상담 신청 관리 기능은 준비 중입니다.",
              variant: "default",
            });
          }}
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
                    onClick={() => {
                      toast({
                        title: "전문가 프로필",
                        description: `${expert} 전문가의 상세 프로필 보기 기능은 준비 중입니다.`,
                        variant: "default",
                      });
                    }}
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
                '의료기관 인허가 절차 간소화 가이드'
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
      </div>
    </div>
  );
};

export default AdminDashboard;
