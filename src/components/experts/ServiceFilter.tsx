
import React from 'react';
import { Tag, ChevronsUpDown } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ServiceFilterProps {
  services: string[];
  selectedServices: string[];
  onServiceChange: (service: string, checked: boolean) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  services,
  selectedServices,
  onServiceChange,
}) => {
  return (
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
          {services.map((service) => (
            <label key={service} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox 
                checked={selectedServices.includes(service)}
                onCheckedChange={(checked) => {
                  onServiceChange(service, !!checked);
                }}
              />
              <span className="text-sm">{service}</span>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ServiceFilter;
