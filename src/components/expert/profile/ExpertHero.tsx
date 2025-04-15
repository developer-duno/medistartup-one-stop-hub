
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Award } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Expert } from '@/types/expert';

interface ExpertHeroProps {
  expert: Expert;
}

const ExpertHero: React.FC<ExpertHeroProps> = ({ expert }) => {
  return (
    <section className="relative h-[50vh] min-h-[300px] bg-gradient-to-r from-primary-700 to-primary-900 overflow-hidden">
      {expert.coverImage ? (
        <div className="absolute inset-0 z-10">
          <img 
            src={expert.coverImage} 
            alt={expert.name} 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 z-10"></div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/70 z-20"></div>
      
      <div className="container mx-auto px-4 relative z-30 h-full flex flex-col justify-end pb-10">
        <Link to="/experts" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          모든 전문가 보기
        </Link>
        
        <div className="flex items-end gap-6">
          <div className="hidden md:block relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={expert.image || "/placeholder.svg"} 
              alt={expert.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {expert.services && expert.services.map((service: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                  {service}
                </Badge>
              ))}
            </div>
            
            <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-white mb-1">
              {expert.name}
            </h1>
            
            <p className="font-noto text-white/90 text-lg mb-4">
              {expert.role} · {expert.specialty}
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <span className="block font-pretendard font-bold text-white text-center">
                  {expert.experience}
                </span>
                <span className="text-xs text-white/80">경력</span>
              </div>
              
              <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <span className="block font-pretendard font-bold text-white text-center">
                  {expert.projects}
                </span>
                <span className="text-xs text-white/80">프로젝트</span>
              </div>
              
              <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <span className="block font-pretendard font-bold text-white text-center">
                  {expert.regions ? expert.regions.join(', ') : '전국'}
                </span>
                <span className="text-xs text-white/80">활동 지역</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertHero;
