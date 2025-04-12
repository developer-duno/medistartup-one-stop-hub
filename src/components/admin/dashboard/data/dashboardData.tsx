
import React from 'react';
import { 
  Users, Settings, FileText, BarChart3, 
  MapPin, Trophy, Eye, MessageSquare 
} from 'lucide-react';
import { Insight } from '../../insights/types';

export interface Stat {
  title: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export interface Consultation {
  name: string;
  contact: string;
  service: string;
  date: string;
  status: 'pending' | 'completed' | 'needsAssignment';
}

export interface Service {
  name: string;
  consultations: number;
  change: string;
  trend: 'up' | 'down';
}

export const stats: Stat[] = [
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

export const recentInsights: Insight[] = [
  {
    id: 1,
    title: "2025년 병원창업 트렌드 보고서 - 의료정책 변화와 대응방안",
    category: "트렌드 리포트",
    date: "2025.03.15",
    views: 342,
    image: "https://images.unsplash.com/photo-1576091160550-bdfa8387f952?q=80&w=2070&auto=format&fit=crop",
    excerpt: "2025년 1월부터 시행된 '의료기관 개설 허가 간소화법'의 핵심 내용과 개원의가 알아야 할 대응 방안을 소개합니다."
  },
  {
    id: 2,
    title: "디지털 헬스케어 시대의 병원 공간 설계 - 효율과 환자경험의 균형",
    category: "설계 & 인테리어",
    date: "2025.02.28",
    views: 215,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    excerpt: "디지털 장비와 전통적 의료공간의 조화로운 설계로 환자 만족도와 진료 효율성을 모두 높이는 방법을 알아봅니다."
  },
  {
    id: 3,
    title: "빅데이터로 보는 2025년 입지 분석 - 지역별 의료수요 예측",
    category: "입지 분석",
    date: "2025.02.10",
    views: 189,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    excerpt: "최신 인구통계와 의료이용 패턴 데이터를 기반으로 2025년 지역별 의료수요 변화를 예측하고 분석합니다."
  },
  {
    id: 4,
    title: "의료기기 구입 최적화 가이드 - 비용절감과 효율성 향상 전략",
    category: "의료기기",
    date: "2025.01.25",
    views: 167,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop",
    excerpt: "병원 규모와 진료과목별 필수 의료장비 선정 가이드와 비용 대비 효과를 극대화하는 구매 전략을 제시합니다."
  },
  {
    id: 5,
    title: "병원 폐기물 관리의 새로운 규제와 효과적인 대응 방법",
    category: "의료폐기물",
    date: "2025.01.15",
    views: 142,
    image: "https://images.unsplash.com/photo-1530533718754-001d2668365a?q=80&w=2070&auto=format&fit=crop",
    excerpt: "2025년 시행되는 의료폐기물 관리 강화 정책의 주요 내용과 효율적인 폐기물 관리 시스템 구축 방안을 알아봅니다."
  }
];

export const topServices: Service[] = [
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

export const recentConsultations: Consultation[] = [
  {
    name: "김의사",
    contact: "010-1234-5678",
    service: "입지 분석",
    date: "2025-04-10",
    status: "pending"
  },
  {
    name: "이원장",
    contact: "010-9876-5432",
    service: "재무 컨설팅",
    date: "2025-04-09",
    status: "completed"
  },
  {
    name: "박의사",
    contact: "010-5555-1234",
    service: "인허가 대행",
    date: "2025-04-08",
    status: "completed"
  },
  {
    name: "최치과",
    contact: "010-2222-3333", 
    service: "설계 및 인테리어",
    date: "2025-04-07",
    status: "needsAssignment"
  }
];
