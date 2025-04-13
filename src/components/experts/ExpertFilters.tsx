
import React from 'react';
import { Search, Filter, ChevronDown, X, MapPin, Tag, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  regions: string[];
  serviceCategories: string[];
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExpertFilters: React.FC<ExpertFiltersProps> = ({
  filters,
  setFilters,
  regions,
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

  const activeFiltersCount = filters.regions.length + filters.services.length;

  return (
    <div className="mb-6">
      <div className="w-full relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
        <Input
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          placeholder="전문가 이름, 분야 또는 지역 검색"
          className="pl-10 py-6 rounded-lg border-neutral-300 text-lg"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                size="lg"
              >
                <Filter className="h-4 w-4" />
                필터
                {activeFiltersCount > 0 && (
                  <Badge className="bg-primary text-white ml-1 h-6 w-6 flex items-center justify-center p-0 rounded-full">
                    {activeFiltersCount}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-pretendard font-medium">필터 옵션</h3>
                  {(filters.regions.length > 0 || filters.services.length > 0) && (
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-neutral-500 text-xs"
                    >
                      초기화
                    </Button>
                  )}
                </div>
                
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
                            checked={filters.regions.includes(region)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters({...filters, regions: [...filters.regions, region]});
                              } else {
                                setFilters({...filters, regions: filters.regions.filter(r => r !== region)});
                              }
                            }}
                          />
                          <span className="text-sm">{region}</span>
                        </label>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="w-full">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-neutral-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="font-medium">전문 서비스</span>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    <div className="grid grid-cols-1 gap-2 pl-6">
                      {serviceCategories.map((service) => (
                        <label key={service} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox 
                            checked={filters.services.includes(service)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters({...filters, services: [...filters.services, service]});
                              } else {
                                setFilters({...filters, services: filters.services.filter(s => s !== service)});
                              }
                            }}
                          />
                          <span className="text-sm">{service}</span>
                        </label>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                <Button 
                  className="w-full"
                  onClick={() => setShowFilters(false)}
                >
                  필터 적용하기
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {(filters.regions.length > 0 || filters.services.length > 0) && (
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
              
              {(filters.regions.length > 0 || filters.services.length > 0) && (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-neutral-500 h-7 px-2"
                >
                  초기화
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertFilters;
