import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Quote } from 'lucide-react';
import { Expert } from '@/types/expert';

interface ExpertProfilePreviewProps {
  expert: Partial<Expert>;
}

const ExpertProfilePreview: React.FC<ExpertProfilePreviewProps> = ({ expert }) => {
  return (
    <div className="bg-white rounded-lg border overflow-hidden text-sm">
      {/* Hero Section Preview */}
      <div className="relative h-48 bg-gradient-to-r from-primary/80 to-primary overflow-hidden">
        {expert.coverImage && (
          <img 
            src={expert.coverImage} 
            alt="cover" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/70" />
        <div className="relative z-10 h-full flex flex-col justify-end p-4">
          <div className="flex items-end gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md flex-shrink-0">
              <img 
                src={expert.image || "/placeholder.svg"} 
                alt={expert.name || '전문가'} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              {expert.services && expert.services.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {expert.services.slice(0, 3).map((s, i) => (
                    <Badge key={i} variant="secondary" className="bg-white/20 text-white text-[10px] px-1.5 py-0">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}
              <h3 className="font-bold text-lg text-white truncate">
                {expert.name || '전문가 이름'}
              </h3>
              <p className="text-white/80 text-xs truncate">
                {expert.role || '직책'} · {expert.specialty || '전문 분야'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="flex gap-3">
          {expert.experience && (
            <div className="bg-muted rounded-md px-2 py-1">
              <span className="text-[10px] text-muted-foreground block">경력</span>
              <span className="text-xs font-medium">{expert.experience}</span>
            </div>
          )}
          {expert.projects && (
            <div className="bg-muted rounded-md px-2 py-1">
              <span className="text-[10px] text-muted-foreground block">프로젝트</span>
              <span className="text-xs font-medium">{expert.projects}</span>
            </div>
          )}
          {expert.regions && expert.regions.length > 0 && (
            <div className="bg-muted rounded-md px-2 py-1">
              <span className="text-[10px] text-muted-foreground block">활동 지역</span>
              <span className="text-xs font-medium">{expert.regions.slice(0, 2).join(', ')}{expert.regions.length > 2 ? ` 외 ${expert.regions.length - 2}` : ''}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {expert.description && (
          <div>
            <h4 className="font-semibold text-xs mb-1">전문가 소개</h4>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {expert.description}
            </p>
          </div>
        )}

        {/* Key Achievements */}
        {expert.keyAchievements && expert.keyAchievements.filter(a => a.trim()).length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-1">핵심 성과</h4>
            <div className="space-y-1">
              {expert.keyAchievements.filter(a => a.trim()).slice(0, 3).map((a, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Timeline */}
        {expert.careerTimeline && expert.careerTimeline.filter(c => c.position || c.company).length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-1">경력</h4>
            <div className="border-l-2 border-muted pl-3 space-y-2">
              {expert.careerTimeline.filter(c => c.position || c.company).slice(0, 3).map((c, i) => (
                <div key={i}>
                  <span className="text-[10px] text-primary font-medium">{c.year}</span>
                  <p className="text-xs font-medium">{c.position}</p>
                  <p className="text-[10px] text-muted-foreground">{c.company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {expert.educationHistory && expert.educationHistory.filter(e => e.degree).length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-1">학력</h4>
            <div className="space-y-1">
              {expert.educationHistory.filter(e => e.degree).map((e, i) => (
                <div key={i} className="bg-muted rounded-md p-2">
                  <p className="text-xs font-medium">{e.degree}</p>
                  <p className="text-[10px] text-muted-foreground">{e.institution} {e.year && `(${e.year})`}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Cases */}
        {expert.successCases && expert.successCases.filter(s => s.title).length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-1">성공 사례</h4>
            {expert.successCases.filter(s => s.title).slice(0, 2).map((s, i) => (
              <div key={i} className="bg-muted rounded-md p-2 mb-1.5">
                <p className="text-xs font-medium mb-0.5">{s.title}</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2">{s.description}</p>
                {s.results && s.results.filter(r => r.trim()).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.results.filter(r => r.trim()).map((r, ri) => (
                      <Badge key={ri} variant="outline" className="text-[10px] px-1 py-0">{r}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        {expert.testimonials && expert.testimonials.filter(t => t.content).length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-1">고객 추천사</h4>
            {expert.testimonials.filter(t => t.content).slice(0, 2).map((t, i) => (
              <div key={i} className="bg-muted rounded-md p-2 mb-1.5">
                <Quote className="h-3 w-3 text-primary/50 mb-0.5" />
                <p className="text-[10px] text-muted-foreground italic line-clamp-2">{t.content}</p>
                <p className="text-[10px] font-medium mt-1">— {t.name} {t.position && `(${t.position})`}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {expert.certifications && expert.certifications.filter(c => c.trim()).length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-1">자격증</h4>
            <div className="flex flex-wrap gap-1">
              {expert.certifications.filter(c => c.trim()).map((c, i) => (
                <Badge key={i} variant="outline" className="text-[10px]">{c}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Regions sidebar preview */}
        {expert.regions && expert.regions.length > 0 && (
          <div className="bg-muted rounded-md p-2">
            <div className="flex items-center gap-1 mb-1">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium">활동 지역</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {expert.regions.map((r, i) => (
                <Badge key={i} variant="outline" className="text-[10px]">{r}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertProfilePreview;
