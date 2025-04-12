
import React from 'react';
import { getStatsData, quickLinksData } from './dashboardData';
import DashboardStats from './DashboardStats';
import QuickLinks from './QuickLinks';
import RecentItems from './RecentItems';
import { useExperts } from '@/contexts/ExpertsContext';

interface AdminDashboardProps {
  setActiveSection: (section: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveSection }) => {
  const { experts } = useExperts();
  const statsData = getStatsData(experts.length);
  
  return (
    <div>
      <h2 className="font-pretendard font-bold text-2xl mb-6">대시보드</h2>
      
      <DashboardStats 
        stats={statsData} 
        setActiveSection={setActiveSection}
      />

      <h3 className="font-pretendard font-semibold text-xl mb-4">빠른 작업</h3>
      <QuickLinks 
        links={quickLinksData}
        setActiveSection={setActiveSection} 
      />
      
      <RecentItems setActiveSection={setActiveSection} />
    </div>
  );
};

export default AdminDashboard;
