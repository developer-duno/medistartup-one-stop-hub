
import React, { useEffect, useState } from 'react';
import { quickLinksData } from './dashboardData';
import DashboardStats from './DashboardStats';
import QuickLinks from './QuickLinks';
import RecentItems from './RecentItems';
import { useExperts } from '@/contexts/ExpertsContext';
import { useInsights } from '@/contexts/InsightsContext';
import { useSuccessStories } from '@/contexts/SuccessStoriesContext';
import { useServices } from '@/contexts/ServicesContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Trophy, FileText, ClipboardList, Eye, TrendingUp, Briefcase } from 'lucide-react';
import { StatItem } from './dashboardTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AdminDashboardProps {
  setActiveSection: (section: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveSection }) => {
  const { experts } = useExperts();
  const { insights } = useInsights();
  const { successStories } = useSuccessStories();
  const { services } = useServices();
  const [consultationCount, setConsultationCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [expertConsultationStats, setExpertConsultationStats] = useState<Record<number, number>>({});

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

      // Fetch consultation stats per expert
      const { data: consultations } = await supabase
        .from('consultations')
        .select('selected_expert_ids');
      
      if (consultations) {
        const stats: Record<number, number> = {};
        consultations.forEach((c: any) => {
          if (c.selected_expert_ids) {
            c.selected_expert_ids.forEach((eid: number) => {
              stats[eid] = (stats[eid] || 0) + 1;
            });
          }
        });
        setExpertConsultationStats(stats);
      }
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
    {
      title: '서비스',
      value: `${services.length}건`,
      change: `총 ${services.length}개 등록`,
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      section: 'services',
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            전문가 성과 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>전문가</TableHead>
                  <TableHead>전문 분야</TableHead>
                  <TableHead className="text-right">프로필 조회수</TableHead>
                  <TableHead className="text-right">상담 신청수</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...experts]
                  .sort((a, b) => (b.profileViews ?? 0) - (a.profileViews ?? 0))
                  .slice(0, 10)
                  .map(expert => (
                    <TableRow key={expert.id}>
                      <TableCell className="font-medium">{expert.name}</TableCell>
                      <TableCell className="text-muted-foreground">{expert.specialty}</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          {expert.profileViews ?? 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center gap-1">
                          <ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />
                          {expertConsultationStats[expert.id] ?? 0}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
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
