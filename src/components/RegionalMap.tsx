
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Users } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';
import { useExperts } from '@/contexts/ExpertsContext';
import { Expert } from '@/types/expert';
import { Badge } from '@/components/ui/badge';

const RegionalMap = () => {
  const [activeRegion, setActiveRegion] = useState('서울/경기');
  const { experts } = useExperts();
  
  // 한국 지도에 표시할 지역 정보
  const regions = [
    { 
      id: 'seoul', 
      name: '서울/경기', 
      path: 'M95,90 C105,75 125,65 145,70 C160,72 175,85 180,100 C185,115 182,135 172,145 C155,160 130,165 110,150 C95,140 85,115 95,90 Z',
      labelX: 135,
      labelY: 105,
      includesRegions: ['서울', '경기', '인천']
    },
    { 
      id: 'gangwon', 
      name: '강원', 
      path: 'M200,50 C220,40 250,45 265,60 C280,75 290,95 285,120 C280,140 260,155 240,155 C220,155 200,140 190,120 C185,100 185,65 200,50 Z',
      labelX: 240,
      labelY: 100,
      includesRegions: ['강원']
    },
    { 
      id: 'chungcheong', 
      name: '충청', 
      path: 'M125,160 C145,150 175,150 195,160 C210,170 220,190 215,210 C210,230 190,245 170,245 C150,245 130,235 120,215 C110,195 110,175 125,160 Z',
      labelX: 165,
      labelY: 195,
      includesRegions: ['대전', '충남', '충북', '세종']
    },
    { 
      id: 'gyeongbuk', 
      name: '경북/대구', 
      path: 'M250,180 C270,170 290,175 305,190 C320,205 325,225 320,245 C315,265 290,280 270,275 C250,270 235,255 230,235 C225,215 230,195 250,180 Z',
      labelX: 275,
      labelY: 225,
      includesRegions: ['대구', '경북']
    },
    { 
      id: 'jeonlla', 
      name: '전라', 
      path: 'M120,260 C140,245 165,245 185,255 C205,265 215,285 210,305 C205,325 185,340 165,340 C145,340 125,330 115,310 C105,290 105,275 120,260 Z',
      labelX: 160,
      labelY: 295,
      includesRegions: ['광주', '전남', '전북']
    },
    { 
      id: 'gyeongnam', 
      name: '경남/부산', 
      path: 'M220,280 C240,270 265,275 280,290 C295,305 300,325 295,345 C290,365 270,375 250,370 C230,365 215,350 210,330 C205,310 205,290 220,280 Z',
      labelX: 255,
      labelY: 325,
      includesRegions: ['부산', '경남', '울산']
    },
    { 
      id: 'jeju', 
      name: '제주', 
      path: 'M145,380 C155,375 170,375 180,380 C190,385 195,395 195,405 C195,415 185,425 170,425 C155,425 145,415 145,405 C145,395 135,385 145,380 Z',
      labelX: 170,
      labelY: 405,
      includesRegions: ['제주']
    }
  ];

  // 지역 매니저 정보 가져오기 (isRegionalManager가 true인 전문가 중 해당 지역을 담당하는 전문가)
  const getRegionalManager = (regionName: string) => {
    const currentRegion = regions.find(region => region.name === regionName);
    if (!currentRegion) return null;
    
    const includesRegions = currentRegion.includesRegions;
    
    return experts.find(expert => 
      expert.isRegionalManager && 
      expert.regions.some(region => includesRegions.includes(region))
    );
  };
  
  // 지역별 전문가 수 계산
  const getRegionalExpertCount = (regionName: string) => {
    const currentRegion = regions.find(region => region.name === regionName);
    if (!currentRegion) return 0;
    
    const includesRegions = currentRegion.includesRegions;
    
    return experts.filter(expert => 
      expert.regions.some(region => includesRegions.includes(region))
    ).length;
  };
  
  // 지역별 주요 서비스 가져오기
  const getRegionTopServices = (regionName: string): string[] => {
    const currentRegion = regions.find(region => region.name === regionName);
    if (!currentRegion) return [];
    
    const includesRegions = currentRegion.includesRegions;
    
    // 해당 지역 전문가들의 서비스를 모두 가져옴
    const allServices = experts
      .filter(expert => expert.regions.some(region => includesRegions.includes(region)))
      .flatMap(expert => expert.services);
    
    // 서비스별 출현 횟수를 계산
    const serviceCounts: {[key: string]: number} = {};
    allServices.forEach(service => {
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });
    
    // 출현 횟수 기준으로 정렬하여 상위 3개 반환
    return Object.entries(serviceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  };
  
  const getActiveRegion = () => {
    const region = regions.find(region => region.name === activeRegion);
    if (!region) return null;
    
    const manager = getRegionalManager(activeRegion);
    const expertCount = getRegionalExpertCount(activeRegion);
    const topServices = getRegionTopServices(activeRegion);
    
    return {
      ...region,
      manager: manager?.name || '담당자 미지정',
      phone: manager?.contact || '번호 미등록',
      email: manager?.email || 'contact@medistartup.kr',
      expertCount,
      topServices
    };
  };
  
  const getFilteredUrl = () => {
    const region = regions.find(r => r.name === activeRegion);
    if (!region) return '/experts';
    
    // 지역 이름만 URL 파라미터로 전달
    return `/experts?region=${encodeURIComponent(region.name)}`;
  };

  return (
    <section id="regions" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            지역별 <span className="text-primary">전문가 네트워크</span>
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            각 지역 특성과 의료 환경을 고려한 맞춤형 전문가 네트워크를 구축했습니다. 지역에 특화된 전문지식을 바탕으로 보다 효과적인 병원창업을 도와드립니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-3/5">
            <div className="relative bg-white rounded-xl shadow-md p-4 h-[400px] md:h-[500px]">
              {/* 대한민국 지도 SVG */}
              <svg 
                viewBox="0 0 400 450" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 남한 지역별 경로 */}
                {regions.map((region) => (
                  <g key={region.id} onClick={() => setActiveRegion(region.name)}>
                    <path 
                      d={region.path}
                      className={`${activeRegion === region.name ? 'fill-primary/30' : 'fill-blue-50'} stroke-primary stroke-2 cursor-pointer transition-all duration-300`}
                    />
                    <text 
                      x={region.labelX} 
                      y={region.labelY}
                      textAnchor="middle"
                      className={`${activeRegion === region.name ? 'fill-primary font-bold' : 'fill-neutral-700'} text-sm cursor-pointer pointer-events-none transition-all`}
                    >
                      {region.name}
                    </text>
                    <text 
                      x={region.labelX} 
                      y={region.labelY + 16}
                      textAnchor="middle"
                      className={`${activeRegion === region.name ? 'opacity-100' : 'opacity-70'} fill-primary text-xs font-medium cursor-pointer`}
                    >
                      {getRegionalExpertCount(region.name)}명의 전문가
                    </text>
                    {/* 활성화된 지역에 표시할 하이라이트 원 */}
                    {activeRegion === region.name && (
                      <circle 
                        cx={region.labelX} 
                        cy={region.labelY - 20} 
                        r="8"
                        className="fill-primary animate-pulse"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            {getActiveRegion() && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-pretendard font-bold text-2xl text-neutral-900">
                      {getActiveRegion()?.name} 지역
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
                          {getActiveRegion()?.manager}
                        </p>
                      </div>
                      {getRegionalManager(activeRegion) && (
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
                        {getActiveRegion()?.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-noto text-neutral-700">
                        {getActiveRegion()?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-noto text-neutral-700">
                        지역 전문가 {getActiveRegion()?.expertCount}명
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-noto font-medium text-neutral-800">
                      주요 서비스 분야
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getActiveRegion()?.topServices.map((service, index) => (
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
                      {getActiveRegion()?.name} 지역 병원창업 성공률
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalMap;
