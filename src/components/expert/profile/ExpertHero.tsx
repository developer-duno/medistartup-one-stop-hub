
import React from 'react';
import LazyImage from '@/components/LazyImage';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Briefcase, FolderOpen, MapPin, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Expert } from '@/types/expert';

interface ExpertHeroProps {
  expert: Expert;
}

const ExpertHero: React.FC<ExpertHeroProps> = ({ expert }) => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 overflow-hidden pt-20 md:pt-24 pb-8 md:pb-10">
      <HeroBackground expert={expert} />
      <HeroOverlay />
      
      <div className="container mx-auto px-4 relative z-30">
        <BackLink onBack={() => window.history.length > 1 ? navigate(-1) : navigate('/experts')} />
        
        <div className="flex items-end gap-4 md:gap-6">
          <ExpertImage image={expert.image} name={expert.name} />
          
          <div className="flex-1 min-w-0">
            <ServiceTags services={expert.services} />
            <ExpertName name={expert.name} />
            <ExpertRole role={expert.role} specialty={expert.specialty} />
          </div>
        </div>
        
        {/* Stats grid below name on mobile for clarity */}
        <div className="mt-4">
          <ExpertStats expert={expert} />
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
      <LazyImage 
        src={expert.coverImage} 
        alt="" 
        className="w-full h-full object-cover opacity-40"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
};

const HeroOverlay: React.FC = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70 z-20"></div>
);

const BackLink: React.FC<{onBack: () => void}> = ({ onBack }) => (
  <button onClick={onBack} className="inline-flex items-center text-white/80 hover:text-white mb-4 md:mb-8 transition-colors text-sm">
    <ChevronLeft className="h-4 w-4 mr-1" />
    전문가 목록으로
  </button>
);

const ExpertImage: React.FC<{image?: string; name: string}> = ({ image, name }) => (
  <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl overflow-hidden border-3 md:border-4 border-white shadow-lg shrink-0 bg-primary-200">
    <LazyImage 
      src={image || "/placeholder.svg"} 
      alt={name} 
      className="w-full h-full object-cover"
      onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
    />
  </div>
);

const ServiceTags: React.FC<{services?: string[]}> = ({ services = [] }) => (
  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
    {services.slice(0, 3).map((service: string, idx: number) => (
      <Badge key={idx} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white text-[10px] md:text-xs px-2 py-0.5">
        {service}
      </Badge>
    ))}
    {services.length > 3 && (
      <Badge variant="secondary" className="bg-white/10 text-white/70 text-[10px] md:text-xs px-2 py-0.5">
        +{services.length - 3}
      </Badge>
    )}
  </div>
);

const ExpertName: React.FC<{name: string}> = ({ name }) => (
  <h1 className="font-pretendard font-bold text-2xl md:text-4xl text-white mb-0.5 md:mb-1">
    {name}
  </h1>
);

const ExpertRole: React.FC<{role: string; specialty: string}> = ({ role, specialty }) => (
  <p className="font-noto text-white/90 text-sm md:text-lg line-clamp-2">
    {role} · {specialty}
  </p>
);

const ExpertStats: React.FC<{expert: Expert}> = ({ expert }) => (
  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4">
    <StatCard icon={<Briefcase className="h-3.5 w-3.5" />} label="경력" value={expert.experience} />
    <StatCard icon={<FolderOpen className="h-3.5 w-3.5" />} label="프로젝트" value={expert.projects} />
    <StatCard icon={<MapPin className="h-3.5 w-3.5" />} label="활동 지역" value={expert.regions ? expert.regions.join(', ') : '전국'} />
    <StatCard icon={<Eye className="h-3.5 w-3.5" />} label="프로필 조회" value={`${expert.profileViews ?? 0}회`} />
  </div>
);

const StatCard: React.FC<{icon: React.ReactNode; label: string; value: string | number}> = ({ icon, label, value }) => (
  <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm flex items-center gap-2 md:block">
    <div className="flex items-center gap-1 text-white/70 text-[10px] md:text-xs md:mb-0.5">
      {icon}
      <span>{label}</span>
    </div>
    <span className="font-pretendard font-bold text-white text-sm md:text-base md:text-center md:block truncate">
      {value}
    </span>
  </div>
);

export default ExpertHero;
