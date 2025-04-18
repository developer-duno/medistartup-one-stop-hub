
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Index from './pages/Index';
import Services from './pages/Services';
import ExpertList from './pages/ExpertList';
import ExpertProfile from './pages/ExpertProfile';
import RegionalExperts from './pages/RegionalExperts';
import Insights from './pages/Insights';
import SuccessStories from './pages/SuccessStories';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Licensing from './pages/services/Licensing';
import FinancialConsulting from './pages/services/FinancialConsulting';
import MarketingStrategy from './pages/services/MarketingStrategy';
import LocationAnalysis from './pages/services/LocationAnalysis';
import DesignInterior from './pages/services/DesignInterior';
import WasteManagement from './pages/services/WasteManagement';
import Recruitment from './pages/services/Recruitment';
import MedicalEquipment from './pages/services/MedicalEquipment';
import { ExpertsProvider } from './contexts/ExpertsContext';
import { ServicesProvider } from './contexts/ServicesContext';
import { RegionsProvider } from './contexts/RegionsContext';
import { InsightsProvider } from './contexts/InsightsContext';
import { Toaster } from '@/components/ui/toaster';
import { SuccessStoriesProvider } from './contexts/SuccessStoriesContext';
import { ConsultationProvider } from './contexts/ConsultationContext';
import FloatingConsultButton from './components/consultation/FloatingConsultButton';
import ConsultationDialog from './components/consultation/ConsultationDialog';
import SuccessStoryDetail from './pages/SuccessStoryDetail';

function App() {
  return (
    <HelmetProvider>
      <ExpertsProvider>
        <ServicesProvider>
          <RegionsProvider>
            <InsightsProvider>
              <SuccessStoriesProvider>
                <ConsultationProvider>
                  <Toaster />
                  <FloatingConsultButton />
                  <ConsultationDialog />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/licensing" element={<Licensing />} />
                    <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
                    <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
                    <Route path="/services/location-analysis" element={<LocationAnalysis />} />
                    <Route path="/services/design-interior" element={<DesignInterior />} />
                    <Route path="/services/waste-management" element={<WasteManagement />} />
                    <Route path="/services/recruitment" element={<Recruitment />} />
                    <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
                    <Route path="/experts" element={<ExpertList />} />
                    <Route path="/experts/:id" element={<ExpertProfile />} />
                    <Route path="/regions/:regionCode?" element={<RegionalExperts />} />
                    <Route path="/insights/:id?" element={<Insights />} />
                    <Route path="/success-stories" element={<SuccessStories />} />
                    <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ConsultationProvider>
              </SuccessStoriesProvider>
            </InsightsProvider>
          </RegionsProvider>
        </ServicesProvider>
      </ExpertsProvider>
    </HelmetProvider>
  );
}

export default App;
