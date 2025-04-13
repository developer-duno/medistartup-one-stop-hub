
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ExpertList from './pages/ExpertList';
import ExpertProfile from './pages/ExpertProfile';
import Insights from './pages/Insights';
import Admin from './pages/Admin';
import { ExpertsProvider } from './contexts/ExpertsContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { InsightsProvider } from './contexts/InsightsContext';
import { RegionsProvider } from './contexts/RegionsContext';
import { Toaster } from './components/ui/toaster';
import NotFound from './pages/NotFound';
import SuccessStories from './pages/SuccessStories';

// Import service pages
import DesignInterior from './pages/services/DesignInterior';
import FinancialConsulting from './pages/services/FinancialConsulting';
import Licensing from './pages/services/Licensing';
import LocationAnalysis from './pages/services/LocationAnalysis';
import MarketingStrategy from './pages/services/MarketingStrategy';
import MedicalEquipment from './pages/services/MedicalEquipment';
import Recruitment from './pages/services/Recruitment';
import WasteManagement from './pages/services/WasteManagement';

function App() {
  return (
    <ExpertsProvider>
      <ServicesProvider>
        <InsightsProvider>
          <RegionsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/experts" element={<ExpertList />} />
                <Route path="/experts/:id" element={<ExpertProfile />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                
                {/* Service routes */}
                <Route path="/services/design-interior" element={<DesignInterior />} />
                <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
                <Route path="/services/licensing" element={<Licensing />} />
                <Route path="/services/location-analysis" element={<LocationAnalysis />} />
                <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
                <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
                <Route path="/services/recruitment" element={<Recruitment />} />
                <Route path="/services/waste-management" element={<WasteManagement />} />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </RegionsProvider>
        </InsightsProvider>
      </ServicesProvider>
    </ExpertsProvider>
  );
}

export default App;
