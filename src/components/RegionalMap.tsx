
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const RegionalMap: React.FC = () => {
  const navigate = useNavigate();
  
  const regions = [
    { id: 'seoul', name: '서울', experts: 12, x: '63%', y: '26%' },
    { id: 'gyeonggi', name: '경기', experts: 8, x: '55%', y: '20%' },
    { id: 'incheon', name: '인천', experts: 5, x: '45%', y: '25%' },
    { id: 'gangwon', name: '강원', experts: 3, x: '70%', y: '15%' },
    { id: 'chungnam', name: '충남', experts: 4, x: '40%', y: '40%' },
    { id: 'chungbuk', name: '충북', experts: 3, x: '55%', y: '40%' },
    { id: 'daejeon', name: '대전', experts: 6, x: '50%', y: '50%' },
    { id: 'gyeongbuk', name: '경북', experts: 4, x: '70%', y: '50%' },
    { id: 'gyeongnam', name: '경남', experts: 5, x: '60%', y: '70%' },
    { id: 'busan', name: '부산', experts: 7, x: '75%', y: '75%' },
    { id: 'jeonbuk', name: '전북', experts: 3, x: '40%', y: '60%' },
    { id: 'jeonnam', name: '전남', experts: 2, x: '35%', y: '75%' },
    { id: 'gwangju', name: '광주', experts: 5, x: '30%', y: '68%' },
    { id: 'daegu', name: '대구', experts: 6, x: '65%', y: '60%' },
    { id: 'jeju', name: '제주', experts: 2, x: '30%', y: '92%' },
  ];

  const handleRegionClick = (regionName: string) => {
    navigate(`/experts?region=${regionName}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pretendard font-bold text-3xl md:text-4xl text-neutral-900 mb-4">
            지역별 <span className="text-primary">전담 데스크</span> 운영
          </h2>
          <p className="font-noto text-neutral-600 max-w-2xl mx-auto">
            지역별 맞춤 서비스와 현지 전문가 네트워크를 활용한 효율적인 병원 창업 솔루션
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
          <div className="lg:w-2/3 relative">
            <div className="aspect-[3/4] md:aspect-[4/3] w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 relative">
              <svg viewBox="0 0 800 800" className="w-full h-full">
                {/* Base map of Korea - simplified outlines */}
                <path 
                  d="M400,150 Q500,200 550,300 Q600,400 550,500 Q500,600 400,650 Q300,600 250,500 Q200,400 250,300 Q300,200 400,150 Z" 
                  fill="#edf2f7" 
                  stroke="#cbd5e0" 
                  strokeWidth="2"
                />
                
                {/* Region markers */}
                {regions.map((region) => (
                  <g 
                    key={region.id} 
                    transform={`translate(${region.x}, ${region.y})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRegionClick(region.name)}
                  >
                    <circle r="25" fill="white" fillOpacity="0.8" stroke="#3B82F6" strokeWidth="2" />
                    <circle r="10" fill="#3B82F6" />
                    <text 
                      textAnchor="middle" 
                      dy="30" 
                      fill="#1a202c" 
                      fontWeight="bold"
                      style={{ fontSize: '14px' }}
                    >
                      {region.name}
                    </text>
                    <text 
                      textAnchor="middle" 
                      dy="46" 
                      fill="#4A5568"
                      style={{ fontSize: '12px' }}
                    >
                      {region.experts}명
                    </text>
                  </g>
                ))}
              </svg>
              
              <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-500">
                * 숫자는 해당 지역 전문가 인원수입니다
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-pretendard font-bold text-xl mb-4 flex items-center">
                <MapPin className="text-primary mr-2" />
                지역별 맞춤 솔루션
              </h3>
              <p className="text-neutral-600 mb-4">
                각 지역의 특성, 경쟁 환경, 규제 등을 고려한 맞춤형 개원 솔루션을 제공합니다. 지역별 전담 전문가가 현지 상황에 최적화된 전략을 수립해 드립니다.
              </p>
              <button
                onClick={() => navigate('/experts')}
                className="text-primary font-medium flex items-center hover:underline"
              >
                전체 전문가 보기
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-pretendard font-bold text-xl mb-4">지역별 주요 서비스</h3>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                    1
                  </div>
                  <span>지역 특화 의료수요 분석</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                    2
                  </div>
                  <span>지역 인허가 담당자 및 기관 연계</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                    3
                  </div>
                  <span>지역별 보험 청구 특이사항 컨설팅</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                    4
                  </div>
                  <span>로컬 마케팅 전략 수립 및 실행</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary-100 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                    5
                  </div>
                  <span>지역 의료인력 채용 지원</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleRegionClick('서울')}
          >
            <h3 className="font-pretendard font-bold text-lg mb-2">서울 지역 데스크</h3>
            <p className="text-neutral-600 text-sm mb-3">강남, 서초, 송파 등 상권별 특화 전문가 보유</p>
            <div className="flex justify-between items-center">
              <span className="text-primary-700 font-medium">12명의 전문가</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div 
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleRegionClick('부산')}
          >
            <h3 className="font-pretendard font-bold text-lg mb-2">부산 지역 데스크</h3>
            <p className="text-neutral-600 text-sm mb-3">해운대, 동래, 서면 등 권역별 맞춤 서비스</p>
            <div className="flex justify-between items-center">
              <span className="text-primary-700 font-medium">7명의 전문가</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div 
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleRegionClick('대전')}
          >
            <h3 className="font-pretendard font-bold text-lg mb-2">대전 지역 데스크</h3>
            <p className="text-neutral-600 text-sm mb-3">둔산동, 용문동 의료클러스터 특화 컨설팅</p>
            <div className="flex justify-between items-center">
              <span className="text-primary-700 font-medium">6명의 전문가</span>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalMap;
