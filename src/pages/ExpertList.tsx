import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useExperts } from '@/contexts/ExpertsContext';
import ExpertFilters from '@/components/experts/ExpertFilters';
import ExpertPageHeader from '@/components/experts/ExpertPageHeader';
import MobileSelectionBar from '@/components/experts/MobileSelectionBar';
import ExpertGridView from '@/components/experts/ExpertGridView';
import ExpertComparisonView from '@/components/experts/ExpertComparisonView';
import ExpertCTA from '@/components/experts/ExpertCTA';

const ExpertList = () => {
  const { experts: expertsData } = useExperts();
  const [viewMode, setViewMode] = useState("grid"); // grid or compare
  const [selectedExperts, setSelectedExperts] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    regions: [],
    services: []
  });
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const serviceCategories = [
    "입지 분석", 
    "재무 컨설팅", 
    "설계 및 인테리어", 
    "인허가 대행", 
    "인력 채용", 
    "마케팅 전략", 
    "의료기기 구입 및 설치", 
    "수납 및 의료폐기물 처리"
  ];
  
  const regions = ["서울", "경기", "인천", "대전", "충남", "충북", "부산", "대구", "광주", "제주"];

  useEffect(() => {
    let results = [...expertsData];
    
    if (activeCategory !== "all") {
      results = results.filter(expert => 
        expert.services.some(service => service === activeCategory)
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(expert => 
        expert.name.toLowerCase().includes(searchLower) || 
        expert.role.toLowerCase().includes(searchLower) || 
        expert.specialty.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.regions.length > 0) {
      results = results.filter(expert => 
        expert.regions.some(region => filters.regions.includes(region))
      );
    }
    
    if (filters.services.length > 0) {
      results = results.filter(expert => 
        expert.services.some(service => filters.services.includes(service))
      );
    }
    
    setFilteredExperts(results);
  }, [filters, activeCategory, expertsData]);
  
  useEffect(() => {
    setFilteredExperts(expertsData);
  }, [expertsData]);

  const handleExpertSelect = (expertId) => {
    setSelectedExperts(prev => {
      if (prev.includes(expertId)) {
        return prev.filter(id => id !== expertId);
      }
      
      if (prev.length < 3) {
        return [...prev, expertId];
      }
      
      const newSelected = [...prev];
      newSelected.shift();
      newSelected.push(expertId);
      return newSelected;
    });
  };
  
  const getSelectedExpertsData = () => {
    return selectedExperts.map(id => expertsData.find(expert => expert.id === id));
  };

  const resetFilters = () => {
    setFilters({search: "", regions: [], services: []});
    setActiveCategory("all");
  };

  return (
    <div className="theme-experts min-h-screen">
      <Navbar />
      
      <div className="pt-28 pb-16 theme-page-header">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              전문 분야별 <span className="text-primary">최고의 전문가</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              병원창업에 필요한 각 분야 전문가들을 만나보세요.
              풍부한 경력과 성공 사례를 바탕으로 최적의 솔루션을 제공해 드립니다.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <ExpertPageHeader 
            filteredExperts={filteredExperts}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedExperts={selectedExperts}
          />
          
          <ExpertFilters 
            filters={filters}
            setFilters={setFilters}
            regions={regions}
            serviceCategories={serviceCategories}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <MobileSelectionBar 
          selectedExperts={selectedExperts} 
          setViewMode={setViewMode} 
        />

        {viewMode === "grid" ? (
          <ExpertGridView 
            filteredExperts={filteredExperts} 
            selectedExperts={selectedExperts}
            handleExpertSelect={handleExpertSelect}
            resetFilters={resetFilters}
          />
        ) : (
          <ExpertComparisonView 
            selectedExperts={selectedExperts}
            getSelectedExpertsData={getSelectedExpertsData}
            setSelectedExperts={setSelectedExperts}
            setViewMode={setViewMode}
          />
        )}
        
        <ExpertCTA />
      </div>
      
      <Footer />
    </div>
  );
};

export default ExpertList;
