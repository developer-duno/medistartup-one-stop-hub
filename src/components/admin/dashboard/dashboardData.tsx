
import React from 'react';
import { 
  Users, Settings, FileText, BarChart3, 
  Trophy, ClipboardList, MapPin
} from 'lucide-react';
import { QuickLinkItem } from './dashboardTypes';

export const quickLinksData: QuickLinkItem[] = [
  { title: '전문가 추가', icon: <Users className="h-5 w-5" />, section: 'experts' },
  { title: '상담 신청 관리', icon: <ClipboardList className="h-5 w-5" />, section: 'consultations' },
  { title: '서비스 관리', icon: <Settings className="h-5 w-5" />, section: 'services' },
  { title: '인사이트 추가', icon: <FileText className="h-5 w-5" />, section: 'insights' },
  { title: '시뮬레이터 관리', icon: <BarChart3 className="h-5 w-5" />, section: 'simulator' },
  { title: '지역 관리', icon: <MapPin className="h-5 w-5" />, section: 'regions' },
  { title: '성공사례 추가', icon: <Trophy className="h-5 w-5" />, section: 'success' }
];
