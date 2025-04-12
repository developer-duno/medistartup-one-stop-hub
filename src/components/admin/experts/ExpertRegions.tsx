
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ExpertRegionsProps {
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
}

const ExpertRegions: React.FC<ExpertRegionsProps> = ({ selectedRegions, setSelectedRegions }) => {
  const regionOptions = ['서울', '경기', '인천', '대전', '충남', '충북', '부산', '대구', '광주', '제주'];

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    });
  };

  return (
    <div>
      <FormLabel>지역 선택 (다중 선택)</FormLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
        {regionOptions.map((region) => (
          <label key={region} className="flex items-center space-x-2">
            <Checkbox 
              id={`region-${region}`}
              checked={selectedRegions.includes(region)}
              onCheckedChange={() => handleRegionToggle(region)}
            />
            <span className="text-sm">{region}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ExpertRegions;
