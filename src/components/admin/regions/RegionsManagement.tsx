
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Users, Edit, Trash2, Plus, Search, Filter 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import RegionForm from './RegionForm';
import { useToast } from '@/components/ui/use-toast';
import { useRegions } from '@/contexts/RegionsContext';
import { RegionAdmin } from '@/components/map/types';

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
          {activeRegion ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveRegion(null)}
                  className="mb-4"
                >
                  ← 지역 목록으로 돌아가기
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => selectedRegionData && handleEditRegion(selectedRegionData)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    수정
                  </Button>
                </div>
              </div>

              {selectedRegionData && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {selectedRegionData.name}
                          {selectedRegionData.active ? (
                            <Badge className="bg-green-100 text-green-800 ml-2">활성</Badge>
                          ) : (
                            <Badge variant="outline" className="ml-2">비활성</Badge>
                          )}
                        </h3>
                        <p className="text-muted-foreground mt-1">담당자: {selectedRegionData.manager}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h3 className="font-medium mb-2">주요 도시</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRegionData.mainCities?.map((city: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {city}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="font-medium mb-2 mt-4">포함 지역</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRegionData.includesRegions.map((region: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">위치 정보</h3>
                        <p className="text-sm mb-1">위도: {selectedRegionData.latitude || '미지정'}</p>
                        <p className="text-sm">경도: {selectedRegionData.longitude || '미지정'}</p>
                        
                        <h3 className="font-medium mb-2 mt-4">SVG 정보</h3>
                        <p className="text-sm mb-1">라벨 위치: X: {selectedRegionData.labelX}, Y: {selectedRegionData.labelY}</p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          경로: {selectedRegionData.path.substring(0, 40)}...
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="지역, 담당자 또는 도시로 검색..."
                    className="pl-10"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {filteredRegions.length}개의 결과를 찾았습니다
                    </p>
                    {searchQuery && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSearchQuery('')}
                      >
                        초기화
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {filteredRegions.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-xl mb-2">검색 결과 없음</h3>
                  <p className="text-muted-foreground">
                    검색어를 변경하거나 새 지역을 추가해보세요.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRegions.map((region) => (
                    <Card 
                      key={region.id} 
                      className={`cursor-pointer hover:shadow-md transition-shadow ${!region.active ? 'opacity-60' : ''}`}
                      onClick={() => setActiveRegion(region.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="flex items-center gap-2 font-bold">
                            <MapPin className="h-5 w-5 text-primary" />
                            {region.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={region.active}
                              onCheckedChange={() => handleToggleActive(region.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteRegion(region.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">전문가 {getRegionalExpertCount(region.name)}명</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">서비스 {region.serviceCount || 0}개</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">주요 도시:</p>
                          <div className="flex flex-wrap gap-1">
                            {region.mainCities?.map((city, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {city}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
