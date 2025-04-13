
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExpertRegionsProps {
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
  isRegionalManager?: boolean;
  setIsRegionalManager?: (isManager: boolean) => void;
}

const ExpertRegions: React.FC<ExpertRegionsProps> = ({ 
  selectedRegions, 
  setSelectedRegions,
  isRegionalManager = false,
  setIsRegionalManager
}) => {
  const regionOptions = [
    '서울', '경기남부', '경기북부', '인천', '대전', '세종', '충남', '충북', 
    '부산', '울산', '대구', '경남', '경북', '광주', '제주'
  ];

  const handleRegionToggle = (region: string) => {
    // Create a new array instead of using a callback function
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>지역 선택 (다중 선택)</FormLabel>
        {setIsRegionalManager && (
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox 
              checked={isRegionalManager}
              onCheckedChange={(checked) => setIsRegionalManager(!!checked)}
            />
            <span className="text-sm font-medium text-primary">지역 총괄 책임자</span>
            {isRegionalManager && <MapPin className="h-4 w-4 text-primary ml-1" />}
          </label>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
        {regionOptions.map((region) => (
          <label key={region} className="flex items-center space-x-2">
            <Checkbox 
              id={`region-${region}`}
              checked={selectedRegions.includes(region)}
              onCheckedChange={() => handleRegionToggle(region)}
            />
            <span className="text-sm">
              {region}
              {isRegionalManager && selectedRegions.includes(region) && (
                <Badge variant="outline" className="ml-1 text-xs">총괄</Badge>
              )}
            </span>
          </label>
        ))}
      </div>
      
      {isRegionalManager && selectedRegions.length > 0 && (
        <div className="text-sm text-muted-foreground mt-2">
          <span className="text-primary font-medium">참고:</span> 지역 총괄 책임자는 선택한 지역에 대한 컨설팅 조율 권한을 갖게 됩니다.
        </div>
      )}
    </div>
  );
};

export default ExpertRegions;
