
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract section from URL query parameters
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    
    if (section && ["dashboard", "experts", "services", "insights", "simulator", "regions", "success"].includes(section)) {
      setActiveSection(section);
    }
  }, [location]);

  // Update URL when section changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate(`/admin?section=${section}`);
  };

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={handleSectionChange}>
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
