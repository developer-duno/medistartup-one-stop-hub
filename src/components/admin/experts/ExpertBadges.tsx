
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RegionBadgesProps {
  regions: string[];
  managedRegions?: string[];
  isRegionalManager?: boolean;
}

export const RegionBadges: React.FC<RegionBadgesProps> = ({ regions, managedRegions = [], isRegionalManager = false }) => {
  if (!regions || regions.length === 0) {
    return <span className="text-xs text-gray-500">지역 없음</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {regions.map((region) => (
        <span 
          key={region} 
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            isRegionalManager && managedRegions.includes(region) 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-blue-50 text-blue-700'
          }`}
        >
          {region}
          {isRegionalManager && managedRegions?.includes(region) && (
            <span className="ml-1 text-[10px] bg-blue-200 px-1 rounded">총괄</span>
          )}
        </span>
      ))}
    </div>
  );
};

interface ServiceBadgesProps {
  services: string[];
}

export const ServiceBadges: React.FC<ServiceBadgesProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return <span className="text-xs text-gray-500">서비스 없음</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {services.map((service) => (
        <span 
          key={service} 
          className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
        >
          {service}
        </span>
      ))}
    </div>
  );
};

interface ExpertStatusBadgesProps {
  isRegionalManager: boolean;
  showOnMain: boolean;
}

export const ExpertStatusBadges: React.FC<ExpertStatusBadgesProps> = ({ isRegionalManager, showOnMain }) => {
  return (
    <>
      {isRegionalManager && (
        <Badge className="ml-2 bg-primary/10 text-primary border-primary/20 text-xs">총괄</Badge>
      )}
      {!showOnMain && (
        <Badge className="ml-2 bg-gray-100 text-gray-500 border-gray-200 text-xs">숨김</Badge>
      )}
    </>
  );
};
