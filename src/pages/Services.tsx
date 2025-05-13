
import React, { useState } from 'react';
import { useServices } from '@/contexts/ServicesContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceCategory } from '@/types/service';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import SimulatorSection from '@/components/simulator/SimulatorSection';

// Import refactored components
import ServicesHeader from '@/components/services/ServicesHeader';
import CategorySelector from '@/components/services/CategorySelector';
import CategoryImage from '@/components/services/CategoryImage';
import ServiceGrid from '@/components/services/ServiceGrid';

const Services = () => {
  const { getServicesByCategory } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');

  const categories: { id: ServiceCategory | 'all'; name: string; description: string }[] = [
    { id: 'all', name: '전체', description: '병원 창업을 위한 모든 서비스를 한눈에 확인하세요.' },
    { id: 'planning', name: '계획 단계', description: '성공적인 병원 창업을 위한 초기 계획 단계의 필수 서비스입니다.' },
    { id: 'implementation', name: '실행 단계', description: '계획을 실행에 옮기는 과정에서 필요한 전문 서비스를 제공합니다.' },
    { id: 'equipment', name: '장비 설치', description: '최신 의료장비 제안부터 설치까지 전문적인 서비스를 지원합니다.' },
    { id: 'operation', name: '운영 단계', description: '병원 운영을 성공적으로 이끌기 위한 전문적인 컨설팅 서비스입니다.' }
  ];

  const displayServices = getServicesByCategory(selectedCategory);
  
  const handleCategoryChange = (category: ServiceCategory | 'all') => {
    setSelectedCategory(category);
  };

  const activeCategory = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <div className="theme-services min-h-screen">
      <Navbar />
      <ServicesHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue="all"
          className="w-full mb-12"
          onValueChange={(value) => handleCategoryChange(value as ServiceCategory | 'all')}
        >
          <CategorySelector categories={categories} />

          <CategoryImage 
            category={selectedCategory} 
            categoryName={activeCategory.name}
            categoryDescription={activeCategory.description}
          />

          <ServiceGrid services={displayServices} />
        </Tabs>
      </div>

      <SimulatorSection />
      
      <Footer />
    </div>
  );
};

export default Services;
