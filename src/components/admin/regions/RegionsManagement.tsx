
import React, { useState } from 'react';
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

// Mock regions data
const mockRegions = [
  {
    id: 1,
    name: '서울',
    expertCount: 6,
    serviceCount: 8,
    active: true,
    mainCities: ['강남구', '서초구', '송파구', '마포구'],
    manager: '김지역'
  },
  {
    id: 2,
    name: '경기/인천',
    expertCount: 5,
    serviceCount: 7,
    active: true,
    mainCities: ['분당구', '일산동구', '송도동', '수원시'],
    manager: '이담당'
  },
  {
    id: 3,
    name: '대전/충청',
    expertCount: 3,
    serviceCount: 6,
    active: true,
    mainCities: ['서구', '유성구', '천안시', '청주시'],
    manager: '박매니저'
  },
  {
    id: 4,
    name: '부산/경남',
    expertCount: 4,
    serviceCount: 5,
    active: true,
    mainCities: ['해운대구', '수영구', '창원시', '김해시'],
    manager: '최지역'
  },
  {
    id: 5,
    name: '대구/경북',
    expertCount: 2,
    serviceCount: 4,
    active: false,
    mainCities: ['수성구', '동구', '포항시', '경주시'],
    manager: '정관리'
  }
];

// Mock experts data by region
const mockExpertsByRegion = {
  1: [
    { id: 1, name: '김태호', specialty: '재무 컨설팅', image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: '이준호', specialty: '설계 및 인테리어', image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, name: '강현우', specialty: '마케팅 전략', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' }
  ],
  2: [
    { id: 1, name: '김태호', specialty: '재무 컨설팅', image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: '이준호', specialty: '설계 및 인테리어', image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop' }
  ],
  3: [
    { id: 2, name: '박지연', specialty: '입지 분석', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop' }
  ],
  4: [
    { id: 8, name: '한지민', specialty: '수납 및 의료폐기물 처리', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop' },
    { id: 7, name: '윤재호', specialty: '의료기기 컨설턴트', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' }
  ],
  5: [
    { id: 4, name: '최민서', specialty: '인허가 전문가', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' }
  ]
};

const RegionsManagement: React.FC = () => {
  const [regions, setRegions] = useState(mockRegions);
  const [activeRegion, setActiveRegion] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('regions');
  const [editingRegion, setEditingRegion] = useState<any>(null);
  
  const selectedRegionData = activeRegion !== null 
    ? regions.find(r => r.id === activeRegion) 
    : null;
  
  const regionExperts = activeRegion !== null 
    ? (mockExpertsByRegion[activeRegion as keyof typeof mockExpertsByRegion] || []) 
    : [];

  const handleEditRegion = (region: any) => {
    setEditingRegion({...region});
    setActiveTab('edit');
  };

  const handleCreateRegion = () => {
    setEditingRegion({
      id: Math.max(...regions.map(r => r.id)) + 1,
      name: '',
      expertCount: 0,
      serviceCount: 0,
      active: true,
      mainCities: [],
      manager: ''
    });
    setActiveTab('edit');
  };

  const handleSaveRegion = () => {
    if (!editingRegion) return;
    
    const existingIndex = regions.findIndex(r => r.id === editingRegion.id);
    let updatedRegions;
    
    if (existingIndex >= 0) {
      updatedRegions = [...regions];
      updatedRegions[existingIndex] = editingRegion;
    } else {
      updatedRegions = [...regions, editingRegion];
    }
    
    setRegions(updatedRegions);
    setEditingRegion(null);
    setActiveTab('regions');
  };

  const handleDeleteRegion = (id: number) => {
    setRegions(regions.filter(region => region.id !== id));
    if (activeRegion === id) {
      setActiveRegion(null);
    }
  };
  
  const handleToggleActive = (id: number) => {
    setRegions(regions.map(r => 
      r.id === id ? {...r, active: !r.active} : r
    ));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const citiesInput = e.target.value;
    // Split by comma and trim whitespace
    const citiesArray = citiesInput.split(',').map(city => city.trim()).filter(Boolean);
    setEditingRegion({...editingRegion, mainCities: citiesArray});
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
          {activeRegion && <TabsTrigger value="experts">해당 지역 전문가</TabsTrigger>}
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
                    onClick={() => handleEditRegion(selectedRegionData)}
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

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {selectedRegionData?.name}
                        {selectedRegionData?.active ? (
                          <Badge className="bg-green-100 text-green-800 ml-2">활성</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-2">비활성</Badge>
                        )}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">담당자: {selectedRegionData?.manager}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">주요 도시</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRegionData?.mainCities.map((city: string, index: number) => (
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
                                  <p className="text-xl font-bold">{selectedRegionData?.expertCount}명</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-secondary" />
                                <div>
                                  <p className="text-sm text-muted-foreground">서비스</p>
                                  <p className="text-xl font-bold">{selectedRegionData?.serviceCount}개</p>
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
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regions.map((region) => (
                <Card 
                  key={region.id} 
                  className={`cursor-pointer hover:shadow-md transition-shadow ${!region.active ? 'opacity-60' : ''}`}
                  onClick={() => setActiveRegion(region.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {region.name}
                      </CardTitle>
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
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">전문가 {region.expertCount}명</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">서비스 {region.serviceCount}개</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">주요 도시:</p>
                      <div className="flex flex-wrap gap-1">
                        {region.mainCities.map((city, index) => (
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
          {activeRegion && (
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
                        src={expert.image} 
                        alt={expert.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h4 className="font-medium text-lg">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.specialty}</p>
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
                  {editingRegion.id ? '지역 정보 수정' : '새 지역 추가'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">지역 이름</Label>
                    <Input 
                      id="name"
                      value={editingRegion.name}
                      onChange={(e) => setEditingRegion({...editingRegion, name: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="manager">담당자</Label>
                    <Input 
                      id="manager"
                      value={editingRegion.manager}
                      onChange={(e) => setEditingRegion({...editingRegion, manager: e.target.value})}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cities">주요 도시 (쉼표로 구분)</Label>
                    <Input 
                      id="cities"
                      value={editingRegion.mainCities.join(', ')}
                      onChange={handleCityChange}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label htmlFor="active">활성화</Label>
                    <Switch 
                      id="active"
                      checked={editingRegion.active}
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
