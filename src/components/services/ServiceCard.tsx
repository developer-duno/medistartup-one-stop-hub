
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, BarChart3, Building2, FileCheck, 
  Users, Briefcase, Package, Trash2 
} from 'lucide-react';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service?: Service;
  getServiceUrlParam?: (title: string) => string;
  index?: number;
  children?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, getServiceUrlParam, index = 0, children }) => {
  if (children) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
        {children}
      </div>
    );
  }

  if (!service) {
    return null;
  }

  const getIcon = () => {
    const size = "h-8 w-8";
    switch(service.icon) {
      case 'MapPin': return <MapPin className={`${size} text-primary`} />;
      case 'BarChart3': return <BarChart3 className={`${size} text-secondary`} />;
      case 'Building2': return <Building2 className={`${size} text-accent`} />;
      case 'FileCheck': return <FileCheck className={`${size} text-primary`} />;
      case 'Users': return <Users className={`${size} text-secondary`} />;
      case 'Briefcase': return <Briefcase className={`${size} text-accent`} />;
      case 'Package': return <Package className={`${size} text-primary`} />;
      case 'Trash2': return <Trash2 className={`${size} text-secondary`} />;
      default: return <MapPin className={`${size} text-primary`} />;
    }
  };

  const getGradientColor = () => {
    const colors = ['from-primary-100/75 to-primary-50/75', 'from-secondary-100/75 to-secondary-50/75', 'from-accent-100/75 to-accent-50/75'];
    return colors[index % colors.length];
  };

  const getServiceParam = getServiceUrlParam || (() => '');

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md active:shadow-inner active:scale-[0.98] transition-all duration-150 overflow-hidden touch-manipulation select-none">
      <div className={`p-3 md:p-6 bg-gradient-to-br ${getGradientColor()}`}>
        <div className="bg-white rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center shadow-sm mb-2 md:mb-4">
          {getIcon()}
        </div>
        <h3 className="font-pretendard font-bold text-sm md:text-xl text-neutral-900 mb-1 md:mb-2">
          {service.title}
        </h3>
        <p className="font-noto text-neutral-600 text-xs md:text-base line-clamp-2 md:line-clamp-none">
          {service.description}
        </p>
      </div>
      <div className="p-3 md:p-4 border-t border-neutral-100 flex justify-between items-center gap-2">
        <Link 
          to={service.path} 
          className="text-xs md:text-sm px-3 py-1.5 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 active:bg-primary/30 active:scale-95 transition-all duration-150 text-center flex-1 shadow-sm touch-manipulation select-none"
        >
          자세히
        </Link>
        <Link 
          to={`/experts?service=${getServiceParam(service.title)}`}
          className="text-xs md:text-sm px-3 py-1.5 rounded-md bg-secondary/10 text-secondary-700 font-medium hover:bg-secondary/20 active:bg-secondary/30 active:scale-95 transition-all duration-150 text-center flex-1 shadow-sm touch-manipulation select-none"
        >
          전문가
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
