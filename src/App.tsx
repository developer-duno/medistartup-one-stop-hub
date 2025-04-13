
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Admin from './pages/Admin';
import Insights from './pages/Insights';
import ExpertProfile from './pages/ExpertProfile';
import ExpertList from './pages/ExpertList';
import SuccessStories from './pages/SuccessStories';
import NotFound from './pages/NotFound';
import { ExpertsProvider } from './contexts/ExpertsContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { InsightsProvider } from './contexts/InsightsContext';
import { Toaster } from '@/components/ui/toaster';

// Service pages
import LocationAnalysis from './pages/services/LocationAnalysis';
import Licensing from './pages/services/Licensing';
import DesignInterior from './pages/services/DesignInterior';
import WasteManagement from './pages/services/WasteManagement';
import MedicalEquipment from './pages/services/MedicalEquipment';
import Recruitment from './pages/services/Recruitment';
import MarketingStrategy from './pages/services/MarketingStrategy';
import FinancialConsulting from './pages/services/FinancialConsulting';

function App() {
  return (
    <Router>
      <ExpertsProvider>
        <ServicesProvider>
          <InsightsProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:id" element={<Insights />} />
              <Route path="/experts" element={<ExpertList />} />
              <Route path="/expert/:id" element={<ExpertProfile />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              {/* Services routes */}
              <Route path="/services/location-analysis" element={<LocationAnalysis />} />
              <Route path="/services/licensing" element={<Licensing />} />
              <Route path="/services/design-interior" element={<DesignInterior />} />
              <Route path="/services/waste-management" element={<WasteManagement />} />
              <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
              <Route path="/services/recruitment" element={<Recruitment />} />
              <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
              <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </InsightsProvider>
        </ServicesProvider>
      </ExpertsProvider>
    </Router>
  );
}

export default App;
