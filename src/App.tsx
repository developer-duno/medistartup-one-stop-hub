
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from './pages/Index';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ExpertProfile from './pages/ExpertProfile';
import ExpertList from './pages/ExpertList';
import SuccessStories from './pages/SuccessStories';
import Insights from './pages/Insights';

// Services Pages
import LocationAnalysis from './pages/services/LocationAnalysis';
import FinancialConsulting from './pages/services/FinancialConsulting';
import DesignInterior from './pages/services/DesignInterior';
import Licensing from './pages/services/Licensing';
import Recruitment from './pages/services/Recruitment';
import MarketingStrategy from './pages/services/MarketingStrategy';
import MedicalEquipment from './pages/services/MedicalEquipment';
import WasteManagement from './pages/services/WasteManagement';

// Context Providers
import { ExpertsProvider } from './contexts/ExpertsContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ExpertsProvider>
      <ServicesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/experts" element={<ExpertList />} />
            <Route path="/expert/:id" element={<ExpertProfile />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/insights" element={<Insights />} />
            
            {/* Services Routes */}
            <Route path="/services/location-analysis" element={<LocationAnalysis />} />
            <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
            <Route path="/services/design-interior" element={<DesignInterior />} />
            <Route path="/services/licensing" element={<Licensing />} />
            <Route path="/services/recruitment" element={<Recruitment />} />
            <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
            <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
            <Route path="/services/waste-management" element={<WasteManagement />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ServicesProvider>
    </ExpertsProvider>
  );
}

export default App;
