
import React from 'react';
import { MapPin, Users, Phone, Mail, TrendingUp, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RegionInfo } from './types';
import { Link } from 'react-router-dom';

interface RegionCardProps {
  activeRegion: RegionInfo;
  getFilteredUrl: (region: string) => string;
}

const RegionCard: React.FC<RegionCardProps> = ({ activeRegion, getFilteredUrl }) => {
  const { name, description, expertCount, manager, topServices } = activeRegion;
  
  // Create the URL for filtering experts by this region
  const expertFilterUrl = `/experts?region=${encodeURIComponent(name)}`;

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary to-primary-700 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-pretendard font-bold text-2xl flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {name}
            </h3>
            <Badge className="bg-white text-primary">
              <Users className="h-3 w-3 mr-1" />
              전문가 {expertCount}명
            </Badge>
          </div>
          <p className="font-noto text-white/90">{description}</p>
        </div>

        <div className="p-6">
          {manager && (
            <div className="flex items-start gap-4 mb-6 p-4 bg-neutral-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-noto text-neutral-500 text-sm">지역 담당자</p>
                <h4 className="font-pretendard font-bold text-lg">{manager}</h4>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="flex items-center gap-2 text-sm font-noto text-neutral-600">
                    <Phone className="h-4 w-4 text-primary" />
                    042-123-4567
                  </span>
                  <span className="flex items-center gap-2 text-sm font-noto text-neutral-600">
                    <Mail className="h-4 w-4 text-primary" />
                    {name.split('/')[0].toLowerCase()}@medistartup.kr
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="font-pretendard font-medium text-neutral-700 mb-3">지역 인기 서비스</h4>
            <div className="space-y-3">
              {topServices && topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-noto flex items-center gap-2">
                    {index === 0 && <TrendingUp className="h-4 w-4 text-primary" />}
                    {index === 1 && <Building2 className="h-4 w-4 text-secondary" />}
                    {index === 2 && <Users className="h-4 w-4 text-accent" />}
                    {service.name}
                  </span>
                  <span className="font-pretendard font-medium text-sm">{service.percent}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Button asChild>
              <Link to={expertFilterUrl} className="w-full">
                {name} 전문가 보기
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionCard;
