
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ExpertsManagement from '@/components/admin/experts/ExpertsManagement';
import ServicesManagement from '@/components/admin/services/ServicesManagement';
import InsightsManagement from '@/components/admin/insights/InsightsManagement';
import SimulatorManagement from '@/components/admin/simulator/SimulatorManagement';
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import RegionsManagement from '@/components/admin/regions/RegionsManagement';
import SuccessStoriesManagement from '@/components/admin/success/SuccessStoriesManagement';
import ConsultationsManagement from '@/components/admin/consultations/ConsultationsManagement';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "관리자 대시보드",
      description: "모든 섹션이 연동되어 실제 관리 가능합니다.",
      variant: "default",
    });
  }, []);

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === "dashboard" && <AdminDashboard setActiveSection={setActiveSection} />}
      {activeSection === "experts" && <ExpertsManagement />}
      {activeSection === "consultations" && <ConsultationsManagement />}
      {activeSection === "services" && <ServicesManagement />}
      {activeSection === "insights" && <InsightsManagement />}
      {activeSection === "simulator" && <SimulatorManagement />}
      {activeSection === "regions" && <RegionsManagement />}
      {activeSection === "success" && <SuccessStoriesManagement />}
    </AdminLayout>
  );
};

export default Admin;
