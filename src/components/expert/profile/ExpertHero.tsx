
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Expert } from '@/types/expert';
import ExpertStatItem from './ExpertStatItem';

interface ExpertHeroProps {
  expert: Expert;
}

const ExpertHero: React.FC<ExpertHeroProps> = ({ expert }) => {
  return (
    <section className="relative h-[50vh] min-h-[300px] bg-gradient-to-r from-primary-700 to-primary-900 overflow-hidden">
      <HeroBackground expert={expert} />
      <HeroOverlay />
      
      <div className="container mx-auto px-4 relative z-30 h-full flex flex-col justify-end pb-10">
        <BackLink />
        
        <div className="flex items-end gap-6">
          <ExpertImage image={expert.image} name={expert.name} />
          
          <div>
            <ServiceTags services={expert.services} />
            <ExpertName name={expert.name} />
            <ExpertRole role={expert.role} specialty={expert.specialty} />
            <ExpertStats expert={expert} />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroBackground: React.FC<{expert: Expert}> = ({ expert }) => {
  if (!expert.coverImage) {
    return <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 z-10"></div>;
  }
  
  return (
    <div className="absolute inset-0 z-10">
      <img 
        src={expert.coverImage} 
        alt={expert.name} 
        className="w-full h-full object-cover opacity-40"
      />
    </div>
  );
};

const HeroOverlay: React.FC = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70 z-20"></div>
);

const BackLink: React.FC = () => (
  <Link to="/experts" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
    <ChevronLeft className="h-4 w-4 mr-1" />
    모든 전문가 보기
  </Link>
);

const ExpertImage: React.FC<{image?: string; name: string}> = ({ image, name }) => (
  <div className="hidden md:block relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
    <img 
      src={image || "/placeholder.svg"} 
      alt={name} 
      className="w-full h-full object-cover"
    />
  </div>
);

const ServiceTags: React.FC<{services?: string[]}> = ({ services = [] }) => (
  <div className="flex flex-wrap gap-2 mb-3">
    {services.map((service: string, idx: number) => (
      <Badge key={idx} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
        {service}
      </Badge>
    ))}
  </div>
);

const ExpertName: React.FC<{name: string}> = ({ name }) => (
  <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-white mb-1">
    {name}
  </h1>
);

const ExpertRole: React.FC<{role: string; specialty: string}> = ({ role, specialty }) => (
  <p className="font-noto text-white/90 text-lg mb-4">
    {role} · {specialty}
  </p>
);

const ExpertStats: React.FC<{expert: Expert}> = ({ expert }) => (
  <div className="flex flex-wrap gap-3 md:gap-4">
    <ExpertStatItem label="경력" value={expert.experience} />
    <ExpertStatItem label="프로젝트" value={expert.projects} />
    <ExpertStatItem 
      label="활동 지역" 
      value={expert.regions ? expert.regions.join(', ') : '전국'} 
    />
    <ExpertStatItem label="프로필 조회" value={`${expert.profileViews ?? 0}회`} />
  </div>
);

export default ExpertHero;
