
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Region } from '@/components/map/types';
import { Save } from 'lucide-react';

interface RegionFormProps {
  region?: Partial<Region> & { 
    id?: number | string;
    mainCities?: string[];
    manager?: string;
    active?: boolean;
  };
  onSave: (region: any) => void;
  onCancel: () => void;
}

const RegionForm: React.FC<RegionFormProps> = ({ 
  region = {}, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    id: region.id || Math.random().toString(36).substring(7),
    name: region.name || '',
    manager: region.manager || '',
    mainCities: Array.isArray(region.mainCities) ? region.mainCities : [],
    active: region.active !== undefined ? region.active : true,
    labelX: region.labelX || 0,
    labelY: region.labelY || 0,
    path: region.path || '',
    includesRegions: Array.isArray(region.includesRegions) ? region.includesRegions : [],
    latitude: region.latitude || 0,
    longitude: region.longitude || 0
  });

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const citiesInput = e.target.value;
    // Split by comma and trim whitespace
    const citiesArray = citiesInput.split(',').map(city => city.trim()).filter(Boolean);
    setFormData({...formData, mainCities: citiesArray});
  };

  const handleIncludesRegionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regionsInput = e.target.value;
    // Split by comma and trim whitespace
    const regionsArray = regionsInput.split(',').map(region => region.trim()).filter(Boolean);
    setFormData({...formData, includesRegions: regionsArray});
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {region.id ? '지역 정보 수정' : '새 지역 추가'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">지역 이름</Label>
            <Input 
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="manager">담당자</Label>
            <Input 
              id="manager"
              value={formData.manager}
              onChange={(e) => setFormData({...formData, manager: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cities">주요 도시 (쉼표로 구분)</Label>
            <Input 
              id="cities"
              value={formData.mainCities.join(', ')}
              onChange={handleCityChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="includesRegions">포함 지역 (쉼표로 구분)</Label>
            <Input 
              id="includesRegions"
              value={formData.includesRegions.join(', ')}
              onChange={handleIncludesRegionsChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">위도</Label>
              <Input 
                id="latitude"
                type="number"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="longitude">경도</Label>
              <Input 
                id="longitude"
                type="number"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Label htmlFor="active">활성화</Label>
            <Switch 
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({...formData, active: checked})}
            />
          </div>

          <div className="border-t pt-4 mt-2">
            <p className="text-sm text-muted-foreground mb-2">
              고급 설정 (SVG 지도용)
            </p>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="labelX">라벨 X 좌표</Label>
                  <Input 
                    id="labelX"
                    type="number"
                    value={formData.labelX}
                    onChange={(e) => setFormData({...formData, labelX: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="labelY">라벨 Y 좌표</Label>
                  <Input 
                    id="labelY"
                    type="number"
                    value={formData.labelY}
                    onChange={(e) => setFormData({...formData, labelY: parseFloat(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="path">SVG 경로</Label>
                <Input 
                  id="path"
                  value={formData.path}
                  onChange={(e) => setFormData({...formData, path: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          취소
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          저장
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegionForm;
