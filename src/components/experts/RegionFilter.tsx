
import React, { useState } from 'react';
import { MapPin, ChevronsUpDown, ChevronDown, ChevronRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRegionGroups } from '@/hooks/useRegionGroups';

interface RegionFilterProps {
  regions: string[];
  selectedRegions: string[];
  onRegionChange: (region: string, checked: boolean) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({
  selectedRegions,
  onRegionChange,
}) => {
  const { regionGroupsCompat, regionOptions, loading } = useRegionGroups();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    regionGroupsCompat.reduce((acc, group) => ({...acc, [group.name]: true}), {})
  );
  
  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };
  
  if (loading || regionOptions.length === 0) {
    return (
      <Collapsible className="w-full">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-neutral-50 rounded-md">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">지역 선택</span>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-6">
          <p className="text-sm text-muted-foreground">사용 가능한 지역이 없습니다.</p>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  
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
        {regionGroupsCompat.map((group) => {
          const allSelected = group.regions.every(r => selectedRegions.includes(r));
          const someSelected = group.regions.some(r => selectedRegions.includes(r));
          
          const handleGroupCheck = (checked: boolean) => {
            if (checked) {
              group.regions.forEach(r => {
                if (!selectedRegions.includes(r)) {
                  onRegionChange(r, true);
                }
              });
            } else {
              group.regions.forEach(r => {
                if (selectedRegions.includes(r)) {
                  onRegionChange(r, false);
                }
              });
            }
          };
          
          return (
            <div key={group.name} className="border-l-2 pl-2 mb-2">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-neutral-50 p-1 rounded"
                onClick={() => toggleGroup(group.name)}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={allSelected}
                    className={someSelected && !allSelected ? "opacity-60" : ""}
                    onCheckedChange={(checked) => {
                      handleGroupCheck(!!checked);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm font-medium">{group.name}</span>
                </div>
                {openGroups[group.name] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              
              {openGroups[group.name] && (
                <div className="grid grid-cols-2 gap-2 pl-8 mt-1">
                  {group.regions.map((region) => (
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
              )}
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default RegionFilter;
