
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ExpertList from './pages/ExpertList';
import ExpertProfile from './pages/ExpertProfile';
import Services from './pages/Services';
import SuccessStories from './pages/SuccessStories';
import Insights from './pages/Insights';
import RegionalExperts from './pages/RegionalExperts';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Service detail pages
import LocationAnalysis from './pages/services/LocationAnalysis';
import FinancialConsulting from './pages/services/FinancialConsulting';
import DesignInterior from './pages/services/DesignInterior';
import Licensing from './pages/services/Licensing';
import Recruitment from './pages/services/Recruitment';
import MarketingStrategy from './pages/services/MarketingStrategy';
import MedicalEquipment from './pages/services/MedicalEquipment';
import WasteManagement from './pages/services/WasteManagement';

// Context providers
import { ExpertsProvider } from './contexts/ExpertsContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { RegionsProvider } from './contexts/RegionsContext';
import { InsightsProvider } from './contexts/InsightsContext';

// Component imports
import { Toaster } from './components/ui/toaster';

import './App.css';

function App() {
  return (
    <ExpertsProvider>
      <ServicesProvider>
        <RegionsProvider>
          <InsightsProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/experts" element={<ExpertList />} />
              <Route path="/experts/:id" element={<ExpertProfile />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/location-analysis" element={<LocationAnalysis />} />
              <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
              <Route path="/services/design-interior" element={<DesignInterior />} />
              <Route path="/services/licensing" element={<Licensing />} />
              <Route path="/services/recruitment" element={<Recruitment />} />
              <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
              <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
              <Route path="/services/waste-management" element={<WasteManagement />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:id" element={<Insights />} />
              <Route path="/regions" element={<RegionalExperts />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </InsightsProvider>
        </RegionsProvider>
      </ServicesProvider>
    </ExpertsProvider>
  );
}

export default App;
