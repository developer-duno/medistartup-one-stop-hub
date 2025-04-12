
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, ArrowRight, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Mock experts data
const mockExperts = [
  {
    id: 1,
    name: "김태호",
    role: "재무 컨설턴트",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 24,
    regions: ["서울", "경기"],
    services: ["재무 컨설팅", "마케팅 전략"],
    description: "병원 개원 및 운영에 필요한 모든 재무 계획 수립을 지원합니다. 10년간 30개 이상의 의원 개원 및 운영 컨설팅 경험을 바탕으로 실질적인 도움을 드립니다."
  },
  {
    id: 2,
    name: "박지연",
    role: "입지 분석가",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 19,
    regions: ["서울", "인천"],
    services: ["입지 분석", "인허가 대행"],
    description: "빅데이터 기반으로 최적의 병원 입지를 분석해 드립니다. 유동인구, 경쟁 의료기관, 인구통계 등을 종합적으로 고려한 과학적 분석으로 성공적인 개원을 도와드립니다."
  },
  {
    id: 3,
    name: "이준호",
    role: "의료 인테리어 디자이너",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1960&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 31,
    regions: ["서울", "경기", "인천"],
    services: ["설계 및 인테리어"],
    description: "진료과목별 특화된 의료공간 설계 전문가입니다. 환자 경험과 의료진의 효율성을 모두 고려한 최적의 병원 인테리어 솔루션을 제공합니다."
  },
  {
    id: 4,
    name: "정민서",
    role: "의료장비 전문가",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 15,
    regions: ["전국"],
    services: ["의료장비", "의료폐기물"],
    description: "국내외 다양한 의료장비 공급망을 활용하여 최적의 가격으로 고품질 의료장비를 제안해 드립니다. 장비 설치 및 유지보수까지 원스톱 서비스를 제공합니다."
  },
  {
    id: 5,
    name: "최수진",
    role: "인허가 전문가",
    image: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=1964&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 27,
    regions: ["서울", "경기", "대전"],
    services: ["인허가 대행", "재무 컨설팅"],
    description: "복잡한 의료기관 인허가 과정을 신속하고 정확하게 대행해 드립니다. 법률 전문가와 협업하여 인허가 과정에서 발생할 수 있는 모든 문제를 사전에 예방합니다."
  },
  {
    id: 6,
    name: "한민우",
    role: "의료 마케팅 컨설턴트",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 22,
    regions: ["서울", "부산"],
    services: ["마케팅 전략"],
    description: "디지털 마케팅 전문가로서 의료기관 브랜딩부터 온/오프라인 마케팅까지 통합 마케팅 솔루션을 제공합니다. 데이터 기반의 타겟팅으로 효율적인 마케팅 전략을 수립합니다."
  },
  {
    id: 7,
    name: "송영희",
    role: "의료 인력 채용 전문가",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 18,
    regions: ["서울", "경기", "대구"],
    services: ["인력 채용"],
    description: "15년간의 의료인력 채용 경험을 바탕으로 병원에 최적화된 인재를 매칭해 드립니다. 간호사, 의료기사, 행정직원 등 검증된 인력 풀을 보유하고 있습니다."
  },
  {
    id: 8,
    name: "강현우",
    role: "의료 IT 시스템 전문가",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 16,
    regions: ["전국"],
    services: ["의료장비", "재무 컨설팅"],
    description: "병원 EMR 시스템, 접수/수납 시스템, 재고관리 등 병원 운영에 필요한 모든 IT 솔루션을 구축해 드립니다. 클라우드 기반 통합 의료정보 시스템으로 업무 효율성을 높여드립니다."
  }
];

// Service categories
const serviceCategories = [
  "입지 분석",
  "재무 컨설팅",
  "설계 및 인테리어",
  "인허가 대행",
  "인력 채용",
  "마케팅 전략",
  "의료장비",
  "의료폐기물"
];

// Region categories
const regionCategories = [
  "서울",
  "경기",
  "인천",
  "대전",
  "부산",
  "대구",
  "전국"
];

const ExpertList: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialServiceFilter = searchParams.get('service') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(initialServiceFilter);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [showRegionFilter, setShowRegionFilter] = useState(false);

  // Filter experts based on search term, service, and region
  const filteredExperts = mockExperts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = 
      !selectedService || 
      expert.services.some(service => 
        service.toLowerCase().includes(selectedService.toLowerCase())
      );
    
    const matchesRegion = 
      !selectedRegion || 
      expert.regions.includes(selectedRegion) ||
      expert.regions.includes('전국');
    
    return matchesSearch && matchesService && matchesRegion;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedService) params.set('service', selectedService);
    if (selectedRegion) params.set('region', selectedRegion);
    
    const newUrl = 
      `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    
    window.history.replaceState({}, '', newUrl);
  }, [selectedService, selectedRegion]);

  return (
    <>
      <Navbar />
      
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-5xl text-neutral-900 mb-4">
              전문가 찾기
            </h1>
            <p className="font-noto text-lg text-neutral-600 mb-8">
              개원 및 병원 운영에 필요한 각 분야 최고의 전문가들을 만나보세요
            </p>
            
            <div className="relative">
              <input
                type="text"
                placeholder="전문가 이름, 역할 또는 키워드 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-5 pl-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="font-pretendard font-semibold mr-2">필터링:</div>
          
          {/* Service filter */}
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                setShowServiceFilter(!showServiceFilter);
                setShowRegionFilter(false);
              }}
            >
              <Briefcase className="h-4 w-4" />
              {selectedService || "서비스 분야"}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            
            {showServiceFilter && (
              <Card className="absolute top-full left-0 mt-1 z-10 w-64 p-2 shadow-lg">
                <div className="flex flex-col">
                  <Button 
                    variant={!selectedService ? "secondary" : "ghost"} 
                    className="justify-start mb-1"
                    onClick={() => {
                      setSelectedService('');
                      setShowServiceFilter(false);
                    }}
                  >
                    모든 분야
                  </Button>
                  {serviceCategories.map(service => (
                    <Button
                      key={service}
                      variant={selectedService === service ? "secondary" : "ghost"} 
                      className="justify-start mb-1"
                      onClick={() => {
                        setSelectedService(service);
                        setShowServiceFilter(false);
                      }}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          {/* Region filter */}
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                setShowRegionFilter(!showRegionFilter);
                setShowServiceFilter(false);
              }}
            >
              <MapPin className="h-4 w-4" />
              {selectedRegion || "지역"}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            
            {showRegionFilter && (
              <Card className="absolute top-full left-0 mt-1 z-10 w-64 p-2 shadow-lg">
                <div className="flex flex-col">
                  <Button 
                    variant={!selectedRegion ? "secondary" : "ghost"} 
                    className="justify-start mb-1"
                    onClick={() => {
                      setSelectedRegion('');
                      setShowRegionFilter(false);
                    }}
                  >
                    모든 지역
                  </Button>
                  {regionCategories.map(region => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "secondary" : "ghost"} 
                      className="justify-start mb-1"
                      onClick={() => {
                        setSelectedRegion(region);
                        setShowRegionFilter(false);
                      }}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          {/* Clear filters */}
          {(selectedService || selectedRegion) && (
            <Button 
              variant="ghost"
              onClick={() => {
                setSelectedService('');
                setSelectedRegion('');
                setSearchTerm('');
              }}
            >
              필터 초기화
            </Button>
          )}
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            총 <span className="font-bold">{filteredExperts.length}</span>명의 전문가가 있습니다
            {selectedService && (
              <span> · {selectedService} 전문가</span>
            )}
            {selectedRegion && (
              <span> · {selectedRegion} 지역</span>
            )}
          </p>
        </div>
        
        {/* Experts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredExperts.map(expert => (
            <div key={expert.id} className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-pretendard font-bold text-lg">{expert.name}</h3>
                    <p className="text-neutral-600 text-sm">{expert.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-yellow-600 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{expert.rating}</span>
                  <span className="text-neutral-500 ml-1">({expert.reviewCount}개의 후기)</span>
                </div>
                
                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {expert.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.services.map(service => (
                    <span key={service} className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {service}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.regions.map(region => (
                    <span key={region} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                      <MapPin className="h-3 w-3 mr-1" />
                      {region}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/expert/${expert.id}`} 
                  className="flex items-center justify-center w-full py-2 px-4 bg-white border border-neutral-200 rounded-md text-primary font-medium hover:bg-primary-50 transition-colors"
                >
                  프로필 보기
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredExperts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-600 mb-4">검색 결과가 없습니다</p>
            <p className="text-neutral-500">다른 키워드나 필터를 사용해 보세요</p>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default ExpertList;
