
import React from 'react';
import { useExperts } from '@/contexts/ExpertsContext';
import ExpertFilters from '@/components/experts/ExpertFilters';
import ExpertPageHeader from '@/components/experts/ExpertPageHeader';
import MobileSelectionBar from '@/components/experts/MobileSelectionBar';
import ExpertGridView from '@/components/experts/ExpertGridView';
import ExpertComparisonView from '@/components/experts/ExpertComparisonView';
import ExpertCTA from '@/components/experts/ExpertCTA';
import ExpertPageLayout from '@/components/experts/ExpertPageLayout';
import ExpertCategoryBar from '@/components/experts/ExpertCategoryBar';
import { useExpertFiltering } from '@/hooks/useExpertFiltering';

const ExpertList = () => {
  const { experts: expertsData } = useExperts();
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

  const {
    filters,
    setFilters,
    viewMode,
    setViewMode,
    selectedExperts,
    setSelectedExperts,
    filteredExperts,
    showFilters,
    setShowFilters,
    activeCategory,
    setActiveCategory,
    handleExpertSelect,
    getSelectedExpertsData,
    resetFilters
  } = useExpertFiltering(expertsData);

  return (
    <ExpertPageLayout>
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
          serviceCategories={serviceCategories}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <ExpertCategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          serviceCategories={serviceCategories}
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
    </ExpertPageLayout>
  );
};

export default ExpertList;
