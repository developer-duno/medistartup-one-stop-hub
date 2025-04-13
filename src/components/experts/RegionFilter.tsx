
import React from 'react';
import { MapPin, ChevronsUpDown } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RegionFilterProps {
  regions: string[];
  selectedRegions: string[];
  onRegionChange: (region: string, checked: boolean) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({
  regions,
  selectedRegions,
  onRegionChange,
}) => {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-neutral-50 rounded-md">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">지역 선택</span>
        </div>
        <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2 pl-6">
          {regions.map((region) => (
            <label key={region} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox 
                checked={selectedRegions.includes(region)}
                onCheckedChange={(checked) => {
                  onRegionChange(region, !!checked);
                }}
              />
              <span className="text-sm">{region}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default RegionFilter;
