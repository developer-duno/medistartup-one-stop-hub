
import React from 'react';
import { useExperts } from '@/contexts/ExpertsContext';
import ExpertFilters from '@/components/experts/ExpertFilters';
import ExpertPageHeader from '@/components/experts/ExpertPageHeader';
import MobileSelectionBar from '@/components/experts/MobileSelectionBar';
import ExpertGridView from '@/components/experts/ExpertGridView';
import ExpertComparisonView from '@/components/experts/ExpertComparisonView';
import ExpertActionBar from '@/components/experts/ExpertActionBar';
import ExpertCTA from '@/components/experts/ExpertCTA';
import ExpertPageLayout from '@/components/experts/ExpertPageLayout';
import ExpertCategoryBar from '@/components/experts/ExpertCategoryBar';
import { useExpertFiltering } from '@/hooks/useExpertFiltering';
import { useConsultation } from '@/contexts/ConsultationContext';

const ExpertList = () => {
  const { experts: expertsData } = useExperts();
  const { selectedExperts } = useConsultation();
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
    filteredExperts,
    showFilters,
    setShowFilters,
    activeCategory,
    setActiveCategory,
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
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      {viewMode === "grid" ? (
        <>
          <ExpertGridView 
            filteredExperts={filteredExperts} 
            resetFilters={resetFilters}
          />
          {selectedExperts.length >= 2 && (
            <ExpertActionBar 
              setViewMode={setViewMode} 
              viewMode={viewMode}
            />
          )}
        </>
      ) : (
        <>
          <ExpertComparisonView 
            setViewMode={setViewMode}
          />
          <ExpertActionBar 
            setViewMode={setViewMode} 
            viewMode={viewMode}
          />
        </>
      )}
      
      <ExpertCTA />
    </ExpertPageLayout>
  );
};

export default ExpertList;
