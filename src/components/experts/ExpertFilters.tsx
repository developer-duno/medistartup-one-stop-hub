
import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from './SearchInput';
import FilterBadges from './FilterBadges';
import FilterPopoverContent from './FilterPopoverContent';
import { regionOptions } from '@/utils/schema/regionSchema';

interface ExpertFiltersProps {
  filters: {
    search: string;
    regions: string[];
    services: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    regions: string[];
    services: string[];
  }>>;
  serviceCategories: string[];
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExpertFilters: React.FC<ExpertFiltersProps> = ({
  filters,
  setFilters,
  serviceCategories,
  showFilters,
  setShowFilters,
  activeCategory,
  setActiveCategory
}) => {
  const handleRemoveFilter = (type: 'regions' | 'services', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const handleClearFilters = () => {
    setFilters({search: "", regions: [], services: []});
    setActiveCategory("all");
  };
  
  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, regions: [...filters.regions, region]});
    } else {
      setFilters({...filters, regions: filters.regions.filter(r => r !== region)});
    }
  };
  
  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, services: [...filters.services, service]});
    } else {
      setFilters({...filters, services: filters.services.filter(s => s !== service)});
    }
  };

  const handleFilterButtonClick = () => {
    // Reset the active category to "all" when the filter button is clicked
    setActiveCategory("all");
  };

  return (
    <div className="mb-6">
      <SearchInput 
        value={filters.search}
        onChange={(value) => setFilters({...filters, search: value})}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                size="lg"
                onClick={handleFilterButtonClick}
              >
                <Filter className="h-4 w-4" />
                필터
                {(filters.regions.length + filters.services.length) > 0 && (
                  <Badge className="bg-primary text-white ml-1 h-6 w-6 flex items-center justify-center p-0 rounded-full">
                    {filters.regions.length + filters.services.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <FilterPopoverContent
                regions={regionOptions}
                serviceCategories={serviceCategories}
                filters={filters}
                onRegionChange={handleRegionChange}
                onServiceChange={handleServiceChange}
                onClearFilters={handleClearFilters}
                onApplyFilters={() => setShowFilters(false)}
              />
            </PopoverContent>
          </Popover>

          <FilterBadges 
            filters={filters}
            handleRemoveFilter={handleRemoveFilter}
            handleClearFilters={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpertFilters;
