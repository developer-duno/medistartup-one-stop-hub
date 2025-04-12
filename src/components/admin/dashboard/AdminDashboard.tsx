
import React from 'react';
import { 
  stats,
  recentInsights, 
  topServices,
  recentConsultations
} from './data/dashboardData';
import StatsCard from './components/StatsCard';
import QuickLinks from './components/QuickLinks';
import InsightsList from './components/InsightsList';
import ServicesList from './components/ServicesList';
import ConsultationsList from './components/ConsultationsList';

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="font-pretendard font-bold text-2xl mb-6">대시보드</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      <QuickLinks title="빠른 작업" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <InsightsList insights={recentInsights} title="최근 인사이트" />
        <ServicesList services={topServices} title="인기 서비스" />
      </div>

      <ConsultationsList consultations={recentConsultations} title="최근 상담 신청" />
    </div>
  );
};

export default AdminDashboard;
