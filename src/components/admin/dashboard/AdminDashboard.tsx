
import React from 'react';
import { statsData, quickLinksData } from './dashboardData';
import DashboardStats from './DashboardStats';
import QuickLinks from './QuickLinks';
import RecentConsultations from './RecentConsultations';
import RecentItems from './RecentItems';

interface AdminDashboardProps {
  setActiveSection: (section: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveSection }) => {
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

      <RecentConsultations />
      
      <RecentItems setActiveSection={setActiveSection} />
    </div>
  );
};

export default AdminDashboard;
