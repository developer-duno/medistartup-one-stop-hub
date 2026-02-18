
import React, { useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { regionGroups } from '@/utils/schema/regionSchema';

interface FilterBadgesProps {
  filters: {
    regions: string[];
    services: string[];
  };
  handleRemoveFilter: (type: 'regions' | 'services', value: string) => void;
  handleClearFilters: () => void;
}

const FilterBadges: React.FC<FilterBadgesProps> = ({
  filters,
  handleRemoveFilter,
  handleClearFilters,
}) => {
  const displayRegions = useMemo(() => {
    const result: { label: string; isGroup: boolean; regions: string[] }[] = [];
    const consumed = new Set<string>();

    for (const group of regionGroups) {
      const allSelected = group.regions.every(r => filters.regions.includes(r));
      if (allSelected) {
        result.push({ label: group.name, isGroup: true, regions: group.regions });
        group.regions.forEach(r => consumed.add(r));
      }
    }

    for (const region of filters.regions) {
      if (!consumed.has(region)) {
        result.push({ label: region, isGroup: false, regions: [region] });
      }
    }

    return result;
  }, [filters.regions]);

  if (filters.regions.length === 0 && filters.services.length === 0) {
    return null;
  }

  const handleRemoveRegionBadge = (item: { isGroup: boolean; regions: string[] }) => {
    item.regions.forEach(r => handleRemoveFilter('regions', r));
  };

  return (
    <div className="flex flex-wrap gap-2 ml-2">
      {displayRegions.map((item) => (
        <Badge 
          key={item.label} 
          variant="outline"
          className="flex items-center gap-1 bg-neutral-50"
        >
          <MapPin className="h-3 w-3" />
          {item.label}
          <X 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={() => handleRemoveRegionBadge(item)}
          />
        </Badge>
      ))}
      {filters.services.map((service) => (
        <Badge 
          key={service} 
          variant="outline"
          className="flex items-center gap-1 bg-neutral-50"
        >
          <Tag className="h-3 w-3" />
          {service}
          <X 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={() => handleRemoveFilter('services', service)}
          />
        </Badge>
      ))}
      
      <Button 
        variant="ghost"
        size="sm"
        onClick={handleClearFilters}
        className="text-neutral-500 h-7 px-2"
      >
        초기화
      </Button>
    </div>
  );
};

export default FilterBadges;
