
import React from 'react';
import { getStatsData, quickLinksData } from './dashboardData';
import DashboardStats from './DashboardStats';
import QuickLinks from './QuickLinks';
import RecentItems from './RecentItems';
import { useExperts } from '@/contexts/ExpertsContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AdminDashboardProps {
  setActiveSection: (section: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveSection }) => {
  const { experts } = useExperts();
  const statsData = getStatsData(experts.length);
  
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
