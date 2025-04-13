
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Trash2 } from 'lucide-react';
import { RegionAdmin } from '@/components/map/types';

interface RegionsListProps {
  filteredRegions: RegionAdmin[];
  handleToggleActive: (id: string) => void;
  handleDeleteRegion: (id: string) => void;
  setActiveRegion: (id: string | null) => void;
  getRegionalExpertCount: (regionName: string) => number;
}

const RegionsList: React.FC<RegionsListProps> = ({
  filteredRegions,
  handleToggleActive,
  handleDeleteRegion,
  setActiveRegion,
  getRegionalExpertCount
}) => {
  if (filteredRegions.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium text-xl mb-2">검색 결과 없음</h3>
        <p className="text-muted-foreground">
          검색어를 변경하거나 새 지역을 추가해보세요.
        </p>
      </div>
    );
  }

  return (
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
  );
};

export default RegionsList;
