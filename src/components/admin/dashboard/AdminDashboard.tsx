
import React, { useEffect, useState } from 'react';
import { quickLinksData } from './dashboardData';
import DashboardStats from './DashboardStats';
import QuickLinks from './QuickLinks';
import RecentItems from './RecentItems';
import { useExperts } from '@/contexts/ExpertsContext';
import { useInsights } from '@/contexts/InsightsContext';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Trophy, FileText, ClipboardList } from 'lucide-react';
import { StatItem } from './dashboardTypes';

interface AdminDashboardProps {
  setActiveSection: (section: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveSection }) => {
  const { experts } = useExperts();
  const { insights } = useInsights();
  const { successStories } = useSuccessStories();
  const [consultationCount, setConsultationCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchConsultations = async () => {
      const { count: total } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true });
      const { count: pending } = await supabase
        .from('consultations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      setConsultationCount(total || 0);
      setPendingCount(pending || 0);
    };
    fetchConsultations();
  }, []);

  const statsData: StatItem[] = [
    {
      title: '총 전문가',
      value: `${experts.length}명`,
      change: `활성 ${experts.filter(e => e.isApproved !== false).length}명`,
      icon: <Users className="h-8 w-8 text-primary" />,
      section: 'experts',
    },
    {
      title: '상담 신청',
      value: `${consultationCount}건`,
      change: pendingCount > 0 ? `대기 ${pendingCount}건` : '대기 없음',
      icon: <ClipboardList className="h-8 w-8 text-accent" />,
      section: 'consultations',
    },
    {
      title: '인사이트',
      value: `${insights.length}건`,
      change: `총 ${insights.length}개 게시`,
      icon: <FileText className="h-8 w-8 text-secondary" />,
      section: 'insights',
    },
    {
      title: '성공사례',
      value: `${successStories.length}건`,
      change: `노출 ${successStories.filter(s => s.visible).length}건`,
      icon: <Trophy className="h-8 w-8 text-green-500" />,
      section: 'success',
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <DashboardStats 
        stats={statsData} 
        setActiveSection={setActiveSection}
      />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">빠른 작업</CardTitle>
        </CardHeader>
        <CardContent>
          <QuickLinks 
            links={quickLinksData}
            setActiveSection={setActiveSection} 
          />
        </CardContent>
      </Card>
      
      <RecentItems setActiveSection={setActiveSection} />
    </div>
  );
};

const DashboardHeader: React.FC = () => (
  <div className="flex items-center justify-between">
    <h2 className="font-pretendard font-bold text-2xl">대시보드</h2>
    <div className="text-sm text-muted-foreground">
      최종 업데이트: {new Date().toLocaleDateString('ko-KR')}
    </div>
  </div>
);

export default AdminDashboard;
