
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare
} from 'lucide-react';
import { ReactNode } from 'react';

export interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  section?: string;
  onClick?: () => void;
}

export interface QuickLink {
  title: string;
  icon: ReactNode;
  section: string;
}

export interface ConsultationItem {
  name: string;
  contact: string;
  service: string;
  date: string;
  status: 'pending' | 'completed';
}

export interface ExpertItem {
  name: string;
}

export interface InsightItem {
  title: string;
}

export const getDashboardData = (handleToast: (title: string, description: string) => void) => {
  const stats: StatItem[] = [
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
        handleToast("상담 신청 관리", "상담 신청 관리 기능은 준비 중입니다.");
      }
    },
    { 
      title: '페이지 조회수', 
      value: '1,248', 
      change: '+18%', 
      icon: <Eye className="h-8 w-8 text-accent" />,
      onClick: () => {
        handleToast("통계 확인", "페이지 조회수 상세 통계 기능은 준비 중입니다.");
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

  const quickLinks: QuickLink[] = [
    { title: '전문가 추가', icon: <Users className="h-5 w-5" />, section: 'experts' },
    { title: '서비스 관리', icon: <Settings className="h-5 w-5" />, section: 'services' },
    { title: '인사이트 추가', icon: <FileText className="h-5 w-5" />, section: 'insights' },
    { title: '시뮬레이터 수정', icon: <BarChart3 className="h-5 w-5" />, section: 'simulator' },
    { title: '지역 데스크 관리', icon: <MapPin className="h-5 w-5" />, section: 'regions' },
    { title: '성공사례 추가', icon: <Trophy className="h-5 w-5" />, section: 'success' }
  ];

  const consultations: ConsultationItem[] = [
    {
      name: '김의사',
      contact: '010-1234-5678',
      service: '입지 분석',
      date: '2023-04-10',
      status: 'pending'
    },
    {
      name: '이원장',
      contact: '010-9876-5432',
      service: '재무 컨설팅',
      date: '2023-04-09',
      status: 'completed'
    },
    {
      name: '박의사',
      contact: '010-5555-1234',
      service: '인허가 대행',
      date: '2023-04-08',
      status: 'completed'
    }
  ];

  const recentExperts: ExpertItem[] = [
    { name: '윤재호' },
    { name: '한지민' },
    { name: '정서연' }
  ];

  const recentInsights: InsightItem[] = [
    { title: '2023년 의료기관 개원 트렌드 분석' },
    { title: '성공적인 의원 마케팅 전략 5가지' },
    { title: '의료기관 인허가 절차 간소화 가이드' },
    { title: '의료기관 재무 관리의 핵심 지표' },
    { title: '의료진 채용 및 관리 베스트 프랙티스' },
    { title: '최신 의료장비 도입 가이드 - ROI를 높이는 선택' }
  ];

  return {
    stats,
    quickLinks,
    consultations,
    recentExperts,
    recentInsights
  };
};
