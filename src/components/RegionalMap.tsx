
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Users } from 'lucide-react';
import CustomButton from './ui/CustomButton';
import { Link } from 'react-router-dom';

const RegionalMap = () => {
  const [activeRegion, setActiveRegion] = useState('대전/충남');

  const regions = [
    { 
      id: 'daejeon', 
      name: '대전/충남', 
      x: '60%', 
      y: '40%', 
      manager: '김의사', 
      phone: '042-123-4567', 
      email: 'daejeon@medistartup.kr',
      expertCount: 5,
      topServices: ['입지 분석', '재무 컨설팅', '인허가 대행']
    },
    { 
      id: 'seoul', 
      name: '서울/경기', 
      x: '30%', 
      y: '25%', 
      manager: '박컨설턴트', 
      phone: '02-456-7890', 
      email: 'seoul@medistartup.kr',
      expertCount: 8,
      topServices: ['설계 및 인테리어', '마케팅 전략', '의료기기 구입 및 설치']
    },
    { 
      id: 'busan', 
      name: '부산/경남', 
      x: '75%', 
      y: '70%', 
      manager: '이닥터', 
      phone: '051-789-0123', 
      email: 'busan@medistartup.kr',
      expertCount: 4,
      topServices: ['재무 컨설팅', '인허가 대행', '인력 채용']
    },
    { 
      id: 'daegu', 
      name: '대구/경북', 
      x: '65%', 
      y: '50%', 
      manager: '최원장', 
      phone: '053-234-5678', 
      email: 'daegu@medistartup.kr',
      expertCount: 3,
      topServices: ['입지 분석', '마케팅 전략', '의료기기 구입 및 설치']
    },
    { 
      id: 'gwangju', 
      name: '광주/전라', 
      x: '30%', 
      y: '65%', 
      manager: '정매니저', 
      phone: '062-345-6789', 
      email: 'gwangju@medistartup.kr',
      expertCount: 6,
      topServices: ['설계 및 인테리어', '인력 채용', '수납 및 의료폐기물 처리']
    }
  ];

  const getActiveRegion = () => {
    return regions.find(region => region.name === activeRegion);
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
                    <p className="font-noto font-medium text-neutral-800 mb-1">
                      담당 총괄 매니저
                    </p>
                    <p className="font-pretendard font-bold text-xl text-primary">
                      {getActiveRegion()?.manager}
                    </p>
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
                    <Link to={`/experts?region=${getActiveRegion()?.name}`}>
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
