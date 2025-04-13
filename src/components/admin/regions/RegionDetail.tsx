
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Edit } from 'lucide-react';
import { RegionAdmin } from '@/components/map/types';

interface RegionDetailProps {
  selectedRegion: RegionAdmin;
  onBack: () => void;
  onEdit: (region: RegionAdmin) => void;
}

const RegionDetail: React.FC<RegionDetailProps> = ({
  selectedRegion,
  onBack,
  onEdit
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          ← 지역 목록으로 돌아가기
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => onEdit(selectedRegion)}
          >
            <Edit className="h-4 w-4 mr-1" />
            수정
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {selectedRegion.name}
                {selectedRegion.active ? (
                  <Badge className="bg-green-100 text-green-800 ml-2">활성</Badge>
                ) : (
                  <Badge variant="outline" className="ml-2">비활성</Badge>
                )}
              </h3>
              <p className="text-muted-foreground mt-1">담당자: {selectedRegion.manager}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-medium mb-2">주요 도시</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.mainCities?.map((city: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {city}
                  </Badge>
                ))}
              </div>
              
              <h3 className="font-medium mb-2 mt-4">포함 지역</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.includesRegions.map((region: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">위치 정보</h3>
              <p className="text-sm mb-1">위도: {selectedRegion.latitude || '미지정'}</p>
              <p className="text-sm">경도: {selectedRegion.longitude || '미지정'}</p>
              
              <h3 className="font-medium mb-2 mt-4">SVG 정보</h3>
              <p className="text-sm mb-1">라벨 위치: X: {selectedRegion.labelX}, Y: {selectedRegion.labelY}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                경로: {selectedRegion.path.substring(0, 40)}...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionDetail;
