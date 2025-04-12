
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getDashboardData } from './dashboardData';
import StatsCard from './StatsCard';
import QuickActionCard from './QuickActionCard';
import ConsultationsTable from './ConsultationsTable';
import RecentExpertsCard from './RecentExpertsCard';
import RecentInsightsCard from './RecentInsightsCard';

const AdminDashboard = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const { toast } = useToast();
  
  const handleToast = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  };

  const { stats, quickLinks, consultations, recentExperts, recentInsights } = getDashboardData(handleToast);

  const handleConsultationDetails = () => {
    handleToast("상담 상세정보", "상담 상세정보 보기 기능은 준비 중입니다.");
  };

  const handleViewAllConsultations = () => {
    handleToast("상담 신청 관리", "모든 상담 신청 관리 기능은 준비 중입니다.");
  };

  const handleExpertProfile = (expertName: string) => {
    handleToast("전문가 프로필", `${expertName} 전문가의 상세 프로필 보기 기능은 준비 중입니다.`);
  };

  const handleInsightView = (insightTitle: string) => {
    handleToast("인사이트 보기", `${insightTitle.substring(0, 15)}... 인사이트 상세 보기 기능은 준비 중입니다.`);
  };

  return (
    <div>
      <h2 className="font-pretendard font-bold text-2xl mb-6">대시보드</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard 
            key={index}
            stat={stat}
            onCardClick={setActiveSection}
          />
        ))}
      </div>

      <h3 className="font-pretendard font-semibold text-xl mb-4">빠른 작업</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <QuickActionCard 
            key={index}
            link={link}
            onActionClick={setActiveSection}
          />
        ))}
      </div>

      <ConsultationsTable 
        consultations={consultations}
        onViewAllClick={handleViewAllConsultations}
        onDetailsClick={handleConsultationDetails}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <RecentExpertsCard 
          experts={recentExperts}
          onViewAllClick={() => setActiveSection('experts')}
          onProfileClick={handleExpertProfile}
        />
        
        <RecentInsightsCard 
          insights={recentInsights}
          onViewAllClick={() => setActiveSection('insights')}
          onInsightClick={handleInsightView}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
