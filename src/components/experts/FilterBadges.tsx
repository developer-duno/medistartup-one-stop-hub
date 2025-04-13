
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
  if (filters.regions.length === 0 && filters.services.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 ml-2">
      {filters.regions.map((region) => (
        <Badge 
          key={region} 
          variant="outline"
          className="flex items-center gap-1 bg-neutral-50"
        >
          <MapPin className="h-3 w-3" />
          {region}
          <X 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={() => handleRemoveFilter('regions', region)}
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
