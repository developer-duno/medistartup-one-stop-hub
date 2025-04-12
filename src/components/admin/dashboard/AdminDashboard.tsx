
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import StatsCard from './StatsCard';
import QuickActionCard from './QuickActionCard';
import ConsultationsTable from './ConsultationsTable';
import RecentExpertsCard from './RecentExpertsCard';
import RecentInsightsCard from './RecentInsightsCard';
import { statsData, quickLinksData } from './dashboardData';

const AdminDashboard = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const { toast } = useToast();

  return (
    <div>
      <h2 className="font-pretendard font-bold text-2xl mb-6">대시보드</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            section={stat.section}
            setActiveSection={setActiveSection}
            onClick={stat.toastMessage ? () => {
              toast({
                title: stat.toastMessage?.title,
                description: stat.toastMessage?.description,
                variant: "default",
              });
            } : undefined}
          />
        ))}
      </div>

      <h3 className="font-pretendard font-semibold text-xl mb-4">빠른 작업</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {quickLinksData.map((link, index) => (
          <QuickActionCard 
            key={index} 
            title={link.title}
            icon={link.icon}
            onClick={() => setActiveSection(link.section)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-pretendard font-semibold text-xl">최근 상담 신청</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={() => {
            toast({
              title: "상담 신청 관리",
              description: "모든 상담 신청 관리 기능은 준비 중입니다.",
              variant: "default",
            });
          }}
        >
          모든 상담 보기
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <ConsultationsTable />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <RecentExpertsCard setActiveSection={setActiveSection} />
        <RecentInsightsCard setActiveSection={setActiveSection} />
      </div>
    </div>
  );
};

export default AdminDashboard;
