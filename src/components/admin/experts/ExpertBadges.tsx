
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';

interface RegionBadgesProps {
  regions: string[];
  managedRegions?: string[];
  isRegionalManager?: boolean;
}

export const RegionBadges: React.FC<RegionBadgesProps> = ({ 
  regions, 
  managedRegions = [], 
  isRegionalManager = false 
}) => {
  if (regions.length === 0) return <span className="text-gray-400 text-xs">지역 없음</span>;
  
  return (
    <div className="flex flex-wrap gap-1">
      {regions.map((region) => (
        <Badge 
          key={region} 
          variant={managedRegions.includes(region) && isRegionalManager ? "default" : "outline"}
          className="text-xs"
        >
          {managedRegions.includes(region) && isRegionalManager && <MapPin className="h-3 w-3 mr-1" />}
          {region}
        </Badge>
      ))}
    </div>
  );
};

interface ServiceBadgesProps {
  services: string[];
}

export const ServiceBadges: React.FC<ServiceBadgesProps> = ({ services }) => {
  if (services.length === 0) return <span className="text-gray-400 text-xs">서비스 없음</span>;
  
  return (
    <div className="flex flex-wrap gap-1">
      {services.map((service) => (
        <Badge key={service} variant="secondary" className="text-xs">
          {service}
        </Badge>
      ))}
    </div>
  );
};

interface ExpertStatusBadgesProps {
  isRegionalManager: boolean;
  showOnMain: boolean;
  applicationStatus?: 'pending' | 'approved' | 'rejected';
}

export const ExpertStatusBadges: React.FC<ExpertStatusBadgesProps> = ({ 
  isRegionalManager, 
  showOnMain,
  applicationStatus = 'approved'
}) => {
  return (
    <div className="flex ml-2 gap-1">
      {isRegionalManager && (
        <Badge variant="outline" className="text-xs flex items-center bg-blue-50 border-blue-200 text-blue-700">
          <Star className="h-3 w-3 mr-1" />
          총괄
        </Badge>
      )}
      
      {!showOnMain && applicationStatus === 'approved' && (
        <Badge variant="outline" className="text-xs bg-gray-100 border-gray-200 text-gray-700">
          숨김
        </Badge>
      )}
      
      {applicationStatus === 'pending' && (
        <Badge variant="outline" className="text-xs bg-yellow-100 border-yellow-200 text-yellow-800">
          검토중
        </Badge>
      )}
      
      {applicationStatus === 'rejected' && (
        <Badge variant="outline" className="text-xs bg-red-100 border-red-200 text-red-800">
          반려됨
        </Badge>
      )}
    </div>
  );
};
