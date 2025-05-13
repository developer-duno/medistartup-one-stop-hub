
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, BarChart3, Building2, FileCheck, 
  Users, Briefcase, Package, Trash2 
} from 'lucide-react';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
  getServiceUrlParam: (title: string) => string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, getServiceUrlParam }) => {
  const getIcon = () => {
    switch(service.icon) {
      case 'MapPin': return <MapPin className="h-5 w-5 text-primary" />;
      case 'BarChart3': return <BarChart3 className="h-5 w-5 text-secondary" />;
      case 'Building2': return <Building2 className="h-5 w-5 text-accent" />;
      case 'FileCheck': return <FileCheck className="h-5 w-5 text-primary" />;
      case 'Users': return <Users className="h-5 w-5 text-secondary" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5 text-accent" />;
      case 'Package': return <Package className="h-5 w-5 text-primary" />;
      case 'Trash2': return <Trash2 className="h-5 w-5 text-secondary" />;
      default: return <MapPin className="h-5 w-5 text-primary" />;
    }
  };

  const getBgColor = () => {
    switch(service.category) {
      case 'planning': return 'bg-primary-50';
      case 'implementation': return 'bg-secondary-50';
      case 'equipment': return 'bg-accent-50';
      case 'operation': return 'bg-neutral-50';
      default: return 'bg-primary-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className={`p-5 ${getBgColor()} h-full flex flex-col`}>
        <div className="flex items-center mb-3">
          <div className="mr-3 bg-white p-2 rounded-full shadow-sm">
            {getIcon()}
          </div>
          <h3 className="font-pretendard font-semibold text-lg text-neutral-800 line-clamp-1">
            {service.title}
          </h3>
        </div>
        
        <p className="font-noto text-neutral-600 text-sm mb-4 flex-grow">
          {service.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-neutral-100">
          <Link 
            to={service.path} 
            className="text-sm font-medium text-primary inline-flex items-center hover:underline"
          >
            자세히 보기
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
          
          <Link 
            to={`/experts?service=${getServiceUrlParam(service.title)}`}
            className="text-xs text-secondary-foreground hover:text-primary transition-colors"
          >
            전문가 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
