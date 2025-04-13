
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Users, Edit, Trash2, Plus, Check, X 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRegions } from '@/contexts/RegionsContext';
import { useExperts } from '@/contexts/ExpertsContext';
import { Region } from '@/components/map/types';
import { getRegionalExpertCount } from '@/components/map/regionUtils';

const RegionsManagement: React.FC = () => {
  const { regions, updateRegion, addRegion, deleteRegion } = useRegions();
  const { experts } = useExperts();
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('regions');
  const [editingRegion, setEditingRegion] = useState<Partial<Region> | null>(null);
  
  const selectedRegionData = activeRegionId !== null 
    ? regions.find(r => r.id === activeRegionId) 
    : null;
  
  const regionExperts = selectedRegionData
    ? experts.filter(expert => 
        expert.regions.some(region => 
          selectedRegionData.includesRegions.includes(region)
        )
      )
    : [];

  const handleEditRegion = (region: Region) => {
    setEditingRegion({...region});
    setActiveTab('edit');
  };

  const handleCreateRegion = () => {
    const newId = `region_${Date.now()}`;
    setEditingRegion({
      id: newId,
      name: '',
      path: 'M100,100 L200,100 L200,200 L100,200 Z', // 기본 사각형 경로
      labelX: 150,
      labelY: 150,
      includesRegions: [],
      expertCount: 0,
      latitude: 36.0,
      longitude: 128.0
    });
    setActiveTab('edit');
  };

  const handleSaveRegion = () => {
    if (!editingRegion || !editingRegion.id || !editingRegion.name) return;
    
    const regionToSave = {
      id: editingRegion.id,
      name: editingRegion.name,
      path: editingRegion.path || '',
      labelX: editingRegion.labelX || 0,
      labelY: editingRegion.labelY || 0,
      includesRegions: Array.isArray(editingRegion.includesRegions) ? 
        editingRegion.includesRegions : 
        (editingRegion.mainCities as unknown as string[] || []),
      expertCount: editingRegion.expertCount || 0,
      latitude: editingRegion.latitude || 0,
      longitude: editingRegion.longitude || 0
    } as Region;
    
    const existingIndex = regions.findIndex(r => r.id === editingRegion.id);
    
    if (existingIndex >= 0) {
      updateRegion(regionToSave);
    } else {
      addRegion(regionToSave);
    }
    
    setEditingRegion(null);
    setActiveTab('regions');
  };

  const handleDeleteRegion = (id: string) => {
    deleteRegion(id);
    if (activeRegionId === id) {
      setActiveRegionId(null);
    }
  };
  
  const handleToggleActive = (region: Region) => {
    // 이 애플리케이션에서는 지역 활성/비활성이 실제로 어떤 필드를 통해 관리되는지 명확하지 않으므로
    // 예시로 가상의 active 필드를 추가하는 방식으로 구현합니다
    updateRegion({
      ...region,
      active: !region.active
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingRegion) return;
    
    const citiesInput = e.target.value;
    // Split by comma and trim whitespace
    const citiesArray = citiesInput.split(',').map(city => city.trim()).filter(Boolean);
    setEditingRegion({...editingRegion, includesRegions: citiesArray});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-pretendard font-bold text-2xl">지역별 데스크 관리</h2>
        {activeTab === 'regions' && !activeRegionId && (
          <Button onClick={handleCreateRegion}>
            <Plus className="h-4 w-4 mr-2" />
            지역 추가
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="regions">지역 목록</TabsTrigger>
          {activeRegionId && <TabsTrigger value="experts">해당 지역 전문가</TabsTrigger>}
          <TabsTrigger value="edit" disabled={!editingRegion}>
            {editingRegion?.id ? '지역 수정' : '지역 추가'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="regions">
          {activeRegionId ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveRegionId(null)}
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
                  <Button 
                    variant="secondary"
                    onClick={() => setActiveTab('experts')}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    전문가 관리
                  </Button>
                </div>
              </div>

              {selectedRegionData && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {selectedRegionData.name}
                          {selectedRegionData.active ? (
                            <Badge className="bg-green-100 text-green-800 ml-2">활성</Badge>
                          ) : (
                            <Badge variant="outline" className="ml-2">비활성</Badge>
                          )}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">포함된 지역</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedRegionData.includesRegions.map((city: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="font-medium mb-2">지역 통계</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2">
                                  <Users className="h-5 w-5 text-primary" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">전문가</p>
                                    <p className="text-xl font-bold">{regionExperts.length}명</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regions.map((region) => (
                <Card 
                  key={region.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${!region.active ? 'opacity-60' : ''}`}
                  onClick={() => setActiveRegionId(region.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {region.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={!!region.active}
                          onCheckedChange={() => handleToggleActive(region)}
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
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          전문가 {getRegionalExpertCount(region.name, experts)}명
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">포함된 지역:</p>
                      <div className="flex flex-wrap gap-1">
                        {region.includesRegions.map((city, index) => (
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
        </TabsContent>

        <TabsContent value="experts">
          {activeRegionId && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">
                  {selectedRegionData?.name} 지역 전문가 ({regionExperts.length}명)
                </h3>
                <Button variant="outline" onClick={() => setActiveTab('regions')}>
                  지역 정보로 돌아가기
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionExperts.map((expert) => (
                  <Card key={expert.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={expert.profileImage} 
                        alt={expert.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-lg">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.title}</p>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          지역 배정 변경
                        </Button>
                        <Button variant="default" size="sm">
                          프로필 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {regionExperts.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
                    <h3 className="font-medium text-lg mb-1">등록된 전문가가 없습니다</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      이 지역에 활동할 전문가를 추가해보세요.
                    </p>
                    <Button variant="outline">전문가 연결하기</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="edit">
          {editingRegion && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingRegion.id && regions.some(r => r.id === editingRegion.id) ? '지역 정보 수정' : '새 지역 추가'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">지역 이름</Label>
                    <Input 
                      id="name"
                      value={editingRegion.name || ''}
                      onChange={(e) => setEditingRegion({...editingRegion, name: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cities">포함된 지역 (쉼표로 구분)</Label>
                    <Input 
                      id="cities"
                      value={editingRegion.includesRegions?.join(', ') || ''}
                      onChange={handleCityChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="latitude">위도 (Latitude)</Label>
                    <Input 
                      id="latitude"
                      type="number"
                      step="0.0001"
                      value={editingRegion.latitude || 0}
                      onChange={(e) => setEditingRegion({...editingRegion, latitude: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="longitude">경도 (Longitude)</Label>
                    <Input 
                      id="longitude"
                      type="number"
                      step="0.0001"
                      value={editingRegion.longitude || 0}
                      onChange={(e) => setEditingRegion({...editingRegion, longitude: parseFloat(e.target.value)})}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label htmlFor="active">활성화</Label>
                    <Switch 
                      id="active"
                      checked={!!editingRegion.active}
                      onCheckedChange={(checked) => setEditingRegion({...editingRegion, active: checked})}
                    />
                  </div>
                </div>
              </CardContent>
              <div className="p-6 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingRegion(null);
                    setActiveTab('regions');
                  }}
                >
                  취소
                </Button>
                <Button onClick={handleSaveRegion}>
                  저장하기
                </Button>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegionsManagement;
