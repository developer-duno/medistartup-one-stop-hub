
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Filter, Search, CheckCircle, Clock, MapPin, Award, ChevronDown, X, Download } from 'lucide-react';
import CustomButton from '../components/ui/CustomButton';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

// Import expert data
// In a real app, this would come from an API
const expertsData = [
  // Reusing data from ExpertProfile.tsx
  // In a real application, you would fetch this data from an API
  {
    id: 1,
    name: '김태호',
    role: '재무 컨설턴트',
    specialty: '병원 재무설계 및 투자계획 전문',
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1974&auto=format&fit=crop',
    experience: '15년+',
    projects: '320+',
    description: '서울대 의대 출신으로 병원 경영 컨설팅 15년 경력. 특히 개원의를 위한 맞춤형 재무설계와 수익성 분석에 강점이 있습니다.',
    regions: ['서울', '경기'],
    services: ['재무 컨설팅']
  },
  {
    id: 2,
    name: '박지연',
    role: '입지 분석가',
    specialty: '의료기관 최적 입지선정 및 상권분석',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
    experience: '12년+',
    projects: '280+',
    description: '빅데이터 기반 상권분석 전문가로 의료기관 특화 입지분석 모델을 개발했습니다. 대전/충남 지역 의료상권에 대한 깊은 이해를 갖고 있습니다.',
    regions: ['대전', '충남'],
    services: ['입지 분석']
  },
  {
    id: 3,
    name: '이준호',
    role: '의료 인테리어 디자이너',
    specialty: '진료과목별 최적화 공간설계',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9aa60?q=80&w=2070&auto=format&fit=crop',
    experience: '10년+',
    projects: '170+',
    description: '의료공간 특화 인테리어 디자이너로 환자 경험과 의료진 효율성을 모두 고려한 최적의 공간설계를 제안합니다. 다양한 진료과목별 맞춤 설계 경험이 풍부합니다.',
    regions: ['서울', '인천', '경기'],
    services: ['설계 및 인테리어']
  },
  {
    id: 4,
    name: '최민서',
    role: '인허가 전문가',
    specialty: '의료기관 인허가 및 행정절차 대행',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    experience: '14년+',
    projects: '250+',
    description: '복잡한 의료기관 인허가 절차를 신속하고 정확하게 처리합니다. 각종 규제와 법률 변화에 즉각 대응하여 개원 지연 리스크를 최소화합니다.',
    regions: ['서울', '경기', '인천', '대전'],
    services: ['인허가 대행']
  },
  {
    id: 5,
    name: '정서연',
    role: '의료인력 채용 전문가',
    specialty: '병원 맞춤형 인력 구성 및 채용',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    experience: '9년+',
    projects: '210+',
    description: '의료기관별 최적의 인력 구조를 설계하고 적합한 인재를 매칭합니다. 장기적인 인력 안정성과 팀워크를 고려한 채용 솔루션을 제공합니다.',
    regions: ['서울', '경기', '대전', '충남'],
    services: ['인력 채용']
  },
  {
    id: 6,
    name: '강현우',
    role: '의료 마케팅 전문가',
    specialty: '디지털 마케팅 및 환자 유치 전략',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    experience: '11년+',
    projects: '190+',
    description: '의료기관 특화 디지털 마케팅 전략 수립 및 실행 전문가입니다. 지역 타겟팅과 진료과목별 특성을 고려한 효과적인 환자 유치 방안을 제시합니다.',
    regions: ['서울', '경기', '부산'],
    services: ['마케팅 전략']
  },
  {
    id: 7,
    name: '윤재호',
    role: '의료기기 컨설턴트',
    specialty: '진료과목별 최적 장비 구성 및 설치',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    experience: '13년+',
    projects: '230+',
    description: '의료기관별 최적의 의료장비 구성과 효율적인 도입 방안을 제시합니다. 비용 대비 성능을 고려한 장비 선정과 공간 효율적 배치 설계를 전문으로 합니다.',
    regions: ['서울', '경기', '대전', '부산'],
    services: ['의료기기 구입 및 설치']
  },
  {
    id: 8,
    name: '한지민',
    role: '의료폐기물 관리 전문가',
    specialty: '의료폐기물 처리 및 수납 시스템 구축',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop',
    experience: '8년+',
    projects: '160+',
    description: '의료기관의 효율적인 수납 시스템 구축 및 의료폐기물 관리 솔루션을 제공합니다. 비용 절감과 환경 규제 준수를 모두 고려한 최적의 방안을 제시합니다.',
    regions: ['서울', '경기', '인천', '대전', '충남', '부산'],
    services: ['수납 및 의료폐기물 처리']
  }
];

const ExpertList = () => {
  const [viewMode, setViewMode] = useState("grid"); // grid or compare
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    regions: [],
    services: []
  });
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const serviceCategories = [
    "입지 분석", 
    "재무 컨설팅", 
    "설계 및 인테리어", 
    "인허가 대행", 
    "인력 채용", 
    "마케팅 전략", 
    "의료기기 구입 및 설치", 
    "수납 및 의료폐기물 처리"
  ];
  
  const regions = ["서울", "경기", "인천", "대전", "충남", "충북", "부산", "대구", "광주", "제주"];

  // Filter experts based on selected filters
  useEffect(() => {
    let results = [...expertsData];
    
    // Filter by service category if not "all"
    if (activeCategory !== "all") {
      results = results.filter(expert => 
        expert.services.some(service => service === activeCategory)
      );
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(expert => 
        expert.name.toLowerCase().includes(searchLower) || 
        expert.role.toLowerCase().includes(searchLower) || 
        expert.specialty.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by regions
    if (filters.regions.length > 0) {
      results = results.filter(expert => 
        expert.regions.some(region => filters.regions.includes(region))
      );
    }
    
    // Filter by services
    if (filters.services.length > 0) {
      results = results.filter(expert => 
        expert.services.some(service => filters.services.includes(service))
      );
    }
    
    setFilteredExperts(results);
  }, [filters, activeCategory]);
  
  // Initialize filtered experts
  useEffect(() => {
    setFilteredExperts(expertsData);
  }, []);

  const handleExpertSelect = (expertId) => {
    setSelectedExperts(prev => {
      // If already selected, remove it
      if (prev.includes(expertId)) {
        return prev.filter(id => id !== expertId);
      }
      
      // If not selected and less than 3 experts selected, add it
      if (prev.length < 3) {
        return [...prev, expertId];
      }
      
      // If already 3 experts selected, replace the oldest one
      const newSelected = [...prev];
      newSelected.shift(); // Remove the first (oldest) item
      newSelected.push(expertId);
      return newSelected;
    });
  };
  
  const getSelectedExpertsData = () => {
    return selectedExperts.map(id => expertsData.find(expert => expert.id === id));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <div className="pt-28 pb-16 bg-gradient-to-b from-primary-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
              전문 분야별 <span className="text-primary">최고의 전문가</span>
            </h1>
            <p className="font-noto text-neutral-600 mb-8">
              병원창업에 필요한 각 분야 전문가들을 만나보세요.
              풍부한 경력과 성공 사례를 바탕으로 최적의 솔루션을 제공해 드립니다.
            </p>
            
            <div className="relative w-full max-w-lg mx-auto">
              <input
                type="text"
                className="w-full px-5 py-3 pr-12 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="전문가 이름, 분야 또는 지역 검색"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-pretendard font-bold text-2xl text-neutral-900">
                전문가 목록
              </h2>
              <p className="text-neutral-600">
                총 {filteredExperts.length}명의 전문가
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-neutral-700 hover:text-primary transition-colors"
              >
                <Filter className="h-5 w-5" />
                필터
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="grid">그리드 보기</TabsTrigger>
                  <TabsTrigger value="compare" disabled={selectedExperts.length < 2}>
                    비교 보기 ({selectedExperts.length}/3)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-pretendard font-medium">상세 필터</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-pretendard text-sm mb-2">지역별 필터</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {regions.map((region) => (
                      <label key={region} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.regions.includes(region)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({...filters, regions: [...filters.regions, region]});
                            } else {
                              setFilters({...filters, regions: filters.regions.filter(r => r !== region)});
                            }
                          }}
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-pretendard text-sm mb-2">서비스별 필터</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {serviceCategories.map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <Checkbox 
                          checked={filters.services.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({...filters, services: [...filters.services, service]});
                            } else {
                              setFilters({...filters, services: filters.services.filter(s => s !== service)});
                            }
                          }}
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <CustomButton 
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({search: "", regions: [], services: []})}
                >
                  필터 초기화
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
          
          <div className="overflow-x-auto pb-2">
            <div className="flex border-b border-neutral-200 min-w-max">
              <button
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeCategory === "all"
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                전체 보기
              </button>
              
              {serviceCategories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeCategory === category
                      ? "border-primary text-primary"
                      : "border-transparent text-neutral-500 hover:text-neutral-800"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Compare Info Bar */}
        {selectedExperts.length > 0 && (
          <div className="md:hidden sticky top-0 z-10 bg-primary text-white p-4 mb-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <span>{selectedExperts.length}명의 전문가 선택됨</span>
              <CustomButton 
                variant="secondary" 
                size="sm"
                onClick={() => setViewMode("compare")}
                disabled={selectedExperts.length < 2}
              >
                비교하기
              </CustomButton>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <div 
                  key={expert.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden group ${
                    selectedExperts.includes(expert.id) 
                      ? 'border-primary ring-2 ring-primary-300' 
                      : 'border-neutral-200 hover:shadow-md'
                  }`}
                >
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={expert.image} 
                        alt={expert.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Selection checkbox */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleExpertSelect(expert.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedExperts.includes(expert.id)
                            ? 'bg-primary text-white'
                            : 'bg-white/80 text-neutral-500 hover:bg-primary/10'
                        }`}
                      >
                        {selectedExperts.includes(expert.id) ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <div className="w-3 h-3 border-2 border-neutral-400 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-pretendard font-bold text-lg text-neutral-900">
                          {expert.name}
                        </h3>
                        <p className="font-noto text-neutral-600 text-sm">
                          {expert.role}
                        </p>
                      </div>
                      <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                        {expert.services[0]}
                      </Badge>
                    </div>
                    
                    <p className="font-noto text-neutral-700 text-sm mb-4 line-clamp-2">
                      {expert.specialty}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-5">
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Award className="h-4 w-4" />
                        <span>{expert.experience}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Clock className="h-4 w-4" />
                        <span>{expert.projects}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <MapPin className="h-4 w-4" />
                        <span>{expert.regions.join(', ')}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <CustomButton 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => handleExpertSelect(expert.id)}
                      >
                        {selectedExperts.includes(expert.id) ? '선택 취소' : '전문가 선택'}
                      </CustomButton>
                      
                      <CustomButton 
                        variant="primary" 
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/expert/${expert.id}`}>
                          상세 프로필
                        </Link>
                      </CustomButton>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="font-pretendard font-medium text-xl mb-2">검색 결과가 없습니다</h3>
                <p className="text-neutral-600 text-center max-w-md">
                  다른 검색어나 필터 조건을 사용해보세요. 또는 모든 필터를 초기화하여 전체 전문가를 확인하세요.
                </p>
                <CustomButton 
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilters({search: "", regions: [], services: []});
                    setActiveCategory("all");
                  }}
                >
                  필터 초기화
                </CustomButton>
              </div>
            )}
          </div>
        )}

        {/* Compare View */}
        {viewMode === "compare" && (
          <div>
            {selectedExperts.length >= 2 ? (
              <div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider w-1/4">
                            비교 항목
                          </th>
                          {getSelectedExpertsData().map((expert) => (
                            <th key={expert.id} className="px-6 py-4 text-left text-sm font-medium text-neutral-500 uppercase tracking-wider">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <img 
                                    src={expert.image} 
                                    alt={expert.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span>{expert.name}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            전문 분야
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                              {expert.role}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            전문 서비스
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                              {expert.services.join(', ')}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            경력
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                              {expert.experience}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            프로젝트 수
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                              {expert.projects}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            활동 지역
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                              {expert.regions.join(', ')}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            소개
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 text-sm text-neutral-700">
                              <p className="max-w-xs">{expert.description}</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-800">
                            상세 프로필
                          </td>
                          {getSelectedExpertsData().map((expert) => (
                            <td key={expert.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                              <Link 
                                to={`/expert/${expert.id}`}
                                className="text-primary hover:text-primary-700 font-medium"
                              >
                                상세 보기
                              </Link>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <CustomButton 
                    variant="outline"
                    onClick={() => setSelectedExperts([])}
                  >
                    선택 초기화
                  </CustomButton>
                  
                  <CustomButton 
                    variant="primary"
                    asChild
                  >
                    <Link to="/contact">
                      선택한 전문가에게 상담 신청
                    </Link>
                  </CustomButton>
                  
                  <CustomButton 
                    variant="secondary"
                    onClick={() => setViewMode("grid")}
                  >
                    그리드 보기로 돌아가기
                  </CustomButton>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="font-pretendard font-bold text-xl mb-2">전문가를 2명 이상 선택해주세요</h3>
                <p className="text-neutral-600 mb-6">
                  전문가를 비교하려면 2명 이상의 전문가를 선택해야 합니다.
                  그리드 보기에서 전문가를 선택한 후 비교해보세요.
                </p>
                <CustomButton 
                  variant="primary"
                  onClick={() => setViewMode("grid")}
                >
                  그리드 보기로 돌아가기
                </CustomButton>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-center mt-12">
          <CustomButton variant="outline">
            <Download className="h-5 w-5 mr-2" />
            전문가 종합 안내서 다운로드
          </CustomButton>
        </div>
      </div>

      <div className="bg-primary-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-pretendard font-bold text-2xl md:text-3xl text-neutral-900 mb-4">
              아직 어떤 전문가가 필요한지 모르시나요?
            </h2>
            <p className="font-noto text-neutral-600 mb-8">
              무료 상담 신청을 통해 병원 창업 전문가의 맞춤형 조언을 받아보세요.
              개원 계획에 맞는 최적의 전문가 팀을 구성해 드립니다.
            </p>
            <CustomButton 
              variant="accent" 
              size="lg"
              asChild
            >
              <Link to="/contact">
                무료 상담 신청하기
              </Link>
            </CustomButton>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExpertList;
