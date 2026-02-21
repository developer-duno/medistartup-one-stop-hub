
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Provider components
import { ExpertsProvider } from '@/domains/expert/context';
import { ServicesProvider } from '@/domains/service/context';
import { RegionsProvider } from '@/domains/region/context';
import { InsightsProvider } from '@/domains/insight/context';
import { SuccessStoriesProvider } from '@/domains/success-story/context';
import { ConsultationProvider } from '@/domains/consultation/context';

// Consultation components (always visible)
import FloatingConsultButton from './components/consultation/FloatingConsultButton';
import ConsultationDialog from './components/consultation/ConsultationDialog';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded pages
const Index = lazy(() => import('./pages/Index'));
const Services = lazy(() => import('./pages/Services'));
const ExpertList = lazy(() => import('./pages/ExpertList'));
const ExpertProfile = lazy(() => import('./pages/ExpertProfile'));
const RegionalExperts = lazy(() => import('./pages/RegionalExperts'));
const Insights = lazy(() => import('./pages/Insights'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const SuccessStoryDetail = lazy(() => import('./pages/SuccessStoryDetail'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lazy-loaded service pages
const Licensing = lazy(() => import('./pages/services/Licensing'));
const FinancialConsulting = lazy(() => import('./pages/services/FinancialConsulting'));
const MarketingStrategy = lazy(() => import('./pages/services/MarketingStrategy'));
const LocationAnalysis = lazy(() => import('./pages/services/LocationAnalysis'));
const DesignInterior = lazy(() => import('./pages/services/DesignInterior'));
const WasteManagement = lazy(() => import('./pages/services/WasteManagement'));
const Recruitment = lazy(() => import('./pages/services/Recruitment'));
const MedicalEquipment = lazy(() => import('./pages/services/MedicalEquipment'));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <AppProviders>
              <ScrollToTop />
              <Toaster />
              <FloatingConsultButton />
              <ConsultationDialog />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  
                  {/* Service routes */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/licensing" element={<Licensing />} />
                  <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
                  <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
                  <Route path="/services/location-analysis" element={<LocationAnalysis />} />
                  <Route path="/services/design-interior" element={<DesignInterior />} />
                  <Route path="/services/waste-management" element={<WasteManagement />} />
                  <Route path="/services/recruitment" element={<Recruitment />} />
                  <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
                  
                  {/* Expert routes */}
                  <Route path="/experts" element={<ExpertList />} />
                  <Route path="/experts/:id" element={<ExpertProfile />} />
                  <Route path="/regions/:regionCode?" element={<RegionalExperts />} />
                  
                  {/* Content routes */}
                  <Route path="/insights/:id?" element={<Insights />} />
                  <Route path="/success-stories" element={<SuccessStories />} />
                  <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AppProviders>
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

// Nested providers component to improve readability
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ExpertsProvider>
      <ServicesProvider>
        <RegionsProvider>
          <InsightsProvider>
            <SuccessStoriesProvider>
              <ConsultationProvider>
                  {children}
              </ConsultationProvider>
            </SuccessStoriesProvider>
          </InsightsProvider>
        </RegionsProvider>
      </ServicesProvider>
    </ExpertsProvider>
  );
};

export default App;
