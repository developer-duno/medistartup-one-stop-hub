
import React from 'react';
import { Phone, Mail, MapPin, Users } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { RegionInfo } from './types';

interface RegionCardProps {
  activeRegion: RegionInfo;
  getFilteredUrl: () => string;
}

const RegionCard: React.FC<RegionCardProps> = ({ activeRegion, getFilteredUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-pretendard font-bold text-2xl text-neutral-900">
            {activeRegion.name} 지역
          </h3>
          <p className="font-noto text-neutral-500">
            지역 전문가 네트워크
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-noto font-medium text-neutral-800 mb-1">
                담당 총괄 매니저
              </p>
              <p className="font-pretendard font-bold text-xl text-primary">
                {activeRegion.manager}
              </p>
            </div>
            {activeRegion.hasManager && (
              <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                지역 총괄 책임자
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-noto text-neutral-700">
              {activeRegion.phone}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-noto text-neutral-700">
              {activeRegion.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-noto text-neutral-700">
              지역 전문가 {activeRegion.expertCount}명
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-noto font-medium text-neutral-800">
            주요 서비스 분야
          </p>
          <div className="flex flex-wrap gap-2">
            {activeRegion.topServices.map((service, index) => (
              <span 
                key={index}
                className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <p className="font-noto text-sm text-neutral-500 mb-2">
            {activeRegion.name} 지역 병원창업 성공률
          </p>
          <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[92%]"></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs font-noto text-neutral-400">전국 평균 87%</span>
            <span className="text-xs font-noto font-medium text-primary">92%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <CustomButton variant="primary" className="flex-1" asChild>
          <Link to={getFilteredUrl()}>
            지역 전문가 보기
          </Link>
        </CustomButton>
        <CustomButton variant="outline" className="flex-1" asChild>
          <Link to="/success-stories">
            지역 성공사례
          </Link>
        </CustomButton>
      </div>
    </div>
  );
};

export default RegionCard;
