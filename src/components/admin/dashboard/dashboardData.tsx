
import React from 'react';
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare 
} from 'lucide-react';
import { StatItem, QuickLinkItem } from './dashboardTypes';

export const getStatsData = (expertsCount: number): StatItem[] => [
  { 
    title: '총 전문가', 
    value: `${expertsCount}명`, 
    change: expertsCount > 8 ? `+${expertsCount - 8}명` : '+0명', 
    icon: <Users className="h-8 w-8 text-primary" />,
    section: 'experts',
    dynamicData: true
  },
  { 
    title: '이번 달 상담 신청', 
    value: '24건', 
    change: '+12%', 
    icon: <MessageSquare className="h-8 w-8 text-secondary" />,
    toastMessage: {
      title: "상담 신청 관리",
      description: "상담 신청 관리 기능은 준비 중입니다."
    }
  },
  { 
    title: '페이지 조회수', 
    value: '1,248', 
    change: '+18%', 
    icon: <Eye className="h-8 w-8 text-accent" />,
    toastMessage: {
      title: "통계 확인",
      description: "페이지 조회수 상세 통계 기능은 준비 중입니다."
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

export const quickLinksData: QuickLinkItem[] = [
  { title: '전문가 추가', icon: <Users className="h-5 w-5" />, section: 'experts' },
  { title: '서비스 관리', icon: <Settings className="h-5 w-5" />, section: 'services' },
  { title: '인사이트 추가', icon: <FileText className="h-5 w-5" />, section: 'insights' },
  { title: '시뮬레이터 수정', icon: <BarChart3 className="h-5 w-5" />, section: 'simulator' },
  { title: '지역 데스크 관리', icon: <MapPin className="h-5 w-5" />, section: 'regions' },
  { title: '성공사례 추가', icon: <Trophy className="h-5 w-5" />, section: 'success' }
];
