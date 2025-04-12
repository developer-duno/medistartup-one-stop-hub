
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare 
} from 'lucide-react';
import React, { ReactNode } from 'react';

// Helper function to create icon elements
const createIcon = (Icon: any, className: string): ReactNode => {
  return React.createElement(Icon, { className });
};

export const statsData = [
  { 
    title: '총 전문가', 
    value: '8명', 
    change: '+2명', 
    icon: createIcon(Users, "h-8 w-8 text-primary"),
    section: 'experts'
  },
  { 
    title: '이번 달 상담 신청', 
    value: '24건', 
    change: '+12%', 
    icon: createIcon(MessageSquare, "h-8 w-8 text-secondary"),
    toastMessage: {
      title: "상담 신청 관리",
      description: "상담 신청 관리 기능은 준비 중입니다."
    }
  },
  { 
    title: '페이지 조회수', 
    value: '1,248', 
    change: '+18%', 
    icon: createIcon(Eye, "h-8 w-8 text-accent"),
    toastMessage: {
      title: "통계 확인",
      description: "페이지 조회수 상세 통계 기능은 준비 중입니다."
    }
  },
  { 
    title: '성공사례', 
    value: '16건', 
    change: '+3건', 
    icon: createIcon(Trophy, "h-8 w-8 text-green-500"),
    section: 'success'
  }
];

export const quickLinksData = [
  { title: '전문가 추가', icon: createIcon(Users, "h-5 w-5"), section: 'experts' },
  { title: '서비스 관리', icon: createIcon(Settings, "h-5 w-5"), section: 'services' },
  { title: '인사이트 추가', icon: createIcon(FileText, "h-5 w-5"), section: 'insights' },
  { title: '시뮬레이터 수정', icon: createIcon(BarChart3, "h-5 w-5"), section: 'simulator' },
  { title: '지역 데스크 관리', icon: createIcon(MapPin, "h-5 w-5"), section: 'regions' },
  { title: '성공사례 추가', icon: createIcon(Trophy, "h-5 w-5"), section: 'success' }
];
