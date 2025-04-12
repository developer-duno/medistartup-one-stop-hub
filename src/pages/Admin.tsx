
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ExpertsManagement from '@/components/admin/experts/ExpertsManagement';
import ServicesManagement from '@/components/admin/services/ServicesManagement';
import InsightsManagement from '@/components/admin/insights/InsightsManagement';
import SimulatorManagement from '@/components/admin/simulator/SimulatorManagement';

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("experts");

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {activeSection === "experts" && <ExpertsManagement />}
      {activeSection === "services" && <ServicesManagement />}
      {activeSection === "insights" && <InsightsManagement />}
      {activeSection === "simulator" && <SimulatorManagement />}
    </AdminLayout>
  );
};

export default Admin;
