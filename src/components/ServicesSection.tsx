
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

  // Map service titles to URL parameters for expert filtering
  const getServiceUrlParam = (title: string): string => {
    const serviceMap: Record<string, string> = {
      '입지 분석': 'location-analysis',
      '재무 컨설팅': 'financial-consulting',
      '설계 및 인테리어': 'design-interior',
      '인허가 대행': 'licensing',
      '인력 채용': 'recruitment',
      '마케팅 전략': 'marketing-strategy',
      '의료기기 구입 및 설치': 'medical-equipment',
      '수납 및 의료폐기물 처리': 'waste-management'
    };
    
    return serviceMap[title] || '';
  };

  return (
    <section id="services" className="py-12 md:py-24">
      <div className="container mx-auto px-3 md:px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-pretendard font-bold text-xl md:text-3xl text-neutral-900 mb-2 md:mb-4">
            병원창업을 위한 <span className="text-primary">원스탑</span> 솔루션
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto text-xs md:text-base">
            의료기관 설립의 모든 과정을 함께합니다. 각 분야 전문가들이 개원 단계별로 필요한 모든 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className={`p-3 md:p-6 bg-gradient-to-br ${getColorClassName(index)}`}>
                <div className="bg-white rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center shadow-sm mb-2 md:mb-4">
                  {getIconComponent(service.icon, true)}
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
                  className="text-xs md:text-sm px-3 py-1.5 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors text-center flex-1"
                >
                  더 알아보기
                </Link>
                <Link 
                  to={`/experts?service=${getServiceUrlParam(service.title)}`}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-md bg-secondary/10 text-secondary-700 font-medium hover:bg-secondary/20 transition-colors text-center flex-1"
                >
                  전문가
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
