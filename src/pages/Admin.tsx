
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ExpertsManagement from '@/components/admin/experts/ExpertsManagement';
import ServicesManagement from '@/components/admin/services/ServicesManagement';
import InsightsManagement from '@/components/admin/insights/InsightsManagement';
import SimulatorManagement from '@/components/admin/simulator/SimulatorManagement';
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import RegionsManagement from '@/components/admin/regions/RegionsManagement';
import SuccessStoriesManagement from '@/components/admin/success/SuccessStoriesManagement';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === "dashboard" && <AdminDashboard />}
      {activeSection === "experts" && <ExpertsManagement />}
      {activeSection === "services" && <ServicesManagement />}
      {activeSection === "insights" && <InsightsManagement />}
      {activeSection === "simulator" && <SimulatorManagement />}
      {activeSection === "regions" && <RegionsManagement />}
      {activeSection === "success" && <SuccessStoriesManagement />}
    </AdminLayout>
  );
};

export default Admin;
