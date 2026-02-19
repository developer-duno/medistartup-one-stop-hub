
import React from 'react';
import { Button } from "@/components/ui/button";
import RegionFilter from './RegionFilter';
import ServiceFilter from './ServiceFilter';

interface FilterPopoverContentProps {
  regions: string[];
  serviceCategories: string[];
  filters: {
    regions: string[];
    services: string[];
  };
  onRegionChange: (region: string, checked: boolean) => void;
  onServiceChange: (service: string, checked: boolean) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

const FilterPopoverContent: React.FC<FilterPopoverContentProps> = ({
  regions,
  serviceCategories,
  filters,
  onRegionChange,
  onServiceChange,
  onClearFilters,
  onApplyFilters,
}) => {
  const hasActiveFilters = filters.regions.length > 0 || filters.services.length > 0;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-pretendard font-medium">필터 옵션</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-neutral-500 text-xs"
          >
            초기화
          </Button>
        )}
      </div>
      
      <RegionFilter 
        regions={regions}
        selectedRegions={filters.regions}
        onRegionChange={onRegionChange}
      />

      <ServiceFilter 
        services={serviceCategories}
        selectedServices={filters.services}
        onServiceChange={onServiceChange}
      />
      
      <Button 
        className="w-full"
        onClick={onApplyFilters}
      >
        필터 적용
      </Button>
    </div>
  );
};

export default FilterPopoverContent;
