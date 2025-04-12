
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MedicalEquipment from "./pages/services/MedicalEquipment";
import WasteManagement from "./pages/services/WasteManagement";
import LocationAnalysis from "./pages/services/LocationAnalysis";
import FinancialConsulting from "./pages/services/FinancialConsulting";
import DesignInterior from "./pages/services/DesignInterior";
import Licensing from "./pages/services/Licensing";
import Recruitment from "./pages/services/Recruitment";
import MarketingStrategy from "./pages/services/MarketingStrategy";
import Admin from "./pages/Admin";
import Insights from "./pages/Insights";
import ExpertProfile from "./pages/ExpertProfile";
import ExpertList from "./pages/ExpertList";
import SuccessStories from "./pages/SuccessStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-white text-neutral-900"> {/* 기본 스타일 클래스 추가 */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/medical-equipment" element={<MedicalEquipment />} />
            <Route path="/services/waste-management" element={<WasteManagement />} />
            <Route path="/services/location-analysis" element={<LocationAnalysis />} />
            <Route path="/services/financial-consulting" element={<FinancialConsulting />} />
            <Route path="/services/design-interior" element={<DesignInterior />} />
            <Route path="/services/licensing" element={<Licensing />} />
            <Route path="/services/recruitment" element={<Recruitment />} />
            <Route path="/services/marketing-strategy" element={<MarketingStrategy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/expert/:id" element={<ExpertProfile />} />
            <Route path="/experts" element={<ExpertList />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
