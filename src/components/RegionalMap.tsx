
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Users, Filter, ChevronDown, X } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';
import { useExperts } from '@/contexts/ExpertsContext';
import { Expert } from '@/types/expert';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const RegionalMap = () => {
  const [activeRegion, setActiveRegion] = useState('대전/충남');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { experts } = useExperts();
  
  const regions = [
    { 
      id: 'daejeon', 
      name: '대전/충남', 
      x: '60%', 
      y: '40%',
      includesRegions: ['대전', '충남']
    },
    { 
      id: 'seoul', 
      name: '서울/경기', 
      x: '30%', 
      y: '25%',
      includesRegions: ['서울', '경기', '인천']
    },
    { 
      id: 'busan', 
      name: '부산/경남', 
      x: '75%', 
      y: '70%',
      includesRegions: ['부산', '경남']
    },
    { 
      id: 'daegu', 
      name: '대구/경북', 
      x: '65%', 
      y: '50%',
      includesRegions: ['대구', '경북']
    },
    { 
      id: 'gwangju', 
      name: '광주/전라', 
      x: '30%', 
      y: '65%',
      includesRegions: ['광주', '전라']
    }
  ];

  const serviceOptions = [
    '입지 분석', '재무 컨설팅', '설계 및 인테리어', '인허가 대행', 
    '인력 채용', '마케팅 전략', '의료기기 구입 및 설치', '수납 및 의료폐기물 처리'
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
      expert.regions.some(region => includesRegions.includes(region)) &&
      (selectedServices.length === 0 || expert.services.some(service => selectedServices.includes(service)))
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
    let baseUrl = `/experts?region=${encodeURIComponent(region?.name || '')}`;
    
    if (selectedServices.length > 0) {
      baseUrl += `&services=${encodeURIComponent(selectedServices.join(','))}`;
    }
    
    return baseUrl;
  };
  
  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
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

        <div className="mb-6 flex justify-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
          >
            <Filter className="h-4 w-4" />
            서비스 필터
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-8 max-w-3xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-pretendard font-medium">서비스 필터</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <CustomButton 
                variant="outline"
                size="sm"
                onClick={() => setSelectedServices([])}
              >
                초기화
              </CustomButton>
              <CustomButton 
                variant="primary"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                적용하기
              </CustomButton>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-3/5">
            <div className="relative bg-white rounded-xl shadow-md p-2 h-[400px] md:h-[500px]">
              <svg 
                viewBox="0 0 500 600" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M180,150 C150,180 120,170 100,200 C80,230 70,280 90,320 C110,360 130,400 180,420 C230,440 280,430 330,410 C380,390 410,350 430,300 C450,250 440,200 420,150 C400,100 350,80 300,90 C250,100 210,120 180,150 Z" 
                  fill="#EBF2FC" 
                  stroke="#2C6ECB"
                  strokeWidth="2"
                />

                {regions.map((region) => (
                  <g key={region.id} onClick={() => setActiveRegion(region.name)}>
                    <circle 
                      cx={region.x} 
                      cy={region.y} 
                      r="15"
                      className={`${activeRegion === region.name ? 'fill-primary' : 'fill-white'} stroke-primary stroke-2 cursor-pointer transition-all duration-300`}
                    />
                    <text 
                      x={region.x} 
                      y={region.y}
                      dy=".3em"
                      textAnchor="middle"
                      className={`${activeRegion === region.name ? 'fill-white' : 'fill-primary'} text-xs font-medium cursor-pointer pointer-events-none`}
                    >
                      {region.id.charAt(0).toUpperCase()}
                    </text>
                    <circle 
                      cx={region.x} 
                      cy={region.y} 
                      r="25"
                      className={`${activeRegion === region.name ? 'fill-primary opacity-20' : 'fill-transparent'} stroke-transparent cursor-pointer transition-all duration-500`}
                    />
                    <text 
                      x={region.x} 
                      y={parseFloat(region.y) + 35}
                      textAnchor="middle"
                      className={`${activeRegion === region.name ? 'opacity-100' : 'opacity-70'} fill-neutral-700 text-xs font-noto cursor-pointer`}
                    >
                      {region.name}
                    </text>
                    <text 
                      x={region.x} 
                      y={parseFloat(region.y) + 50}
                      textAnchor="middle"
                      className={`${activeRegion === region.name ? 'opacity-100' : 'opacity-70'} fill-primary text-xs font-medium cursor-pointer`}
                    >
                      {getRegionalExpertCount(region.name)}명의 전문가
                    </text>
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
                        {selectedServices.length > 0 && (
                          <span className="text-sm text-neutral-500 ml-1">
                            (선택한 서비스 기준)
                          </span>
                        )}
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
