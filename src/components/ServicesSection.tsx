
import React from 'react';
import { MapPin, BarChart3, Building2, FileCheck, Users, Briefcase, Package, Trash2 } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';
import { useServices } from '@/contexts/ServicesContext';
import { Service } from '@/types/service';

const ServicesSection = () => {
  const { services } = useServices();

  const getIconComponent = (iconName: string, large = false) => {
    const size = large ? "h-8 w-8" : "h-5 w-5";
    switch(iconName) {
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

  const getColorClassName = (index: number) => {
    const colors = ['from-primary-100 to-primary-50', 'from-secondary-100 to-secondary-50', 'from-accent-100 to-accent-50'];
    return colors[index % colors.length];
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            병원창업을 위한 <span className="text-primary">원스탑</span> 솔루션
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            의료기관 설립의 모든 과정을 함께합니다. 각 분야 전문가들이 개원 단계별로 필요한 모든 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className={`p-6 bg-gradient-to-br ${getColorClassName(index)}`}>
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-sm mb-4">
                  {getIconComponent(service.icon, true)}
                </div>
                <h3 className="font-pretendard font-bold text-xl text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="font-noto text-neutral-600">
                  {service.description}
                </p>
              </div>
              <div className="p-4 border-t border-neutral-100">
                <Link 
                  to={service.path} 
                  className="font-pretendard font-medium text-primary inline-flex items-center group-hover:underline"
                >
                  자세히 알아보기
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
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <CustomButton variant="outline" asChild>
            <Link to="/services">모든 서비스 살펴보기</Link>
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
