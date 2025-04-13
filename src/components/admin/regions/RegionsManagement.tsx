
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRegions } from '@/contexts/RegionsContext';
import { RegionAdmin } from '@/components/map/types';

// Import refactored components
import RegionForm from './RegionForm';
import RegionsList from './RegionsList';
import RegionDetail from './RegionDetail';
import RegionSearch from './RegionSearch';

const RegionsManagement: React.FC = () => {
  const { 
    adminRegions, 
    filteredRegions,
    searchQuery,
    setSearchQuery,
    addRegion, 
    updateRegion, 
    deleteRegion, 
    toggleRegionActive,
    getRegionalExpertCount
  } = useRegions();
  
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('regions');
  const [editingRegion, setEditingRegion] = useState<RegionAdmin | null>(null);
  const { toast } = useToast();
  
  const selectedRegionData = activeRegion !== null 
    ? adminRegions.find(r => r.id === activeRegion) 
    : null;

  const handleEditRegion = (region: RegionAdmin) => {
    setEditingRegion({...region});
    setActiveTab('edit');
  };

  const handleCreateRegion = () => {
    setEditingRegion({
      id: `region-${Date.now()}`,
      name: '',
      path: '',
      labelX: 200,
      labelY: 200,
      includesRegions: [],
      active: true,
      mainCities: [],
      manager: ''
    });
    setActiveTab('edit');
  };

  const handleSaveRegion = (formData: RegionAdmin) => {
    if (!formData) return;
    
    const existingIndex = adminRegions.findIndex(r => r.id === formData.id);
    
    if (existingIndex >= 0) {
      updateRegion(formData);
    } else {
      addRegion(formData);
    }
    
    setEditingRegion(null);
    setActiveTab('regions');
  };

  const handleDeleteRegion = (id: string) => {
    if (window.confirm('정말로 이 지역을 삭제하시겠습니까?')) {
      deleteRegion(id);
      
      if (activeRegion === id) {
        setActiveRegion(null);
      }
    }
  };
  
  const handleToggleActive = (id: string) => {
    toggleRegionActive(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">지역별 데스크 관리</h2>
        {activeTab === 'regions' && !activeRegion && (
          <Button onClick={handleCreateRegion}>
            <Plus className="h-4 w-4 mr-2" />
            지역 추가
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="regions">지역 목록</TabsTrigger>
          <TabsTrigger value="edit" disabled={!editingRegion}>
            {editingRegion?.id ? '지역 수정' : '지역 추가'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="regions">
          {activeRegion && selectedRegionData ? (
            <RegionDetail 
              selectedRegion={selectedRegionData}
              onBack={() => setActiveRegion(null)}
              onEdit={handleEditRegion}
            />
          ) : (
            <>
              <RegionSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                filteredRegionsCount={filteredRegions.length} 
              />

              <RegionsList 
                filteredRegions={filteredRegions}
                handleToggleActive={handleToggleActive}
                handleDeleteRegion={handleDeleteRegion}
                setActiveRegion={setActiveRegion}
                getRegionalExpertCount={getRegionalExpertCount}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="edit">
          {editingRegion && (
            <RegionForm 
              region={editingRegion}
              onSave={handleSaveRegion}
              onCancel={() => {
                setEditingRegion(null);
                setActiveTab('regions');
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegionsManagement;
